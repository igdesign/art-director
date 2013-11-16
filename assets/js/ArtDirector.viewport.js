/**
 * @class Viewport
 */
var Viewport =
{

  /**
   * @property btnCreateImages
   */
  btnCreateImages: null,

  /**
   * @property viewportAreas
   */
  viewportAreas: null,

  /**
   * @method init
   */
  init: function()
  {
    DEBUG && console.log('Viewport.init()');

    // find all buttons
    this.btnCreateImages = $('.js-viewport-btnCreateImages');

    // give buttons click functions
    this.btnCreateImages.click(function() {
      Viewport.createImages();
    });


  },

  /**
   * @method createImages
   **/
  createImages: function()
  {
    DEBUG && console.log('Viewport.createImages()');

    // find each area
    var areas = $('.editor-breakpoint__area');

    // create image for each area found
    $.each(areas, function(key, value) {

      Viewport.clearImages();

      Viewport.createImage(value);
    });
  },

  /**
   * @method clearImages
   */
  clearImages: function()
  {
    DEBUG && console.log('Viewport.clearImages()');

    $('.js-viewport-viewer .viewport').remove()
  },

  /**
   * @method createImage
   */
  createImage: function(value)
  {
    DEBUG && console.log('Viewport.createImage()');

    // determin breakpoint
    var breakpoint = ArtDirector.getBreakpoint(value);

    // no breakpoint found
    if (!breakpoint)
    {
      DEBUG && console.log('Viewport.createImage() --> no breakpoint found');

      return;
    }

    console.log('');console.log('---------------------------');console.log('');


        // offsetTop
    var selectorTop    = value.offsetTop
        // editorWidth - offsetLeft - width
      , selectorRight  = Editor.editorArea.offsetWidth - value.offsetWidth - value.offsetLeft
        // editorHeight - height - offsetTop
      , selectorBottom = Editor.editorArea.offsetHeight - value.offsetHeight - value.offsetTop
        // offsetLeft
      , selectorLeft   = value.offsetLeft

        // viewportTop = editorTop * viewportHeight / editorHeight
        viewportTop    = selectorTop * ArtDirector.breakpoints[breakpoint].height / value.offsetHeight
        // viewportRight = ((editorRight + 1) * viewportWidth / editorWidth) - 1
      , viewportRight  = ((selectorRight + 1) * ArtDirector.breakpoints[breakpoint].width / value.offsetWidth) - 1
        // viewportBottom = ((editorBottom + 1) * viewportHeight / editorHeight) - 1
      , viewportBottom = ((selectorBottom + 1) * ArtDirector.breakpoints[breakpoint].height / value.offsetHeight) - 1
        // viewportLeft = editorLeft * viewportLeft / editorLeft
      , viewportLeft   = selectorLeft * ArtDirector.breakpoints[breakpoint].width / value.offsetWidth
        ;

      console.log(selectorTop);
      console.log(selectorTop, selectorRight, selectorBottom, selectorLeft);
      console.log(viewportTop, viewportRight, viewportBottom, viewportLeft);



    console.log('');console.log('---------------------------');console.log('');




    // create image
    $('<div/>', {
      class: 'viewport'
    })
    .css({
      width: ArtDirector.breakpoints[breakpoint].width,
      height: ArtDirector.breakpoints[breakpoint].height
    })
    .append(
      $('<img/>', {
        src: Editor.editorImage.src
      })
      .css({
        position: 'absolute',
        width: Editor.editorImage.naturalWidth * imageScaler,
        top: value.offsetTop * -1,
        left: value.offsetLeft * -1
/*         top: area.offsetTop * mu * -1, */
/*         left: area.offsetLeft * -1, */
/*         width: (Editor.editorImage.width / mu ) * theta */
      })
    )
    .appendTo('.js-viewport-viewer')
    ;
  }

}