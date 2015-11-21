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
      console.log('BackSpace');
      e.preventDefault();
      break;


    // ---------------------------------------------------------- Enter
    case '13':              // Enter
      if($('#explorer>ul li').is('#new-folder'))
      {
        // item-new-name
        console.log('new folder');
        ex_inputSubmit();
      }
      else
      {
        console.log('enter');
        clickonitems(_self);
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
      next = cid > 10 ? cid - 10 : 0;
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(next);
      break;

    case '33ctrl':         // PageUP + ctrl
      next = cid > 10 ? cid - 10 : 0;
      ex_removeClass('focused');
      ex_itemFocus(next);
      break;

    case '33shift':        // PageUP + Shift
      next = cid > 10 ? cid - 10 : 0;
      ex_removeClass('selected focused');
      ex_items_select_focus_until(next);
      break;

    case '33ctrlshift':    // PageUP + Ctrl + Shift
      next = cid > 10 ? cid - 10 : 0;
      ex_removeClass('focused');
      ex_items_select_focus_until(next);
      break;


    // ---------------------------------------------------------- Page Down
    case '34':              // PageDown
      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(next);
      break;

    case '34ctrl':         // PageDown + Ctrl
      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_removeClass('focused');
      ex_itemFocus(next);
      break;

    case '34shift':         // PageDown + Shift
      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_removeClass('selected focused');
      ex_items_select_focus_until(next);
      break;

    case '34ctrlshift':    // PageDown + Ctrl + Shift
      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_removeClass('focused');
      ex_items_select_focus_until(next);
      break;


    // ---------------------------------------------------------- End
    case '35':              // End
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(lastid);
      break;

    case '35ctrl':         // End + Ctrl
      ex_removeClass('focused');
      ex_itemFocus(lastid);
      break;

    case '35shift':         // End + Shift
      ex_removeClass('selected focused');
      ex_items_select_focus_until(lastid);
      break;

    case '35ctrlshift':    // End + Ctrl + Shift
      ex_removeClass('focused');
      ex_items_select_focus_until(lastid);
      break;


    // ---------------------------------------------------------- Home
    case '36':             // Home
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(0);
      break;

    case '36ctrl':        // Home + Ctrl
      ex_removeClass('focused');
      ex_itemFocus(0);
      break;

    case '36shift':      // Home + Ctrl
      ex_removeClass('selected focused');
      ex_items_select_focus_until(0);
      break;

    case '36ctrlshift':  // Home + Ctrl + Shift
      ex_removeClass('focused');
      ex_items_select_focus_until(0);
      break;


    // ---------------------------------------------------------- Left
    case '37':              // left
      console.log('left');
      break;
    case '37alt':           // left + Alt
      console.log('go to previous page');
      e.preventDefault();
      break;


    // ---------------------------------------------------------- Up
    case '38':              // up
      next = cid > 0 ? cid - 1 : 0;
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(next);
      break;

    case '38ctrl':           // up + ctrl
      next = cid > 0 ? cid - 1 : 0;
      ex_removeClass('focused');
      ex_itemFocus(next);
      break;

    case '38shift':          // up + shift
      next = cid > 0 ? cid - 1 : 0;
      ex_removeClass('focused selected');
      ex_items_select_focus_until(next);
      break;

    case '38ctrlshift':      // up + ctrl + shift
      next = cid > 0 ? cid - 1 : 0;
      ex_removeClass('focused zero');
      ex_itemSelectedFocusedZero(next);
      break;


    // ---------------------------------------------------------- Right
    case '39':              // right
      console.log('right');
      break;

    case '39alt':           // right + Alt
      console.log('go to next page');
      e.preventDefault();
      break;


    // ---------------------------------------------------------- Down
    case '40':              // down
      next = cid >= lastid ? lastid : cid + 1;
      ex_removeClass('selected focused zero');
      ex_itemSelectedFocusedZero(next);
      break;

    case '40ctrl':           // down + ctrl
      next = cid >= lastid ? lastid : cid + 1;
      ex_removeClass('focused');
      ex_itemFocus(next);
      break;

    case '40shift':          // down + shift
      next = cid >= lastid ? lastid : cid + 1;
      ex_removeClass('focused selected');
      ex_items_select_focus_until(next);
      break;

    case '40ctrlshift':     // down + shift
      next = cid >= lastid ? lastid : cid + 1;
      ex_removeClass('focused zero');
      ex_itemSelectedFocusedZero(next);
      break;


    // ---------------------------------------------------------- Delete
    case '46':              // delete
      ex_delete();
      break;

    case '46shift':         // delete + shift
      ex_delete(true);
      break;



    // ---------------------------------------------------------------------- shortcut
    case '65ctrl':          // a + ctrl
      ex_selectAll();
      break;

    case '67ctrl':          // c + ctrl
      ex_copy();
      break;

    case '78ctrl':          // n + ctrl
      ex_newFolder();
      break;

    case '86ctrl':          // v + ctrl
      ex_paste();
      break;

    case '84ctrl':          // w + ctrl     close current tab
      console.log("you can't close this tab")
      e.preventDefault();
      break;

    case '88ctrl':          // x + ctrl
      ex_cut();
      break;


    case '113':             // f2
      ex_rename();
      break;



    // ---------------------------------------------------------------------- mouse
    case 'click':           // click
      ex_removeClass('selected focused zero');
      _self.addClass('selected focused zero');
      ex_checkBody();
      break;


    case 'clickctrl':       // click + ctrl
      ex_removeClass('focused zero');
      _self.toggleClass('selected focused zero');
      ex_checkBody();
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


    case 'dblclick':           // Double click
      clickonitems(_self);
      ex_checkBody();
      // ex_removeClass('selected focused zero');
      // _self.addClass('selected focused zero');
      break;


    default:
      return; // exit this handler for other keys
  }


  if(_key == 'click')
  {
    $('#explorer>ul').removeClass('select-all');
  }
}

