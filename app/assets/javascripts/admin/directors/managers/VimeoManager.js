function VimeoManager(opts) {
  this.videos = new VideosCollection();
  this.page = 1;
  this.fetch(opts);
  this.hasAllVideos = false;
}

VimeoManager.prototype = {
  prepareVideoData: function(v) {
    var obj = {
      title: v.title,
      video_url: v.url,
      director_id: Bootstrap.director_id,
      vimeo_id: v.id,
      id: v.id,
      thumbnail_small: v.thumbnail_small,
      thumbnail_medium: v.thumbnail_medium,
      thumbnail_large: v.thumbnail_large
    }
    return obj;
  },

  fetch: function(opts) {
    var manager = this;

    $.ajax({
      url: 'http://vimeo.com/api/v2/' + Bootstrap.username + '/videos.json?page=' + this.page,
      type: 'GET',
      dataType: 'jsonp',
      success: function(response, status, xhr) {
        var videos = [];
        for (var i = 0; i < response.length; i++) {
          var video = manager.prepareVideoData(response[i]);
          var model = new VideoModel(video);
          videos.push(video);
          manager.videos.add(model);
        }
        opts.onFetch(videos);
      },
      error: function(response, status, xhr) {

      }
    });
  },

  fetchMoreVideos: function(callback) {
    if (this.hasAllVideos) {
      this.$elem.unbind('scroll.infinite');
      return;
    }

    this.page++;
    this.fetch({onFetch: callback});
  }

};
