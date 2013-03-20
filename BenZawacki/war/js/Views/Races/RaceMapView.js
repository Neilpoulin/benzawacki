var RaceMapView = Backbone.View.extend({
	
	initialize: function(){
		this.model.on("add sync", this.add, this);
		this.markers = {};
		var mapOptions = {
	      center: new google.maps.LatLng(36.12498825809234, -95.27296937568484),
	      zoom: 4,
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
	add: function(race){
		var marker = new RaceMarker({
			map: this.map,
			model: race,
			infoWindow: this.infoWindow
		});
		this.markers[race.id] = marker;
	}, 
	open: function(id){
		this.markers[id].open();
	}
});