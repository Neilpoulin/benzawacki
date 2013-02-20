<!DOCTYPE>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.users.*" %>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link type="text/css" rel="stylesheet" href="/stylesheets/header.css"/>	
		<link type="text/css" rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css"/>
		<!-- <link type="text/css" rel="stylesheet" href="/stylesheets/bootstrap-custom.css"/> -->
		<link type="text/css" rel="stylesheet" href="/lib/bootstrap/css/bootstrap-responsive.min.css"/>	
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
	</head>
<%
   UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    String logoutURL = request.getRequestURI();
    String loginURL = request.getRequestURI();
    String adminURL = "admin/";
    String nickname = "";
    
    System.out.println("login URI: " + userService.createLoginURL( request.getRequestURI() ) );
    
    if (logoutURL.indexOf(adminURL) != -1){
    	//logoutURL = "/construction.jsp";
    } else{
    	/* logoutURL = request.getRequestURI(); */
    	logoutURL = "/";
    }
  	
    boolean loggedIn = false;
   // boolean admin = false;
    boolean admin = false;
    
    if (user != null) {
    	admin = userService.isUserAdmin();
    	loggedIn = true;
    	if (!admin){
    		%>
    		<script type="text/javascript">
    			//window.location = "/construction.jsp";
    		</script>
    		<%
    	}    		
	    nickname = user.getNickname();
	  	if (nickname.indexOf("@") != -1){  		
	  		nickname = nickname.substring(0,1).toUpperCase() + nickname.substring(1,nickname.indexOf("@"));
	  	}
    } else{
		%>
		<script type="text/javascript">
			var loginURL =  $("#loginURL").text().trim();
			console.log(loginURL);
			//window.location = "/construction.jsp";
		</script>
		<%
    }    
%>
		<body>
			<!-- <div id="headNotice">
				<p class="large"><span class="highlight">Notice: </span>This webstie is undergoing active development. The content here is for testing purposes only.</p>
				<p class=""> The <b><i>Dashboard</i></b>, which is normally admin-only, is open to the public for testing. Feel free to upload an image, submit an article, or add a race!</p>
				<br><p class="">Please contact <a href="mailto:neil@benzawacki.com">neil@benzawacki.com</a> with any bug reports, questions or comments.<p>
			</div>	 -->			
			<!-- <div id="loginDIV">						
				<div id="fb-subscribe_header" class="fb-subscribe" data-href="https://www.facebook.com/benzawacki" data-show-faces="false" data-width="450" ></div>
				<a id="twitFollow" href="https://twitter.com/benzawacki" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @benzawacki</a>
			</div> -->
			<div id="headerDIV" class="clear-fix">	
				<div id="titleTextDIV">
					<img id="titleImg" alt="Title Image" src="" title=""/>
					<div><span id="titleText"></span></div>
				</div>
		
			<!-- NAVBAR ================================================== -->
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span> 
					<span class="icon-bar"></span>
				</button>
				<a class="brand" href="/">Ben Zawacki</a>
				<div class="nav-collapse collapse">
					<ul class="nav">
						<li><a href="/home">Home</a></li>						
						<li><a href="/contact">Contact</a></li>
						<li><a href="/strava">Strava</a></li>
						<li><a href="/races">Races</a></li>
						<%
							if (admin){
						%>
						
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Admin<b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="/admin/races">Races</a></li>
								<li><a href="/admin/images">Images</a></li>
								<li><a href="/admin/articles">Articles</a></li>	
								<li class="nav-header">Test Pages</li>
                    			<li><a href="/pages/main.jsp">SlideShow</a></li>						
							</ul>
						</li>
						<%						
							}
							if (loggedIn){
						%>
						
						<li><a href="<%= userService.createLogoutURL(logoutURL) %>">Log Out</a></li>
						<%
							} else{
								%>
								<li><a href="<%= userService.createLoginURL(loginURL) %>">Log In</a></li>
								<%
							}
						%>
					</ul>
				</div><!--/.nav-collapse -->
			</div><!-- / .container -->
		</div><!-- /.navbar-inner -->
	</div><!-- /.navbar -->
			
		</div>	
		<div id="admin" class="hidden">
			<%= admin %>
	 	</div>
		<div id="loggedIn" class="hidden"><%= loggedIn %></div>
		<div id="logoutURL" class="hidden"><%= userService.createLogoutURL(logoutURL) %></div>
		<div id="loginURL" class="hidden"><%= userService.createLoginURL(request.getRequestURI()) %></div>
		
		<script type="text/javascript" src="/lib/jquery.js"></script>
		<script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="/js/header.js"></script>	
		<script type="text/javascript" src="/js/prefix-free.js" ></script>
	</body>

</html>