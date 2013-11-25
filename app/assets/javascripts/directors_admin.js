//= require_tree ./admin/directors/collections
//= require_tree ./admin/directors/models
//= require_tree ./admin/directors/managers

function VideoManager() {
  this.vManager = {};
  this.pManager = {};
}

VideoManager.prototype = {
  displayVideos: function(videos) {
    var $container = $('#video-options');
    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];
      var $elem = $('<div class="video" id="'+ video.id +'"><a href="#" data-id="' + video.id + '"><img src="' + video.thumbnail_large + '"></a></div>');
      $container.append($elem);
    }

    var manager = this;
    setTimeout(function() {
      if (manager.vManager.page > 1) {
        manager.vManager.scrollHeight = manager.vManager.$elem[0].scrollHeight
        manager.vManager.height = manager.vManager.$elem.outerHeight();
        manager.fetching = false;
      }
    }, 300);

    this.updateSelectedVideos();
  },

  showVideos: function() {
    var manager = this;
    $('body').append('<div id="overlay"></div>');
    var $overlay = $('#overlay');
    $('#add-action').html('hide videos');
    setTimeout(function() {
      $('#video-options').addClass('open');
      $('#director').addClass('open');
      $('#overlay').addClass('open');
    }, 1);

    $overlay.bind('click', function() {
      manager.hideVideos();
    });
  },

  hideVideos: function() {
    $('#video-options').removeClass('open');
    $('#director').removeClass('open');
    $('#overlay').removeClass('open');
    $('#add-action').html('show videos').removeClass('hidden');

    setTimeout(function() {
      $('#overlay').remove();
    }, 300);
  },

  makeNameEditable: function($elem) {
    var manager = this;
    var id = $elem.attr('id').split('_')[1];
    var video = this.pManager.videos.where({vimeo_id: parseInt(id, 10)})[0];
    var title = video.get('title');
    var $input = $('<input class="edit-title" value=""></input>');
    $elem.replaceWith($input);

    $(document).bind('keydown', function(e) {
      if (e.keyCode === 13) {
        $input.trigger('blur');
      }
    });

    $input.val(title).focus().bind({
      blur: function(e) {
        var $self = $(this);
        html =  '<div style="position: relative;" class="video-title" id="p_'+ video.get('vimeo_id') +'">';
        html += '<h3 class="project">'+ video.get('title') +'</h3>';
        html += '<a href="#" class="reorder-video" data-id="'+ video.get('vimeo_id') +'"></a>';
        html += '<a href="#" class="remove-video" data-id="'+ video.get('vimeo_id') +'"></a>';
        html += '</div>';

        $self.replaceWith(html);
        $(document).unbind('keydown');
      },
      change: function(e) {
        video.set('title', $(this).val());
        $('#save-button').removeClass('disabled').addClass('active');
      }
    });
  },

  updateSelectedVideos: function() {
    var ids = this.pManager.videos.pluck('vimeo_id');

    for (var i = 0; i < ids.length; i++) {
      $('#'+ids[i]).addClass('selected');
    }
  }
};

$(document).ready(function() {
  var manager = new VideoManager();

  manager.vManager = new VimeoManager({
    onFetch: function(videos) {
      manager.displayVideos(videos);
    }
  });

  manager.pManager = new ProjectManager();

  $('#add-action').bind('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('hidden')) {
      manager.hideVideos();
    } else {
      manager.showVideos();
      $(this).addClass('hidden');
    }
  });

  $('#video-options').on('click', '.video a', function(e) {
    e.preventDefault();
    var $self = $(this);
    var id = $self.attr('data-id');

    if (manager.pManager.videos.where({vimeo_id: parseInt(id, 10)}).length > 0) {
      alert("That video is already selected");
      return;
    }

    if (manager.pManager.videos.length >= 12) {
      alert("You've added the maximum number of videos");
      return;
    }

    var video = new VideoModel(manager.vManager.videos.get(id).toJSON());

    video.set('vimeo_id', parseInt(id, 10));
    video.unset('id');

    manager.pManager.addVideo(video, {
      success: function(video) {
        html =  '<div style="position: relative;" class="video-title" id="p_'+ video.get('vimeo_id') +'">';
        html += '<h3 class="project">'+ video.get('title') +'</h3>';
        html += '<a href="#" class="reorder-video" data-id="'+ video.get('vimeo_id') +'"></a>';
        html += '<a href="#" class="remove-video" data-id="'+ video.get('vimeo_id') +'"></a>';
        html += '</div>';

        $('#videos-list').prepend(html);

        manager.updateSelectedVideos();
      }
    });
  });

  $('#videos-list-container').on('click', '.remove-video', function(e) {
    e.preventDefault();
    var $self = $(this);
    var id = $self.attr('data-id');
    var video = manager.pManager.videos.where({vimeo_id: parseInt(id, 10)})[0];
    manager.pManager.removeVideo(video, {
      success: function() {
        $self.parent('.video-title').remove();
        manager.updateSelectedVideos();
      }
    });
  });

  $('#videos-list').sortable({
    items: '.video-title',
    handle: '.reorder-video',
    cursor: 'move',
    axis: 'y',
    stop: function(e, ui) {
      var sort = $('#videos-list').sortable("serialize", {
        key: "sort"
      });
      manager.pManager.updateSort(sort);
    }
  });

  $('#videos-list').on('click', '.video-title h3', function(e) {
    manager.makeNameEditable($(this).parents('.video-title'));
  });

  $('#save-button').bind('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('disabled')) return;
    manager.pManager.save();
  });

  $('#video-options').bind('scroll.infinite', function() {
    manager.vManager.$elem = manager.vManager.$elem || $(this);
    manager.vManager.scrollHeight = manager.vManager.scrollHeight || manager.vManager.$elem[0].scrollHeight
    manager.vManager.height = manager.vManager.height || manager.vManager.$elem.outerHeight();

    if ((manager.vManager.$elem.scrollTop() + manager.vManager.height > manager.vManager.scrollHeight - 50) && !manager.fetching) {
      manager.fetching = true;
      var callback = function(videos) { manager.displayVideos(videos) };
      manager.vManager.fetchMoreVideos(callback);
    }
  });
});
