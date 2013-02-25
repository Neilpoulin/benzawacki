<!DOCTYPE>
<html>
<head>
	<!-- <link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap-responsive.min.css" /> -->
	<link rel="stylesheet/less" href="/css/main.less" />
</head>
<body>
	<jsp:include page="/header.jsp"/>
	<div class="container">
	    <!-- Carousel  ================================================== -->
	    <div id="mainCarousel" class="carousel slide">
	      <ol class="carousel-indicators bottom">
	      	<li data-target="#mainCarousel" data-slide-to="0" class="active"></li>
	      	<li data-target="#mainCarousel" data-slide-to="1"></li>
	      	<li data-target="#mainCarousel" data-slide-to="2"></li>
	      	<li data-target="#mainCarousel" data-slide-to="3"></li>
	      </ol>
	      <div class="carousel-inner">
	        <div class="item active">
	          <img src="/data/carousel/headshot700.jpg" alt="headshot">
	          <div class="container">
	            <div class="carousel-caption">
	              <h1>Welcome</h1>
	              <p class="lead">to BenZawacki.com </p>
	              <a class="btn btn-large btn-primary" href="#">Sign up today</a>
	            </div>
	          </div>
	        </div>
	        <div class="item">
	          <img src="/data/carousel/DelRayBeach.jpg" alt="">
	          <div class="container">
	            <div class="carousel-caption">
	              <h1>Another example headline.</h1>
	              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
	              <a class="btn btn-large btn-primary" href="#">Learn more</a>
	            </div>
	          </div>
	        </div>
	        <div class="item">
	          <img src="/data/carousel/Charlotte.jpg" alt="">
	          <div class="container">
	            <div class="carousel-caption">
	              <h1>One more for good measure.</h1>
	              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
	              <a class="btn btn-large btn-primary" href="#">Browse gallery</a>
	            </div>
	          </div>
	        </div>
	        <div class="item">
	          <img src="/data/carousel/Podium.jpg" alt="">
	          <div class="container">
	            <div class="carousel-caption">
	              <h1>One more for good measure.</h1>
	              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
	              <a class="btn btn-large btn-primary" href="#">Browse gallery</a>
	            </div>
	       	  </div>
			</div>
		</div>	            
    	<a class="left carousel-control" href="#mainCarousel" data-slide="prev">&lsaquo;</a>
    	<a class="right carousel-control" href="#mainCarousel" data-slide="next">&rsaquo;</a>
    </div><!-- /.carousel -->	
	</div><!-- /.container -->
	
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
				<!-- <h2>Strava</h2> -->
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
			</div>		</div>	
	</div>	
	
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	<script type="text/javascript" src="/js/waitForImages.js"></script>
	<script type="text/javascript" src="/js/buildArticle.js"></script>	
	<script type="text/javascript" src="/js/main.js"></script>
</body>
</html>