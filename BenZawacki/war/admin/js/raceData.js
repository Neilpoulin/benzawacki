

$(document).ready(function(){
	window.races = new RaceCollection();
	
	window.raceMapView = new RaceMapView({
		model: races,
		el: "#map_canvas"
	});
	
	window.addRaceDialog = new SubmitDialog({
		template: templates.races.addRaceForm,
		modelType: Race,
		$trigger: $("#addRaceTrigger"),
		dialog: true,
		el: "#raceDialog",
		title: "Add new Race",
		collection: races
	});
	
	window.editRaceDialog = new SubmitDialog({
		template: templates.races.addRaceForm,
		modelType: Race,
		model: races.at(0),
		$trigger: $("#editRaceTrigger"),
		dialog: true,
		el: "#raceDialog",
		title: "Edit Race",
		collection: races
	});
	
	window.raceListView = new RaceListView({
		model: races,
		el: "#raceList",
		editDialogId: "#raceDialog",
		$editDialog: editRaceDialog,
		mapView: raceMapView,
		editable: true
	});
	
	setTimeout(function(){
		races.fetch({update: true});
	}, 100);		
});
