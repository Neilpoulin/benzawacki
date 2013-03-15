$(document).ready(function(){	
	window.blobKey = "not set yet";
	window.selectedBlobs = [];
	getUploadUrl();
	setCursorByID("body", "wait");
	$("#btnSubmit").hide();
	window.imageCount = 0;
	
	console.log(window.navigator.platform.toLowerCase() );
	if ((window.navigator.platform.toLowerCase() == "ipad") || (window.navigator.platform.toLowerCase() == "iphone")){
		$("#addPicDIV").hide();
		$("#notice").html("<h2>Note: You must be on a computer to upload images</h2> You can delete images from your " + window.navigator.platform);
	}
	
	$("#fileInput").change(function(){
		handleFiles(this.files);
		//$("#spanFile").html($(this).val());
		
	});
	
	$("#blobSubmitBtn").click(function(){
		getUploadUrl();
		$("#spanFile").html("");
		$("#btnSubmit").hide();		
		$("#imgPreview img").attr("src", "/data/images/img-placeholder.jpg");
		console.log("submit button clicked");
		setCursorByID("body", "wait");
		getBlobKey(); //ensures blobstore is returned + get image by calling getServerImages("add")
	});
		
	$("#btnSubmit, #btnChooseFile").button();
	
	$("#btnSubmit").click(function(){
		$("#blobSubmitBtn").click();
	});
	
	$("#btnChooseFile, img.imgPreview.input").click(function(){
		$("#fileInput").click();
	});
	
	getServerImages("all");
	
	$(window).resize(function(){
		//animateImg();
	});
	
	$("#btnDeleteBlobs").button({
		icons: {primary: "ui-icon-trash"},
		text: false
	}).click(function(){
		var r = confirm("Are you sure you want to delete the selected images?")
		if (r){
			deleteSelected();
		}	
	});
	
	$("#selectionDetailsDIV").draggable({
		handle: "#handle", 
		cursor: "url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur)",
		start: function(event, ui){
		
		}
	});
	
	
	
}); //end Ready function

function countImgs(){
	var count =  $("#picsDIV > .outer").length;
	$("#selectionDetailsDIV p b").html("Images on Server: " + count);
}

function getUploadUrl(){
	$.ajax({
		url: "/upload",
		type: "GET",
		success: function(url){
			$("#frmPost").attr("action", url);		
		}
	});
}


function getServerImages(query, filename, key){
	//query values:
	// "all": returns all blobs,
	// "add": returns most recently added blob
	var show = "";
	if (query == "add"){
		show = "hidden";
		key = blobKey;
	}
	
	$.ajax({
		url: "/queryBlobs",
		data: {
			"query": query,
			"filename": filename,
			"key": key,
			"num": "no"
		},
		type: "GET",
		dataType: "JSON",
		success: function(data){
			data = sortArray(data, "creationDate", false);
			var myKey;
			var myDate;
			var mySize;
			var myFilename;
			for (var i=0; i<data.length; i++){	

					if (query == "add"){
						myKey = blobKey;
						if (data[0].error != "none" ){
							console.log(data[0].error);
							getServerImages(query, filename, key);
							return;
						} else {
							prepPic();
						}
						
					}else if (query=="all") {
						prepPic();
					}
					
			} //end of for loop
			function prepPic(){
					myKey = data[i].blobKey;
					myDate = data[i].creationDate.split(".")[0]
					mySize = data[i].size;
					myFilename = data[i].fileName;
					
					addPic(myKey, myFilename, myDate, mySize, show, query);
			}
			
			
		}
		
	}); //end of ajax call
}

function addPic(key, filename, date, size, show, query){
	
	var $pics = $("#picsDIV");
	var source = "/serve?blobKey=" + key;
	
	imageCount++;
	$pics
		.prepend($("<div><img class='stretch' src='../../data/images/polaroid-small.jpg'/></div>")
			.addClass("outer " + show )
			.attr("id", "img" + imageCount)
			.append($("<div>")
				.addClass("inner")
				.append($("<img>")
					.addClass("gallery")
					.attr("src", source)
					.attr("id", key)
					.attr("alt", "failed to load")
					.attr("title", filename)
					.css("maxWidth", "100%")
					.css("maxHeight",  "100%")
				)			
			)
			.append($("<div>")
				.addClass("imgTitle")
				.html(
					filename + "<br>" 
					+ byteToKb(size) + " Kb <br>"
					+ "" + date
				
				)
				.css("maxHeight", "100%")
				.css("maxWidth", "100%")
			)	
		);
		
		animateFirst();
		$(".outer").css("float","left");
		$("#picsDIV img").load(function(){
			//animateImg();
			setCursorByID("body", "default");
		});
		if (query == "add"){
				$("#picsDIV > div").removeClass(show);
				$("#picsDIV > div:first").hide();
				$("#picsDIV > div:first").show("slow");
		}
		
		countImgs();
}


function animateFirst(){
	var $orig = $("#picsDIV > div:first");
	var pos = $orig.position()
	//var $clone = $orig.clone();
	$orig.unbind();
	
	//$clone.addClass("clonedItem");
	
	
	$orig.toggle(
		function(){
			$(this).addClass("imgSelected");
			selectedImages();
			
		},function(){
			$(this).removeClass("imgSelected");
			selectedImages();
		}
	); //end toggle function

}

