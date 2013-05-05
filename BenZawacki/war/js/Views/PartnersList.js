var PartnersList = Backbone.View.extend({
	template: templates.images.sponsorImage,	
	initialize: function(){
		this.model.on("add", this.addOne, this);
	},
	render: function(){
		return this;
	},
	addOne: function(image){
		this.$el.append(this.template(image.toJSON()));
	}
});