<!-- Stylesheets for templates -->
<link rel="stylesheet/less" href="/templates/articles/article.less" />
<link rel="stylesheet/less" href="/templates/articles/listSummary.less" />
<link rel="stylesheet/less" href="/templates/articles/mainSummary.less" />
<link rel="stylesheet/less" href="/templates/articles/selectedImagesButtonSet.less" />
<link rel="stylesheet/less" href="/templates/articles/editArticle.less"/>
<link rel="stylesheet/less" href="/templates/images/preview.less"/>
<link rel="stylesheet/less" href="/templates/images/adminGallery.less"/>
<link rel="stylesheet/less" href="/templates/images/photoGallery.less"/>
<link rel="stylesheet/less" href="/templates/carousels/home.less"/>
<link rel="stylesheet/less" href="/templates/races/raceListItem.less"/>

<!-- Include Template Files, make them hidden -->

<!---------- ARTICLES ----------->
<script type="text/x-handlebars-template" id="articles_listSummaryTemplate" class="hidden">
	<jsp:include page="articles/listSummary.html" />
</script>	

<script type="text/x-handlebars-template" id="articles_selectedImagesButtonSetTemplate" class="hidden">
	<jsp:include page="articles/selectedImagesButtonSet.html"/>
</script>

<script type="text/x-handlebars-template" id="articles_mainSummaryTemplate" class="hidden">
	<jsp:include page="articles/mainSummary.html"/>
</script>

<script type="text/x-handlebars-template" id="articles_articleTemplate" class="hidden">
	<jsp:include page="articles/article.html"/>
</script>

<script type="text/x-handlebars-template" id="articles_editArticleTemplate" class="hidden">
	<jsp:include page="articles/editArticle.html"/>
</script>

<!---------- IMAGES ----------->
<script type="text/x-handlebars-template" id="images_adminGalleryTemplate" class="hidden">
	<jsp:include page="images/adminGallery.html"/>
</script>

<script type="text/x-handlebars-template" id="images_previewTemplate" class="hidden">
	<jsp:include page="images/preview.html"></jsp:include>
</script>
 
<script type="text/x-handlebars-template" id="images_photoGalleryTemplate" class="hidden">
	<jsp:include page="images/photoGallery.html"/>
</script>


<!---------- CAROUSELS ----------->
<script type="text/x-handlebars-template" id="carousels_homeTemplate" class="hidden">
	<jsp:include page="carousels/home.html"></jsp:include>
</script>

<!---------- RACES ----------->
<script type="text/x-handlebars-template" id="races_addRaceFormTemplate" class="hidden">
	<jsp:include page="races/addRaceForm.html"></jsp:include>
</script>

<script type="text/x-handlebars-template" id="races_mapMarkerTemplate" class="hidden">
	<jsp:include page="races/mapMarker.html"></jsp:include>
</script>

<script type="text/x-handlebars-template" id="races_raceListItemTemplate" class="hidden">
	<jsp:include page="races/raceListItem.html"></jsp:include>
</script>

<!-- Include any libraries templates are dependent on and JS Accessor object -->
<script type="text/javascript" src="/lib/handlebars.js"></script>
<script type="text/javascript" src="/templates/images/photoGallery.js"></script>
<script>
	window.templates = {
		articles: {
			listSummary: Handlebars.compile($("#articles_listSummaryTemplate").html()),
			selectedImagesButtonSet: Handlebars.compile( $("#articles_selectedImagesButtonSetTemplate").html() ),
			mainSummary: Handlebars.compile($("#articles_mainSummaryTemplate").html() ),
			article:  Handlebars.compile($("#articles_articleTemplate").html()),
			editArticle: Handlebars.compile($("#articles_editArticleTemplate").html())
		},
		images: {
			adminGallery: Handlebars.compile($("#images_adminGalleryTemplate").html()),
			preview: Handlebars.compile($("#images_previewTemplate").html()),
			photoGallery: Handlebars.compile($("#images_photoGalleryTemplate").html()),
		},
		carousels: {
			home: Handlebars.compile($("#carousels_homeTemplate").html())
		},
		races: {
			addRaceForm: Handlebars.compile($("#races_addRaceFormTemplate").html()),
			mapMarker: Handlebars.compile($("#races_mapMarkerTemplate").html()),
			raceListItem: Handlebars.compile($("#races_raceListItemTemplate").html())
		}
	};
	window.googleAPIkey = "AIzaSyCcXfh_zwxQ-jGFLum6DI2SrtPvP8XmSug";
	
	
	Handlebars.registerHelper('toHtml', function(string) {
		  return new Handlebars.SafeString(string);
	});
	
	Handlebars.registerHelper('boolean', function(value){
		var out = "";
		if (value != "false" && value != "" && value != null){
			out = value;
		}
		return value;
	}); 
	
	Handlebars.registerHelper('encodeUri', function(string){
		return encodeURIComponent(string);
	});
</script>

