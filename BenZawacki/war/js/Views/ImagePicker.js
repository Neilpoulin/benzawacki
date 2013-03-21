var ImagePicker = Backbone.View.extend({
	initialize: function(){
		this.model = this.options.model;
		this.options.template != undefined ? this.template = this.options.template : this.template = templates.images.imagePicker;
		this.options.multi != undefined ? this.multi = this.options.multi : this.multi = false;
		this.model.on("add", this.render, this);
		this.selected = [];
	},
	render: function(){
		var $el = this.$el;
		var view = this;
		this.selected = [];
		$el.html(this.template( this.model.toJSON() ));
		$el.find("li").on("click", function(){
			if (!view.multi){
				$el.find("li").not($(this)).removeClass("selected");
			}
			$(this).toggleClass("selected");
			if (view.multi){
				if ( $(this).hasClass("selected") ){
					view.selected.push(view.model.get($(this).attr("data-id")));
				}
			}else{
				if ( $(this).hasClass("selected") ){
					view.selected=(view.model.get($(this).attr("data-id")));
				}
			}
		});
	},
	getSelected: function(){
		return this.selected;
	}
	
});