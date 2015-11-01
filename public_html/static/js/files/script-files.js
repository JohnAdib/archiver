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
    });
});
