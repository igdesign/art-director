/**
 * @class Viewport
 */
var Viewport =
{
  /**
   * @method init
   */
  init: function()
  {

  }
}



/**


  /**
   * @method getBreakpoint
   * /
  getBreakpoint: function(classes)
  {
    var breakpoint = null;
    $.each(classes.classList, function(key, value) {
      if (ArtDirector.breakpoints[value]) {
        breakpoint = value;
      }
    });

    return breakpoint;
  }



 OLD STUFF





  function createImages() {
    DEBUG && console.log('createImages()');

    // find each area
    var areas = $('.editor-breakpoint__area');

    $.each(areas, function(key, value) {
      createImage(value);
    });

  }

  function createImage(value) {
    DEBUG && console.log('createImage()');

    // get breakpoint
    var breakpoint = getBreakpoint(value);
    if (!breakpoint) {
      DEBUG && console.log('breakpoint does not exist');
    }

    var viewportWidth  = value.offsetWidth,  // viewport width
        viewportHeight = value.offsetHeight, // viewport height
        viewportX      = value.offsetLeft,   // viewport x
        viewportY      = value.offsetHeight, // viewport y
        viewportDefaultWidth = breakpoints[breakpoint].width, // viewport.default width
        viewportDefaultHeight = breakpoints[breakpoint].height // viewport.default height
        ;




    viewportBase = ((viewportDefaultWidth / viewportWidth));
    DEBUG && console.log(viewportBase);





    // create image
    $('<div/>', {
      class: 'viewport'
    })
    .css({
      width: viewportDefaultWidth,
      height: viewportDefaultHeight,
    })
    .append(
      $('<img/>', {
        src: editorImage.src
      })
      .css({
        position: 'absolute',
        top: ((value.offsetTop / multiplier) * (-1)),
        left: ((value.offsetLeft / multiplier) * (-1)),
        width: editorImage.naturalWidth * viewportBase
      })
    )
    .appendTo('.js-viewer')
    ;
  }

  function clearImages() {
    DEBUG && console.log('clearImages()');

    $('.js-viewer .viewport').remove()
  }


  $('.js-create-images').click(function() {
    clearImages();
    createImages();
  });
 */