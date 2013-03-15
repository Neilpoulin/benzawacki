var ImageGallery = Backbone.View.extend({
	template: templates.images.gallery,
	initialize: function(){
		if (this.options.template != undefined && this.options.template != null){
			this.template = this.options.template;
		}
		if (this.options.model != undefined){
			this.model = this.options.model;
		}
		
		this.model.on("add", this.render, this);
	},
	render: function(){
		var $el = this.$el;
		var data = this.model.toJSON();
		data = this.sort(data, "id", true);
		$el.html( this.template(data) );
	},
	sort: function (array, field, reverse, primer){
		var sort_by = function(field, reverse, primer){
			   var key = function (x) {return primer ? primer(x[field]) : x[field]};

			   return function (a,b) {
			       var A = key(a), B = key(b);
			       return (A < B ? -1 : (A > B ? 1 : 0)) * [1,-1][+!!reverse];                 
			   }
			}
		array.sort(sort_by(field, reverse, primer));
		return array;
	}
});