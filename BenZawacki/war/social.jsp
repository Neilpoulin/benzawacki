<!DOCTYPE>
<html itemscope itemtype="http://schema.org/Article">
	<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
		<title>Ben Zawacki | News</title>
		<meta name="apple-mobile-web-app-capable" content="yes" />
		
		<link rel="apple-toucch-icon" href="data/images/logo-114x114.png"/>
		<link rel="stylesheet" type="text/css" href="stylesheets/header.css" />
		<link rel="stylesheet" type="text/css" href="stylesheets/social.css" />
		<link rel="stylesheet" type="text/css" href="stylesheets/buildArticle.css" />
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
		<script type="text/javascript" src="js/prefix-free.js"></script>	
				
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
			<link rel="canonical" href="http://www.benzawacki.com" />
			<meta itemprop="name" content="Ben Zawacki News">
			<meta itemprop="description" content="Keep up with the latest news about Ben">
			<meta itemprop="image" content="http://www.benzawacki.com/serve?blobKey=AMIfv96hWAVhYOc5YIsxpcKSBgJQj_HJaX_TlylguktMaN2t6NMq6DLilKefKfhORkI_fGo1F9CJ5Y-x23UZzuZUtG0LG3JKapT3BRPjjWOu5NoQKQgZb0HgqjdogBec2qTvAM3bC09q-gl40T1SzlbKRfMRslQRkg">		
		<!-- Google Analytics -->
			<script type="text/javascript">
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
	<body id="socialBody">
		
		
		<div id="navSidebar" class="  ">
			<div class="" id="tagsDIV">
				<b>Filter by tag:</b><br>
				<span id="clearTags">Show All</span>
				<ul id="tagsUL"></ul>
				<ul id="legendUL">
					<li class="and"> - and</li>
					<li class="or"> - or</li>
				</ul>
			</div>			
		</div>
		
		<div id="articlesDIV" class="  "></div>
		
		<div id="socialSidebar" class="  ">
			<div class="twitterDIV">	
				<div class="twitter">
					<jsp:include page="twitter.jsp" />
				</div>
				<div class="twitter">
					<jsp:include page="twitFeed.jsp" />
				</div>	
			</div>		
		</div>	
			
		
		<div id="fb-root"></div>
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/header.js"></script>
		<script type="text/javascript" src="/js/socialWidgets.js"></script>
		<script type="text/javascript" src="js/social.js"></script>
		<script type="text/javascript" src="js/waitForImages.js"></script>
		<script type="text/javascript" src="js/buildArticle.js"></script>
		<script type="text/javascript" src="/js/ui/jquery-ui-1.8.18.custom.min.js"></script>		
	</body>
</html>