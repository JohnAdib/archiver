$.ctrl = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null
        if(e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
            callback.apply(this, args);
            return false;
        }
    });        
};

function ex_new_folder()
{
    ex_items_remove_class('selected focused zero');
    var uf = '<li id="create-new-folder" class="selected focused zero"><form method="post"><span class="type fa fa-folder"></span> <span class="name"><input type="text" name="folder" placeholder="Untitled Folder"> <button class="btn-fa-check"><i class="fa fa-check"></i></button><button class="btn-fa-times"><i class="fa fa-times"></i></button></span> <span class="size">-</span> <span class="date">-</span></form></li>';
    if ( $('#explorer>ul li').is('#create-new-folder') ) {
        $('#create-new-folder').stop().fadeTo(100, 0.1).fadeTo(200, 1.0);
    } else {
        $(uf).hide().prependTo('#explorer>ul').fadeIn(300);
        $('body').addClass('new-folder');
    }
    $('#explorer>ul input').select();
}

function ex_new_folder_submit() {
    var newfolder_name = $('#create-new-folder .name input').val();
    
    if ( newfolder_name == '' ) {
        newfolder_name = 'Untitled Folder';
    }

    $('#create-new-folder .name').html(newfolder_name);

    $('body').removeClass('new-folder');

    $('#create-new-folder').removeClass('selected').removeAttr('id');
}

function ex_cancel_new_folder() {
    $('#create-new-folder').hide(300).remove();
}

function ex_escape() {
    if ( $('body').hasClass('cut') ) {
        $('body').removeClass('cut');
        $('#explorer>ul li.selected').removeClass('cutted');
    } else if ( $('body').hasClass('new-folder') ) {
        ex_cancel_new_folder();
    }
}

function ex_select_all()
{
    if ($('#explorer>ul').hasClass('select-all'))  {
        ex_items_remove_class('selected');
    } else {
        $('#explorer>ul li').addClass('selected');
    }

    if ($('#explorer>ul li').is('#create-new-folder')) {
        $('#create-new-folder').fadeOut().remove();
    }

    $('#explorer>ul').toggleClass('select-all');
}

function ex_cut()
{
    if ( $('#explorer>ul').find('li.selected').length != 0 ) {
        // console.log('Do cut');
        $('body').addClass('cut');
        $('#explorer>ul li.selected').addClass('cutted');
    }
}

function ex_remove(trash) {
    if (trash) {
        $('#explorer>ul li.selected').hide(300).remove();
    } else {
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

function ex_rename()
{
    if ($('#explorer>ul li').hasClass('selected'))
    {
        var name = $('#explorer>ul li.selected span.name').text();
        $('#explorer>ul li.selected span.name').html('<input type="text" placeholder=""> <button class="btn-fa-check"><i class="fa fa-check"></i></button><button class="btn-fa-times"><i class="fa fa-times"></i></button>').children('input').val(name).select();
    }
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

    var ctrl   = e.ctrlKey  ? 'ctrl' : '';
    var shift  = e.shiftKey ? 'shift' : '';
    var alt    = e.altKey   ? 'alt' : '';
    var mytxt  = String(_key) + ctrl + alt + shift;
    // console.log(mytxt);

    switch(mytxt)
    {
        case '8':               // Back Space
            console.log('BackSpace');
            e.preventDefault();
            break;

        case '13':              // Enter
            if ( $('#explorer>ul li').is('#create-new-folder') ) {
                ex_new_folder_submit();
            }
            break;

        case '27':              //Escape
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
            ex_remove();
            break;

        case '46shift':         // delete + shift
            ex_remove(true);
            break;


        // ---------------------------------------------------------------------- shortcut
        case '65ctrl':          // a + ctrl
            ex_select_all();
            break;

        case '67ctrl':          // c + ctrl
            ex_copy();
            break;

        case '78ctrl':          // n + ctrl
            ex_new_folder();
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
            break;


        case 'clickctrl':       // click + ctrl
            ex_items_remove_class('focused zero');
            _self.toggleClass('selected focused zero');
            break;


        case 'clickshift':      // click + shift
            ex_items_remove_class('selected focused');
            ex_items_select_focus_until(cid);
            break;


        case 'clickctrlshift':  // click + ctrl + shift
            ex_items_remove_class('focused');
            ex_items_select_focus_until(cid);
            break;


        case 'dblclick':           // Double click
            
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



$(document).ready(function()
{
    $('#explorer>ul li').first().addClass('zero focused');
    $('#explorer>ul').on('dblclick', "li", function(){
        var execName = $('.name', this).text();
        var ilocation = location.pathname;
        ilocation = ilocation.replace(/^\/+/, '');
        Navigate({
            url: ilocation +"/"+ execName
        });
    });
    // call from menu
    $('#more-selectall').click(function() { ex_select_all(); });
    $('#newfolder').click(function() { ex_new_folder(); });
    $('#more-rename').click(function() { ex_rename(); });
    $('#more-move').click(function() { ex_cut(); });
    $('#remove').click(function() { ex_remove(); });

    $("#explorer").on("click", ".btn-fa-times", function() {
        ex_cancel_new_folder();
    });

    $("#explorer").on("click", ".btn-fa-check", function(e) {
        //ex_new_folder_submit();

        var listForm = $(this).parents('form');
        // listForm.attr('method', 'post');
        listForm.ajaxify({
            ajax: {
                data : {copyTo: 'folder2', items:'file1, folder3, files4'}
            }
        });
        e.preventDefault();



    });




    $('#explorer>ul li').click(function(e) { event_corridor(e, e.currentTarget, 'click'); });
    $('#explorer>ul li').dblclick(function(e) { event_corridor(e, e.currentTarget, 'dblclick'); });
    $(document).keydown(function(e) { event_corridor(e, $('#explorer>ul li.focused')[0], e.which ); });
});
