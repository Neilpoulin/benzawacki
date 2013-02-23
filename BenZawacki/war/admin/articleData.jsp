<!DOCTYPE>
<html>
	<head>
		<title>Article Data Admin Page</title>
		<link rel="stylesheet" type="text/css" href="/stylesheets/header.css" />
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
		<div id="thumbsBinDIV">
			<div id="thumbsDIV"></div>
		</div>
		<div class="container" id="intro">
			<p>
				To create an article, fill out the form below then click submit.
				If you want to include an image in the body of the article, follow these steps:
			</p>
			<ol id="imageSteps">
				<li>Click the <b><i>Select Images</i></b> button at the bottom of the screen</li>
				<li>Choose the images from the gallery of uploaded images that you may want to include in the article</li>
				<li>Place the image in the article by simply typing the "tag" that corresponds to the image you want (i.e. "&lt;img1&gt;").</li>
				<li>To format the size and position of the image, use the controls below the article. Place the image before the text you want to wrap around the image. </li>
			</ol>
		
		
		
		<div class="row">
			<div id="articleBin" class="main span8">
				<div class="row">
					<div id="imgSelected" class="main imgSel span2">
						<div id="articleImg" class="article"></div>
						<div class="clear"></div>
						<button id="btnArticleImg" class="article btn"><i class="icon-picture"></i> Title Image</button>
					</div>
					<div id="summaryBin" class="span6">
						<input type="text" class="article span6" id="articleTitle" placeholder="Article Title"/><br>
						<input type="text" class="article span2" id="articlePostDate" placeholder="Date" readonly="readonly"/>
						<input type="text" class="article span4" id="articleLocation" placeholder="location"/>
						<input type="text" class="article" id="articleShortUrl" readonly="readonly" class="hidden"/>
						
						<br>
						<textarea id="articleSummary" class="article span6" placeholder = "Article summary goes here (200 characeters max)" maxlength="200"></textarea> <br><br>
					</div>
				</div>
				<textarea id="articleContent" class="article" placeholder="Article content goes here"></textarea>	
				<br>
				
				<input type="text" class="article" id="articleTags" placeholder="tag 1, tag 2, tag 3"/> <br><br>
				<button id="btnAddPic" class="btn"><i class="icon-picture"></i> Select Images</button>
				<button id="submitArticle" class="btn"><i class="icon-ok"></i> Submit Article</button>
				
				<div  class="imgTagsDIV"><b>Available Image tags</b><ul></ul></div>
				<div id="htmlInputs" class="hidden">
					<textarea id="htmlSummary" readonly="readyonly"></textarea>
					<textarea id="htmlContent" readonly="readyonly"></textarea>
					<input type="text" id="htmlTitle" />
					<input type="text" id="htmlLocation" />
				</div>
			</div>
			
			<div id="listArticlesDIV" class="span3">
				<h2>Current Articles</h2>
				<ol></ol>
			</div>
		</div>
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
		
		<script src="http://code.jquery.com/jquery-migrate-1.1.1.js"></script>
		<script type="text/javascript" src="/js/header.js"></script>		
		<script type="text/javascript" src="/admin/js/articleData.js"></script>
		<script src="https://apis.google.com/js/client.js?onload=getArticles"></script>
	</body>
	
</html>