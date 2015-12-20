// global variable definition
var CURRENTPATH;
var CLIPBOARD;
var STARTPATH;


$(document).ready(function()
{
  // Run intro.js for first time login
  if ($('body').hasClass('first-time')) { ex_intro(); }

  // call from menu or static menu
  $('#newfolder')     .click(function() { ex_newFolder();       });
  $('#more-selectall').click(function() { ex_selectAll();       });
  $('#more-rename')   .click(function() { ex_rename();          });
  $('#more-move')     .click(function() { ex_clipboard('cut');  });
  $('#more-copy')     .click(function() { ex_clipboard('copy'); });
  $('#more-show')     .click(function() { ex_showTrash();       });
  $('#more-remove')   .click(function() { ex_delete(false);     });
  $('#paste')         .click(function() { ex_paste();           });
  $('#remove')        .click(function() { ex_delete(false);     });
  $('#prop-submit')   .click(function() { ex_addProp();         });
  $('#ifaq')          .click(function() { ex_intro();           });
  $('#showAddProp')   .click(function() { ex_showPropAdd();     });
  $('#showAddTag')    .click(function() { ex_showAddTag();      });
  $('#tag-add-btn')   .click(function() { addTag();             });

  // handle all keydown on keyboard
  $(document).keydown(function(e) { event_corridor.call(this, e, $('#explorer>ul li.focused')[0], e.which ); });

  $('#explorer').on("click", ".btn-fa-times",    function(e) { e.preventDefault(); ex_inputSubmit(false); });
  $('#explorer').on("click", ".btn-fa-check",    function(e) { e.preventDefault(); ex_inputSubmit.call(this, true); });
  $('#explorer').on("click", "#item-new-name",   function(e) { e.preventDefault(); });
  $('#explorer').on("click", ".fav i",           function(e) { ex_favorites(this); });
  // remove item on click times icon
  $('#prop-box').on('click', '#tag-list span i', function( ) { ex_tagRemove($(this));});

  ex_tagInit();
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
  $('ul li', explorer).dblclick(function(e) { event_corridor(e, e.currentTarget,  'dblclick'); });

  // call on click menu items

  // Update hidden input value in upload modal to CURRENTPATH
  $('#form_uploader input[name="location"]').val(CURRENTPATH);
});


function addTag()
{
  var tag = $('#tag-add');
  var newTag = tag.val().trim();
  if(newTag && newTag.length>0)
  {
    var exist = false;
    $.each($('#sp-tags').val().split(', '),function(t, item)
    {
      if(item == newTag) {exist = t+1;}
    });

    if(exist)
    {
      existEl = $("#tag-list span:nth-child("+exist+")" );
      bg = existEl.css('background-color');
      existEl.css('background-color', '#B34E4D');
      setTimeout(function () { existEl.css("background-color",bg) }, 500);
    }
    else
    {
      $('#tag-list').append( "<span><i class='fa fa-times'></i>"+newTag+"</span>" );
      $('#sp-tags').val( $('#sp-tags').val() + newTag+', ' );

      $('#tagInput').ajaxify({
        ajax: {
          data: {
            tags:  newTag,
            items: $('#prop-box').attr('data-id')
          }
        }
      });
    }
  }
  tag.val('');
}

function ex_tagRemove(_self)
{
  var span = _self.parent();
  $('#sp-tags').val($('#sp-tags').val().replace(span.text()+', ', ''));
  $('#tag-list').ajaxify({
    ajax: {
      data: {
        tags: span.text(),
        items: $('#prop-box').attr('data-id')
      }
    }
  });
  span.remove();
}


/**
 * Navigate to new location with redraw func by giving item
 * @param  {[type]} _self item element
 */
function ex_navigate(_self)
{
  // first init, if pass up going one level up
  var newLocation = CURRENTPATH;
  if(_self === 'up')
  {
    // if url has / remove it from end of url
    if (CURRENTPATH.substr(-1) == '/')
    {
      newLocation = newLocation.substr(0, newLocation.length - 2);
    }
    // splite url with slash into array
    newLocation = newLocation.split('/');
    // remove last element of array
    newLocation.pop();
    // if has $ in url remove another level
    if (/^(\$)(.*)/g.test(CURRENTPATH))
    {
      newLocation.pop();
    }
    // convert array to string wigh slash seperator
    newLocation = newLocation.join('/');
  }
  else
  {
    // name of the double clicked folder
    newLocation = CURRENTPATH + "/" + $('.name', _self).text();
  }

  // redraw if new location and old one is different!
  if(CURRENTPATH !== newLocation)
  {
    // console.log(CURRENTPATH);
    // console.log(newLocation);
    if(newLocation.length == 0 )
      newLocation = '/';
    // redraw with new address
    reDraw(newLocation);
  }
}


/**
 * redraw explorer items
 * @return {[type]} [description]
 */
function reDraw(_path)
{
  ex_propHide();
  $("#explorer ul").fadeOut(100);

  if (_path == undefined)
  {
    _path = CURRENTPATH;
  }
  Navigate({ url: _path });
}


/**
 * set or unset favorites for items
 * @return {[type]} [description]
 */
