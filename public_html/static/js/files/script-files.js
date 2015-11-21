// global variable definition
var CURRENTPATH;


$(document).ready(function()
{
  // call from menu or static menu
  $('#newfolder')     .click(function()  { ex_newFolder(); });
  $('#more-selectall').click(function()  { ex_selectAll(); });
  $('#more-rename')   .click(function()  { ex_rename();     });
  $('#more-move')     .click(function()  { ex_cut();        });
  $('#remove')        .click(function()  { ex_delete();     });

  // handle all keydown on keyboard
  $(document).keydown(function(e)        { event_corridor(e, $('#explorer>ul li.focused')[0], e.which );  });

  $('#explorer').on("click", ".btn-fa-times",  function(e) { e.preventDefault(); ex_inputSubmit(false); });
  $('#explorer').on("click", "#item-new-name", function(e) { e.preventDefault(); console.log(123); });
  $('#explorer').on("click", ".btn-fa-check",  function(e) 
  {
    e.preventDefault();
    ex_inputSubmit();

    var listForm = $(this).parents('form');
    listForm.ajaxify({
      ajax:
      {
        data : {location: CURRENTPATH}
      }
    });
  });
});


/**
 * this function running after each pushstate and navigate in pages
 */
route('*', function() 
{
  CURRENTPATH = (location.pathname).replace(/^\/+/, '');

  var explorer = this instanceof Document ? $('#explorer') : $(this).parents('#explorer');
  $('ul li', explorer).first().addClass('zero focused');
  

  // handle all click, dbl click
  $('ul li', explorer).click(function(e)    { event_corridor(e, e.currentTarget, 'click');    });
  $('ul li', explorer).dblclick(function(e) {event_corridor(e, e.currentTarget,  'dblclick'); });

  // call on click menu items

});



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
      ex_removeClass('item-rename');

    }
  }

  $('body').removeClass('editing');
}



/**
 * running after deleting some items
 * @param  {[type]} trash [description]
 * @return {[type]}       [description]
 */
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


/**
 * copy some item
 */
function ex_copy()
{
  
}


/**
 * cut some item
 */
function ex_cut()
{
  if ( $('#explorer>ul').find('li.selected').length != 0 )
  {
    // console.log('Do cut');
    $('body').addClass('cut');
    $('#explorer>ul li.selected').addClass('cutted');
  }
}


/**
 * paste some item to new location
 */
function ex_paste()
{
  
}


/**
 * click on some item in explorer
 */
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

