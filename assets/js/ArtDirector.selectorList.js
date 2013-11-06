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
    DEBUG && console.log('SelectPanel.init()');


    this.selectListGroup = $('.js-select-list');
    this.clearSelected();
  },

  /**
   * @method assignClearSelectedToButton
   */
  clearSelected: function()
  {
    DEBUG && console.log('SelectPanel.clearSelected()');


    // find all 'js-clear-selected' buttons
    var button = $('button.js-clear-selected');

    // multiple buttons
    if (button.length > 1) {
      DEBUG && console.log('multiple clear selected buttons found');
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