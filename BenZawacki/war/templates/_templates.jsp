<!-- Stylesheets for templates -->
<link rel="stylesheet/less" href="/templates/articles/article.less" />
<link rel="stylesheet/less" href="/templates/articles/listSummary.less" />
<link rel="stylesheet/less" href="/templates/articles/mainSummary.less" />
<link rel="stylesheet/less" href="/templates/articles/selectedImagesButtonSet.less" />
<link rel="stylesheet/less" href="/templates/articles/editArticle.less"/>
<link rel="stylesheet/less" href="/templates/images/preview.less"/>
<link rel="stylesheet/less" href="/templates/images/adminGallery.less"/>
<link rel="stylesheet/less" href="/templates/images/photoGallery.less"/>
<link rel="stylesheet/less" href="/templates/images/imagePicker.less"/>
<link rel="stylesheet/less" href="/templates/carousels/home.less"/>
<link rel="stylesheet/less" href="/templates/races/addRaceForm.less"/>
<link rel="stylesheet/less" href="/templates/races/raceListItem.less"/>
<link rel="stylesheet/less" href="/templates/races/raceMarker.less"/>

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

<script type="text/x-handlebars-template" id="articles_contentImageTemplate" class="hidden">
	<jsp:include page="articles/contentImage.html"/>
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

<script type="text/x-handlebars-template" id="images_imagePickerTemplate" class="hidden">
	<jsp:include page="images/imagePicker.html"/>
</script>

<script type="text/x-handlebars-template" id="images_sponsorImageTemplate" class="hidden">
	<jsp:include page="images/sponsorImage.html"/>
</script>

<!---------- CAROUSELS ----------->
<script type="text/x-handlebars-template" id="carousels_homeTemplate" class="hidden">
	<jsp:include page="carousels/home.html"></jsp:include>
</script>

<!---------- RACES ----------->
<script type="text/x-handlebars-template" id="races_addRaceFormTemplate" class="hidden">
	<jsp:include page="races/addRaceForm.html"></jsp:include>
</script>

<script type="text/x-handlebars-template" id="races_raceMarkerTemplate" class="hidden">
	<jsp:include page="races/raceMarker.html"></jsp:include>
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
			editArticle: Handlebars.compile($("#articles_editArticleTemplate").html()),
			contentImage: Handlebars.compile($("#articles_contentImageTemplate").html())
		},
		images: {
			adminGallery: Handlebars.compile($("#images_adminGalleryTemplate").html()),
			preview: Handlebars.compile($("#images_previewTemplate").html()),
			photoGallery: Handlebars.compile($("#images_photoGalleryTemplate").html()),
			imagePicker: Handlebars.compile($("#images_imagePickerTemplate").html()),
			sponsorImage: Handlebars.compile($("#images_sponsorImageTemplate").html()),
		},
		carousels: {
			home: Handlebars.compile($("#carousels_homeTemplate").html())
		},
		races: {
			addRaceForm: Handlebars.compile($("#races_addRaceFormTemplate").html()),
			raceMarker: Handlebars.compile($("#races_raceMarkerTemplate").html()),
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
	
	Handlebars.registerHelper("linkify", function(inputText){		
		    var replacedText, replacePattern1, replacePattern2, replacePattern3;
			debugger;
		    //URLs starting with http://, https://, or ftp://
		    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		    replacedText = inputText.replace(replacePattern1, '$1');

		    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		    replacedText = replacedText.replace(replacePattern2,  'http://$2');

		    //Change email addresses to mailto:: links.
		    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
		    replacedText = replacedText.replace(replacePattern3, 'mailto:$1');

		    return replacedText;		
	});
	
</script>

