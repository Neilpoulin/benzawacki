
function setButtonText($parent, text){
	$parent.find("button.expand").each(function(){
		$(this).html(text);
	});
}

function refreshArticles(){
	buildArticle(false, $("#articlesDIV"), true, 1000, function(){
		$("#articlesDIV").css({ opacity: 1 });
	});
}

function buildArticle(setup, $container, hideInitial, time, callback){
		$container.find("div.article:not(.server)").each(function(index, elm){
			if (setup){
				$(elm).waitForImages(function(){						
					var $elm = $(elm);
					var text;
					if (setup && hideInitial){
						$("div.content").addClass("hiding").removeClass("showing");
						text = "Show More";
					} else if (setup && !hideInitial){
						$("div.content").addClass("showing").removeClass("hiding").show();
						
						text = "Show Less";
					}
					setButtonText($elm, text);
					if (! $elm.find("div.content div:last").hasClass("clear full")){
						$elm.find("div.content").append($("<div>").addClass("clear full"));
					}
					//$elm.unbind("click");
					var height = build($elm, setup, hideInitial);
					bind($elm, height, setup);
					
					$elm.find("button.expand").each(function(){
						$(this).on("click mouseover", function(){
							refreshArticles();
						});
					});
					loadSocial();
					callback();	
				});	//end wait for images
			} else{
				var $elm = $(elm);
				var text;
				if ($elm.find("div.content").hasClass("hiding")){
//					$elm.find("button.expand").html("See More");
					text = "Show More";
				} else{
//					$elm.find("button.expand").html("See Less");
					text = "Show Less";
				}
				setButtonText($elm, text);				
				
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
			
			$elm.find("button.expand").each(function(){
				$(this).unbind("click").bind("click", function(){								
				$text = $elm.children(".content");
					if($text.height() > 0){
						$text.css({height: contentHeight});
					} else {
						//$text.css({height: 0});				
					}
				
				setTimeout(function(){
					$content.addClass("animateHeight");
					var text;
					if ($text.hasClass("showing")){
						$text.removeClass("showing").addClass("hiding").css({height: 0, opacity: 1});
//						$elm.find("button.expand").html("See More");
						text = "Show More";
	
					} else if ($text.hasClass("hiding")){
						$text.removeClass("hiding").addClass("showing").css({height: contentHeight, opacity: 1});
//						$elm.find("button.expand").html("See Less");
						text = "Show Less";
					}
					setButtonText($elm, text);
				}, 100);				
			});
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






