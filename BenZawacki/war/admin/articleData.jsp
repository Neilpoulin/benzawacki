<!DOCTYPE>
<html>
	<head>
		<title>Article Data Admin Page</title>
		<script type="text/javascript" src="/js/jquery.js"></script>
		<link rel="stylesheet" type="text/css" href="/stylesheets/header.css" />
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
		<link rel="stylesheet" href="/admin/stylesheets/articleData.css" />		
		<script type="text/javascript"> //Google Analytics
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-31500940-1']);
		  _gaq.push(['_setDomainName', 'benzawacki.com']);
		  _gaq.push(['_setAllowLinker', true]);
		  _gaq.push(['_trackPageview']);
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		</script>
	</head>
	<jsp:include page="../header.jsp" />
	<body id="body">
		<p id="intro">
			To create an article, fill out the form below then click submit.
			If you want to include an image in the body of the article, follow these steps:
		</p>
		<ol id="imageSteps">
			<li>Click the <b><i>Select Images</i></b> button at the bottom of the screen</li>
			<li>Choose the images from the gallery of uploaded images that you may want to include in the article</li>
			<li>Place the image in the article by simply typing the "tag" that corresponds to the image you want (i.e. "&lt;img1&gt;").</li>
			<li>To format the size and position of the image, use the controls below the article. Place the image before the text you want to wrap around the image. </li>
		</ol>
		
		<div id="thumbsBinDIV">
			<div id="thumbsDIV"></div>
		</div>
	
		<div id="articleBin" class="main">
			<div id="imgSelected" class="main imgSel">
				<div id="articleImg" class="article"></div>
				<div class="clear"></div>
				<button id="btnArticleImg" class="article">Title Image</button>
			</div>
			
			<input type="text" class="article" id="articleTitle" placeholder="Article Title"/><br>
			<input type="text" class="article" id="articlePostDate" placeholder="Date" readonly="readonly"/>
			<input type="text" class="article" id="articleLocation" placeholder="location"/>
			<input type="text" class="article" id="articleShortUrl" readonly="readonly" class="hidden"/>
			
			<br>
			<textarea id="articleSummary" class="article" placeholder = "Article summary goes here (200 characeters max)" maxlength="200"></textarea> <br><br>
			<textarea id="articleContent" class="article" placeholder="Article content goes here"></textarea>	
			<br>
			<input type="text" class="article" id="articleTags" placeholder="tag 1, tag 2, tag 3"/> <br><br>
			<button id="btnAddPic">Select Images</button>
			<button id="submitArticle">Submit Article</button>
			
			<div  class="imgTagsDIV"><b>Available Image tags</b><ul></ul></div>
			<div id="htmlInputs" class="hidden">
				<textarea id="htmlSummary" readonly="readyonly"></textarea>
				<textarea id="htmlContent" readonly="readyonly"></textarea>
				<input type="text" id="htmlTitle" />
				<input type="text" id="htmlLocation" />
			</div>
		</div>
		
		<div id="listArticlesDIV">
			<h2>Current Articles</h2>
			<ol></ol>
		</div>
		
		<div id="imgGallery">
			<div id="articleImgSel" class="article main"></div>
		</div>
		
		
		<div id="buttonSet" class="buttonsetDIV hidden">
			<div>	
				<input type="radio" id="radio1" name="size" checked="checked"/><label for="radio1">Small</label>
				<input type="radio" id="radio2" name="size" checked=""/><label for="radio2">Full</label>
			</div>
			<div>
				<input type="radio" id="radio3" name="pos" checked=""/><label for="radio3">Left</label>
				<input type="radio" id="radio4" name="pos" checked="checked"/><label for="radio4">Right</label>
			</div>
		</div>
		
		<div id="tagsDIV" class="hidden"><ul></ul></div>
		<input type="text" id="articleKey" class="article hidden">
		<div id="tempImg" class="prev hidden"><img class = "thumb" src="../data/images/img-placeholder.jpg"></div>
		
		<div id="addPicDialog">
			<div  class="imgTagsDIV"><ul></ul></div>
		</div>
			
		<script type="text/javascript" src="/js/jquery.js"></script>
		<script type="text/javascript" src="/js/header.js"></script>		
		<script type="text/javascript" src="/admin/js/articleData.js"></script>
		<script type="text/javascript" src="/js/ui/jquery-ui-1.8.18.custom.min.js"></script>
		<script src="https://apis.google.com/js/client.js?onload=getArticles"></script>
	</body>
	
</html>