$(document).ready(function($){
  //cache some jQuery objects
  var modalTrigger = $('.cd-modal-trigger'),
    transitionLayer = $('.cd-transition-layer'),
    transitionBackground = transitionLayer.children(),
    modalWindow = $('.cd-modal');

  var frameProportion = 1.78, //png frame aspect ratio
    frames = 25, //number of png frames
    resize = false;

  //set transitionBackground dimentions
  setLayerDimensions();
  $(window).on('resize', function(){
    if( !resize ) {
      resize = true;
      (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
    }
  });

  var textSize;

  //open modal window
  modalTrigger.on('click', function(event){
    event.preventDefault();
    transitionLayer.addClass('visible opening');
    var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
    setTimeout(function(){
      textSize = $('.homeh1').css('font-size');
      $('.homeh1').text('TI AMO!');
      $('.homeh1').css('font-size', '10rem');
      $('#button').hide();
      modalWindow.addClass('visible');
    }, delay);
  });

  //close modal window
  modalWindow.on('click', '.modal-close', function(event){
    event.preventDefault();

    $('.homeh1').animate({
      fontSize: textSize
    }, 10000, function() {
      $('#button').fadeIn(1000);
      $('.homeh1').fadeOut(function() {
        $(this).text('Buon Natale principessa!')
      }).fadeIn();
    });

    transitionLayer.addClass('closing');
    modalWindow.removeClass('visible');
    transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
      transitionLayer.removeClass('closing opening visible');
      transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
    });
  });

  function setLayerDimensions() {
    var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      layerHeight, layerWidth;

    if( windowWidth/windowHeight > frameProportion ) {
      layerWidth = windowWidth;
      layerHeight = layerWidth/frameProportion;
    } else {
      layerHeight = windowHeight*1.2;
      layerWidth = layerHeight*frameProportion;
    }

    transitionBackground.css({
      'width': layerWidth*frames+'px',
      'height': layerHeight+'px'
    });

    resize = false;
  }
});
