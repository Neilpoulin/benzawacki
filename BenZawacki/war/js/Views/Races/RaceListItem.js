var RaceListItem = Backbone.View.extend({
	tag: "li",
	tageName: "li",
	el: "<li>",
	className: "raceListItem",
	template: templates.races.raceListItem,
	initialize: function(){
		this.model.on("change", this.render, this);
		this.options.mapView != undefined ? this.mapView = this.options.mapView : this.mapView = null; 		
		this.mapView != null ? this.showMarker = true : this.showMarker = false;
		this.editable = this.options.editable;
		this.editDialogId = this.options.editDialogId;
		this.$editDialog = this.options.$editDialog;
		this.$el.addClass(this.className);
	},
	render: function(){
		var model = this.model;
		var view =  this;
		var data = this.model.toJSON();
		data.editDialogId = this.editDialogId;
		data.showMarker = this.showMarker;
		data.editable = this.editable;
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
		
		this.$el.find(".showMarker").on("click", function(){
			view.mapView.open($(this).attr("data-id"));
		});
		
		return this;
	}
});