var RaceMarker = Backbone.View.extend({
	template: templates.races.raceMarker,
	tagName: "div",
	el: "<div>",
	className: "raceMarker",
	initialize: function(){		
		var view = this;	
		this.map = this.options.map;
		this.marker = new google.maps.Marker({
			map: this.map,
			position: new google.maps.LatLng(this.model.get("lat"), this.model.get("lng")),
			title: this.model.get("name")
		});
		
		this.infoWindow = this.options.infoWindow;
		
		google.maps.event.addListener(this.marker, 'click', function(){
			view.open();
		});
	},
	render: function(){
		var view = this;
		var model = this.model;
		var $el = this.$el;
		
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	},
	getMarker: function(){
		return this.marker;
	},
	open: function(){
		if (this.infoWindow){
			this.infoWindow.close();
		}
		this.infoWindow.setContent(this.render().$el.html());
		this.infoWindow.open(this.map, this.marker);
	},
	update: function(){
		this.marker.setPosition(new google.maps.LatLng(this.model.get("lat"), this.model.get("lng")));
	}
});