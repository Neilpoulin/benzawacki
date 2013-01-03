$(document).ready(function(){
	window.season = "mk2012";
	getServerData();
	
	var myOptions = {
	  center: new google.maps.LatLng(36.099625, -80.241094),
	  zoom: 4,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	window.map = new google.maps.Map(document.getElementById("map_canvas"),
	    myOptions);
	
	window.raceMarkers = [];
	window.jsonData = [];
	
	if ("dataStoreRaces" in localStorage){
		jsonData = JSON.parse(localStorage.dataStoreRaces);	
	}
	sortArray(jsonData,"date",false);
	
	window.infowindow = new google.maps.InfoWindow();
	window.geocodeResults = {};
	google.maps.event.addListener(map, 'click', function(){
		infowindow.close();
	});
	window.center = "";
	google.maps.event.addListener(map, 'idle', function(){
		center = map.getCenter();
	});

	$(window).resize(function(){
		map.setCenter(center);
	});
	$("#toggle-map")
		.button()
		.click(function(){
			$("#map_canvas").slideToggle(500, function(){
				//map.setCenter(center);
				google.maps.event.trigger(map, 'resize');
				if ($("#map_canvas").is(":visible")){
					$("#toggle-map").val("Hide Map");
				}
				else $("#toggle-map").val("Show Map");
				
			});
		});
});

function getServerData(){
	$.ajax({
		url: "/raceJSON",//"/admin/submitRaceData",
		type: "GET",
		data: {raceSeason: season},
		success: function(result){			
			resultJSON = JSON.parse(result);
			if (resultJSON.fail != undefined ){
				var fail = JSON.parse(result);
				alert(fail.fail);
			}else {
				jsonData = resultJSON;
				localStorage.dataStoreRaces = result;
				setupTable();	
			}
		}
	});
}


function clearMarkers(){
	for (var i=0; i < raceMarkers.length; i++){
		google.maps.event.clearListeners(raceMarkers[i], 'click');
	}
	raceMarkers = [];
}


function addMarker(index){
	var race = jsonData[index];
	var pos = new google.maps.LatLng(jsonData[index].lat, jsonData[index].lng);
	var marker = new google.maps.Marker();
	var opts = {
			map: map,
			position: pos,
			title: jsonData[index].name
	};
	var content = "<div class='infowindow'>" 
		+"<h1>" + race.name + "</h1>"
		+"<div class='center'>"
			+ race.type + " | " + race.length + "<br>" 
			+ "<a href='http://" + race.website + "'>" + race.website + "</a></div>"
		+"<hr><time datetime='"+race.date+"'>"
		+race.date + "</time>&emsp;|&emsp;<address>" 
		+ race.address + ", " + race.city + ", " + race.state + "</address><br></div>";
	
	marker.setOptions(opts);
	raceMarkers.push(marker);
	
	google.maps.event.addListener(marker, 'click', function()
			{
				if (infowindow){
					infowindow.close();
				}
				infowindow.setContent(content);
				infowindow.open(map, marker);
			}
		);
	
}

function markerClick(index){
	var marker = raceMarkers[index];
	google.maps.event.trigger(marker, 'click');
	
}

function setupTable(){
	$("#users tbody").html("");
	var race;
	for (var i=0; i<jsonData.length; i++){
		race = jsonData[i];
		$( "#users tbody" ).append( "<tr>" +
				"<td>" + race.date + "</td>" +
				"<td><a href='javascript:markerClick("+i+")'>" + race.name + "</a></td>" + 
				"<td>" + race.city + "</td>" + 
				"<td>" + race.state + "</td>" +
				"<td>" + race.type + "</td>" +
				"<td>" + race.length + "</td>" +
			"</tr>" );
		addMarker(i);
	}			
}

function sortArray(array, field, reverse, primer){
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

