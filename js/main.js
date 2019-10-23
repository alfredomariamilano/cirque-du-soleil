$(document).ready(($) => {
  // cache some jQuery objects
  const modalTrigger = $('.cd-modal-trigger');
  const transitionLayer = $('.cd-transition-layer');
  const transitionBackground = transitionLayer.children();
  const modalWindow = $('.cd-modal');

  const frameProportion = 1.78; // png frame aspect ratio
  const frames = 25; // number of png frames
  let resize = false;

  let textSize;
  const originalText = $('.homeh1').text();

  // open modal window
  modalTrigger.on('click', (event) => {
    event.preventDefault();
    transitionLayer.addClass('visible opening');
    const delay = ($('.no-cssanimations').length > 0) ? 0 : 600;
    setTimeout(() => {
      textSize = $('.homeh1').css('font-size');
      $('.homeh1').html('TI<br>VOGLIAMO<br>BENE!');
      $('.homeh1').css('font-size', '8rem');
      $('#button').hide();
      modalWindow.addClass('visible');
    }, delay);
  });

  // close modal window
  modalWindow.on('click', '.modal-close', (event) => {
    event.preventDefault();

    $('.homeh1').animate({
      fontSize: textSize,
    }, 5000, () => {
      $('.homeh1').fadeOut(function () {
        $(this).text(originalText);
      }).fadeIn(() => {
        $('#button').fadeIn(1000);
      });
    });

    transitionLayer.addClass('closing');
    modalWindow.removeClass('visible');
    transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', () => {
      transitionLayer.removeClass('closing opening visible');
      transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
    });
  });

  function setLayerDimensions() {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    let layerHeight; let
      layerWidth;

    if (windowWidth / windowHeight > frameProportion) {
      layerWidth = windowWidth;
      layerHeight = layerWidth / frameProportion;
    } else {
      layerHeight = windowHeight * 1.2;
      layerWidth = layerHeight * frameProportion;
    }

    transitionBackground.css({
      width: `${layerWidth * frames}px`,
      height: `${layerHeight}px`,
    });

    resize = false;
  }

  // set transitionBackground dimentions
  setLayerDimensions();
  $(window).on('resize', () => {
    if (!resize) {
      resize = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(setLayerDimensions);
      } else {
        setTimeout(setLayerDimensions, 300);
      }
    }
  });
});
