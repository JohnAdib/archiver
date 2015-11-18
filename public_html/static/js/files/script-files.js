// global variable definition
var CURRENTPATH;


/**
 * create new folder start
 */
function ex_newFolder()
{
  ex_items_remove_class('selected focused zero');
  var myElement = ex_inputCreate('createfolder', null);

  if ( $('#explorer>ul li').is('#new-folder') )
  {
    $('#explorer #new-folder').stop().fadeTo(100, 0.1).fadeTo(200, 1.0);
    $('#explorer #new-folder').addClass('selected');
  }
  else
  {
    console.log(myElement);
    $(myElement).hide().prependTo('#explorer>ul').fadeIn(300);
  }

  $('#explorer #item-new-name').focus().select();
}


/**
 * rename file or folder start
 */
function ex_rename()
{
  // rename multiple file and folder
  if($('#explorer .selected').length > 1)
  {
    console.log('We are not handle rename multiple item!');
  }
  // rename one file or folder
  else
  {
    if ($('#explorer>ul li').hasClass('selected'))
    {
      $('#explorer>ul li.selected').addClass('item-rename');
      var myName    = $('#explorer>ul li.selected span.name').text();
      var myElement = ex_inputCreate('rename', myName);

      $('#explorer>ul li.selected span.name').html(myElement).select();
      $('#explorer #item-new-name').focus().select();
    }
  }
}


/**
 * create input for new folder or rename an item
 * @param  {[type]} _type  type of creating
 * @param  {[type]} _value default value if exist for rename
 * @return {[type]}        created element
 */
function ex_inputCreate(_type, _value)
{
  $('body').addClass('editing');

  var myDefaultValue = _value? 'value="' + _value + '"'      : '';
  var myOldValue     = _value? ' data-value="' + _value + '"': '';

  var myElement =
    '<form method="post" action="/$/' + _type + '" data-ajaxify>' +
      '<input id="item-new-name" type="text" name="fname" placeholder="Untitled Folder" ' + myDefaultValue + myOldValue + ' />' +
      '<button class="btn-fa-check"><i class="fa fa-check"></i></button>' +
      '<button class="btn-fa-times"><i class="fa fa-times"></i></button>' +
    '</form>';

  if(_type == 'createfolder')
  {
    myElement =
    '<li data-id="' + _type + '" id="new-folder" class="folder selected focused zero">' +
      '<span class="type fa fa-folder"></span> ' +
      '<span class="name">' +
        myElement +
      '</span> ' +
      '<span class="size">-</span> ' +
      '<span class="date">-</span>' +
    '</li>';
  }
  return myElement;
}


/**
 * when user submit form with submit btn or cancel it
 * @param  {[type]} _submit type of submit, for cancel need to pass false
 * @return {[type]}         [description]
 */
function ex_inputSubmit(_submit)
{
  // user press submit and want to proceed
  if(typeof _submit === 'undefined' || _submit == true)
  {
    var myInputVal = $('#item-new-name').val();
    if ( myInputVal == '' )
    {
      myInputVal = 'Untitled Folder';
    }

    $('#new-folder .name').html(myInputVal);
    $('#new-folder').removeClass('selected').removeAttr('id');

    // send item name as ajax, then redraw items

  }
  // user want to cancel form
  else
  {
    // if user cancel creating new folder
    if ( $('#explorer>ul li').is('#new-folder') )
    {
      $('#explorer #new-folder').hide(300).remove();
    }
    // else if canceling rename
    else
    {
      var myOldVal = $('#explorer input').attr('value');
      $('#explorer .item-rename .name').html(myOldVal);
      ex_items_remove_class('item-rename');

    }
  }

  $('body').removeClass('editing');
}

function ex_checkBody()
{
  if ( $('body').hasClass('cut') )
  {

  }
  if ( $('body').hasClass('copy') )
  {

  }
  if ( $('body').hasClass('editing') )
  {
    ex_inputSubmit(false);
  }
  if ( $('body').hasClass('selectall') )
  {

  }
}

function ex_escape()
{
  if ( $('body').hasClass('cut') )
  {
    $('body').removeClass('cut');
    $('#explorer>ul li.selected').removeClass('cutted');
  }
  else if($('body').hasClass('editing'))
  {
    ex_inputSubmit(false);
  }
}


/**
 * select and deselect all items in explorer
 */
function ex_select_all()
{
  ex_checkBody();
  if ($('#explorer>ul').hasClass('select-all'))
  {
    ex_items_remove_class('selected');
  }
  else
  {
    $('#explorer>ul li').addClass('selected');
  }

  if ($('#explorer>ul li').is('#new-folder'))
  {
    $('#new-folder').fadeOut().remove();
  }

  $('#explorer>ul').toggleClass('select-all');
}


