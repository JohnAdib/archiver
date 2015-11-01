$.ctrl = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null
        if(e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
            callback.apply(this, args);
            return false;
        }
    });        
};

$(document).ready(function() {
	// untitled folder
	var uf = '<li id="create-new-folder" class="selected"><span class="type fa fa-folder"></span> <span class="name"><input type="text" placeholder="Untitled Folder"> <button class="btn-fa-check"><i class="fa fa-check"></i></button><button class="btn-fa-times"><i class="fa fa-times"></i></button></span> <span class="size">-</span> <span class="date">-</span></li>';
	
	// create an untitled folder
	$('#newfolder').click(function() {
		if($('#explorer>ul li').is('#create-new-folder')) {
			$('#create-new-folder').fadeTo(100, 0.1).fadeTo(200, 1.0);
		} else {
			$(uf).hide().prependTo('#explorer>ul').fadeIn(300);
		}
		$('#explorer>ul input').select();
	});

	$('#explorer>ul li').click(function(e) {
		if (e.ctrlKey && e.shiftKey) {
			console.log(1);
		} else if (e.ctrlKey) {
			$(this).toggleClass('selected');
			console.log('ctrl');
		} else if(e.shiftKey) {
			console.log(3)
		} else {
			console.log(4);
			$('#explorer>ul li').removeClass('selected');
			$(this).addClass('selected');
		}
		$('#explorer>ul').removeClass('select-all');
	});

	$(document).keydown(function(e) {
		console.log(e);
        if (e.ctrlKey && e.keyCode == 65) {
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

		var last    = parseInt($('#explorer>ul li:last').attr('data-row'));
		var current = parseInt($('#explorer>ul li.focused').attr('data-row'));

        switch(e.which) {
        	case 17: // ctrl

        	break;

        	case 32: // space
        		if (e.ctrlKey) {
        			$('#explorer>ul li').eq(current).toggleClass('selected');
        		} else {
        			$('#explorer>ul li').eq(current).addClass('selected');
        		}
        	break;
            
            case 37: // left
            	console.log('left');
            break;

            case 38: // up
            	next = (current) > 0 ? current - 1 : 0;
            	$('#explorer>ul li').removeClass('focused selected');
            	$('#explorer>ul li').eq(next).addClass('focused selected');
            break;

            case 39: // right
            	console.log('right');
            break;

            case 40: // down
            	next = (current + 1) > last ? last : current + 1;
            	$('#explorer>ul li').removeClass('focused selected');
            	$('#explorer>ul li').eq(next).addClass('focused selected');
            break;

            default:
            // console.log(e.which);
             return; // exit this handler for other keys
        }
    });
});
