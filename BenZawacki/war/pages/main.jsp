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
	              <h1>Example headline.</h1>
	              <p class="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
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

		<h3>Content below carousel</h3>

	</div><!-- /.container -->

	<!-- <script type="text/javascript" src="/lib/jquery.js"></script>
	<script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script> -->
	<script type="text/javascript" src="/lib/less.js"></script>
</body>
</html>