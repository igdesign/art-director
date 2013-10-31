$(document).ready(function() {

  function clearSelected() {
    $('.is-selected').removeClass('is-selected');
    console.log('clearSelected');
  }

  function createSelector(key, value, multiplier) {
    var ratio_x = 4,
        ratio_y = 3;

    // overwrite default ratios
    if (value.r) {
      if (value.r.x && value.r.y) {
        ratio_x = value.r.x;
        ratio_y = value.r.y;
      }
    }

    // multiplier
    if (!multiplier) {
      multiplier = 1;
    }

    if (!value.x) {
      // check value y
        // if value y we'll be ok
        // if !value y bad news
      if (!value.y) {
        return;
      }

      if (!value.r) {
        console.log('no ratios, use default: '+ ratio_x +' / '+ratio_y)
        value.x = value.y * (ratio_x / ratio_y)
      }
    }

    if (!value.y) {
      console.log('no height, use ratios: '+ ratio_x +' / '+ratio_y)
      value.y = value.x * (ratio_x / ratio_y)
    }

    if (!breakpoints[key].r) {
      breakpoints[key].r = {};
    }

    // add back to breakpoint array for future calls
    breakpoints[key].x = value.x;
    breakpoints[key].y = value.y;
    breakpoints[key].r.x = ratio_x;
    breakpoints[key].r.y = ratio_y;


    $('<div/>', {
      class: 'editor-breakpoint__area  '+key,
    })
    .css({
      position: 'absolute',
      top: 0,
      left: 0,
      width: value.x * multiplier,
      height: value.y * multiplier
    })
    .draggable({ containment: "parent" })
    .resizable({ aspectRatio: ratio_x / ratio_y })
    .mousedown(function() {
      clearSelected();
      selectListItem(key);
      selectEditorItem(key);
    })
    .append('<span class="badge">'+key+'</span>')

    .appendTo(editor)
  }


  function selectListItem(key) {
    $('.breakpoint-selector__list .'+key).addClass('is-selected');
  }

  function selectEditorItem(key) {
    $('.js-editor .'+key).addClass('is-selected');
  }

  function selectorList(key, breakpoints) {
    $('<li/>', {
      text: key,
      class: 'breakpoint-selector__item  ' + key + ' list-group-item'
    }).attr('data-select', key)
    .click(function() {
      clearSelected();
      $(this).addClass('is-selected');
      console.log(key);
      $('.editor-breakpoint__area.'+key).addClass('is-selected');
    })
    .append('<span class="badge">'+breakpoints[key].x + ' x ' + breakpoints[key].y +'</span>')
    .appendTo('.breakpoint-selector__list');

  }























  var editor      = null,
      editorImage = null,
      multiplier  = null;

  var breakpoints = {
    bp1: {
      x: 320,
      r: {
        x: 1,
        y: 1,
      }
    },
    bp2: {
      y: 360
    }
  }



  // define editor
  editor = $('.js-editor');
  if (editor.length > 1) {
    console.log('found multiple editors');
    console.log('terminating');
  }

  // define editorImage
  editorImage = $('.js-editor-image');
  if (editorImage.length > 1) {
    console.log('found multiple images');
    console.log('terminating');
  }
  else {
    editorImage = editorImage.get(0);
  }

  $('.js-clear-selected').click(function() {
    clearSelected();
  });

  // define multiplier
  multiplier = editor.width() / editorImage.naturalWidth;


  $.each(breakpoints, function( key, value) {
    createSelector(key, value, multiplier)
    selectorList(key, breakpoints)
  });


});