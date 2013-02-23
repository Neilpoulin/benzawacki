$("#articlesDIV").hide();
$("#socialSidebar").hide();
$("#navSidebar").hide();
$(document).ready(function(){
	getArticles();	
	$(window).load(function(){		
		$("#articlesDIV").fadeIn("fast");
		$("#socialSidebar").fadeIn("fast");
		$("#navSidebar").fadeIn("fast");
		refreshArticles();
	});	
	
	$("#tagsDIV").hide();
	$("#filterBtn").click(function(){
		$("#tagsDIV").toggle("slide");
	});
	
	$("#articlesDIV, #socialSidebar").click(function(){
		if ($("#tagsDIV").is(":visible")){			
			$("#filterBtn").click();			
		}
	});
	
	$("button.btn-navbar").click(function(){
		
		if (!$("div.nav-collapse").hasClass("in")){
//			$("#toolbar").css("top", $("div.nav-collapse.collapse").height());
			$("#toolbar").addClass("in");
		}else{
//			$("#toolbar").css("top", "");
			$("#toolbar").removeClass("in");
		}
	});
	
}); //end document ready function

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
				$("#articlesDIV button").addClass("btn");	
				refreshArticles();
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