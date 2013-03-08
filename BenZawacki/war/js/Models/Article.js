var Article = Backbone.Model.extend({
	urlRoot: "/api/articles",
	defaults: {
		content: "",
		displayDate: "",
		summary: "",
		tags: "",
		title: "",
		titleImageKey: "",
	}
});

var ArticleCollection = Backbone.Collection.extend({
	model: Article,
	url: "/api/articles"
})