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
				<h2>Manage Articles <a id="help-btn" href="#helpModal" class="btn" data-toggle="modal"><i class="icon-info-sign"></i></a></h2>				
			</div>
			
			<div class="row">
				<div class="span8">
					<div id="articleBin" class="main">
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
								<input type="text" class="article hidden" id="articleIndex" />
								<input type="text" class="article hidden" id="articleId" />
								<br>
								<textarea id="articleSummary" class="article span6" placeholder = "Article summary goes here (200 characeters max)" maxlength="200"></textarea> <br><br>
							</div>
						</div>
						<textarea id="articleContent" class="article" placeholder="Article content goes here"></textarea>	
						<br>
						
						<input type="text" class="article" id="articleTags" placeholder="tag 1, tag 2, tag 3"/> <br><br>
						<button id="btnAddPic" class="btn"><i class="icon-picture"></i> Select Images</button>
						<a id="insert-link" href="#link-modal" class="btn" data-toggle="modal"><i class="icon-share"></i> Insert Link</a>
						<button id="submitArticle" class="btn pull-right"><i class="icon-ok"></i> Submit Article</button>
						
						<hr/>
						
						<ul id="imageOptions" class="clearfix"></ul>			
						
						<div id="htmlInputs" class="hidden">
							<textarea id="htmlSummary" readonly="readyonly"></textarea>
							<textarea id="htmlContent" readonly="readyonly"></textarea>
							<input type="text" id="htmlTitle" />
							<input type="text" id="htmlLocation" />
						</div>
					</div>
						
					<div class="clearfix content-div">
						<h4>Preview</h4>
						<div id="preview" class="well clearfix"></div>
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
			
		<div id="tagsDIV" class="hidden"><ul></ul></div>
		<input type="text" id="articleKey" class="article hidden">
		<div id="tempImg" class="prev hidden"><img class = "thumb" src="../data/images/img-placeholder.jpg"></div>
		
		<div id="addPicDialog">
			<div class="imgTagsDIV"><ul></ul></div>
		</div>
		
		<div id="link-modal" data-backdrop="static" class="modal hide fade" tabindex="1" role="dialog">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h3>Insert HyperLink</h3>
			</div>
			<div class="modal-body">
				<p>
					Link will be added to the end of the article content.
				</p>
				
				<label>Address</label>
				<input id="link-address" class="span5" type="url" required="required" placeholder="http://www.google.com"/>
				
				<label>Display Text</label>
				<input id="link-text" required="required" type="text" class="span5" placeholder="Google"/>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
				<button class="btn btn-primary" id="link-submit">Done</button>
			</div>
		</div>
		
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