var ArticleSummaryList = Backbone.View.extend({
	initialize: function(){
		this.model.on("add", this.add, this);
		this.editView = this.options.editView;
	},
	add: function(model){
		var summary = new ArticleSummary({model: model, editView: this.editView});
//		summary.$el.addClass("hidden");
		summary.add();
		this.$el.prepend(summary.render().$el);
	},
	render: function(){
//		this.$el.empty();
//		this.mode.each(function(model, i){
//			this.$el.prepend(model.$el)
//		});
		return this;
	}
});