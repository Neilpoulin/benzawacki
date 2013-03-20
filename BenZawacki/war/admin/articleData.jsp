<!DOCTYPE>
<html>
	<head>
		<title>Article Data Admin Page</title>
		<link rel="stylesheet" type="text/css" href="/stylesheets/header.css" />
		<link rel="stylesheet/less" href="/admin/stylesheets/articleData.less" />		
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
	
	<body id="body">
		<jsp:include page="/header.jsp" />
		<div id="thumbsBinDIV">
			<div id="thumbsDIV"></div>
		</div>
		<div class="container">
			<div id="intro">
				<h2>Manage Articles <a id="help-btn" href="#helpModal" class="btn btn-inverse" data-toggle="modal"><i class="icon-info-sign icon-white"></i></a></h2>				
			</div>
			
			<div class="row">
				<div id="editArticle" class="span8"></div>
				<div id="listArticlesDIV" class="span4">
					<h2>Current Articles</h2>
					<ol></ol>
				</div>			
			</div>			
		</div>	
			
		<div id="tagsDIV" class="hidden"><ul></ul></div>
		<!-- <input type="text" id="articleKey" class="article hidden"> -->
		<div id="tempImg" class="prev hidden"><img class = "thumb" src="/data/images/img-placeholder.jpg"></div>
		
		<div id="helpModal" class="modal hide fade" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h3 id="myModalLabel">Help</h3>
			</div>
			<div class="modal-body">
				<p>To create an article, fill out the form below then click
					submit. If you want to include an image in the body of the article,
					follow these steps:</p>
				<ol id="">
					<li>Click the <b><i>Select Images</i></b> button at the bottom
						of the screen
					</li>
					<li>Choose the images from the gallery of uploaded images that
						you may want to include in the article</li>
					<li>Place the image in the article by simply typing the "tag"
						that corresponds to the image you want (i.e. "&lt;img1&gt;").</li>
					<li>To format the size and position of the image, use the
						controls below the article. Place the image before the text you
						want to wrap around the image.</li>
				</ol>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
				<!--   <button class="btn btn-primary">Save changes</button> -->
			</div>
		</div>


	<script src="http://code.jquery.com/jquery-migrate-1.1.1.js"></script>
		<!-- <script type="text/javascript" src="/js/header.js"></script>	 -->	
		<script type="text/javascript" src="/admin/js/articleData.js"></script>
		<script src="https://apis.google.com/js/client.js?onload=getArticles"></script>
	</body>
	
</html>