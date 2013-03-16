$(document).ready(function(){
	window.imgCollection = new ImageCollection();
	window.galleryView = new ImageGallery({el: "#gallery", model: imgCollection, template: templates.images.photoGallery});
	imgCollection.fetch({url: imgCollection.url("galleries", "photoPage"), update: true});
	
});