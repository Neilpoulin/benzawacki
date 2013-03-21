$(document).ready(function(){
	
	window.articleCollection = new ArticleCollection();
	window.imageCollection = new ImageCollection();
	
	window.editArticleView = new EditArticle({
		model: new Article(), 
		el: "#editArticle", 
		collection: articleCollection,
		imageCollection: imageCollection
	});
	
	window.articleListView = new ArticleSummaryList({
		model: articleCollection, 
		el: "#listArticlesDIV ol", 
		editView: editArticleView		
	});
	
	editArticleView.render();
	articleListView.render();

	articleCollection.fetch({update: true});
	
	setTimeout(function(){
		imageCollection.fetch({update: true});
	}, 500);
	
	window.imgArray = [];
	window.imgArrayCt = 0;
	
	$("#articleTags").on('blur change', function(){
		var content = $(this).val().toLowerCase();
		content = content.replace(/"/gm, "");
		$(this).val(content);
	});
	
	$("#thumbsBinDIV").hide();
	$("#submitArticle").button().click(function(){
		$(".article").each(function(){
			$(this).trigger("keyup");
		});
		
	});
	$("#tempImg").clone().appendTo("#articleImg").removeClass("hidden");
	
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
	console.log(html);
	html = html.replace(/"/gi, "");
	$(".active .article.content").val($(".active .article.content").val() + html).trigger("keyup");
	$("#link-modal").modal("hide");
}

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href=$1 target=_blank>$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href=http://$2 target=_blank>$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href=mailto:$1>$1</a>');

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
			$(".imageOptions").append(templates.articles.selectedImagesButtonSet(imgArray[i]));

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

//function setTitleImgBinds(){	
//	$("#articleChooseImg > div").click(function(){
//		if ($(this).hasClass("selected")){
//			var key = $(this).find("img").attr("id");
//			$("#articleKey").val(key);
//			$("#articleImg").empty();
//			$(this).clone().appendTo("#articleImg").removeClass("selected hidden thumb");
//		} else {
//			$("#articleImg").empty();
//			$("#tempImg").clone().css("boxShadow", "").appendTo("#articleImg").removeClass("hidden thumb");
//		}		
//	});	
//}

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

