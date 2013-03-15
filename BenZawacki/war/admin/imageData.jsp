<!DOCTYPE>
<html>
<head>
	<title>Manage Images Admin Page</title>		
	<link rel="stylesheet/less" href="/admin/stylesheets/imageData.less" />
</head>
	
	<body id="body">        
		<jsp:include page="/header.jsp" />
		<div class="container">			
	        <div class="row">
		        <div id="addPicDIV" class="span4">
					<div class = "" id="imgPreview">
						<img class="imgPreview input img-polaroid" src="/data/images/img-placeholder.jpg">
					</div>
					<p class="" id="fileInfo"></p>
					<button class="btn" id="btnChooseFile">Choose File</button>
			    	<button class="input btn btn-primary" data-loading-text="uploading..." id="btnSubmit">Submit Image</button>					
			    </div>
			</div>      
	        <hr/>       
	        <div id="gallery" class=""></div>
			
			<form id="frmPost" class="hidden" action="" method="post" enctype="multipart/form-data" target="iframeBlob">
	            <input id="fileInput" type="file" name="articleImg" accept="image/*" onchange="">
	            <input id="blobSubmitBtn" type="submit" value="Submit">
	        </form>
	        <iframe id="iframeBlob" name="iframeBlob" src="blob.jsp" class="invisible" ></iframe>
		</div>	
		<script type="text/javascript" src="js/imageData.js"></script>		
	</body>
	
</html>