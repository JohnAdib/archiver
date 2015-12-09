/**
 * create new folder start
 */
function ex_newFolder()
{
  ex_checkBody();
  ex_removeClass('selected focused zero');
  var myElement = ex_inputCreate('createfolder', null);

  if ( $('#explorer>ul li').is('#new-folder') )
  {
    $('#explorer #new-folder').stop().fadeTo(100, 0.1).fadeTo(200, 1.0);
    $('#explorer #new-folder').addClass('selected');
  }
  else
  {
    $(myElement).hide().prependTo('#explorer>ul').fadeIn(300);
  }

  $('#explorer #item-new-name').focus().select();
}


/**
 * rename file or folder start
 */
function ex_rename()
{
  ex_checkBody();
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
      var myItem    = $('#explorer>ul li.selected').data('id');
      var myElement = ex_inputCreate('rename', myName, myItem);

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
function ex_inputCreate(_type, _value, _item)
{
  $('body').addClass('editing');

  var myDefaultValue = _value? 'value="' + _value + '"'      : '';
  var myOldValue     = _value? ' data-value="' + _value + '"': '';
  var myItem         = _type == 'rename'? '<input type="hidden" name="items" value ="' + _item + '" />': '';


  var myElement =
    '<form method="post" action="/$/' + _type + '">' +
      '<input id="item-new-name" type="text" name="fname" placeholder="Untitled Folder" ' + myDefaultValue + myOldValue + ' autocomplete="off" />' +
      myItem +
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
 * check body class status and if needed update it
 */
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


/**
 * Escape function when esc pressed
 */
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
function ex_selectAll()
{
  if($('body').hasClass('editing'))
    return;

  if ($('#explorer>ul').hasClass('select-all'))
  {
    ex_removeClass('selected');
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



// remove input class from all of items
function ex_removeClass(_className)
{
  $('#explorer>ul li').removeClass(_className);

}

// add a class to item
function ex_addClass(_className, _id)
{
  $('#explorer>ul li:eq('+ _id +')').addClass(_className);
  $('#prop-box-ul').html($('#explorer>ul>li.focused .meta').html());
}


function ex_itemFocus(_id)
{
  ex_addClass('focused', _id);
}


function ex_itemSelectedFocusedZero(_id)
{
  ex_addClass('selected focused zero', _id);
}


function ex_items_select_focus_until(_id)
{
  var zero = $('#explorer>ul li.zero').index();

  var start = zero < _id ? zero : _id;
  start = parseInt(start);
  var end   = zero > _id ? zero : _id;
  end = parseInt(end);

  for (var i = start; i <= end; i++)
  {
    $('#explorer>ul li:eq('+ i +')').addClass('selected');
  }
  $('#explorer>ul li:eq('+ _id +')').addClass('focused');
}

function ex_showTrash()
{
  $('body').toggleClass('show-trash');
}
