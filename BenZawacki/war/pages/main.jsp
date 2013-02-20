<!DOCTYPE>
<html>
<head>
	<!-- <link rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="/lib/bootstrap/css/bootstrap-responsive.min.css" /> -->
	<link rel="stylesheet/less" href="/css/main.less" />
</head>
<body>
<!-- <!-- 	NAVBAR ==================================================
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span>
				</button>
				<a class="brand" href="#">Ben Zawacki</a>
				<div class="nav-collapse collapse">
					<ul class="nav">
						<li class="active"><a href="#">Home</a></li>
						<li><a href="#about">About</a></li>
						<li><a href="#contact">Contact</a></li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li class="divider"></li>
								<li class="nav-header">Nav header</li>
								<li><a href="#">Separated link</a></li>
								<li><a href="#">One more separated link</a></li>
							</ul>
						</li>
					</ul>
				</div>/.nav-collapse
			</div>/ .container
		</div>/.navbar-inner
	</div>/.navbar -->

	<jsp:include page="/header.jsp"/>
	<div class="container">
	    <!-- Carousel  ================================================== -->
	    <div id="mainCarousel" class="carousel slide">
	      <ol class="carousel-indicators">
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