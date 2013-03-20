var RaceListView = Backbone.View.extend({
	initialize: function(){
		this.model.on("add", this.add, this);
		this.editDialogId = this.options.editDialogId;
		this.$editDialog = this.options.$editDialog;
		this.options.mapView != undefined ? this.mapView = this.options.mapView : this.mapView = null;
		this.options.editable ? this.editable = true : this.editable = false;
		
	},
	add: function(model){		
		var view = new RaceListItem({
			model: model, 
			editDialogId: this.editDialogId, 
			$editDialog: this.$editDialog, 
			mapView: this.mapView, 
			editable: this.editable
		});
		this.$el.append(view.render().el);
	}
});