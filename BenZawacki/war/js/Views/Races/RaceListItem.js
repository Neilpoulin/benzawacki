var RaceListItem = Backbone.View.extend({
	tag: "li",
	tageName: "li",
	className: "raceListItem",
	template: templates.races.raceListItem,
	initialize: function(){
		this.model.on("change", this.render, this);
		this.editDialogId = this.options.editDialogId;
		this.$editDialog = this.options.$editDialog;
		this.$el.addClass(this.className);
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
		
		this.$el.find(".delete").on("click", function(){
			var c = confirm("Are you sure you want to delete Race \"" + model.get("name") + "\"?");
			if (c){
				view.$el.slideUp();
				model.destroy();
			}
		});
		
		return this;
	}
});