function ex_cut()
{
  if ( $('#explorer>ul').find('li.selected').length != 0 )
  {
    // console.log('Do cut');
    $('body').addClass('cut');
    $('#explorer>ul li.selected').addClass('cutted');
  }
}


function ex_delete(trash)
{
  if (trash)
  {
    $('#explorer>ul li.selected').hide(300).remove();
  }
  else
  {
    $('#explorer>ul li.selected.trash').hide(300).remove();
    $('#explorer>ul li.selected').addClass('trash');
  }
}


function ex_copy()
{
  
}


function ex_paste()
{
  
}


// remove input class from all of items
function ex_items_remove_class(_className)
{
  $('#explorer>ul li').removeClass(_className);

}


function ex_item_select(_id)
{
  $('#explorer>ul li[data-row='+ _id +']').addClass('selected');
}


function ex_item_focus(_id)
{
  $('#explorer>ul li[data-row='+ _id +']').addClass('focused');
}


function ex_item_zero(_id)
{
  $('#explorer>ul li[data-row='+ _id +']').addClass('zero');
}


function ex_item_select_focus(_id)
{
  $('#explorer>ul li[data-row='+ _id +']').addClass('selected focused');
}


function ex_item_select_focus_zero(_id)
{
  $('#explorer>ul li[data-row='+ _id +']').addClass('selected focused zero');
}


function ex_items_select_focus_until(_id)
{
  var zero = $('#explorer>ul li.zero').attr("data-row");
  var start = zero < _id ? zero : _id; 
  start = parseInt(start);
  var end   = zero > _id ? zero : _id; 
  end = parseInt(end);

  for (var i = start; i <= end; i++)
  {
    $('#explorer>ul li[data-row='+ i +']').addClass('selected');
  }
  $('#explorer>ul li[data-row='+ _id +']').addClass('focused');
}


