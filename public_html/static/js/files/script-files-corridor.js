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
  console.log(mytxt);

  switch(mytxt)
  {
    // ---------------------------------------------------------- BackSpace
    case '8':               // Back Space
      switch (ex_editing())
      {
        // edit explorer
        case 1:
        // edit property
        case 2:
        // edit tag
        case 3:
        // search
        case 4:
          break;

        default:
          ex_navigate(_self);
          e.preventDefault();
          break;
      }
      break;


    // ---------------------------------------------------------- Enter
    case '13':              // Enter
      switch (ex_editing())
      {
        // edit explorer
        case 1:
          ex_inputSubmit.call($('button.btn-fa-check').parent()[0].innerHTML(), true);
          break;

        // edit property
        case 2:
          ex_addProp();
          preventDefault();
          break;

        // edit tag
        case 3:
          addTag();
          e.preventDefault();
          break;
        // search
        case 4:
          ex_search();
          e.preventDefault();
          break;

        default:
          ex_dblClickItems(_self);
          break;
      }
      break;


    // ---------------------------------------------------------- Escape
    case '27':              //Escape
      ex_escape();
      break;


    // ---------------------------------------------------------- Space
    case '32':              // space
    case '32shift':         // space + shift
      _self.addClass('selected');
      ex_showProp();
      break;

    case '32ctrl':          // space + ctrl
    case '32ctrlshift':     // space + ctrl + shift
      _self.toggleClass('selected');
      break;


    // ---------------------------------------------------------- Page Up
    case '33':              // PageUP
      if(ex_editing())
        return;

      next = cid > 10 ? cid - 10 : 0;
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(next);
      break;

    case '33ctrl':          // PageUP + ctrl
      if(ex_editing())
        return;

      next = cid > 10 ? cid - 10 : 0;
      ex_removeClass('focused');
      ex_itemFocus(next);
      break;

    case '33shift':         // PageUP + Shift
      if(ex_editing())
        return;

      next = cid > 10 ? cid - 10 : 0;
      ex_removeClass('selected focused');
      ex_items_select_focus_until(next);
      break;

    case '33ctrlshift':     // PageUP + Ctrl + Shift
      if(ex_editing())
        return;

      next = cid > 10 ? cid - 10 : 0;
      ex_removeClass('focused');
      ex_items_select_focus_until(next);
      break;


    // ---------------------------------------------------------- Page Down
    case '34':              // PageDown
      if(ex_editing())
        return;

      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(next);
      break;

    case '34ctrl':          // PageDown + Ctrl
      if(ex_editing())
        return;

      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_removeClass('focused');
      ex_itemFocus(next);
      break;

    case '34shift':         // PageDown + Shift
      if(ex_editing())
        return;

      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_removeClass('selected focused');
      ex_items_select_focus_until(next);
      break;

    case '34ctrlshift':     // PageDown + Ctrl + Shift
      if(ex_editing())
        return;

      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_removeClass('focused');
      ex_items_select_focus_until(next);
      break;


    // ---------------------------------------------------------- End
    case '35':              // End
      if(ex_editing())
        return;

      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(lastid);
      break;

    case '35ctrl':          // End + Ctrl
      if(ex_editing())
        return;

      ex_removeClass('focused');
      ex_itemFocus(lastid);
      break;

    case '35shift':         // End + Shift
      if(ex_editing())
        return;

      ex_removeClass('selected focused');
      ex_items_select_focus_until(lastid);
      break;

    case '35ctrlshift':     // End + Ctrl + Shift
      if(ex_editing())
        return;

      ex_removeClass('focused');
      ex_items_select_focus_until(lastid);
      break;


    // ---------------------------------------------------------- Home
    case '36':              // Home
      if(ex_editing())
        return;

      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(0);
      break;

    case '36ctrl':          // Home + Ctrl
      if(ex_editing())
        return;

      ex_removeClass('focused');
      ex_itemFocus(0);
      break;

    case '36shift':         // Home + Ctrl
      if(ex_editing())
        return;

      ex_removeClass('selected focused');
      ex_items_select_focus_until(0);
      break;

    case '36ctrlshift':     // Home + Ctrl + Shift
      if(ex_editing())
        return;

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
      if(ex_editing())
        return;

      next = cid > 0 ? cid - 1 : 0;
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(next);
      ex_showProp();
      break;

    case '38alt':
      ex_navigate('up');
      break;

    case '38ctrl':          // up + ctrl
      if(ex_editing())
        return;

      next = cid > 0 ? cid - 1 : 0;
      ex_removeClass('focused');
      ex_itemFocus(next);
      break;

    case '38shift':         // up + shift
      if(ex_editing())
        return;

      next = cid > 0 ? cid - 1 : 0;
      ex_removeClass('focused selected');
      ex_items_select_focus_until(next);
      break;

    case '38ctrlshift':     // up + ctrl + shift
      if(ex_editing())
        return;

      next = cid > 0 ? cid - 1 : 0;
      ex_removeClass('focused zero');
      ex_itemSelectedFocusedZero(next);
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
      if(ex_editing())
        return;

      next = cid >= lastid ? lastid : cid + 1;
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(next);
      ex_showProp();
      break;

    case '40ctrl':          // down + ctrl
      if(ex_editing())
        return;

      next = cid >= lastid ? lastid : cid + 1;
      ex_removeClass('focused');
      ex_itemFocus(next);
      break;

    case '40shift':         // down + shift
      if(ex_editing())
        return;

      next = cid >= lastid ? lastid : cid + 1;
      ex_removeClass('focused selected');
      ex_items_select_focus_until(next);
      break;

    case '40ctrlshift':     // down + shift
      if(ex_editing())
        return;

      next = cid >= lastid ? lastid : cid + 1;
      ex_removeClass('focused zero');
      ex_itemSelectedFocusedZero(next);
      break;


    // ---------------------------------------------------------- Delete
    case '46':              // delete
      if(ex_editing())
        return;

      ex_delete(false);
      break;

    case '46shift':         // delete + shift
      if(ex_editing())
        return;

      ex_delete(true);
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
      if(ex_editing())
        return;

      e.preventDefault();
      ex_newFolder();
      break;

    case '80shift':         // p + shift
      if(ex_editing())
        return;

      e.preventDefault();
      ex_showPropAdd();
      break;

    case '81ctrl':          // q + ctrl
    case '81shift':         // q + shift
    case '83shift':         // s + shift
      if(ex_editing())
        return;

      e.preventDefault();
      $("#search input").focus().select();
      break;

    case '82shift':         // r + shift
      reDraw();
      break;

    case '84shift':         // t + shift
      if(ex_editing())
        return;

      e.preventDefault();
      ex_showAddTag();
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
        if(ex_editing())
        {
          ex_checkBody();
        }
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

