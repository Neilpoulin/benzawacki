var ArticleSummary = Backbone.View.extend({
	template: templates.articles.listSummary,
	tag: "ol",
	initialize: function(){
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.remove);
		this.editView = this.options.editView;
	},
	render: function(){
		this.$el.html( this.template(this.model.toJSON()) );
		var article = this.model;
		var view = this;
		var view = this;
		this.$el.find(".btn.delete").on("click", function(){
			var r = confirm("Are you sure you want to delete article: " + article.get("title") + "?");
			if (r){
				article.destroy();
			}			
		});
		this.$el.find(".btn.edit").on("click", function(){
			$btn = $(this);			
			view.editView.edit(article);
		});
		
		return this;
	},
	remove: function(){
		this.$el.slideUp();
	},
	add: function(){
		this.$el.hide();
		this.render();
		this.$el.slideDown();
	}
});