function event_corridor(e, _self, _key)
{
  _self = $(_self);
  var cid    = parseInt(_self.attr('data-row'));
  var lastid = parseInt($('#explorer>ul li:last').attr('data-row'));

  var ctrl   = e.ctrlKey  ? 'ctrl'  : '';
  var shift  = e.shiftKey ? 'shift' : '';
  var alt    = e.altKey   ? 'alt'   : '';
  var mytxt  = String(_key) + ctrl + alt + shift;
  // console.log(mytxt);

  switch(mytxt)
  {
    case '8':               // Back Space
      console.log('BackSpace');
      e.preventDefault();
      break;

    case '13':              // Enter
      if($('#explorer>ul li').is('#new-folder'))
      {
        ex_inputSubmit();
      }
      else
      {
        clickonitems(_self);
      }
      break;

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
      ex_items_remove_class('selected focused zero');
      ex_item_select_focus_zero(next);
      break;

    case '33ctrl':         // PageUP + ctrl
      next = cid > 10 ? cid - 10 : 0;
      ex_items_remove_class('focused');
      ex_item_focus(next);
      break;

    case '33shift':        // PageUP + Shift
      next = cid > 10 ? cid - 10 : 0;
      ex_items_remove_class('selected focused');
      ex_items_select_focus_until(next);
      break;

    case '33ctrlshift':    // PageUP + Ctrl + Shift
      next = cid > 10 ? cid - 10 : 0;
      ex_items_remove_class('focused');
      ex_items_select_focus_until(next);
      break;


    // ---------------------------------------------------------- Page Down
    case '34':              // PageDown
      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_items_remove_class('selected focused zero');
      ex_item_select_focus_zero(next);
      break;

    case '34ctrl':         // PageDown + Ctrl
      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_items_remove_class('focused');
      ex_item_focus(next);
      break;

    case '34shift':         // PageDown + Shift
      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_items_remove_class('selected focused');
      ex_items_select_focus_until(next);
      break;

    case '34ctrlshift':    // PageDown + Ctrl + Shift
      next = cid + 10 >= lastid ? lastid : cid + 10;
      ex_items_remove_class('focused');
      ex_items_select_focus_until(next);
      break;


    // ---------------------------------------------------------- End
    case '35':              // End
      ex_items_remove_class('selected focused zero');
      ex_item_select_focus_zero(lastid);
      break;

    case '35ctrl':         // End + Ctrl
      ex_items_remove_class('focused');
      ex_item_focus(lastid);
      break;

    case '35shift':         // End + Shift
      ex_items_remove_class('selected focused');
      ex_items_select_focus_until(lastid);
      break;

    case '35ctrlshift':    // End + Ctrl + Shift
      ex_items_remove_class('focused');
      ex_items_select_focus_until(lastid);
      break;

    // ---------------------------------------------------------- Home
    case '36':             // Home
      ex_items_remove_class('selected focused zero');
      ex_item_select_focus_zero(0);
      break;

    case '36ctrl':        // Home + Ctrl
      ex_items_remove_class('focused');
      ex_item_focus(0);
      break;

    case '36shift':      // Home + Ctrl
      ex_items_remove_class('selected focused');
      ex_items_select_focus_until(0);
      break;

    case '36ctrlshift':  // Home + Ctrl + Shift
      ex_items_remove_class('focused');
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
      ex_items_remove_class('selected focused zero');
      ex_item_select_focus_zero(next);
      break;

    case '38ctrl':           // up + ctrl
      next = cid > 0 ? cid - 1 : 0;
      ex_items_remove_class('focused');
      ex_item_focus(next);
      break;

    case '38shift':          // up + shift
      next = cid > 0 ? cid - 1 : 0;
      ex_items_remove_class('focused selected');
      ex_items_select_focus_until(next);
      break;

    case '38ctrlshift':      // up + ctrl + shift
      next = cid > 0 ? cid - 1 : 0;
      ex_items_remove_class('focused zero');
      ex_item_select_focus_zero(next);
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
      ex_items_remove_class('selected focused zero');
      ex_item_select_focus_zero(next);
      break;

    case '40ctrl':           // down + ctrl
      next = cid >= lastid ? lastid : cid + 1;
      ex_items_remove_class('focused');
      ex_item_focus(next);
      break;

    case '40shift':          // down + shift
      next = cid >= lastid ? lastid : cid + 1;
      ex_items_remove_class('focused selected');
      ex_items_select_focus_until(next);
      break;

    case '40ctrlshift':     // down + shift
      next = cid >= lastid ? lastid : cid + 1;
      ex_items_remove_class('focused zero');
      ex_item_select_focus_zero(next);
      break;


    case '46':              // delete
      ex_delete();
      break;

    case '46shift':         // delete + shift
      ex_delete(true);
      break;


    // ---------------------------------------------------------------------- shortcut
    case '65ctrl':          // a + ctrl
      ex_select_all();
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
      ex_items_remove_class('selected focused zero');
      _self.addClass('selected focused zero');
      ex_checkBody();
      break;


    case 'clickctrl':       // click + ctrl
      ex_items_remove_class('focused zero');
      _self.toggleClass('selected focused zero');
      ex_checkBody();
      break;


    case 'clickshift':      // click + shift
      ex_items_remove_class('selected focused');
      ex_items_select_focus_until(cid);
      ex_checkBody();
      break;


    case 'clickctrlshift':  // click + ctrl + shift
      ex_items_remove_class('focused');
      ex_items_select_focus_until(cid);
      ex_checkBody();
      break;


    case 'dblclick':           // Double click
      clickonitems(_self);
      ex_checkBody();
      // ex_items_remove_class('selected focused zero');
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


function clickonitems(_self)
{
  if($(_self).hasClass('folder') || $(_self).hasClass('up'))
  {
    var execName = $('.name', _self).text();
    newlocation  = CURRENTPATH + "/"+ execName;
    Navigate({
      url: newlocation
    });
  }
  else
  {
    console.log('click on file!');
  }
}



route('*', function() 
{
  CURRENTPATH = (location.pathname).replace(/^\/+/, '');

  var explorer = this instanceof Document ? $('#explorer') : $(this).parents('#explorer');
  $('ul li', explorer).first().addClass('zero focused');
  

  // handle all click, dbl click
  $('ul li', explorer).click(function(e)    { event_corridor(e, e.currentTarget, 'click');    });
  $('ul li', explorer).dblclick(function(e) {event_corridor(e, e.currentTarget,  'dblclick'); });

  // call on click menu items
  explorer.on("click", ".btn-fa-times", function(e) { e.preventDefault(); ex_inputSubmit(false); });
  explorer.on("click", ".btn-fa-check", function(e) 
  {
    e.preventDefault();
    ex_inputSubmit();

    var listForm = $(this).parents('form');
    // listForm.attr('method', 'post');
    listForm.ajaxify({
      ajax:
      {
        data : {copyTo: 'folder2', items:'file1, folder3, files4'}
      }
    });
  });

});



$(document).ready(function()
{
  // call from menu or static menu
  $('#newfolder')     .click(function()  { ex_newFolder(); });
  $('#more-selectall').click(function()  { ex_select_all(); });
  $('#more-rename')   .click(function()  { ex_rename();     });
  $('#more-move')     .click(function()  { ex_cut();        });
  $('#remove')        .click(function()  { ex_delete();     });

  // handle all keydown on keyboard
  $(document).keydown(function(e)        { event_corridor(e, $('#explorer>ul li.focused')[0], e.which );  });

});