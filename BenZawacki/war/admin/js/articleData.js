$(document).ready(function(){
	
	var $thumbsDIV = $("#thumbsDIV");
	getAllThumbs($thumbsDIV, "thumb");	

//	$(".buttonsetDIV").buttonset();
	
	$("#imgGallery").dialog({
			modal: false,
			title: "Select a title image",
			autoOpen: false, 
			width: "50%",
			buttons: [{
				text: "done",
				click: function(){
					$(this).dialog("close");
				}
			}]
	});
	
	
	$("#addPicDialog").dialog({
			modal: false,
			title: "Insert Image",
			autoOpen: false, 
			width: "50%",
			buttons: [{
				text: "done",
				click: function(){
					$(this).dialog("close");
				}
			}]
	});
	
	$("#articlePostDate").datepicker({
		closeText: "Cancel",
		dateFormat: "yy-mm-dd",
		defaultDate: 0,
		duration: "fast",	
	});
	$('textarea[maxlength]').on('keyup', function() {
        // Store the maxlength and value of the field.
        var maxlength = $(this).attr('maxlength');
        var val = $(this).val();

        // Trim the field if it has content over the maxlength.
        if (val.length > maxlength) {
            $(this).val(val.slice(0, maxlength));
        }
    });
	
	window.imgArray = [];
	window.imgArrayCt = 0;
	
	$("#articleTags").on('blur change', function(){
		var content = $(this).val().toLowerCase();
		content = content.replace(/"/gm, "");
		$(this).val(content);
	});
	
	$("#articleSummary, #articleContent, #articleTitle, #articleLocation").on('keyup', function(){
		var content = $(this).val();
		content = content.replace(/(\r\n|\n|\r)/gm,"<br>");
//		content = content.replace(/(\t|^t)/gm, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		content = content.replace(/"/gm, '\\\"');
		
		var imgStr = "$<img";
		var imgReg = /\u003Cimg(\d|\d\d)\u003E/mg;
		var count = 0;
		var match = content.match(imgReg);
		if (match!= null){	
			for (var i =0; i< match.length; i++){
				var req = match[i].split("<img")[1];
				req = req.split(">")[0];
				req = Number(req);
				var pos;
				for (var j=0; j< imgArray.length; j++){
					if (match[i] == "<" + imgArray[j].tag + ">"){
						pos = j;
						break;
					}
				}
				var newStr = "<img";
				if (imgArray[pos] != null){
					newStr = imgArray[pos].html;
//					content = content.replace(match[i], newStr);	
				} else {
					alert("Image <img" + req + "> is not a vaild reference to a selected image.");
					var tmp = $(this).val();
					tmp = tmp.replace(match[i], newStr);
					$(this).val(tmp);
				}
				content = content.replace(match[i], newStr);
			}
		}
		var index = content.indexOf(imgStr);
		$("#html" + $(this).attr("id").split("article")[1]).val(content);
//		$("#preview").html(content);
		refreshPreview();
	});
	//getArticles();
	
	$("#thumbsBinDIV").hide();
	$("#submitArticle").button().click(function(){
		$(".article").each(function(){
			$(this).trigger("keyup");
		});
		
		
		var blobKey = $("#articleKey").val();
		var title = $("#htmlTitle").val();
		var summary = $("#htmlSummary").val();
		var content = $("#htmlContent").val();
		var date = $("#articlePostDate").val();
		var tags = $("#articleTags").val().toLowerCase();
		var location = $("#htmlLocation").val();
		
		var index = $("#articleIndex").val();
		var articleId = $("#articleId").val();
		getShortUrl("http://www.benzawacki.com/article.jsp?id=" + articleId, $("#articleShortUrl"));
		var shortUrl = $("#articleShortUrl").val();
		var article = {
			"blobKey": blobKey,
			"postDate": date,
			"content": content,
			"summary": summary,
			"title": title,
			"location": location,
			"tags":tags, 
			"shortUrl": shortUrl,
			"articleId": articleId
		}
		
		if (articleId != ""){
			article.action = "update";
		}else{
			article.action = "add";
		}
		
		$.ajax({
			url: "/articleServlet",
			data: article,
			type: "POST",
			success: function(){
				$(".article").val("").trigger("keyup");
				$("#articleImgSel").find(".selected").click();
				$("#articleImgSel, #imgGallery").animate({width: "0%"}, 1500, function(){
					if ($("#chkArticleImg").is(":checked")){
						$("#chkArticleImg").click();
					}
					getArticles();
				});
			}
		}); //end ajax call
		
	});
	$("#tempImg").clone().appendTo("#articleImg").removeClass("hidden");
	
	
	
	$("#btnArticleImg").button().add("#articleImg").click(function(){
		buildImgPicker($("#imgGallery"), "articleChooseImg", setTitleImgBinds, false);
		$("#imgGallery").dialog("open");
		
	});	
	
	$("#btnAddPic").button().click(function(){
		buildImgPicker($("#addPicDialog"), "insertImg", insertImgBinds, true);
		$("#addPicDialog").dialog("open");
	});
	
	window.articles = {};	
	
	$("#link-modal").on("hidden", function(){
		$("input").each(function(){
			$(this).val("");
		});
	});
	
	$("#link-submit").click(function(){
		insertLink();		
	});
	
	$("#link-address").on("blur", function(){
		var address = $("#link-address").val();
		if (address.indexOf("http://") != 0 && address.indexOf("www.") != 0){
			address = "http://www." + address;
		}else if (address.indexOf("http://") != 0 && address.indexOf("www.") == 0){
			address = "http://" + address;
		}
		$(this).val(address);
	});
}); // end document.ready()


function insertLink(){
	var address = $("#link-address").val();
	var text = $("#link-text").val();
	var html = linkify(address);	
	html = $(html).html(text)[0].outerHTML;
	console.log(html[0].outerHTML);
	$("#articleContent").val($("#articleContent").val() + html).trigger("keyup");
	$("#link-modal").modal("hide");
}

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

function refreshPreview(){
	$("#htmlTitle").val() != "" ? $("#preview").html( "<h4>" + $("#htmlTitle").val() + "</h4>") : $("#preview").html("");
	$("#htmlSummary").val() != "" ? $("#preview").append( $("#htmlSummary").val() + "<br/><br/>") : $("#preview").append("");
	$("#htmlContent").val() != "" ? $("#preview").append( $("#htmlContent").val() ) : $("#preview").append("");
}

function autoComplete(){
	var availableTags = tags();
	function split( val ) {
		return val.split( /,\s*/ );
	}
	function extractLast( term ) {
		return split( term ).pop();
	}

	$( "#articleTags" )
		// don't navigate away from the field on tab when selecting an item
		.bind( "keydown", function( event ) {
			if ( event.keyCode === $.ui.keyCode.TAB &&
					$( this ).data( "autocomplete" ).menu.active ) {
				event.preventDefault();
			}
		})
		.autocomplete({
			minLength: 0,
			source: function( request, response ) {
				// delegate back to autocomplete, but extract the last term
				response( $.ui.autocomplete.filter(
					availableTags, extractLast( request.term ) ) );
			},
			focus: function() {
				// prevent value inserted on focus
				return false;
			},
			select: function( event, ui ) {
				var terms = split( this.value );
				// remove the current input
				terms.pop();
				// add the selected item
				terms.push( ui.item.value );
				// add placeholder to get the comma-and-space at the end
				terms.push( "" );
				this.value = terms.join( ", " );
				return false;
			}
		});
	
	$("#articleTags").click(function(){
		$(this).autocomplete("option", "source", function( request, response ) {
				// delegate back to autocomplete, but extract the last term
				response( $.ui.autocomplete.filter(
					tags(), extractLast( request.term ) ) );
			} );
	});
}

function buildImgPicker($target, newId, callback, multi){	
	var $picsDIVbin = $target;
	if ($picsDIVbin.find("img").length != $("#thumbsDIV").find("img").length){
		$picsDIVbin.empty();				
		var $picsDIV = $("#thumbsDIV").clone().attr("id", newId);
		$picsDIV.appendTo($target);
		var x = 0;
		var w = 0;
		var interval = setInterval(function(){
			w = setWidth($("#" + newId), "div", .5);
			if (x == w){
				clearInterval(interval);
				select($("#" + newId), ">div", multi, "each",  0 );
				callback(newId);
			}
			x = w;
		},50);	//end interval	
	} else {
		return;
	}
}

function insertImgBinds(id){
	$("#"+ id + "> div").click(function(){
		var src = $(this).find("img").attr("src");
		var filename = $(this).find("img").attr("title");
		var blobKey = src.split("=")[1];
		
		
		var $content = $("#articleContent");
		var $htmlContnet = $("#htmlContent");
		var $summary = $("#articleSummary");
		var $htmlSummary = $("#htmlSummary");
		
		if($(this).hasClass("selected")){
			imgArrayCt++;
			var imghtml =  "<img src='" + src + "' class='small right' />";
			imgArray.push({"html" : imghtml, 
				"sizeClass" : "small", 
				"posClass": "right", 
				"blobKey": blobKey, 
				"count": imgArrayCt, 
				"tag": "img" + imgArrayCt, 
				"filename": filename 
			});
			$(this).append("<br><span>");
			$(this).find("span:last").html("&lt;img" + imgArrayCt + "&gt;");
			
		} else {
			for (var i=0; i<imgArray.length; i++){
				if (imgArray[i].blobKey == blobKey){			
					var re = "\u003Cimg" + imgArray[i].count +  "\u003E";
					var imgReg = new RegExp(re);
					var content = $content.val();
					var summary = $summary.val();					
					var count = 0;
					var cMatch = content.match(imgReg);
					var sMatch = summary.match(imgReg);
					var newStr = "";
					
					if (cMatch != null){
						for (var c = 0; c< cMatch.length; c++){
							content = content.replace(cMatch[c], newStr);
						}
					}
					if (sMatch != null){
						for (var s = 0; s< sMatch.length; s++){
							summary = summary.replace(sMatch[s], newStr);
						}
					}
					
					if (sMatch != null || cMatch != null){
						var conf = confirm("This image appears in your article. Removing it will delete all references to it. "
							+"This can not be undone. Are you sure you want to continue?");
						if (conf){
							$content.val(content);
							$summary.val(summary);
							imgArray.splice(i, 1);
							$summary.trigger("keyup");
							$content.trigger("keyup");
						}
					} else {
						imgArray.splice(i, 1);
					}
					$(this).find("span:last").remove().end().find("br:last").remove();	
				} //end if
			} // end for loop
		} //end else
		var $imgTagsDIV = $(".imgTagsDIV");
		$imgTagsDIV.find("ul").empty();
		$("#imageOptions").empty();
		for (var i=0; i< imgArray.length; i++){
			$("#imageOptions").append(templates.articles.selectedImagesButtonSet(imgArray[i]));

			$("#selected_" + imgArray[i].tag + " button").each(function(index, obj){
				$btn = $(obj);
				$btn.click(function(){
					var j = Number($(this).attr("data-tag").split("img")[1]) - 1 ;
					
					if ($(this).parent().hasClass("img-size")){
						var size = $(this).val();
						imgArray[j].sizeClass = size;
					}else{
						var position = $(this).val();
						imgArray[j].posClass = position;
					}
					
					imgArray[j].html = "<img src='/serve?blobKey=" + imgArray[j].blobKey + "' class='" + imgArray[j].sizeClass +  " " + imgArray[j].posClass + "' />";
					$("#articleSummary").trigger("keyup");
					$("#articleContent").trigger("keyup");
				});
			});
		}	
	});
}

function setTitleImgBinds(){	
	$("#articleChooseImg > div").click(function(){
		if ($(this).hasClass("selected")){
			var key = $(this).find("img").attr("id");
			$("#articleKey").val(key);
			$("#articleImg").empty();
			$(this).clone().appendTo("#articleImg").removeClass("selected hidden thumb");
		} else {
			$("#articleImg").empty();
			$("#tempImg").clone().css("boxShadow", "").appendTo("#articleImg").removeClass("hidden thumb");
		}		
	});	
}



function getArticles(){
	$.ajax({
		url: "/articleServlet",
		data: {num: "all", start: "0", direction: "descending"},
		type: "GET",
		dataType: "json",
		success: function(data){
			console.log(data);
			data = data.info; //sortArray(data.info, "uploadDate", true);
			articles = data;
			var slide, pos;
			if ( $("#listArticlesDIV ol li").length > 0 ){

				slide = true;				
			} else {
				slide = false;
			}
			$("#listArticlesDIV ol").empty();
			
			for (var i=0; i < data.length; i++){
				var article = data[i];				
				var html = templates.articles.listSummary(data[i]);
				
				$("#listArticlesDIV ol").append($("<li>").html(html).attr("data-articleId", i));
				pos = "last";
				
				$("#listArticlesDIV ol li:" + pos +" button.delete").attr("data-articleId", i)
					.click(function(){	
						var article = articles[Number($(this).attr("data-articleId"))];
						var r = confirm("Are you sure you want to delete '" + article.title + "'?");
						if (r){	
							deleteArticle(article);
							$(this).parent().slideUp("slow", function(){
								$(this).remove();
							});
						}	//end click function
				});
				
				$("#listArticlesDIV ol li:" + pos +" button.edit").attr("data-articleId", i).click(function(){
					//TODO: look into how the article ID is being applied - this used to be the attribute minus one. 
					var article = articles[Number($(this).attr("data-articleId"))];
					console.log(article);
					$("#articleKey").val(article.blobKey);
					$("#articleTitle").val(article.title);
					$("#articleSummary").val(article.summary);
					$("#articleContent").val(article.content);
					$("#articlePostDate").val(article.postDate);
					$("#articleTags").val().toLowerCase(article.tags);
					$("#articleLocation").val(article.location);
					$("#articleShortUrl").val(article.shortUrl);
					$("#articleIndex").val(article.index);
					$("#articleId").val(article.articleId);
					
					if (article.blobKey != "" && article.blobKey != undefined){
						$("#articleImg img").attr("id", article.blobKey).attr("src", "/serve?blobKey=" + article.blobKey);
					}else{
						$("#articleImg").empty();
						$("#tempImg img").clone().appendTo("#articleImg").removeClass("hidden");
					}
					$(".article").trigger("keyup");
				});
				
				tags(data[i].tags);
			}// end for loop	
			if (slide){
				$("#listArticlesDIV ol li:first").hide();
				$("#listArticlesDIV ol li:first").slideDown();
			} else {
				//$("#listArticlesDIV ol li:first").show();
			}
			autoComplete();	
			var newIndex = $("#listArticlesDIV li").length;
			if (article != undefined){
				getShortUrl("http://www.benzawacki.com/article.jsp?id=" + article.articleId, $("#articleShortUrl"));
			}
		} //end success function
	}); //end ajax call	
}

function deleteArticle(article){	
		article["action"] = "delete";
		$.ajax({
			url: "/articleServlet",
			data: article,
			type: "POST",
			success: function(data){
			}		
		});	
		
}

function updateArticle(article){
	article["action"] = "update";
	$.ajax({
		url: "/articleServlet",
		data: article,
		type: "POST",
		success: function(data){
		}		
	});
}


function tags(tags){
	var $tagLi = $("#tagsDIV ul li");
	if (tags != undefined){
		var input = tags.split(",");
		for (var i=0; i < input.length; i++){
			var val = $.trim(input[i]);
			var unique = true;
			
			for (var j=0; j< $tagLi.length; j++){	
				if ($tagLi.eq(j).text().trim() == val){
					unique = false;
					break;
				}
			}
			if (unique){
				$("#tagsDIV ul").append($("<li>").html(val));
			}
		} //end input.length loop
		//jQuery.unique($("#tagsDIV ul li"));
	} //end if (tags != undefined)

	var tagList = [];
	var $tags = $("#tagsDIV ul li");
	for (var i=0; i < $tags.length; i++){
		tagList.push($tags.eq(i).html());
	}
	return tagList;

}


function getAllThumbs($target, imgClass){
	var ajax = $.ajax({
		url: "/queryBlobs",
		type: "GET",
		data: {
			query: "all",
			num: "no"
		},
		dataType: "json",
		success: function(data){
			if (data[0].error == "none"){
				sortArray(data, "creationDate", false); 
				for( var i=0; i <data.length; i++ ){
					 appendImg($target, data[i].blobKey, data[i].fileName, data[i].creationDate, data[i].size, imgClass, i);
				} //end data.length for loop
			} // end error check If
		} //end success function
	}); // end ajax call to "/query"
	
}


function appendImg( $target, blobKey, filename, uploadDate, size, imgClass, index ){
	var src = "/serve?blobKey=" + blobKey;
	$target
		.prepend($("<div>")
			.addClass(imgClass)
			.html("<br><span>" + filename + "</span>")	
			.prepend($("<img>")
				.attr("src", src)
				.attr("id", blobKey)
				.attr("title", filename)
				.attr("alt", filename)
				.addClass(imgClass)
			) //end .append img tag
		) //end .append DIV tag
	; //end $target ...no ) needed
	
	select($target, ">div", false, "single", 0);
	
	var n = 0;
	var elm = "img";
	var parent = "div";
	var checkWidth = setInterval(function(){
		if ($target.find(elm).eq(index).width() != 0 || n > 2000){
			setWidth($target, parent, 1);
			clearInterval(checkWidth);
		}
	},50);
}

function select($target, sel, multi, type, index){
	var $orig = $target.find(sel); //$("#picsDIV > div:first");
	
	if (type == "each"){	
		for (var i=0; i< $orig.length; i++){
			$chld = $orig.eq(i);
			
			var pos = $orig.position()
			//var $clone = $orig.clone();
			$chld.unbind();
			
			selection($chld);
			
		}// end for loop
	} // end if "each"
	else if (type == "single"){
		$orig = $orig.eq(index);	
		selection($orig);
	}
	else if (type== "all"){
		$orig.toggle(function(){
			$orig.addClass("selected");
		},function(){
			$orig.removeClass("selected");
		});
	}
	
	function selection($elm){
		if (!multi){	
			$elm.bind("click", function(){
				$elm.siblings().removeClass("selected");
				$elm.toggleClass("selected");	
			});
		}else {
			$elm.toggle(
				function(){
					$elm.addClass("selected");
					
				},function(){
					$elm.removeClass("selected");
				}
			); //end toggle function
		}//end if multi
	}// end function selection($elm)
		
}


function setWidth($parent, elm, factor){ //set parent width based on width of child elements
	var $elms = $parent.find(elm);
	var totalW = 0;
	
	for (var i=0; i< $elms.length; i++){
		var w = $elms.eq(i).outerWidth();
		totalW += w*1.25/factor;
	}
	$parent.css("width", totalW);
	return totalW;
}


function sortArray(array, field, reverse, primer){
	if (field == "uploadDate"){
		for (var i = 0; i<array.length; i++){
			array[i].sortDate = $.datepicker.formatDate( "@", new Date(array[i].uploadDate));
		}
		field = "sortDate";
	}
	
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

function getShortUrl(input, $target){
	var apiKey = 'AIzaSyCcXfh_zwxQ-jGFLum6DI2SrtPvP8XmSug';
	gapi.client.setApiKey(apiKey);
	var longurl = input;
	var shortUrl = "error";
	
	gapi.client.load('urlshortener', 'v1', function() {
	    var request = gapi.client.urlshortener.url.insert({
	        'resource': {
	            'longUrl': longurl
	        }
	    });
	    
	    var resp = request.execute(function(resp) {
	        if (resp.error) {
	            $target.val('Error. ' + resp.error.message);
	        } else {
	            $target.val(resp.id);
	            shortUrl = resp.id;
	        };
	    });
	});
}

