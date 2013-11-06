

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
    console.log('ArtDirector.init()');

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
  },

  /**
   * @method checkRatioWidth
   */
  checkRatioWidth: function(key, ratioWidth)
  {
    console.log('ArtDirector.checkRatioWidth('+key+')');

    // no width ratio
    if (!ratioWidth) {
      console.log('ArtDirector.checkRatioWidth('+key+') --> use default width ratio');

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
    console.log('ArtDirector.checkRatioHeight('+key+')');

    // no height ratio
    if (!ratioHeight) {
      console.log('ArtDirector.checkRatioHeight('+key+') --> use default height ratio');

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
    console.log('ArtDirector.checkBreakpointWidth('+key+')');

    // no width
    if (!width)
    {
      console.log('ArtDirector.checkBreakpointWidth('+key+') --> no width');

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
    console.log('ArtDirector.checkBreakpointHeight('+key+')');

    // no height
    if (!height)
    {
      console.log('ArtDirector.checkBreakpointHeight('+key+') --> no height');

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
    console.log('ArtDirector.deleteBreakpoint('+key+') --> no width or height --> delete '+key);

    // delete breakpoint from object
    delete ArtDirector.breakpoints[key];

    return;
  },

  /**
   * @method solveBreakpointWidth
   */
  solveBreakpointWidth: function(key)
  {
    console.log('ArtDirector.solveBreakpointWidth('+key+')');

    return ArtDirector.breakpoints[key].height * (ArtDirector.breakpoints[key].ratioWidth / ArtDirector.breakpoints[key].ratioHeight);
  },

  /**
   * @method solveBreakpointHeight
   */
  solveBreakpointHeight: function(key)
  {
    console.log('ArtDirector.solveBreakpointHeight('+key+')');

    return ArtDirector.breakpoints[key].width * (ArtDirector.breakpoints[key].ratioWidth / ArtDirector.breakpoints[key].ratioHeight);
  },


  /**
   * @method clearSelected
   */
  clearSelected: function()
  {
    console.log('ArtDirector.clearSelected()');

    // find all 'is-selected' and remove class
    $('.is-selected').removeClass('is-selected');
  }

};

/* !Editor */
/**
 * @module Editor
 */
var Editor =
{

  /**
   * @property editorArea
   */
  editorArea: null,

  /**
   * @property editorImage
   */
  editorImage: null,

  /**
   * @proprty editorMultiplier
   */
  editorMultiplier: null,

  /**
   * @method init
   */
  init: function()
  {
    console.log('Editor.init()');


    this.getEditorArea();
    this.getEditorImage();
    this.findMultiplier();
  },

  /**
   * @method getEditorArea
   */
  getEditorArea: function()
  {
    console.log('Editor.getEditorArea()');


    // find all 'js-editor'
    var editorArea = $('.js-editor');

    // found multiple 'js-editor'
    if (editorArea.length > 1)
    {
      console.log('multiple editorAreas found, using first one');

      // return only the first one
      editorArea = editorArea.get(0);
    }

    // set Editor.editorArea to the found editorArea
    // remove from array
    this.editorArea = editorArea.get(0);
  },

  /**
   * @method getEditorImage
   */
  getEditorImage: function()
  {
    console.log('Editor.getEditorImage()');

    // find all 'js-editor-image'
    var editorImage = $('img.js-editor-image');

    // found multiple 'js-editor-image
    if (editorImage.length > 1)
    {
      console.log('multiple editorImages found, using first one');

      // return only the first one
      editorImage = editorImage.get(0);
    }

    // set Editor.editorImage to found editorImage
    // remove from array
    this.editorImage = editorImage.get(0);
  },

  /**
   * @medthod findMultiplier
   */
  findMultiplier: function()
  {
    console.log('Editor.findMultiplier()');

    // require editorArea
    // require editorImage
    if (!this.editorArea || !this.editorImage)
    {
      console.log('multiplier could not be established, missing requirements');
    }

    // define multipler as decimal percent - eg. 0.8 = 80%
    this.editorMultiplier = this.editorArea.clientWidth / this.editorImage.naturalWidth;
  },

  /**
   * @method createEditorArea
   */
  createEditorArea: function(key, value)
  {
    console.log('Editor.createEditorArea()');

    // element
    $('<div/>', {
      class: 'editor-breakpoint__area  '+key,
    })

    // add css for positioning and size
    .css({
      position: 'absolute',
      top: 0,
      left: 0,
      width: value.width * this.editorMultiplier,
      height: value.height * this.editorMultiplier
    })

    // enable dragging - confined to editor area
    .draggable({ containment: "parent" })

    // enable resizing of area - proportionately
    .resizable({ aspectRatio: ArtDirector.breakpoints[key].ratioWidth / ArtDirector.breakpoints[key].ratioHeight })

    // enable mouse event
    .mousedown(function() {
      // clear other selected items
      ArtDirector.clearSelected();

      // select editor item
      Editor.selectEditorArea(key);

      // select list item
      SelectPanel.selectListItem(key);

    })

    // add badge with breakpoint name to area
    .append('<span class="badge">'+key+'</span>')

    // add area to editor
    .appendTo(this.editorArea);

  },

  /**
   * @method selectEditorArea
   */
  selectEditorArea: function(key) {
    $('.js-editor .'+key).addClass('is-selected');
  }

};

/* !SelectList */
/**
 * @module Selector
 */
var SelectPanel =
{

  /**
   * @property selectListGroup
   */
  selectListGroup: null,

  /**
   * @property ButtonClearSelected
   */
  buttonClearSelected: null,

  /**
   * @method init
   */
  init: function()
  {
    console.log('SelectPanel.init()');


    this.selectListGroup = $('.js-select-list');
    this.clearSelected();
  },

  /**
   * @method assignClearSelectedToButton
   */
  clearSelected: function()
  {
    console.log('SelectPanel.clearSelected()');


    // find all 'js-clear-selected' buttons
    var button = $('button.js-clear-selected');

    // multiple buttons
    if (button.length > 1) {
      console.log('multiple clear selected buttons found');
    }

    // assign SelectList.ButtonClearSelected to found button
    this.buttonClearSelected = button;

    // assign SelectList.ButtonClearSelected
    this.buttonClearSelected.click(function() {
      ArtDirector.clearSelected();
    });
  },

  /**
   * @method createSelectorListItem
   */
  createSelectListItem: function(key)
  {

    // element
    $('<li/>', {
      text: key,
      class: 'breakpoint-selector__item  ' + key + ' list-group-item'
    })

    // add click function
    .click(function() {

      // clear all 'is-selected' items
      ArtDirector.clearSelected();

      // add 'is-selected' to this item
      $(this).addClass('is-selected');

      // find area in editor and add 'is-selected'
      $('.editor-breakpoint__area.'+key).addClass('is-selected');
    })

    // add badge to list item width dimensions
    .append('<span class="badge">'+ArtDirector.breakpoints[key].width + ' x ' + ArtDirector.breakpoints[key].height +'</span>')

    // add list item to list
    .appendTo('.js-select-list');
  },

  /**
   * @method selectListItem
   */
  selectListItem: function(key)
  {
    // add class 'is-selected' to list item
    $('.js-select-list .'+key).addClass('is-selected');
  }

};


$(document).ready(function() {


  ArtDirector.init({
    defaultRatioWidth: 4,
    defaultRatioHeight: 3,

    breakpoints: {
      bp1: {
        width: 320,
        ratioWidth: 1,
        ratioHeight: 1
      },
      bp2: {
        height: 120
      },
      bp3: {
        ratioWidth: 1
      }
    }
  });

  $.each(ArtDirector.breakpoints, function(key, value) {
    Editor.createEditorArea(key, value);
    SelectPanel.createSelectListItem(key);
  });



});




/**
 OLD STUFF


  function getBreakpoint(classes) {
    // compare list of classes to breakpoints object
    // if class exists as a object key
    // return key
    var breakpoint = null;
    $.each(classes.classList, function(key, value) {
      if (breakpoints[value]) {
        breakpoint = value;
      }
    });

    return breakpoint;
  }


  function createImages() {
    console.log('createImages()');

    // find each area
    var areas = $('.editor-breakpoint__area');

    $.each(areas, function(key, value) {
      createImage(value);
    });

  }

  function createImage(value) {
    console.log('createImage()');

    // get breakpoint
    var breakpoint = getBreakpoint(value);
    if (!breakpoint) {
      console.log('breakpoint does not exist');
    }

    var viewportWidth  = value.offsetWidth,  // viewport width
        viewportHeight = value.offsetHeight, // viewport height
        viewportX      = value.offsetLeft,   // viewport x
        viewportY      = value.offsetHeight, // viewport y
        viewportDefaultWidth = breakpoints[breakpoint].width, // viewport.default width
        viewportDefaultHeight = breakpoints[breakpoint].height // viewport.default height
        ;




    viewportBase = ((viewportDefaultWidth / viewportWidth));
    console.log(viewportBase);





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
    console.log('clearImages()');

    $('.js-viewer .viewport').remove()
  }


  $('.js-create-images').click(function() {
    clearImages();
    createImages();
  });
 */