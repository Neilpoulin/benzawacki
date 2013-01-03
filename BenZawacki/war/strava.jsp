<!DOCTYPE>

<html>
	<head>	
		<title>Ben Zawacki | Strava</title>
		<script type="text/javascript" src="js/jquery.js"></script>
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<link rel="apple-touch-icon" href="data/images/logo-114x114.png"/>
		<link rel="stylesheet" type="text/css" href="stylesheets/header.css" />
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="stylesheets/strava.css" />	
		<!-- Facebook -->
			<meta property="fb:app_id" content="309409452466916" />
			<meta property="og:title" content="Ben Zawacki News" />
			<meta property="og:description" content="Keep up with the latest news about Ben" /> 
			<meta property="og:type" content="article" />
			<meta property="og:url" content="http://www.benzawacki.com/social.jsp" />
			<meta property="og:image" content="http://www.benzawacki.com/serve?blobKey=AMIfv96hWAVhYOc5YIsxpcKSBgJQj_HJaX_TlylguktMaN2t6NMq6DLilKefKfhORkI_fGo1F9CJ5Y-x23UZzuZUtG0LG3JKapT3BRPjjWOu5NoQKQgZb0HgqjdogBec2qTvAM3bC09q-gl40T1SzlbKRfMRslQRkg" />
			<meta property="og:site_name" content="Ben Zawacki | Professional Cyclist" />
			<meta property="fb:admins" content="2252303" />	
		<!-- Google +1 -->
			<meta itemprop="name" content="Ben Zawacki | Strava">
			<meta itemprop="description" content="Check out Ben's latest Strava rides">
			<meta itemprop="image" content="http://www.benzawacki.com/serve?blobKey=AMIfv96hWAVhYOc5YIsxpcKSBgJQj_HJaX_TlylguktMaN2t6NMq6DLilKefKfhORkI_fGo1F9CJ5Y-x23UZzuZUtG0LG3JKapT3BRPjjWOu5NoQKQgZb0HgqjdogBec2qTvAM3bC09q-gl40T1SzlbKRfMRslQRkg">
		<!-- Google Analytics -->
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
	<jsp:include page="header.jsp" />

	<body>	
		<h1>Strava</h1>
		<h2>Check out my latest activity on Strava</h2>
		<div id="stravaSocialDIV">
			<div id="socialDIV">
				<div class="container-tweet"><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.benzawacki.com/strava.jsp" data-text="Check out this article from Ben Zawacki\'s website" data-via="BenZawacki" data-size="medium">Tweet</a></div>
				<div class="container-plusone"><div class="g-plusone" data-size="medium" data-href="/strava.jsp"></div></div>
				<div class="fb-like" data-href="/strava.jsp" data-send="true" data-layout="button_count" data-width="150" data-show-faces="false"></div>
			</div>
			<div id="stravaWidgetDIV">
				<iframe height='454' width='300' frameborder='0' allowtransparency='true' scrolling='no' src='http://app.strava.com/athletes/183450/latest-rides/61ac654fd9a9875bf53e36e67880a70e3dedb970'></iframe>
				<iframe height='160' width='300' frameborder='0' allowtransparency='true' scrolling='no' src='http://app.strava.com/athletes/183450/activity-summary/61ac654fd9a9875bf53e36e67880a70e3dedb970'></iframe>
			</div>	
		</div>	
		
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/header.js"></script>
		<script type="text/javascript" src="/js/ui/jquery-ui-1.8.18.custom.min.js"></script>
		<script type="text/javascript" src="js/prefix-free.js"></script>
		<div id="fb-root"></div>
		<!-- Facebook -->	
			<script>
			  window.fbLoaded = false;
			  window.fbAsyncInit = function() {
			    FB.init({
			      appId      : '309409452466916', // App ID
			     // channelUrl : '/fb-channel.html', // Channel File
			      status     : true, // check login status
			      cookie     : true, // enable cookies to allow the server to access the session
			      xfbml      : true  // parse XFBML
			    });
			    // Additional initialization code here
			    fbLoaded = true;
			  };
			  // Load the SDK Asynchronously
			  (function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
				  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=309409452466916";
				  fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			</script>
		
		<!-- Google +1 -->
			<script type="text/javascript">
			  (function() {
			    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			    po.src = 'https://apis.google.com/js/plusone.js';
			    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
			  })();
			</script>		
		<!-- Twitter -->
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	</body>

</html>