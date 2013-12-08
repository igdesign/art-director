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
    DEBUG && console.log('Editor.init()');


    this.getEditorArea();
    this.getEditorImage();
    this.findMultiplier();
  },

  /**
   * @method getEditorArea
   */
  getEditorArea: function()
  {
    DEBUG && console.log('Editor.getEditorArea()');


    // find all 'js-editor'
    var editorArea = $('.js-editor');

    // found multiple 'js-editor'
    if (editorArea.length > 1)
    {
      DEBUG && console.log('multiple editorAreas found, using first one');

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
    DEBUG && console.log('Editor.getEditorImage()');

    // find all 'js-editor-image'
    var editorImage = $('img.js-editor-image');

    // found multiple 'js-editor-image
    if (editorImage.length > 1)
    {
      DEBUG && console.log('multiple editorImages found, using first one');

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
    DEBUG && console.log('Editor.findMultiplier()');

    // require editorArea
    // require editorImage
    if (!this.editorArea || !this.editorImage)
    {
      DEBUG && console.log('multiplier could not be established, missing requirements');
    }

    // define multipler as decimal percent - eg. 0.8 = 80%
    this.editorMultiplier = this.editorArea.clientWidth / this.editorImage.naturalWidth;
  },

  /**
   * @method createEditorArea
   */
  createEditorArea: function(key, value)
  {
    DEBUG && console.log('Editor.createEditorArea()');

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