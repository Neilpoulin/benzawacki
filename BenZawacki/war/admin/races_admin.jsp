<!DOCTYPE>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="com.google.appengine.api.datastore.DatastoreServiceFactory" %>
<%@ page import="com.google.appengine.api.datastore.DatastoreService" %>
<%@ page import="com.google.appengine.api.datastore.Query" %>
<%@ page import="com.google.appengine.api.datastore.Entity" %>
<%@ page import="com.google.appengine.api.datastore.FetchOptions" %>
<%@ page import="com.google.appengine.api.datastore.Key" %>
<%@ page import="com.google.appengine.api.datastore.KeyFactory" %>
<%@ page import="com.google.appengine.api.datastore.Text" %>


<html>
	<head>
		<title>Race Data Admin Page</title>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>		
		<link rel="stylesheet" href="/stylesheets/ben-ui/jquery-ui-1.8.19.custom.css" />
		<link rel="stylesheet" href="/admin/stylesheets/races_admin.css" />
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
		
		<div class="dataEntry container">
			<div id="dialog-form" title="">
				<p class="validateTips">All form fields are required.</p>
				<form class="form-horizontal">				
					<div class="control-group">
						<label for="race" class="control-label">Race Name</label>
						<div class="controls">
							<input class="input-xlarge" name="race" id="race" class="" />
						</div>
					</div>					
					<div class="control-group">
						<label class="control-label" for="date">Date</label>
						<div class="controls">
							<input name="date" id="date" class=""/>
						</div>
					</div>					
					<div class="control-group">
						<label class="control-label" for="website">Website</label>
						<div class="controls">
							<input class="input-xlarge" name="website" id="website" class="" />
						</div>
					</div>					
					<div class="control-group">
						<label class="control-label" for="address">Address</label>
						<!-- <label for="city">City</label> -->
						<!-- <label for="state">State</label> -->
						<div class="controls">
							<input  name="address" class="input-xlarge" id="address" value="" class="" placeholder="Street"/>
							<input  name="city" id="city" value="" class="" placeholder="City"/>
							<input name="state" class="input-mini" id="state" value="" class="" placeholder="State"/>							
						</div>
					</div>						
					<div class="control-group">
						<label class="control-label" for="length">Race Details</label>
						<div class="controls">
							<input name="length" class="input-mini" id="length" value="" class="" placeholder="Length"/>
							<input name="type" id="type" value="" class="" placeholder="Type"/>
						</div>
					</div>	

					<label class="hidden" for="lat">lat</label>
					<input name="lat" id="lat" value="" readonly="" class="hidden readonly "/>
			
					<label class="hidden" for="lng">lng</label>
					<input name="lng" readonly="" id="lng" value="" class="hidden readonly text-short"/>
				
				
				</form>
			</div>
			<button id="create-race">Add a Race</button>
			<input type="button" id="toggle-map" value="Show Map"></input><br>
						
			<div id="displayDataDIV" class="ui-widget large">
				<table id="displayDataTABLE" class="ui-widget ui-widget-content">
					<thead>
						<tr class="ui-widget-header ">
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</div>
			<div id="map_canvas"></div>	
		</div><!-- End demo -->

				
		
		<script type="text/javascript" src="/js/jquery.js"></script>
		<script type="text/javascript" src="/js/ui/jquery-ui-1.8.18.custom.min.js"></script>
		<script type="text/javascript" src="/js/header.js"></script>
		<script type="text/javascript" src="/admin/js/races_admin.js"></script>
	</body>

</html>