<!DOCTYPE>
<%@ page import="com.google.appengine.api.blobstore.*" %>
<%@ page import="javax.servlet.*" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map"%>

<%
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
	
	

%>

<html>
	<head>
		<script type="text/javascript" src="../js/jquery.js"></script>
		<script type="text/javascript" src="../js/ui/jquery-ui-1.8.18.custom.min.js"></script>
		<script type="text/javascript" src="js/blob.js"></script>
		<link rel="stylesheet" href="../stylesheets/ben-ui/jquery-ui-1.8.19.custom.css" />
	</head>
	<body>
		iframe content
	</body>

</html>