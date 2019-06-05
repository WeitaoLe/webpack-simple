import Event from 'js/common/event';

require('src/sass/common/ui/_demo.scss');

Event.on('userInfo', function(data) {
  if (data.code == 0) {
    $(".demo-footer #inLoginedDemo").show();
    $(".demo-footer #notInLoginedDemo").hide();
  } else {
    $(".demo-footer #inLoginedDemo").hide();
    $(".demo-footer #notInLoginedDemo").show();
  }
})
