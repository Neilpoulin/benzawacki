<!-- Stylesheets for templates -->
<link rel="stylesheet/less" href="/templates/articles/article.less" />
<link rel="stylesheet/less" href="/templates/articles/listSummary.less" />
<link rel="stylesheet/less" href="/templates/articles/mainSummary.less" />
<link rel="stylesheet/less" href="/templates/articles/selectedImagesButtonSet.less" />

<!-- Include Template Files, makek them hidden -->

<div id="articles_listSummaryTemplate" class="hidden">
	<jsp:include page="articles/listSummary.html" />
</div>	


<div id="articles_selectedImagesButtonSetTemplate" class="hidden">
	<jsp:include page="articles/selectedImagesButtonSet.html"/>
</div>

<div id="articles_mainSummaryTemplate" class="hidden">
	<jsp:include page="articles/mainSummary.html"/>
</div>

<div id="articles_articleTemplate" class="hidden">
	<jsp:include page="articles/article.html"/>
</div>


<!-- Include any libraries templates are dependent on and JS Accessor object -->
<script type="text/javascript" src="/lib/handlebars.js"></script>
<script>
	window.templates = {
		articles: {
			listSummary: Handlebars.compile($("#articles_listSummaryTemplate").html()),
			selectedImagesButtonSet: Handlebars.compile( $("#articles_selectedImagesButtonSetTemplate").html() ),
			mainSummary: Handlebars.compile($("#articles_mainSummaryTemplate").html() ),
			article:  Handlebars.compile($("#articles_articleTemplate").html())
		}
	};
	
	Handlebars.registerHelper('toHtml', function(string) {
		  return new Handlebars.SafeString(string);
		});
</script>