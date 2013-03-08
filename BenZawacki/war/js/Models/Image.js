var Image = Backbone.Model.extend({
	urlRoot: "/api/images"
});

var ImageCollection = Backbone.Collection.extend({
	url: "/api/images",
	model: Image
});