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
		
	}
});