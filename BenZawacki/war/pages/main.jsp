<!DOCTYPE>
<html>
<head>
	<link rel="stylesheet/less" href="/css/main.less" />
</head>
<body>
	<jsp:include page="/header.jsp"/>
	
	<div id="carousel" class=""></div>
	
	<div class="container" id="content-boxes">
		<div class="row">
			<div class="span4" id="article" >
				<div class="article clearfix"></div>
				<a href="/home">View All Articles</a>
			</div>			
			<div class="span4" id="twitter">
				<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/BenZawacki" data-widget-id="305941658074226688">Tweets by @BenZawacki</a>				
			</div>
			<div class="span4" id="strava">
				<iframe frameborder='0' allowtransparency='true' scrolling='no' src='http://app.strava.com/athletes/183450/activity-summary/61ac654fd9a9875bf53e36e67880a70e3dedb970'></iframe>
			</div>
		</div>
		<div class="row">
			<div class="span4">
				<h2>Section 1</h2>
			</div>
			<div class="span4">
				<h2>Section 2</h2>
			</div>
			<div class="span4">
				<h2>Section 3</h2>
			</div>		
		</div>	
	</div>	
	
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	<script type="text/javascript" src="/js/waitForImages.js"></script>
	<script type="text/javascript" src="/js/buildArticle.js"></script>	
	<script type="text/javascript" src="/js/main.js"></script>
</body>
</html>