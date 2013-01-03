<!DOCTYPE>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.users.*" %>
<html>
	<head>
		<link href="/stylesheets/header.css" type="text/css" rel="stylesheet"/>	
		<script type="text/javascript" src="/js/jquery.js"></script>
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
	</head>
<%
   UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    String logoutURL = request.getRequestURI();
    String adminURL = "admin/";
    String nickname = "";
    
    System.out.println("login URI: " + userService.createLoginURL( request.getRequestURI() ) );
    
    if (logoutURL.indexOf(adminURL) != -1){
    	//logoutURL = "/construction.jsp";
    } else{
    	logoutURL = request.getRequestURI();
    	//logoutURL = "/construction.jsp";
    }
  	
    boolean loggedIn = false;
   // boolean admin = false;
    boolean admin = true;
    
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
			<div id="headNotice">
				<p class="large"><span class="highlight">Notice: </span>This webstie is undergoing active development. The content here is for testing purposes only.</p>
				<p class=""> The <b><i>Dashboard</i></b>, which is normally admin-only, is open to the public for testing. Feel free to upload an image, submit an article, or add a race!</p>
				<br><p class="">Please contact <a href="mailto:neil@benzawacki.com">neil@benzawacki.com</a> with any bug reports, questions or comments.<p>
				
			</div>				
			<div id="loginDIV">						
				<div id="fb-subscribe_header" class="fb-subscribe" data-href="https://www.facebook.com/benzawacki" data-show-faces="false" data-width="450" ></div>
				<a id="twitFollow" href="https://twitter.com/benzawacki" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @benzawacki</a>
			</div>
			<div id="headerDIV">	
				<div id="titleTextDIV">
					<img id="titleImg" alt="Title Image" src="" title=""/>
					<div><span id="titleText"></span></div>
				</div>
			<div id="tabsDIV" class="tabs">
				<ul id="linksList" class="topnav">
					<!-- <li>
						<a href="/main.jsp">Home</a>
					</li> -->
					<li>
						<a href="/home">Home</a>
					</li>
					<li>
						<a href="/contact">Contact</a>
					</li>
					<li>
						<a href="/strava">Strava</a>
					</li>
					<li>
						<a href="/races">Races</a>
					</li>
					<li>
						<a href="/article.jsp?num=all&index=0&dir=ascending">Articles<span></span></a>
						<ul class="subnav" id="articleSubNav">
							<li>
								<a href="/article.jsp?num=all&index=0&dir=ascending">All</a>
							</li>
							<li>
								<a href="/article.jsp?num=1&index=0&dir=ascending">First</a>
							</li>
							<li>
								<a href="/article.jsp?num=1&index=0&dir=descending">Last</a>
							</li>
						</ul>	
					</li>
					<li class="login">
						<a href=" <%=userService.createLoginURL( request.getRequestURI() )%>">Sign In</a>
					</li>
					<li class="admin">
						<a href="/admin/dashboard">Dashboard<span></span></a>
						<ul class="subnav" id="adminSubNav">
							<li id="raceData">
								<a href="/admin/races">Races</a>
							</li>
							<li class="subnav">
								<a href="/admin/images">Images</a>
							</li>
							<li class="subnav">
								<a href="/admin/articles">Articles</a>
							</li>
						</ul>
					</li>
				</ul>
				
				<div class="clear"></div>
			</div>
			
		</div>	
		<div id="admin" class="hidden">
			<%= admin %>
	 	</div>
		<div id="loggedIn" class="hidden"><%= loggedIn %></div>
		<div id="logoutURL" class="hidden"><%= userService.createLogoutURL(logoutURL) %></div>
		<div id="loginURL" class="hidden"><%= userService.createLoginURL(request.getRequestURI()) %></div>
		
		<script type="text/javascript" src="/js/header.js"></script>	
		<script type="text/javascript" src="/js/prefix-free.js" ></script>
	</body>

</html>