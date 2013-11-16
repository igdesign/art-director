if (typeof DEBUG === 'undefined') DEBUG = true; // will be removed


/* !ArtDirector */
/**
 * @module ArtDirector
 */
var ArtDirector =
{

  /**
   * @property breakpoints
   */
  breakpoints: null,

  /**
   * @property defaultRaios
   */
  defaultRatio: {
    height: 9,
    width: 16
  },

  /**
   * @method ArtDirector
   */
  init: function(params)
  {
    DEBUG && console.log('ArtDirector.init()');

    $.each(params, function(key, value) {
      ArtDirector[key] = value;
    });

    // iterate through breakpoints
    $.each(ArtDirector.breakpoints, function(key, value)
    {
      var rWidth  = ArtDirector.checkRatioWidth(key, value.ratioWidth);
      var rHeight = ArtDirector.checkRatioHeight(key, value.ratioHeight);
      var width   = ArtDirector.checkBreakpointWidth(key, value.width);
      var height  = ArtDirector.checkBreakpointHeight(key, value.height);

      // set ratios of bp
      ArtDirector.breakpoints[key].ratioWidth = rWidth;
      ArtDirector.breakpoints[key].ratioHeight = rHeight;

      // no width or height
      if (!width && !height)
      {
        // delete breakpoint
        ArtDirector.deleteBreakpoint(key);

        // break each loop
        return;
      }

      // determin width
      if (!width && height)
      {
        width = ArtDirector.solveBreakpointWidth(key);
        ArtDirector.breakpoints[key].width = width;
      }

      // determin height
      if (width && !height)
      {
        height = ArtDirector.solveBreakpointHeight(key);
        ArtDirector.breakpoints[key].height = height;
      }
    });

    // initialize other parts of the application
    Editor.init();
    SelectPanel.init();
    Viewport.init();
  },

  /**
   * @method checkRatioWidth
   */
  checkRatioWidth: function(key, ratioWidth)
  {
    DEBUG && console.log('ArtDirector.checkRatioWidth('+key+')');

    // no width ratio
    if (!ratioWidth) {
      DEBUG && console.log('ArtDirector.checkRatioWidth('+key+') --> use default width ratio');

      // return default width Ratio
      return ArtDirector.defaultRatioWidth;
    }

    // use breakpoint ratio
    return ratioWidth;
  },

  /**
   * @method checkRatioHeight
   */
  checkRatioHeight: function(key, ratioHeight)
  {
    DEBUG && console.log('ArtDirector.checkRatioHeight('+key+')');

    // no height ratio
    if (!ratioHeight) {
      DEBUG && console.log('ArtDirector.checkRatioHeight('+key+') --> use default height ratio');

      // return default height Ratio
      return ArtDirector.defaultRatioHeight;
    }

    // use breakpoint ratio
    return ratioHeight;
  },

  /**
   * @method checkBreakpointWidth
   */
  checkBreakpointWidth: function(key, width)
  {
    DEBUG && console.log('ArtDirector.checkBreakpointWidth('+key+')');

    // no width
    if (!width)
    {
      DEBUG && console.log('ArtDirector.checkBreakpointWidth('+key+') --> no width');

      // return
      return false;
    }

    // return width
    return width;
  },

  /**
   * @method checkBreakpointHeight
   */
  checkBreakpointHeight: function(key, height)
  {
    DEBUG && console.log('ArtDirector.checkBreakpointHeight('+key+')');

    // no height
    if (!height)
    {
      DEBUG && console.log('ArtDirector.checkBreakpointHeight('+key+') --> no height');

      // return
      return false;
    }

    // return height
    return height;
  },

  /**
   * @method deleteBreakpoint
   */
  deleteBreakpoint: function(key)
  {
    DEBUG && console.log('ArtDirector.deleteBreakpoint('+key+') --> no width or height --> delete '+key);

    // delete breakpoint from object
    delete ArtDirector.breakpoints[key];

    return;
  },

  /**
   * @method solveBreakpointWidth
   */
  solveBreakpointWidth: function(key)
  {
    DEBUG && console.log('ArtDirector.solveBreakpointWidth('+key+')');

    return ArtDirector.breakpoints[key].height * (ArtDirector.breakpoints[key].ratioWidth / ArtDirector.breakpoints[key].ratioHeight);
  },

  /**
   * @method solveBreakpointHeight
   */
  solveBreakpointHeight: function(key)
  {
    DEBUG && console.log('ArtDirector.solveBreakpointHeight('+key+')');

    return ArtDirector.breakpoints[key].width * (ArtDirector.breakpoints[key].ratioHeight / ArtDirector.breakpoints[key].ratioWidth);
  },


  /**
   * @method clearSelected
   */
  clearSelected: function()
  {
    DEBUG && console.log('ArtDirector.clearSelected()');

    // find all 'is-selected' and remove class
    $('.is-selected').removeClass('is-selected');
  },

  /**
   * @method getBreakpoint
   */
  getBreakpoint: function(element)
  {
    DEBUG && console.log('ArtDirector.getBreakpoint()');

    var breakpoint = null;

    // check each class against defined breakpoint names
    $.each(element.classList, function(key, value) {

      // if class === breakpoint name
      if (ArtDirector.breakpoints[value]) {

        breakpoint = value;
      }
    });

    return breakpoint;
  }



};