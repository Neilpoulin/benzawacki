<!DOCTYPE html>

<html>
	<head>		
		<title>Races Admin Page</title>		
		<link rel="stylesheet" href="/admin/stylesheets/raceData.less" />
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
		<!-- <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script> -->
	</head>
	
	<body>
		<jsp:include page="/header.jsp" />
		
		<div class="container" id="content">
			<a href="#raceDialog" role="button" class="btn pull-right" id="addRaceTrigger" data-toggle="modal"><i class="icon-plus"></i>Add Race</a>		
			<div class="row clear-both">
				<div class="content-div span9">
					<div id="map_canvas" class="">
				</div>
					
				</div>
				<ul id="raceList" class='span3 content-div'></ul>
			</div>
		</div>	
			
		<div id="raceDialog" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
		
		<script type="text/javascript" src="/admin/js/raceData.js"></script>
	</body>

</html>