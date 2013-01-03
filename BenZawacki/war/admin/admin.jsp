<!DOCTYPE>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>

<html>
	<head>
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<script type="text/javascript" src="/js/jquery.js"></script>
		<script type="text/javascript" src="/js/header.js"></script>
		<link rel="stylesheet" type="text/css" href="/stylesheets/header.css" />
		<script type="text/javascript" src="/admin/js/admin.js"></script>
		<link rel="stylesheet" type="text/css" href="/admin/stylesheets/admin.css" />
		<jsp:include page="/header.jsp" />
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
		<script type="text/javascript" src="/js/ui/jquery-ui-1.8.18.custom.min.js"></script>
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
		<div>
			<p>This is the Admin Dashboard, where you can find links to other administrative functions</p>
			<ul id="adminLinks">
				<p>Available Pages:</p>
			</ul>
		</div>
	
	</body>
</html>