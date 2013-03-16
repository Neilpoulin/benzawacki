<!-- Stylesheets for templates -->
<link rel="stylesheet/less" href="/templates/articles/article.less" />
<link rel="stylesheet/less" href="/templates/articles/listSummary.less" />
<link rel="stylesheet/less" href="/templates/articles/mainSummary.less" />
<link rel="stylesheet/less" href="/templates/articles/selectedImagesButtonSet.less" />
<link rel="stylesheet/less" href="/templates/articles/editArticle.less"/>
<link rel="stylesheet/less" href="/templates/images/preview.less"/>
<link rel="stylesheet/less" href="/templates/images/gallery.less"/>
<link rel="stylesheet/less" href="/templates/carousels/home.less"/>

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
<script type="text/x-handlebars-template" id="images_galleryTemplate" class="hidden">
	<jsp:include page="images/gallery.html"/>
</script>

<script type="text/x-handlebars-template" id="images_previewTemplate" class="hidden">
	<jsp:include page="images/preview.html"></jsp:include>
</script>

<!---------- CAROUSELS ----------->
<script type="text/x-handlebars-template" id="carousels_homeTemplate" class="hidden">
	<jsp:include page="carousels/home.html"></jsp:include>
</script>


<!-- Include any libraries templates are dependent on and JS Accessor object -->
<script type="text/javascript" src="/lib/handlebars.js"></script>
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
			gallery: Handlebars.compile($("#images_galleryTemplate").html()),
			preview: Handlebars.compile($("#images_previewTemplate").html())
		},
		carousels: {
			home: Handlebars.compile($("#carousels_homeTemplate").html())
		}
	};
	
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
</script>