var Race = Backbone.Model.extend({
	urlRoot: "/api/races"
});

var RaceCollection = Backbone.Collection.extend({
	url: "/api/races",
	model: Race
});