$("#articlesDIV").hide();
$("#socialSidebar").hide();
$("#navSidebar").hide();
$(document).ready(function(){
	getArticles();
	formatPage();
	
	$(window).resize(function(){
		formatPage();
		buildArticle(false, $("#articlesDIV"), true, 1000, function(){
			$("#articlesDIV").css({ opacity: 1 });
		});
	});
	
	$(window).load(function(){
		$(window).resize();
		$("#articlesDIV").fadeIn("fast");
		$("#socialSidebar").fadeIn("fase");
		$("#navSidebar").fadeIn("fast");
		formatPage();
		$("#articlesDIV button").hover(function(){
			$(window).resize();
		}, function(){});
	});
		
}); //end document ready funciton


function getArticles(){
	$.ajax({
		url: "/articleServlet",
		data: {num: "all", start: "0", direction: "descending" },
		type: "GET",
		dataType: "json",
		success: function(data){
			console.log(data);
			sortArray(data.info, "postDate", true);
			$("#pageWrapper").css({opacity: 0});
			for (var i=0; i < data.info.length; i++){
				$("head > title").html("Ben Zawacki | " + data.info[i].title);
				$("head meta[itemprop='name']").attr("content", "\"Ben Zawacki | " + data.info[i].title + "\"");
				$("#articlesDIV").append($("<div>").addClass("article").attr("id", "article_" + i ).html( data.html[i] ));
				tags(data.info[i].tags);
			} //end for loop	
			$("head > title").html("Ben Zawacki | News");
				$("div.content").addClass("hiding");
				buildArticle(true, $("#articlesDIV"), true, 1000, function(){
					$("#pageWrapper").animate({ opacity: 1 }, 500);
					
				});	
				$("#articlesDIV button").button();	
		} //end success function
	});	//end ajax call
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


function formatPage(){
	var $articles = $("#articlesDIV");
	var $nav = $("#navSidebar");
	var $social = $("#socialSidebar");
	
	var socialNorm = "25%";
	var navNorm = "15em";
	var winW = $(window).width();
	
	$nav.width(navNorm);
	$social.width(socialNorm);
	
	var articleMinWidth = 570;
	$articles.css({minWidth: articleMinWidth});
	
	$social.offset({top: $social.offset().top, left: $articles.offset().left + $articles.width()});
	$body = $articles.parent();
	
	$articles.outerWidth($body.innerWidth() -$nav.outerWidth() - $social.outerWidth());
	
	if ($articles.width() <= articleMinWidth ){
		$articles.outerWidth($body.innerWidth() -$nav.outerWidth());
		$social.outerWidth($articles.outerWidth());
		$social.position({
			of: $articles,
			my: "left bottom",
			at: "left top",
			offset: 0,
			collision: ""
		});
		
	} else{
		$social.width(socialNorm);
		$social.position({
			of: $articles,
			my: "left top",
			at: "right top",
			offset: 0,
			collision: "none"
		});
	}
	
	if ( $nav.position().top < $articles.position().top){
		$articles.outerWidth($body.innerWidth());
		$nav.outerWidth($body.innerWidth());
		$social.outerWidth($body.innerWidth());		
	}	
	
}



 










