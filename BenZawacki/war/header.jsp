<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.users.*" %>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link type="text/css" rel="stylesheet" href="/stylesheets/header.css"/>	
		<link type="text/css" rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css"/>
		<link type="text/css" rel="stylesheet" href="/lib/bootstrap/css/bootstrap-responsive.min.css"/>	
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
		<link type="stylesheet/less" rel="stylesheet" href="/css/common.less"/>
	</head>
<%
   	UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    String logoutURL = userService.createLogoutURL("/home"); 
    String loginURL = userService.createLoginURL(request.getRequestURI());
    String nickname = null;
    boolean loggedIn = false;
    boolean admin = false;
    
    if (user != null) {
    	admin = userService.isUserAdmin();
    	loggedIn = true;   		
	    nickname = user.getNickname();
	  	if (nickname != null && nickname.indexOf("@") != -1){  		
	  		nickname = nickname.substring(0,1).toUpperCase() + nickname.substring(1,nickname.indexOf("@"));
	  	}
    }
%>
	<body>			
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
							<!-- <li><a href="/strava">Strava</a></li> -->
							<li><a href="/races">Races</a></li>						
<%
	//If the user is an admin, show the admin menu options, otherwise dont show it. 							
	if (admin){
%>							
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">Admin<b class="caret"></b></a>
								<ul class="dropdown-menu">
									<li><a href="/admin/races">Races</a></li>
									<li><a href="/admin/images">Images</a></li>
									<li><a href="/admin/articles">Articles</a></li>	
									<li class="nav-header">Test Pages</li>
	                    			<li><a href="/pages/main.jsp">New Home Page</a></li>	
	                    			<li><a href="/writings">Writings</a></li>	
	                    			<li><a href="/partners">Partners</a></li>				
								</ul>
							</li>
<%						
	}
	//If user is logged in, show the logout menu option
	if (loggedIn){
%>							
							<li><a href="<%= logoutURL %>">Log Out</a></li>
<%
	}
	//If user is NOT logged in, show the login option
	else{
%>
							<li><a href="<%= loginURL %>">Log In</a></li>
<%
	}
%>
						</ul>
					</div><!--/.nav-collapse -->
				</div><!-- / .container -->
			</div><!-- /.navbar-inner -->
		</div><!-- /.navbar -->				


		<!-- Libraries -->
		<script type="text/javascript" src="/lib/jquery.js"></script>
		<script type="text/javascript" src="/lib/jquery-ui.js"></script>				
		<script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="/js/prefix-free.js" ></script>	
		<script type="text/javascript" src="/lib/underscore-min.js"></script>	
		<script type="text/javascript" src="/lib/backbone-min.js"></script>
		<!-- Template Includes -->
		<jsp:include page="/templates/_templates.jsp"/>		
		
		<!-- Less.js needs to come after all styles are added to the page -->
		<script type="text/javascript" src="/lib/less.js"></script>
		
		<!-- Page-specific JS files -->
		<script type="text/javascript" src="/js/header.js"></script>
		<script type="text/javascript" src="/js/Models/Article.js"></script>
		<script type="text/javascript" src="/js/Models/Race.js"></script>
		<script type="text/javascript" src="/js/Models/Image.js"></script>
		
		<script type="text/javascript" src="/js/Views/ArticleSummaryList.js"></script>
		<script type="text/javascript" src="/js/Views/ArticleSummary.js"></script>
		<script type="text/javascript" src="/js/Views/EditArticle.js"></script>
							
</body>
</html>