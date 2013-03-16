function initializePhotoGallery(){
	
	$(".photo.slideCaption").each(function(i, obj){
		$obj = $(obj);
		$obj.find(".caption").hide();
	});
	
	$(".photo.slideCaption").hover(function(){
		$(this).find(".caption").show();
	}, function(){
		$(this).find(".caption").hide();
	});
	
	
}