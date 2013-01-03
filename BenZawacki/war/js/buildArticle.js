
function insertArticle(data){
	var tagList = tags(data.tags);
		var html = "";
		
		var taghtml = "<p>";
		if (tagList.length > 0){
			taghtml = "<p class='tag'>tags: ";
		}
		for (var j=0; j<tagList.length; j++){
			taghtml += "<span class='tag'>" + tagList[j] + "</span>";
			if (j != tagList.length-1){
				taghtml += ", ";
			}
		}
		taghtml += "</p>";
		
		var img = "";
		if (data.blobKey == ""){
		} else {
			img = "<img class='thumb article title"+ "'src='/serve?blobKey="+ data.blobKey + "'/>";
		}
		
		var href = '/article.jsp?num=1&amp;index='+data.index+'&amp;dir=descending'
		var url = 'http://www.benzawacki.com' + href;
		var shorturl = data.shortUrl; 
		
		html += img
			+"<h2>"+data.title + "</h2>"
			+ "<p class='date'>" + data.postDate + " | "+ data.location +"</p>"
			+ taghtml;
			
			if (data.summary == ""){
				html += "<div class='summary nodisplay'> " + data.summary + "</div>";
			} else{
				html += "<div class='summary'> " + data.summary + "</div>";
			}
			
		
		if (data.content == ""){
			html += 	
				 "<div class='clear'></div>"
				+ "<div class='content nodisplay'>" + "</div>"
				+ "<div class='fb-comments' data-href='"+ shorturl +"' data-num-posts='7' data-width='400'></div>";
		} else {
			html += 
				"<div class='clear'></div>" 
				+ "<button class='expand'>Toggle Content</button>"
				+ "<div class='clear'></div>"
				+ "<div class='content'>" 
					+ data.content 
					+ "<br><hr>"
					+"<div class='fb-comments' data-href='"+ shorturl +"' data-num-posts='7' data-width='400'></div>"
				+ "</div>";
		}
		
		html += 
			'<div class="socialDIV">'
				+ '<div class="container-tweet"><a href="https://twitter.com/share?url='+shorturl+'&text='+"Check out this article from Ben Zawacki\'s website"+'&via=benzawacki" class="twitter-share-button" data-url="' + shorturl + '" data-text="Check out this article from Ben Zawacki\'s website" data-via="BenZawacki" data-size="medium" data-lang="en"  data-counturl="'+ url +'">Tweet</a></div>'
				+ '<div class="container-plusone"><div class="g-plusone" data-size="medium" data-href="' + shorturl + '"></div></div>'
				+ '<div class="fb-like" data-href="' + shorturl + '" data-send="true" data-layout="button_count" data-width="150" data-show-faces="false"></div>'
			+'</div>';
	
		return html;
}

function buildArticle(setup, $container, hideInitial, time, callback){
		$container.find("div.article:not(.server)").each(function(index, elm){
			if (setup){
				$(elm).waitForImages(function(){	
					
					var $elm = $(elm);
					if (setup && hideInitial){
						$("div.content").addClass("hiding").removeClass("showing");
						$elm.find("button.expand span").html("See More");
					} else if (setup && !hideInitial){
						$("div.content").addClass("showing").removeClass("hiding").show();
						$elm.find("button.expand span").html("See Less");		
					}
					if (! $elm.find("div.content div:last").hasClass("clear full")){
						$elm.find("div.content").append($("<div>").addClass("clear full"));
					}
					//$elm.unbind("click");
					var height = build($elm, setup, hideInitial);
					bind($elm, height, setup);
					
					$elm.find("button.expand").hover(function(){
						$(window).resize();
					}, function(){});
					loadSocial();
					callback();	
				});	//end wait for images
			} else{
				var $elm = $(elm);
				if ($elm.find("div.content").hasClass("hiding")){
					$elm.find("button.expand span").html("See More");
				} else{
					$elm.find("button.expand span").html("See Less");
				}
				
				
				$elm.unbind("click");
				var height = build($elm, setup, hideInitial);
				bind($elm, height, setup);			
			}			
		}); // end .each()
		
		function build($elm, setup, hideInitial){
			var $content = $elm.find(">div.content");
			$content.removeClass("animateHeight");
			var initHeight = $content.show().outerHeight();
			var newHeight = $content.css({height: ""}).show().outerHeight();
			
			if (setup && !hideInitial){
				$content.css({height: "" });
			}else if ($content.hasClass("hiding")){
				$content.css({height: 0});
			} else if ($content.hasClass("showing")){
				$content.removeClass("animateHeight");
				$content.css({height: newHeight});
			}  			
			return newHeight;
		}
		
		function bind($elm, height){
			var contentHeight = height;
			var $content = $elm.children(".content");
			
			$elm.children("button:first").unbind("click").bind("click", function(){					
				$text = $elm.children(".content");
					if($text.height() > 0){
						$text.css({height: contentHeight});
					} else {
						//$text.css({height: 0});				
					}
				
				setTimeout(function(){
					$content.addClass("animateHeight");
					if ($text.hasClass("showing")){
						$text.removeClass("showing").addClass("hiding").css({height: 0, opacity: 1});
						$elm.find("button.expand span").html("See More");
	
					} else if ($text.hasClass("hiding")){
						$text.removeClass("hiding").addClass("showing").css({height: contentHeight, opacity: 1});
						$elm.find("button.expand span").html("See Less");
					}
				}, 100);				
			}); //end bind
			
			$container.find("div.article:not(.server)")
				.hover(function(){
					$(this).css({"cursor": "default"});
				}, //end mose over 
				function(){ 
					$(this).css({"cursor": "default"});
				} // end mouse out
			);				
		}//end function bind
		
		function bindTagClick($tags){
			$tags.children("span").click(function(){
				var txt = $(this).text().trim();
				var $filter = $("#tagsDIV a:contains(" + txt + ")");
				$filter.click();
				$(this).removeClass("and or filter").addClass($filter.parent().attr("class"));
				
			});			
		}	
		if (setup){
			bindTagClick($container.find("p.tag"));
			$("#clearTags").click(function(){
				$("#tagsUL li").removeClass("and or filter");
				filterTag();
			});
		}
}

