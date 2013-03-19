$(document).ready(function(){
	var data = [];
	$(".data").each(function(index){
		data[index]=$(this).text();		
	});
	var dataString = "[" + data.join(",") + "]";
	localStorage.dataStoreRaces = dataString;
	
	var myOptions = {
	  center: new google.maps.LatLng(36.099625, -80.241094),
	  zoom: 4,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	window.map = new google.maps.Map(document.getElementById("map_canvas"),
	    myOptions);
	
	window.raceMarkers = [];
	window.jsonData = [];
	window.season = "mk2012";
	
	if ("dataStoreRaces" in localStorage){
		jsonData = jQuery.parseJSON(localStorage.dataStoreRaces);	
	}
	
	
	window.infowindow = new google.maps.InfoWindow();
	window.geocodeResults = {};
	google.maps.event.addListener(map, 'click', function(){
		infowindow.close();
	});
	
	$( "#date" ).datepicker({ 
		dateFormat: "yy-mm-dd",
		showButtonPanel: true,
		changeMonth: true,
		closeText: "Cancel",
		changeYear: true,
		yearRange: "-01:c+02"
	});

	
	$("#state, #address, #city").blur(function(){
		if (($("#address").val() != "") && ($("#city").val() != "") && ($("#state").val() != "")){
			getLatLng(function(){
				$("#lat").val(geocodeResults.lat);
				$("#lng").val(geocodeResults.lng);
			});
		}
	});
	
	getServerData();
	
	var race = $( "#race" ),
		address = $("#address"),
		city = $( "#city" ),
		state = $( "#state" ),
		website = $("#website" ),
		lat = $( "#lat" ),
		lng = $( "#lng" ),
		length = $("#length"),
		type = $("#type"),
		date = $("#date"),
		allFields = $( [] ).add( race ).add( address ).add( city ).add( state ).add( website ).add( lat ).add( lng ).add( length ).add( type ).add ( date),
		tips = $( ".validateTips" );
	
	$( "#dialog-form" ).dialog({
		autoOpen: false
	});
	
	$( "#create-race" )
		.button()
		.click(function() {
			$( "#dialog-form" ).dialog({
				autoOpen: false,
				height: 550,
				width: 550,
				modal: true,
				title: "Add a Race",
				open: function(){},
				buttons: {
					"Add Race": function() {
						var mylat = geocodeResults.lat;
						var mylng = geocodeResults.lng;
						lat.val(mylat);
						lng.val(mylng);
						
						var bValid = true;
						allFields.removeClass( "ui-state-error" );

						bValid = bValid && checkLength( race, "race", 3, 30 );
						bValid = bValid && checkLength( city, "city", 2, 80 );
						bValid = bValid && checkLength( address , "address", 2, 100);
						bValid = bValid && checkLength( state, "state", 2, 2 );

						if ( bValid ) {
							var entry = {"name": race.val(), 
									"date": date.val(), 
									"address": address.val(), 
									"city": city.val(), 
									"state": state.val(), 
									"type": type.val(), 
									"length": length.val(), 
									"website": website.val(), 
									"lat": lat.val(), 
									"lng": lng.val()
							};
							jsonData.push(entry);
							clearMarkers();
							postServerData();				
												
							$( this ).dialog( "close" );
						}
					},
					"Cancel": function() {
						$( this ).dialog( "close" );
					}
				},
				close: function() {
					allFields.val( "" ).removeClass( "ui-state-error" );
				}
			});
			
			
			$( "#dialog-form" ).dialog( "open" );
		});	
	$("#toggle-map")
		.button()
		.click(function(){
			var center = map.getCenter();
			$("#map_canvas").slideToggle(500, function(){
				google.maps.event.trigger(map, 'resize');
				map.setCenter(center);
				if ($("#map_canvas").is(":visible")){
					$("#toggle-map").val("Hide Map");
				}
				else $("#toggle-map").val("Show Map");
			});
			google.maps.event.trigger(map, 'resize');
		});
});

function updateTips( t ) {
	tips
		.text( t )
		.addClass( "ui-state-highlight" );
	setTimeout(function() {
		tips.removeClass( "ui-state-highlight", 1500 );
	}, 500 );
}

function checkLength( o, n, min, max ) {
	if ( o.val().length > max || o.val().length < min ) {
		o.addClass( "ui-state-error" );
		updateTips( "Length of " + n + " must be between " +
			min + " and " + max + "." );
		return false;
	} else {
		return true;
	}
}

function checkRegexp( o, regexp, n ) {
	if ( !( regexp.test( o.val() ) ) ) {
		o.addClass( "ui-state-error" );
		updateTips( n );
		return false;
	} else {
		return true;
	}
}



function clearMarkers(){
	for (var i=0; i < raceMarkers.length; i++){
		google.maps.event.clearListeners(raceMarkers[i], 'click');
		raceMarkers[i].setMap(null);
	}
	raceMarkers = [];
}


function addMarker(index){
	var race = jsonData[index];
	var pos = new google.maps.LatLng(race.lat, race.lng);
	var marker = new google.maps.Marker();
	var opts = {
			map: map,
			position: pos,
			title: race.name
	};
	var weblink;
	if (race.website != ""){
		weblink = "<a href=" + race.website + "'>" + race.website + "</a></div>"
	} else{
		weblink  = "";
	}
	var content = "<div class='infowindow'>" 
		+"<h1>" + race.name + "</h1>"
		+"<div class='center'>"
			+ race.type + " | " + race.length + "<br>" 
			+ weblink
		+ "<hr><time datetime='" + race.date + "'>"
		+ race.date + "</time>&emsp;|&emsp;<address>" 
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
				setupTable();	
			}
		}
	});
}
function postServerData(){
	$.ajax({
		url: "/raceJSON", //"/admin/submitRaceData", 
		type: "POST",
		data: 
		{
			raceSeason: season,
			raceJSON: JSON.stringify(jsonData)
		},			
		success: function(data){
			setupTable();
		}
	});
	
}

