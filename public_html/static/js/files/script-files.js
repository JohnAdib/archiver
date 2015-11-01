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
    var uf = '<li id="create-new-folder" class="selected"><span class="type fa fa-folder"></span> <span class="name"><input type="text" placeholder="Untitled Folder"> <button class="btn-fa-check"><i class="fa fa-check"></i></button><button class="btn-fa-times"><i class="fa fa-times"></i></button></span> <span class="size">-</span> <span class="date">-</span></li>';
    if($('#explorer>ul li').is('#create-new-folder')) {
        $('#create-new-folder').fadeTo(100, 0.1).fadeTo(200, 1.0);
    } else {
        $(uf).hide().prependTo('#explorer>ul').fadeIn(300);
    }
    $('#explorer>ul input').select();
}

function ex_select_all()
{
    if ($('#explorer>ul').hasClass('select-all'))  {
        $('#explorer>ul li').removeClass('selected');
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
    $('#explorer>ul li.selected').addClass('cutted');
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



function event_corridor(_ctrl, _shift, _self, _key)
{
    _self = $(_self);
    var cid    = parseInt(_self.attr('data-row'));
    var lastid = parseInt($('#explorer>ul li:last').attr('data-row'));

    var ctrl   = _ctrl  ? 'ctrl' : '';
    var shift  = _shift ? 'shift' : '';
    var mytxt  = String(_key) + ctrl + shift;

    // console.log(_key);
    // console.log(mytxt);

    switch(mytxt)
    {
        case '32':              // space
        case '32shift':         // space + shift
            $('#explorer>ul li').eq(cid).addClass('selected');
        break;

        case '32ctrl':          // space + ctrl
        case '32ctrlshift':     // space + ctrl + shift
            $('#explorer>ul li').eq(cid).toggleClass('selected');
        break;
        

        case '37':              // left
            console.log('left');
        break;


        case '38':              // up
            next = cid > 0 ? cid - 1 : 0;
            $('#explorer>ul li').removeClass('focused selected');
            $('#explorer>ul li').eq(next).addClass('focused selected');
        break;


        case '39':              // right
            console.log('right');
        break;


        case '40':              // down
            next = cid>= lastid ? lastid : cid + 1;
            $('#explorer>ul li').removeClass('focused selected');
            $('#explorer>ul li').eq(next).addClass('focused selected');
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

        case '88ctrl':          // x + ctrl
            ex_cut();
        break;


        case '113':             // f2
            ex_rename();
        break;



        // ---------------------------------------------------------------------- mouse
        case 'clickctrl':       // click + ctrl
            _self.toggleClass('selected');
        break;


        case 'clickctrlshift':  // click + ctrl + shift
            console.log('click ctrl shift');
        break;


        case 'clickshift':      // click + shift
            console.log('click shift');
        break;

        case 'click':           // click
            $('#explorer>ul li').removeClass('selected');
            _self.addClass('selected');
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
    // call from menu
    $('#more-selectall').click(function() { ex_select_all(); });
    $('#newfolder').click(function() { ex_new_folder(); });
    $('#more-rename').click(function() { ex_rename(); });
    $('#more-move').click(function() { ex_cut(); });


    $('#explorer>ul li').click(function(e) { event_corridor(e.ctrlKey, e.shiftKey, e.currentTarget, 'click'); });
    $(document).keydown(function(e) { event_corridor(e.ctrlKey, e.shiftKey, $('#explorer>ul li.focused')[0], e.which ); });
});
