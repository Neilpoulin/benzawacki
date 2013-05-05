$(document).ready(function(){
	window.images = new ImageCollection();
	window.partnerListView = new PartnersList({model: images, el: "#partners"});
	images.fetch({url: images.url("sponsors", ""), update: true});
});