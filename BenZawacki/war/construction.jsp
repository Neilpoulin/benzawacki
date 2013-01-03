<!DOCTYPE>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.users.*" %>
<html>
	<head>
		<script type="text/javascript" src="../js/jquery.js"></script>
		<script type="text/javascript" src="../js/construction.js"></script>
		<link rel="stylesheet" href="stylesheets/construction.css" />
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
		<!-- Facebook -->
		<meta property="fb:admins" content="{neil.poulin,ben.zawacki}"/>
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
	<%
	   UserService userService = UserServiceFactory.getUserService();
	    User user = userService.getCurrentUser();
	    String logoutURL = request.getRequestURI();
	    String adminURL = "admin/";
	    String nickname = "";
   	// 	String loginURL = request.getRequestURI();
	   	String loginURL = "/main.jsp";
	    if (logoutURL.indexOf(adminURL) != -1){
	    	logoutURL = "/construction.jsp";
	    } else{
	    	logoutURL = request.getRequestURI();
	    }
	  	
	    boolean loggedIn = false;
	    boolean admin = false;
	    
	    if (user != null) {
	    	admin = userService.isUserAdmin();
	    	loggedIn = true;
	    	if (admin){
	    		//loginURL = ""
	    		%>
	    		<script type="text/javascript">
	    			//window.location = "main.jsp";
	    		</script>
	    		<%
	    	}	
		    nickname = user.getNickname();
		  	if (nickname.indexOf("@") != -1){  		
		  		nickname = nickname.substring(0,1).toUpperCase() + nickname.substring(1,nickname.indexOf("@"));
		  	}
	    }    
	%>
	<body>
		<div id="headerDIV_const">
				<% 
					if (loggedIn){  
				%> 
						<span>Welcome, <%= nickname %>! (<a href="<%= userService.createLogoutURL(logoutURL) %>">sign out</a>)</span>
				<% 
					} else {
				%>
					<span>You are not logged in (<a href="<%= userService.createLoginURL(loginURL) %>">admin sign-in</a>)</span>
				<% 
				}
				%>	
		</div>
		
		<div id="fb-subscribe_const" class="fb-subscribe" data-href="https://www.facebook.com/benzawacki" data-show-faces="false" data-width="450" ></div>
		<a id="twitFollow_const" href="https://twitter.com/benzawacki" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @benzawacki</a>
		
		<div class="clear"></div>	
		<div id="mainDIV">
			<h1>BenZawacki.com is coming soon!</h1>
			<img src="data/images/logo-large-1131x825.jpg" id="logo"/>	
		</div>
		<div id="admin" class="hidden">
		 	<%= admin %>
		 </div>
		
		
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