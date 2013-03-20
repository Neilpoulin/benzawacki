var RaceMapView = Backbone.View.extend({
	
	initialize: function(){
		this.model.on("add", this.addOne, this);
		this.model.on("change", this.updateMarker, this);
		this.markers = {};
		var mapOptions = {
	      center: new google.maps.LatLng(28.01537947985434, -21.6530915852356),
	      zoom: 2,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
		this.map = new google.maps.Map(this.el, mapOptions);
		
		this.infoWindow = new google.maps.InfoWindow();
		
		this.render();
	},
	render: function(){
		var $el = this.$el;
		var view = this;
		var model = this.model;
		
		google.maps.event.addListener(this.map, 'click', function(){
			view.infoWindow.close();
		});
		
		return this;
	},
	addOne: function(race){
		var marker = new RaceMarker({
			map: this.map,
			model: race,
			infoWindow: this.infoWindow
		});
		this.markers[race.id] = marker;
	}, 
	updateMarker: function(race){
		this.markers[race.id].update();
	},
	open: function(id){
		this.markers[id].open();
	}
});