/**
 * corridor of all events on keyboard and mouse
 * @param  {[type]} e     the element that event doing on that
 * @param  {[type]} _self seperated element for doing jobs on it
 * @param  {[type]} _key  the key pressed or click or another events
 * @return {[type]}       void func not returning value! only doing job
 */
function event_corridor(e, _self, _key)
{
  _self = $(_self);
  var cid    = parseInt(_self.index());
  var lastid = parseInt($('#explorer>ul li').length) - 1;

  var ctrl   = e.ctrlKey  ? 'ctrl'  : '';
  var shift  = e.shiftKey ? 'shift' : '';
  var alt    = e.altKey   ? 'alt'   : '';
  var mytxt  = String(_key) + ctrl + alt + shift;
  // console.log(mytxt);

  switch(mytxt)
  {
    // ---------------------------------------------------------- BackSpace
    case '8':               // Back Space
      console.log( $(document.activeElement));

      if ( $('body').hasClass('editing') )
        return;

      else if($(document.activeElement).is('#tag-add'))
        return;

      else
      {
        ex_navigate(_self);
        e.preventDefault();
      }

      break;


    // ---------------------------------------------------------- Enter
    case '13':              // Enter
      if($('#explorer>ul li').is('#new-folder'))
      {
        // item-new-name
        // ex_inputSubmit();
        // console.log($('button.btn-fa-check').parent().html());
        ex_inputSubmit.call($('button.btn-fa-check').parent()[0].innerHTML(), true);
      }
      else if($(document.activeElement).is('#tag-add'))
      {
        addTag();
        e.preventDefault();
        return;
      }
      else
      {
        console.log('enter');
        ex_dblClickItems(_self);
      }
      break;


    // ---------------------------------------------------------- Escape
    case '27':              //Escape
      ex_checkBody();
      ex_escape();
      break;


    // ---------------------------------------------------------- Space
    case '32':              // space
    case '32shift':         // space + shift
      _self.addClass('selected');
      break;

    case '32ctrl':          // space + ctrl
    case '32ctrlshift':     // space + ctrl + shift
      _self.toggleClass('selected');
      break;


    // ---------------------------------------------------------- Page Up
    case '33':              // PageUP
      if ( !$('body').hasClass('editing') )
      {
        next = cid > 10 ? cid - 10 : 0;
        ex_removeClass('selected focused zero');
        ex_itemSelectedFocusedZero(next);
      }
      break;

    case '33ctrl':          // PageUP + ctrl
      if ( !$('body').hasClass('editing') )
      {
        next = cid > 10 ? cid - 10 : 0;
        ex_removeClass('focused');
        ex_itemFocus(next);
      }
      break;

    case '33shift':         // PageUP + Shift
      if ( !$('body').hasClass('editing') )
      {
        next = cid > 10 ? cid - 10 : 0;
        ex_removeClass('selected focused');
        ex_items_select_focus_until(next);
      }
      break;

    case '33ctrlshift':     // PageUP + Ctrl + Shift
      if ( !$('body').hasClass('editing') )
      {
        next = cid > 10 ? cid - 10 : 0;
        ex_removeClass('focused');
        ex_items_select_focus_until(next);
      }
      break;


    // ---------------------------------------------------------- Page Down
    case '34':              // PageDown
      if ( !$('body').hasClass('editing') )
      {
        next = cid + 10 >= lastid ? lastid : cid + 10;
        ex_removeClass('selected focused zero');
        ex_itemSelectedFocusedZero(next);
      }
      break;

    case '34ctrl':          // PageDown + Ctrl
      if ( !$('body').hasClass('editing') )
      {
        next = cid + 10 >= lastid ? lastid : cid + 10;
        ex_removeClass('focused');
        ex_itemFocus(next);
      }
      break;

    case '34shift':         // PageDown + Shift
      if ( !$('body').hasClass('editing') )
      {
        next = cid + 10 >= lastid ? lastid : cid + 10;
        ex_removeClass('selected focused');
        ex_items_select_focus_until(next);
      }
      break;

    case '34ctrlshift':     // PageDown + Ctrl + Shift
      if ( !$('body').hasClass('editing') )
      {
        next = cid + 10 >= lastid ? lastid : cid + 10;
        ex_removeClass('focused');
        ex_items_select_focus_until(next);
      }
      break;


    // ---------------------------------------------------------- End
    case '35':              // End
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(lastid);
      break;

    case '35ctrl':          // End + Ctrl
      ex_removeClass('focused');
      ex_itemFocus(lastid);
      break;

    case '35shift':         // End + Shift
      ex_removeClass('selected focused');
      ex_items_select_focus_until(lastid);
      break;

    case '35ctrlshift':     // End + Ctrl + Shift
      ex_removeClass('focused');
      ex_items_select_focus_until(lastid);
      break;


    // ---------------------------------------------------------- Home
    case '36':              // Home
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(0);
      break;

    case '36ctrl':          // Home + Ctrl
      ex_removeClass('focused');
      ex_itemFocus(0);
      break;

    case '36shift':         // Home + Ctrl
      ex_removeClass('selected focused');
      ex_items_select_focus_until(0);
      break;

    case '36ctrlshift':     // Home + Ctrl + Shift
      ex_removeClass('focused');
      ex_items_select_focus_until(0);
      break;


    // ---------------------------------------------------------- Left
    case '37':              // left
      console.log('left');
      break;
    case '37alt':           // left + Alt
      history.back();
      e.preventDefault();
      break;


    // ---------------------------------------------------------- Up
    case '38':              // up
      if ( !$('body').hasClass('editing') )
      {
        next = cid > 0 ? cid - 1 : 0;
        ex_removeClass('selected focused zero');
        ex_itemSelectedFocusedZero(next);
        ex_showProp();
      }
      break;

    case '38alt':
      ex_navigate(_self);
      break;

    case '38ctrl':          // up + ctrl
      if ( !$('body').hasClass('editing') )
      {
        next = cid > 0 ? cid - 1 : 0;
        ex_removeClass('focused');
        ex_itemFocus(next);
      }
      break;

    case '38shift':         // up + shift
      if ( !$('body').hasClass('editing') )
      {
        next = cid > 0 ? cid - 1 : 0;
        ex_removeClass('focused selected');
        ex_items_select_focus_until(next);
      }
      break;

    case '38ctrlshift':     // up + ctrl + shift
      if ( !$('body').hasClass('editing') )
      {
        next = cid > 0 ? cid - 1 : 0;
        ex_removeClass('focused zero');
        ex_itemSelectedFocusedZero(next);
      }
      break;


    // ---------------------------------------------------------- Right
    case '39':              // right
      console.log('right');
      break;

    case '39alt':           // right + Alt
      history.forward();
      e.preventDefault();
      break;


    // ---------------------------------------------------------- Down
    case '40':              // down
      if ( !$('body').hasClass('editing') )
      {
        next = cid >= lastid ? lastid : cid + 1;
        ex_removeClass('selected focused zero');
        ex_itemSelectedFocusedZero(next);
        ex_showProp();
      }
      break;

    case '40ctrl':          // down + ctrl
      if ( !$('body').hasClass('editing') )
      {
        next = cid >= lastid ? lastid : cid + 1;
        ex_removeClass('focused');
        ex_itemFocus(next);
      }
      break;

    case '40shift':         // down + shift
      if ( !$('body').hasClass('editing') )
      {
        next = cid >= lastid ? lastid : cid + 1;
        ex_removeClass('focused selected');
        ex_items_select_focus_until(next);
      }
      break;

    case '40ctrlshift':     // down + shift
      if ( !$('body').hasClass('editing') )
      {
        next = cid >= lastid ? lastid : cid + 1;
        ex_removeClass('focused zero');
        ex_itemSelectedFocusedZero(next);
      }
      break;


    // ---------------------------------------------------------- Delete
    case '46':              // delete
      if ( !$('body').hasClass('editing') )
      {
        ex_delete(false);
      }
      break;

    case '46shift':         // delete + shift
      if ( !$('body').hasClass('editing') )
      {
        ex_delete(true);
      }
      break;



    // ---------------------------------------------------------------------- shortcut
    case '65ctrl':          // a + ctrl
      ex_selectAll();
      break;

    case '67shift':
    case '67ctrl':          // c + ctrl
      ex_clipboard('copy');
      break;

    case '68shift':
      __self = $(_self).children('.fav').children('.fa');
      ex_favorites(__self);
      break;

    case '68altshift':      // d + alt + shift (favorites page)
      reDraw('$/favorites');
      break;

    case '72shift':         // h + shift (Home page)
      reDraw('/');
      break;

    case '76shift':         // l + shift (show intro.js)
      ex_intro();
      break;

    case '78shift':         // n + shift
      if ( !$('body').hasClass('editing') )
      {
        e.preventDefault();
        ex_newFolder();
      }
      break;

    case '80shift':         // p + shift
      if ( !$('body').hasClass('prop-edit') )
      {
        e.preventDefault();
        ex_showPropAdd();
      }

      break;

    case '84shift':         // t + shift
      if ( !$('body').hasClass('tag-edit') )
      {
        e.preventDefault();
        ex_showAddTag();
      }
      break;

    case '84ctrl':          // w + ctrl     close current tab
      console.log("you can't close this tab")
      e.preventDefault();
      break;

    case '85shift':
      $('#modal_upload').toggleClass('visible');
      break;

    case '86shift':         // v + shift
    case '86ctrl':          // v + ctrl
      ex_paste();
      break;

    case '88shift':         // x + shift
    case '88ctrl':          // x + ctrl
      ex_clipboard('cut');
      break;


    case '113':             // f2
      ex_rename();
      break;



    // ---------------------------------------------------------------------- mouse
    case 'click':           // click
      if(! $(e.toElement).parent().hasClass('fav'))
      {
        ex_removeClass('selected focused zero');
        ex_itemSelectedFocusedZero(cid);
        ex_checkBody();
        ex_showProp();
      }
      break;


    case 'clickctrl':       // click + ctrl
      ex_removeClass('focused zero');
      _self.toggleClass('selected focused zero');
      ex_checkBody();
      ex_showProp();
      break;


    case 'clickshift':      // click + shift
      ex_removeClass('selected focused');
      ex_items_select_focus_until(cid);
      ex_checkBody();
      break;


    case 'clickctrlshift':  // click + ctrl + shift
      ex_removeClass('focused');
      ex_items_select_focus_until(cid);
      ex_checkBody();
      break;


    case 'dblclick':        // Double click
      if ($(e.toElement).parent().hasClass('fav'))
      {
        // console.log('fav');
      }
      else
      {
        ex_dblClickItems(_self);
        ex_checkBody();
      }
      // ex_removeClass('selected focused zero');
      // _self.addClass('selected focused zero');
      break;


    default:                // exit this handler for other keys
      return;
  }


  if(_key == 'click')
  {
    $('#explorer>ul').removeClass('select-all');
  }
}