function setupTable(){
	console.log("setupTable()");
	$("#displayDataTABLE tbody").empty();
	$("#displayDataTABLE thead tr").empty();
	clearMarkers();
	
	sortArray(jsonData,"date",false);				
	
	var headers = GetHeaders(jsonData[0]);
	$(headers).each(function(index, value){
		$("#displayDataTABLE thead tr").append("<th>" + value + "</th>");
	});
	$("#displayDataTABLE thead tr").prepend("<th>" + "Edit" + "</th>").prepend("<th>Delete</th>");

	$.each(jsonData, function(index, race){
		$("#displayDataTABLE tbody").append("<tr></tr>");
		addMarker(index);
		
		$("#displayDataTABLE tbody tr:last").append("<td>"+"<a href='javascript:deleteRace("+index+")'>delete</a>"+"</td>").append("<td>"+"<a href='javascript:editRace("+index+")'>Edit</a>"+"</td>");
		$(headers).each(function(i, value){
			if (value == "raceName"){
				$("#displayDataTABLE tbody tr:last").append("<td><a href='javascript:markerClick("+index+")'>" +race[value.toString()]+ "</td>");
			} 
			else if (value =="raceWebsite"){
				$("#displayDataTABLE tbody tr:last").append("<td><a href='" + race[value.toString()] + "'>" +race[value.toString()]+ "</td>");
			}
			else {
				$("#displayDataTABLE tbody tr:last").append("<td>" +race[value.toString()]+ "</td>");
			}
		});
		
	});
}
var cols = new Array();
function GetHeaders(obj) {
    cols = [];
    var p = obj;
    for (var key in p) {
        //alert(' name=' + key + ' value=' + p[key]);
        cols.push(key);
    }
    console.log("headings = " + cols);
    return cols;
}

function editRace(index){
	var selRace = jsonData[index];
	var race = $( "#race" ),
		address = $("#address"),
		city = $( "#city" ),
		state = $( "#state" ),
		website = $("#website" ),
		lat = $("#lat"),
		lng = $("#lng"),
		length = $("#length"),
		type = $("#type"),
		date = $("#date"),
		allFields = $( [] ).add( race ).add( address ).add( city ).add( state ).add( website ).add( lat ).add( lng ).add( length ).add( type ).add ( date),
		tips = $( ".validateTips" );
	
	$( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 550,
		width: 550,
		modal: false,
		title: "Edit Race",
		open: function(event, ui){
			race.val(selRace.name);
			date.val(selRace.date); 
			address.val(selRace.address);
			city.val(selRace.city);
			state.val(selRace.state);
			type.val(selRace.type);
			length.val(selRace.length);
			website.val(selRace.website); 			
			lat.val(selRace.lat); 
			lng.val(selRace.lng);
		},
		buttons: {
			"Save Changes": function() {
				var mylat = geocodeResults.lat;
				var mylng = geocodeResults.lng;
				lat.val(mylat);
				lng.val(mylng);
				
				var bValid = true;
				allFields.removeClass( "ui-state-error" );

				bValid = bValid && checkLength( race, "race", 3, 30 );
				bValid = bValid && checkLength( city, "city", 2, 80 );
				bValid = bValid && checkLength( address , "address", 2, 100);
				bValid = bValid && checkLength( state, "state", 2, 2 );			
				if ( bValid ) {
					var entry = {"name": race.val(), 
							"date": date.val(), 
							"address": address.val(), 
							"city": city.val(), 
							"state": state.val(), 
							"type": type.val(), 
							"length": length.val(), 
							"website": website.val(), 
							"lat": lat.val(), 
							"lng": lng.val()
					};
					jsonData[index] = entry;
					clearMarkers();
					postServerData();	
					setupTable();					
					$( this ).dialog( "close" );
				}
			},
			"Cancel": function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			
			allFields.val( "" ).removeClass( "ui-state-error" );
			
		}
	});	
	$( "#dialog-form" ).dialog( "open" );
}

function deleteRace(index){
	var yes = confirm("Delete race \"" + jsonData[index].name + "\" in " + jsonData[index].city + ", " + jsonData[index].state + " on " + jsonData[index].date + "? \n This can not be undone.");
	if (yes){
		jsonData.splice(index,1);
		postServerData();
		setupTable();
		
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
function getLatLng(callback){
	geocode($("#address").val(), $("#city").val(), $("#state").val(),callback);
	
}

function geocode(address, city, state, callback){
	var request = address + ", " + city + ", " + state;
	var geocoder = new google.maps.Geocoder();	
	var mylat = 0;
    var mylng = 0;
	geocoder.geocode({address: request}, function(results, status){
		if (status == google.maps.GeocoderStatus.OK) {
	        var latLng = results[0].geometry.location;
	        var mylat = latLng.lat();
	        var mylng = latLng.lng();
	        geocodeResults = {"lat": mylat,"lng": mylng};
	        
	    } 
		else {
	        alert("Geocode was not successful for the following reason: " + status);
	        latLng
		}
		callback();
	});
}

