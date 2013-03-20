$(document).ready(function(){
	window.races = new RaceCollection();
	
	window.raceMapView = new RaceMapView({
		model: races,
		el: "#map_canvas"
	});
	
	window.raceListView = new RaceListView({
		model: races,
		el: "#raceList",
		mapView: raceMapView,
		editable: false
	});
	
	setTimeout(function(){
		races.fetch({update: true});
	}, 100);		
});
