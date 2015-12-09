// global variable definition
var CURRENTPATH;
var CLIPBOARD;


$(document).ready(function()
{
  // call from menu or static menu
  $('#newfolder')     .click(function() { ex_newFolder();       });
  $('#more-selectall').click(function() { ex_selectAll();       });
  $('#more-rename')   .click(function() { ex_rename();          });
  $('#more-move')     .click(function() { ex_clipboard('cut');  });
  $('#more-copy')     .click(function() { ex_clipboard('copy'); });
  $('#more-show')     .click(function() { ex_showTrash();       });
  $('#paste')         .click(function() { ex_paste();           });
  $('#remove')        .click(function() { ex_delete(false);     });
  $('#prop-submit')   .click(function() { ex_addProp();         });

  // handle all keydown on keyboard
  $(document).keydown(function(e) { event_corridor.call(this, e, $('#explorer>ul li.focused')[0], e.which ); });

  $('#explorer').on("click", ".btn-fa-times",  function(e) { e.preventDefault(); ex_inputSubmit(false);           });
  $('#explorer').on("click", "#item-new-name", function(e) { e.preventDefault();                                  });
  $('#explorer').on("click", ".btn-fa-check",  function(e) { e.preventDefault(); ex_inputSubmit.call(this, true); });
  $('#explorer > ul > li .fa-star-o, #explorer > ul > li .fa-star').click(function() {
    $(this).hasClass('fa-star-o') ? $(this).removeClass('fa-star-o').addClass('fa-star') : $(this).removeClass('fa-star').addClass('fa-star-o');
    $(this).ajaxify({
      ajax: {
        data: {
          location: CURRENTPATH,
          items: $(this).parents('li').data('id')
        }
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

  // $(".light-gallery", this).lightGallery();
  var explorer = this instanceof Document ? $('#explorer') : $(this).parents('#explorer');
  $('ul li', explorer).first().addClass('zero focused');


  // handle all click, dbl click
  $('ul li', explorer).click(function(e)    { event_corridor(e, e.currentTarget, 'click');    });
  $('ul li', explorer).dblclick(function(e) {event_corridor(e, e.currentTarget,  'dblclick'); });

  // call on click menu items

});


function reDraw()
{
  Navigate({
    url: CURRENTPATH
  });
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
    // console.log('submit');
    // return;
    var myInputVal = $('#item-new-name').val();
    if ( myInputVal == '' )
    {
      myInputVal = 'Untitled Folder';
    }

    $('#new-folder .name').html(myInputVal);
    $('#new-folder').removeClass('selected').removeAttr('id');

    // send item name as ajax, then redraw items
    var listForm = $(this).parents('form');
    listForm.ajaxify({
      ajax:
      {
        data : {location: CURRENTPATH}
      }
    });
    reDraw();
  }
  // user want to cancel form
  else
  {
    // console.log('cancel');
    // return;
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
function ex_delete(_trash)
{
  var myDelete = [];

  if (_trash)
  {
    $('#explorer>ul li.selected').hide(300);
  }
  else
  {
    $('#explorer>ul li.selected.trash').hide(300);
    $('#explorer>ul li.selected').addClass('trash');
  }

  $('#explorer>ul li.selected').each(function() {
    myDelete.push($(this).data('id'));
  });

  $('#remove').ajaxify({
    ajax: {
      data: {
        location: CURRENTPATH,
        items: myDelete,
        shift: _trash
      }
    }
  });

  reDraw();
}


/**
 * copy some item
 */
function ex_clipboard(_action)
{
  CLIPBOARD = [];

  if ( $('#explorer>ul li.selected').length != 0 )
  {
    if ( _action == 'copy' )
    {
      $('body').addClass('copy');
    }
    else if ( _action == 'cut' )
    {
      $('body').addClass('cut');
      $('#explorer>ul li.selected').addClass('cutted');
    }

    $('#explorer>ul li.selected').each(function() {
      CLIPBOARD.push( $(this).data('id') );
    });
  }

  $('#paste').parents('li').removeClass('hide');
}


/**
 * paste some item to new location
 */
function ex_paste()
{
  var myType;

  if ( $('body').hasClass('cut') )
  {
    myType = 'cut';
    $('body').removeClass('cut');
  }
  else if ( $('body').hasClass('copy') )
  {
    myType = 'copy';
    $('body').removeClass('copy');
  }

  if ( myType != 'undefined' )
  {
    $('#paste').ajaxify({
      ajax: {
        data: {
          location: CURRENTPATH,
          items: CLIPBOARD,
          type: myType
        }
      }
    });
  }

  $('#paste').parents('li').addClass('hide');
  reDraw();
}


/**
 * click on some item in explorer
 */
function ex_dblClickItems(_self)
{
  if($(_self).hasClass('folder') || $(_self).hasClass('up'))
  {
    var execName = $('.name', _self).text();    // name of the double clicked folder
    if (/^(\$)(.*)/g.test(CURRENTPATH))
    {
      execName += '/..';
    }
    newlocation  = CURRENTPATH + "/" + execName; // new location
    Navigate({
      url: newlocation
    });
  }
  else
  {
    console.log('click on file!');
  }
}


function ex_showProp()
{
  if ( $('#explorer>ul>li.selected').length > 1 )
  {
    console.log('more');
  }
  else
  {
    if($('body').hasClass('editing'))
    {
      return;
    }

    if ($('#explorer>ul>li.selected').hasClass('up'))
    {
      return;
    }

    var myItem = $('#explorer>ul>li.selected').data('id');

    $('#prop-box-ul').ajaxify({
      ajax: {
        data: {
          location: CURRENTPATH,
          items: myItem
        },
        success: function(e, data, x) {
          var myData = x.responseJSON.datatable;
          var elements = '';
          // console.log(myData);

          if(myData['audio'] != undefined)
          {
            elements = '<audio controls><source src="' + myData['audio'] + '" type="' + myData['audio-type'] + '"></audio>';
          }
          else if(myData['video'] != undefined)
          {
            elements = '<video controls><source src="' + myData['video'] + '" type="' + myData['video-type'] + '"></video>';
          }



          for (var key in myData)
          {
            if (key == 'thumb')
            {
              if(ImageExist(myData[key]))
              {
                var element = '<li class="img-container"><img src="' + myData[key] + '" /></li>';
              }
              else
              {
                myData[key] = 'static/images/error.png';
                var element = '<li class="img-container"><span class="fa-stack fa-lg fa-3x"><i class="fa fa-picture-o fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x text-danger"></i></span></li>';
                var element = '<li class="img-container"><img src="' + myData[key] + '" /></li>';
              }
                elements    += element;
            }
            else if (key != 'id' && key != 'audio' && key != 'audio-type' && key != 'video' && key != 'video-type')
            {
              var element = '<li class="row auto"><span class="span4">' + key + '</span><span class="span8">' + myData[key] + '</span></li>';
              elements += element;
            }
          }

          $('#prop-box-ul').html(elements);
        }
      }
    });
  }
}

function ImageExist(_url)
{
   var img = new Image();
   img.src = _url;
   return img.height != 0;
}

function ex_addProp()
{
  $('#form_prop').ajaxify({
    ajax: {
      data: {
        location: CURRENTPATH,
        items: $('#form_prop').serialize()
      }
    }
  });
}
