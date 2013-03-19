var RaceListItem = Backbone.View.extend({
	tageName: "li",
	template: templates.races.raceListItem,
	initialize: function(){
		this.model.on("change", this.render, this);
		this.editDialogId = this.options.editDialogId;
		this.$editDialog = this.options.$editDialog;
	},
	render: function(){
		var model = this.model;
		var view =  this;
		var data = this.model.toJSON();
		data.editDialogId = this.editDialogId;
		this.$el.html( this.template(data) );
		this.$el.find(".editRace").on("click", function(){
			view.$editDialog.model = model;
			view.$editDialog.render();
		});
		
		return this;
	}
});