<!DOCTYPE>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>

<html>
	<head>
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<link rel="apple-touch-icon" href="data/images/logo-114x114.png"/>
		<title>Race Data Admin Page</title>
		<script type="text/javascript" src="js/jquery.js"></script>
		<jsp:include page="header.jsp" />
		<script type="text/javascript" src="js/header.js"></script>
		<link rel="stylesheet" type="text/css" href="stylesheets/header.css" />
		<link rel="stylesheet" type="text/css" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
	</head>
	<body>
		
<%
    UserService userService = UserServiceFactory.getUserService();
    User user = userService.getCurrentUser();
    if (user != null) {
%>
<p>Hello, <%= user.getNickname() %>! (You can
<a href="<%= userService.createLogoutURL(request.getRequestURI()) %>">sign out</a>.)</p>
<%
    } else {
%>
<p>Hello!
<a href="<%= userService.createLoginURL(request.getRequestURI()) %>">Sign in</a>
to include your name with greetings you post.</p>
<%
    }
%>
	</body>

</html>