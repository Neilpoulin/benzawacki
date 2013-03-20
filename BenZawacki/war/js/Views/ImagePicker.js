var ImagePicker = Backbone.View.extend({
	initialize: function(){
		this.model = this.options.model;
		this.options.template != undefined ? this.template = this.options.template : this.template = templates.images.imagePicker;
		this.options.multi != undefined ? this.multi = this.options.multi : this.multi = false;
		this.model.on("add", this.render, this);
	},
	render: function(){
		var $el = this.$el;
		var view = this;
		$el.html(this.template( this.model.toJSON() ));
		$el.find("li").on("click", function(){
			if (!view.multi){
				$el.find("li").not($(this)).removeClass("selected");
			}
			$(this).toggleClass("selected");
		});
	},
	getSelected: function(){
		var selected = [];
		var view = this;
		this.$el.find("li.selected").each(function(){
			var id = $(this).attr("data-id")
			selected.push(view.model.get(id));
		});
		return selected;
	}
	
});