function selectedImages(){
	var $selection = $(".imgSelected");
	var $detailsList = $("#selectionDetailsDIV > ol");
	var $detailsDIV = $detailsList.parent();
	
	var title;
	selKeys = [];
	
	if ($selection.length == 1){
		title = $selection.length + " image selected";
	} else if( $selection.length == 0){
		title = "No images selected"
	} else {title = $selection.length + " images selected"}
	
	
	$("#selectionListTitle").html(title);
	
	$detailsList.children("li").remove();
	for (var i=0; i < $selection.length; i++){
		var filename = $selection.eq(i).find("img.gallery").attr("title");
		var blobKey = $selection.eq(i).find("img.gallery").attr("id");
		var containerID = $selection.eq(i).attr("id");
		
		selKeys.push({"filename": filename, "blobKey" : blobKey, "outerID": containerID});
		$detailsList
			.append($("<li>")					
				.html(filename)  
			);
	}
	selectedBlobs = selKeys;
}

function deleteSelected(){
	for (var i=0; i < selectedBlobs.length; i++){
		var key = selectedBlobs[i].blobKey;
		var outerID = selectedBlobs[i].outerID;
		var $picDIV = $("#" + outerID);
		
		$.ajax({
			url: "/deleteBlob",
			data: {
				"blobKey": key 
			},
			type: "GET",
			success: function(data){
			
				
			}
		}); //end delete ajax call
		$picDIV.hide(1500, function(){
			$(this).remove()
			countImgs();
		});	
		
		
	}//end for loop
	selectedImages();
	
}

function animateImg(){
	$(".clonedItem").remove();
	
	var large = "400px";
	var lgPos = 100;
	var normal = "200px";
	
	$("div.outer").each(function(i, obj){
	    $(obj).unbind();
	    var clone;
	    var position;
	    
	    clone = $(obj).clone();
	    $(clone).addClass("clonedItem");
	    position = $(obj).position();
	    
	    $(obj).bind("click", function(e){
	    	$(this)
	    	.toggle( 
		    	function()
		    	{
			       $(".clonedItem").stop()
				       .animate(
					       {
					            height: "250px",
					            width: "250px"
					        }, 
					        1000, 
					        function()
					        {
					        	$(this).remove();
					        }
					     );     
			        $("div.outer").css("z-index", 10);
			        $(clone).css("top", position.top).css("left", position.left).css("z-index", 1000);
			        
			        $(clone).appendTo("#picsDIV").css("position", "absolute")
				        .animate(
				        {
				            height: large,
				            width: large,
				            top: position.top - lgPos,
				            left: position.left - lgPos,
				            fontSize: "18"
				        }, 
				        400); // end animate callback
	/*second*/	}, 
				function()
				{	
					$(".clonedItem").stop()
						.animate(
							{
				            	height: normal,
				            	width: normal
				        	}, 
				        	1000, 
				        	function()
				        	{
				        		$(this).remove();
				        	}
				        );
				} 
			);     
	    }); // end click
	    
	    $(clone).bind("mouseout", function(e){
             $(clone).animate({
                height: normal,
        		width: normal,
                top: position.top,
       			left: position.left,
       			fontSize: "11"
             }, 400, function(){
             	$(clone).remove();
             });
            
        }); // end mouseout
	    
	    
	}); // end each


}

function byteToKb(size){
	var kb = Math.round((Number(size)*0.0009765625*100))/100;
	return kb;
}

function getBlobKey(){
	var n = 0;
	var back = false;
	var mytest = setInterval(
		function(){
			if ($("#iframeBlob").contents().text().trim() != "iframe content"){	
				console.log("image posted in " + Math.round(n)/1000 + " seconds.");	
				clearInterval(mytest);
				blobKey = $("#iframeBlob").contents().text().trim();
				getServerImages("add", "", blobKey);
				
				$("#iframeBlob").contents().find("body").empty().html("iframe content");
				
				$("#fileInput").val("");
			}
			if (n >= 10000){
				clearInterval(mytest);
				console.log("ended");
				alert("failed to upload image. Upload timed out.")
			}
			n++;
		}, 50);
}


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
	    
	    $("#spanFile").html("<b>" + file.name + "</b> - " + byteToKb(file.size) + " KB, last modified: " + file.lastModifiedDate.toLocaleDateString());
	    
	}
	
	$("#btnSubmit").show();
	
}

function setCursorByID(id,cursorStyle) {
	 var elem;
	 if (document.getElementById &&
	    (elem=document.getElementById(id)) ) {
	  if (elem.style) elem.style.cursor=cursorStyle;
	 }
}

function sortArray(array, field, reverse, primer){
	var sort_by = function(field, reverse, primer){
		   var key = function (x) {return primer ? primer(x[field]) : x[field]};

		   return function (a,b) {
		       var A = key(a), B = key(b);
		       return (A < B ? -1 : (A > B ? 1 : 0)) * [1,-1][+!!reverse];                 
		   }
		}
	array.sort(sort_by(field, reverse, primer));
	return array;

}


