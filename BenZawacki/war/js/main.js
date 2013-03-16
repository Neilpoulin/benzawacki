$(document).ready(function(){
	//getArticle();
	window.articles = new ArticleCollection();
	articles.on("add", displayLatest);
	articles.fetch({update: true});
	
	window.carouselImages = new ImageCollection({category: "carousels", value: "main"});
	carouselImages.on("add", renderCarousel);
	carouselImages.fetch({url: carouselImages.url("carousels", "main"), update: true});
	var initialized = false;
});

function renderCarousel(){
	$("#carousel").html( templates.carousels.home( carouselImages.toJSON() ) );
	$("#carousel div.item").first().addClass("active");
	$("#carousel .carousel-indicators li").first().addClass("active");
	$("#mainCarousel").carousel();

}

function displayLatest(){
	$("#article div.article").html(templates.articles.mainSummary(articles.toJSON()[0]));
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
