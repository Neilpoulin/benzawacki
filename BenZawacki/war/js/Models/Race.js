var Race = Backbone.Model.extend({
	urlRoot: "/api/races",
	initialize: function(){
		this.on("sync", this.geocode, this);
	},
	validate: function(attrs, options){
		var valid = true;
		var message = "";
		var invalidKeys = [];
		var d = new Date(attrs.date);
		if (d.getTime() == "NaN" ){
			message = "'" + attrs.date + "' is an invalid Date."
		}
		for (var key in attrs){
			if ((attrs[key] == undefined || attrs[key] == null || attrs[key] == "") && ( key=="country" || key=="date" || key=="name" || key=="city") ){
				invalidKeys.push(key);
			}
		}
		if (invalidKeys.length > 0){
			message = "The following fields are required: <strong>" + invalidKeys.join(", ") + "</strong>. Please enter a value and try again.";
			return message;
		}
	},
	geocode: function(){
		var model = this;
		var street = model.get("street"), city = model.get("city"), state = model.get("state"), country = model.get("country");
		if (model.hasChanged && city != undefined && country != undefined){
			var request = country;
			if (state != undefined){
				request = state + ", " + request;
			}
			request = city + ", " + request;
			if (street != undefined){
				request = street + ", " + request;
			}
			var geocoder = new google.maps.Geocoder();	
			var mylat = 0;
		    var mylng = 0;
		    		    
	    	var callback = function(results, status){
				if (status == google.maps.GeocoderStatus.OK) {
			        var latLng = results[0].geometry.location;
			        var mylat = latLng.lat();
			        var mylng = latLng.lng();
			        model.set("lat", mylat);
			        model.set("lng", mylng);
			        model.save(model.toJSON());
			    }else{
			    	console.log(status);
			    }
	    	}
	    	
			geocoder.geocode({address: request}, callback);
		}
	}
});

var RaceCollection = Backbone.Collection.extend({
	url: "/api/races",
	model: Race
});