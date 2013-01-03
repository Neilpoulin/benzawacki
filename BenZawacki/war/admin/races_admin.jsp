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
		<link rel="stylesheet" type="text/css" href="../stylesheets/header.css" />
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
		<jsp:include page="../header.jsp" />
		
		<div class="dataEntry">
			<div id="dialog-form" title="">
				<p class="validateTips">All form fields are required.</p>
				<form>
				<fieldset>
					<table>
						<tr>
							<td colspan=2>
								<label for="race">Race Name</label>
								<input type="text" name="race" id="race" class="text-long ui-widget-content ui-corner-all" />			
							</td>
							<td>
								<label for="date">Date</label>
								<input type="date" name="date" readonly="readyonly" id="date" class="text-short ui-widget-content ui-corner-all"/>
							</td>	
						</tr>
						<tr>
							<td colspan=2>
								<label for="website">Website</label>
								<input type="text" name="website" id="website" class="text-long ui-widget-content ui-corner-all" />			
							</td>	
						</tr>
						<tr>
							<td>
								<label for="address">Address</label>
								<input type="address" name="address" id="address" value="" class="text-short ui-widget-content ui-corner-all"/>
							</td>
							<td>
								<label for="city">City</label>
								<input type="text" name="city" id="city" value="" class="text-short ui-widget-content ui-corner-all" />
							</td>
							<td>
								<label for="state">State</label>
								<input type="text" name="state" id="state" value="" class="text-state ui-widget-content ui-corner-all"/>
							</td>
						</tr>
						<tr>
							<td>
								<label for="length">Length</label>
								<input type="text" name="length" id="length" value="" class="text-short ui-widget-content ui-corner-all"/>
							</td>
							<td>
								<label for="type">Type</label>
								<input type="text" name="type" id="type" value="" class="text-short ui-widget-content ui-corner-all"/>
							</td>
						</tr>
						<tr>
							<td>
								<label class="hidden" for="lat">lat</label>
								<input type="text" name="lat" id="lat" value="" readonly="" class="hidden readonly text-short ui-widget-content ui-corner-all"/>
							</td>
							<td>
								<label class="hidden" for="lng">lng</label>
								<input type="text" name="lng" readonly="" id="lng" value="" class="hidden readonly text-short ui-widget-content ui-corner-all"/>
							</td>
							<td>
								
							</td>
						</tr>
					</table>	
				</fieldset>
				</form>
			</div>
			<button id="create-race">Add a Race</button>
			<input type="button" id="toggle-map" value="Show Map"></input><br>
			<div id="map_canvas"></div>	
			
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
			
		</div><!-- End demo -->

				
		
		<script type="text/javascript" src="/js/jquery.js"></script>
		<script type="text/javascript" src="/js/ui/jquery-ui-1.8.18.custom.min.js"></script>
		<script type="text/javascript" src="/js/header.js"></script>
		<script type="text/javascript" src="/admin/js/races_admin.js"></script>
	</body>

</html>