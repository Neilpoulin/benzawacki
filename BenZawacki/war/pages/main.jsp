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
			<div class="span8">
				<div class="row">
					<div class="span8 short" id="article" >
						<div id="latest">latest article <a id="viewAllLink" href="/home">View All Articles</a></div>
						<hr/>
						<div class="article clearfix"></div>
						
					</div>											
				</div>
				<div class="row">
					<div class="span4 short" id="photos"></div>
					<div class="span4 short" id="strava">
						<iframe frameborder='0' allowtransparency='true' scrolling='no' src='http://app.strava.com/athletes/183450/activity-summary/61ac654fd9a9875bf53e36e67880a70e3dedb970'></iframe>
					</div>
				</div>
			</div>
			<div class="span4">
				<div class="tall" id="twitter">
					<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/BenZawacki" data-widget-id="305941658074226688">Tweets by @BenZawacki</a>				
				</div>
			</div>	
		</div>
		<div class="row" id="map">
			<div class="short span12">
				<div id="map_canvas" class="span8"><h3>MAP HERE</h3></div>
				<div id="raceList" class="span4"><H3>RACES LIST HERE</H3></div>
			</div>
			
		</div>
		
	</div>	
	
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	<script type="text/javascript" src="/js/waitForImages.js"></script>
	<script type="text/javascript" src="/js/buildArticle.js"></script>	
	<script type="text/javascript" src="/js/main.js"></script>
</body>
</html>