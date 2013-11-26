function positionBtn($btn) {
  var $window = $(window);
  var windowHeight = $window.height();
  if (windowHeight < 576) {
    $btn.css('height', '576px');
  } else {
    $btn.css('height', '100%');
  }
}

$(document).ready(function() {
  var $window = $(window);

  $('#videos-list').on('click', 'a', function(e) {
    if ($window.width() <= 320) return;
    e.preventDefault();
    var id = $(this).attr('data-vimeoid');
    var url = "//player.vimeo.com/video/"+id;
    var iframe = $('<iframe id="vimeo-player" src="' + url + '" width="100%" height="100%" frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    $('#video-player').html(iframe);
  });

  var $btn = $('#back_outer');

  $window.bind('resize', function() {
    positionBtn($btn);
  });
});