function ex_favorites(_self)
{
  $(_self).toggleClass('fa-star-o fa-star');
  var ajx = $(_self).ajaxify({
    ajax: {
      data: {
        location: CURRENTPATH,
        items: $(_self).parents('li').data('id'),
        status: $(_self).hasClass('fa-star-o') ? status = 0 : status = 1
      }
    }
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
    $('#explorer>ul li.selected').hide(300, function() { $(this).remove(); });
  }
  else
  {
    $('#explorer>ul li.selected.trash').hide(300, function() { $(this).remove(); });
    $('#explorer>ul li.selected').addClass('trash');
  }

  $('#explorer>ul li.selected').each(function() {
    myDelete.push($(this).data('id'));
  });

  $('#more-remove').ajaxify({
    ajax: {
      data: {
        location: CURRENTPATH,
        items: myDelete,
        shift: _trash
      }
    }
  });
}


/**
 * move some item
 */
function ex_clipboard(_action)
{
  CLIPBOARD = [];

  if ( $('#explorer>ul li.selected').length > 0)
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
    STARTPATH = CURRENTPATH;
  }

  $('#paste').fadeIn(300).removeClass('hide').css('display', 'inline-block');
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

    $('#explorer > ul li.cutted').removeClass('cutted');
  }
  else if ( $('body').hasClass('copy') )
  {
    myType = 'copy';
    $('body').removeClass('copy');
  }

  if ( myType != 'undefined' && CURRENTPATH != STARTPATH )
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

  $('#paste').fadeOut(300, function() { $(this).addClass('hide'); reDraw(); });
}


/**
 * click on some item in explorer
 */
function ex_dblClickItems(_self)
{
  if(!$(_self).hasClass('selected'))
    return;

  if($(_self).hasClass('folder'))
  {
    if($('body').hasClass('cut'))
    {
      var index   = CLIPBOARD.indexOf($(_self).attr('data-id'));
      if (index > -1)
      {
        CLIPBOARD.splice(index, 1);
      }
    }

    ex_navigate(_self);
  }
  else if($(_self).hasClass('up'))
  {
    ex_navigate(_self);
  }
  else
  {
    // Trigger download link on dbl click items
    document.getElementById("download-link").click();
  }
}


function ex_showProp()
{
  if ( $('#explorer>ul>li.selected').length > 1 )
  {
    // console.log(123);
    var items = [];
    $('#explorer>ul>li.selected').each(function() {
      items.push($(this).data('id'))
    });
    console.log(items.toString());
    $('#prop-box').attr('data-id', items.toString());
  }
  else
  {
    if($('body').hasClass('editing'))
    {
      return;
    }

    if ($('#explorer>ul>li.selected').hasClass('up'))
    {
      ex_propHide();
      return;
    }

    // $('#prop-box > h3').removeClass('hide');
    // $('#prop-box').hide(300);
    // ex_propHide();
    ex_propShow();

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
          if(myData == undefined || myData == '') {
            return;
          }
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
              if ( ImageExist(myData[key]) )
              {
                var element = '<li class="img-container"><img src="' + myData[key] + '" /></li>';
              }
              else
              {
                myData[key] = 'static/images/error.png';
                var element = '<li class="img-container"><span class="fa-stack fa-lg fa-3x"><i class="fa fa-picture-o fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x text-danger"></i></span></li>';
                var element = '<li class="img-container"><img src="' + myData[key] + '" /></li>';
              }
              elements += element;
            }

            else if (key == 'id')
            {
              $('#prop-box').attr('data-id', myData[key]);
            }

            else if (key != 'audio' && key != 'audio-type' && key != 'video' && key != 'video-type' && key != 'tags')
            {
              var element = '<li class="row auto"><span class="span4">' + key + '</span><span class="span8">' + myData[key] + '</span></li>';
              elements += element;
            }

            else if (key == 'tags')
            {
              $('#sp-tags').val( myData['tags'] );
              ex_tagInit();
            }

            else if (key == 'prop')
            {
              console.log('Yohooo');
            }
          }
          // $('#prop-box-ul').hide().html(elements).fadeIn();
          $('#prop-box-ul').hide().html(elements).fadeIn();
          ex_propShow();

          // if prop box has image, after load showing with fade
          $('.img-container img').on('load', function ()
          {

            // $(this).parent().slideDown(500).fadeIn(300);
            $(this).parent().fadeIn(300);
          });
        }
      }
    });
  }
}


function ex_addProp()
{
  var _name  = $.trim($('#prop-box-new input[name="name"]').val());
  var _value = $.trim($('#prop-box-new input[name="value"]').val());

  if ( _name.length === 0 )
  {
    $('#prop-box-new input[name="name"]').addClass('input-error').select();

    var backgroundInterval = setTimeout(function(){
      $('#prop-box-new input[name="name"]').removeClass('input-error');
    }, 300);
  }
  else if ( _value.length === 0 )
  {
    $('#prop-box-new input[name="value"]').addClass('input-error').select();

    var backgroundInterval = setTimeout(function(){
      $('#prop-box-new input[name="value"]').removeClass('input-error');
    }, 300);
  }
  else if ( _name.length !== 0 && _value.length !== 0 )
  {
    $('#prop-box-new').ajaxify({
      ajax: {
        data: {
          name: _name,
          value: _value,
          items: $('#prop-box').attr('data-id')
        }
      }
    });

    // After adding property
    $('#prop-box-new input[name="name"]').val('');
    $('#prop-box-new input[name="value"]').val('');
  }
}
