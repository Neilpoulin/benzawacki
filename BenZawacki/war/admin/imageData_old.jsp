<!DOCTYPE>
<html>
	<head>
		<title>Manage Images Admin Page</title>		
		<link rel="stylesheet" type="text/css" href="/stylesheets/header.css" />
		<link rel="stylesheet" href="/stylesheets/jquery-ui-active/jquery-ui.css" />
		<link rel="stylesheet" href="/admin/stylesheets/imageData.css" />	
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
	<jsp:include page="/header.jsp" />
	<body id="body">        
        <div id="notice">
        	<p>Choose an file from your computer to upload to the server. Uploaded images are then able to be used when <a href="/admin/articleData.jsp">creating articles</a>, etc.</p>
        	<p><span class="highlight">Note: </span> if an uploaded image looks like it is a duplicate of the previous image, please refresh your browser (I'm working on this bug).<p>        	
        </div>
         <div id="addPicDIV">
	    	<button class="input" id="btnChooseFile">Choose File</button>
	        <span class="input" id="spanFile"></span>
			<div class = "input" id="imgPreview"><img class="imgPreview input" src="/data/images/img-placeholder.jpg"></div>
			<button class = "input" id="btnSubmit">Submit Image</button>
	    </div>  
        
        <p><b>Images on server:</b></p>
        <div id="picsDIV"></div>
       	
		<form id="frmPost" action="" method="post" enctype="multipart/form-data" target="iframeBlob">
            <input id="fileInput" type="file" name="articleImg" accept="image/*" onchange="">
            <input id="blobSubmitBtn" type="submit" value="Submit">
        </form><br>
		
		<iframe id="iframeBlob" name="iframeBlob" src="blob.jsp" frameborder=0 ></iframe>
		
		<div class="outer hidden" style ="display:none">
			<img class="stretch hidden ">
			<div class="inner hidden"><img class="gallery hidden"/></div>
			<div class="imgTitle hidden"></div>
		</div>
		<div class="selectionDetails" id="selectionDetailsDIV">   	
        	<div id="handle">Drag Me!</div>
        	<span id="selectionListTitle">No images selected</span><button id="btnDeleteBlobs"></button>
        	<ol></ol> 	
        </div>
        
        
        <div id="gallery"></div>
        
		<!-- <script type="text/javascript" src="../js/jquery.js"></script>
		<script type="text/javascript" src="../js/ui/jquery-ui-1.8.18.custom.min.js"></script>
		<script type="text/javascript" src="../js/header.js"></script> -->
		<script type="text/javascript" src="js/imageData.js"></script>		
	</body>
	
</html>