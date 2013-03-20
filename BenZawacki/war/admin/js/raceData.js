

$(document).ready(function(){
	window.races = new RaceCollection();
	
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
		$editDialog: editRaceDialog
	});
	
	setTimeout(function(){
		races.fetch({update: true});
	}, 100);
	
	setTimeout(function(){
		initializeMap();
	},100);
	
});



function initializeMap(){
	var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	window.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	window.infowindow = new google.maps.InfoWindow();
	google.maps.event.addListener(map, 'click', function(){
		infowindow.close();
	});
}
