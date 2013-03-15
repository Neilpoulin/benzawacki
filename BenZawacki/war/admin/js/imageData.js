$(document).ready(function(){
	window.imgCollection = new ImageCollection();
	window.galleryView = new ImageGallery({el: "#gallery", model: imgCollection});
	imgCollection.fetch({update: true});
	
	getUploadUrl();
	
	$("#fileInput").change(function(){
		handleFiles(this.files);		
	});
	
	$("#btnSubmit").click(function(){
		$("#blobSubmitBtn").click();
		$("#spanFile").html("");
		$("#btnSubmit").hide();		
		$("#imgPreview img").attr("src", "/data/images/img-placeholder.jpg");
		console.log("submit button clicked");
//		setCursorByID("body", "wait");
//		getBlobKey(); //ensures blobstore is returned + get image by calling getServerImages("add")
		checkForUpdates();
	});
	
	$("#btnChooseFile, img.imgPreview.input").click(function(){
		$("#fileInput").click();
	});
	
});



function handleFiles(files) {
	var img = $("#imgPreview img").get()[0];
	for (var i = 0; i < files.length; i++) {
	    var file = files[i];
	    var imageType = /image.*/;
	    
	    if (!file.type.match(imageType)) {
	      continue;
	    }
  
	    var reader = new FileReader();
	    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
	    reader.readAsDataURL(file);
	    
	    $("#fileInfo").html("<b>" + file.name + "</b><br>" + byteToKb(file.size) + " KB<br/>last modified: " + file.lastModifiedDate.toLocaleDateString());   
	}
	$("#btnSubmit").show();	
}

function byteToKb(size){
	var kb = Math.round((Number(size)*0.0009765625*100))/100;
	return kb;
}

function getUploadUrl(){
	$.ajax({
		url: "/upload",
		type: "GET",
		success: function(url){
			$("#frmPost").attr("action", url);	
			window.uploadUrl = url;
		}
	});
}

function checkForUpdates(){
	var n = 0;
	var back = false;
	var check = setInterval(function(){
		var contents = $("#iframeBlob").contents().text().trim();
		if (contents != "iframe content"){
			clearInterval(check);
			$("#iframeBlob").contents().find("body").empty().html("iframe content");
			$("#fileInput").val("");
			imgCollection.add(JSON.parse(contents));
			getUploadUrl();
		}
		
		if (n >= 5000){
			clearInterval(mytest);
			console.log("ended");
			alert("failed to upload image. Upload timed out.")
		}
		n++;
	}, 1000);
	
}