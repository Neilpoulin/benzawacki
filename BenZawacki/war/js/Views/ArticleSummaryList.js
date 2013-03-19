var ArticleSummaryList = Backbone.View.extend({
	initialize: function(){
		this.model.on("add", this.add, this);
		this.editView = this.options.editView;
	},
	add: function(model){
		var summary = new ArticleSummary({model: model, editView: this.editView});
		summary.add();
		this.$el.append(summary.$el);
	},
	render: function(){
		return this;
	}
});