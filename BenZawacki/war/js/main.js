$(document).ready(function(){
	//getArticle();
	window.articles = new ArticleCollection();
	articles.on("add", displayLatest);
	articles.fetch({update: true});
	
	window.carouselImages = new ImageCollection({category: "carousels", value: "main"});
	carouselImages.on("add", renderMainCarousel);
	setTimeout(function(){
		carouselImages.fetch({url: carouselImages.url("carousels", "main"), update: true});
	}, 500);
	var initialized = false;
	
	window.galleryImages = new ImageCollection({category: "galleries", value: "photoPage"});
	galleryImages.on("add", renderPhotosCarousel);
	setTimeout(function(){
		galleryImages.fetch({url: carouselImages.url("galleries", "photoPage"), update:true});
	}, 1000);
	
	var races = new RaceCollection();
	
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

function renderMainCarousel(){
	var data = {};
	data.images = carouselImages.toJSON();
	data.selector = "#carousel .mainCarousel";
	$("#carousel").html( templates.carousels.home( data ) );
	$("#carousel div.item").first().addClass("active");
	$("#carousel .carousel-indicators li").first().addClass("active");
	$("#carousel").find(".mainCarousel").carousel();
}

function renderPhotosCarousel(){
	var data = {}
	data.images = galleryImages.toJSON();
	data.selector = "#photos .mainCarousel";
	$("#photos").html( templates.carousels.home( data ) );
	$("#photos div.item").first().addClass("active");
	$("#photos .carousel-indicators li").first().addClass("active");
	$("#photos").find(".mainCarousel").carousel();
}

function displayLatest(){
	
	$("#article div.article").html(templates.articles.mainSummary(articles.last().toJSON()));
}

function getArticle(){
	$.ajax({
		url: "/articleServlet",
		data: {num: "1", start: "0", direction: "descending" },
		type: "GET",
		dataType: "json",
		success: function(data){
			console.log(data);
			$("#article div.article").html(templates.articles.mainSummary(data.info[0]));

		} //end success function
	});	//end ajax call
}
