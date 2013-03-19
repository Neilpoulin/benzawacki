var RaceListView = Backbone.View.extend({
	initialize: function(){
		this.model.on("add", this.add, this);
		this.editDialogId = this.options.editDialogId;
		this.$editDialog = this.options.$editDialog;
	},
	add: function(model){
		var view = new RaceListItem({model: model, editDialogId: this.editDialogId, $editDialog: this.$editDialog, el: "<li>"});
		this.$el.append(view.render().el)
	}

});