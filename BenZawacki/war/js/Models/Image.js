var Image = Backbone.Model.extend({
	urlRoot: "/api/images"
});

var ImageCollection = Backbone.Collection.extend({
	url: function(category, value){
		var url = "/api/images";
		if (category != undefined && value != undefined){
			url = "/api/images/" + category + "/" + value;
		}
		return url;
	},	
	model: Image
});