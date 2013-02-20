<!DOCTYPE>
<html>
	<head>
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<link rel="apple-touch-icon" href="/data/images/logo-114x114.png"/>
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="/stylesheets/main.css"/>
		
		<!-- <link rel="stylesheet" type="text/css" href="/stylesheets/header.css" /> -->
		
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
		
		<title>Home | Testing</title>
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
	
	<body>
		<jsp:include page="/header.jsp" />
		<div id="container">
			<div id="titleDIV" class="">	
				<br>
				<h1>Welcome to benzawacki.com</h1>
			</div>
			
		</div>
		
		<div id="fb-root"></div>
		
		<!-- Facebook -->	
			<!-- <script>
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
			</script> -->
		<!-- Google +1 -->
			<!-- <script type="text/javascript">
			  (function() {
			    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			    po.src = 'https://apis.google.com/js/plusone.js';
			    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
			  })();
			</script>	 -->	
		<!-- Twitter -->
			<!-- <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script> -->
			
	</body>
	
</html>