$(document).ready(function() {
	// nf = new folder
	var nf = '<li id="create-new-folder" class="selected"><span class="type fa fa-folder"></span> <span class="name"><input type="text" value="Untitled Folder"> <button>ثبت</button></span> <span class="size">-</span> <span class="date">-</span></li>';
	$('#newfolder').click(function() {
		$('#explorer>ul').prepend(nf);
		$('#explorer>ul input').select();
	});
});