function elementCurrentStyle(element, styleName){
    if (element.currentStyle){
        var i = 0, temp = "", changeCase = false;
        for (i = 0; i < styleName.length; i++)
            if (styleName[i] != '-'){
                temp += (changeCase ? styleName[i].toUpperCase() : styleName[i]);
                changeCase = false;
            } else {
                changeCase = true;
            }
        styleName = temp;
        return element.currentStyle[styleName];
    } else {
        return getComputedStyle(element, null).getPropertyValue(styleName);
    }
}


function tags(tags){
	var tagList = [];
	if (tags != undefined){
		var input = tags.split(",");
		input.sort();
		for (var i=0; i < input.length; i++){
			var html = $.trim(input[i]);
			if (html.length == 0){
				continue;
			}
			tagList.push(html);
			if ($("#tagsDIV li[id$='"+html+"']").length != 0){
				continue;
			}
			$("#tagsUL")
				.append("<li>")
				.find("li:last")
					.disableSelection()
					.attr("id", "tag" + html)
					.append("<a>")
						.find(">a")
						.html(html)
						.click(function(){
							$li = $(this).parent();
							if (!$li.hasClass("filter")){
								$li.addClass("filter");
							}		
							if ($li.hasClass("or")){
								$li.removeClass("or").addClass("and");
							} else if ($li.hasClass("and")){
								$li.removeClass("and").removeClass("filter");
							} else {
								$li.addClass("or");
							}
							filterTag();
						})
						.disableSelection()
						.hover(function(){
							$(this).addClass("hover");
						},function(){
							$(this).removeClass("hover");
						});
		} //end input.length loop		
		var mylist = $('#tagsUL');
		var listitems = mylist.children('li').get();
		listitems.sort(function(a, b) {
		   return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
		})
		$.each(listitems, function(idx, itm) { mylist.append(itm); });	
		
		return tagList.sort();
	}
	else{
		var mylist = $('#tagsUL');
		var listitems = mylist.children('li').get();
		listitems.sort(function(a, b) {
		   return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
		})
		$.each(listitems, function(idx, itm) { mylist.append(itm); });
		
		$tags = $("#tagsUL li a");
		for (var i=0; i < $tags.length; i++){
			tagList.push($tags.eq(i).html());
		}
		return tagList;
	}
}

function filterTag(){
	$tags = $("#tagsUL li.filter");
	$and = $("#tagsUL li.and");
	$or = $("#tagsUL li.or");
	
	$("#articlesDIV div.noResults").remove();
	
	$articles = $("#articlesDIV div.article");
	$articles.hide();
	if ($tags.length == 0){
		$articles.fadeIn();
	}
	
	$articles.find("span.tag").removeClass("and or");
	
	$("#articlesDIV div.article").each(function(index, elm){	
		for (var i=0; i < $and.length; i++){
			var tag = $and.eq(i).text();
			var show = false;	
			$articles.find("span.tag:contains("+tag.toLowerCase() +")").removeClass("and or").addClass("and");
			$elm = $(elm);
		 	if ($elm.find("span.tag:contains("+tag.toLowerCase() +")").length > 0){
		 		$(this).show();
		 		show = true;
		 	} else{
		 		$(this).hide();
		 		show = false;
		 		return;
		 	} 		 		
		}
	}); // end each div		
	
	for (var i=0; i < $or.length; i++){
		var tag = $or.eq(i).text();
		$articles.find("span.tag:contains("+tag.toLowerCase() +")").removeClass("and or").addClass("or");
		$("#articlesDIV div.article").each(function(index, elm){
		$elm = $(elm);
		 	if ($elm.find("span.tag:contains("+tag+")").length > 0){
		 		$(this).show();
		 	} else{
		 		//$(this).hide();
		 	} 
		 		
		}); // end each div			
	}//end tags.length loop
	
	if ($("#articlesDIV div.article:visible").length == 0){
		$("#articlesDIV").prepend(
			$("<DIV>").addClass("article").html("<h2>no articles match all selected tags</h2>Try using fewer <i class='and'>'and'</i> filters or adding an <i class='or'>'or'</i> filter").addClass("noResults")
		);
	}
}






