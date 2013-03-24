$("#articlesDIV").hide();
$("#socialSidebar").hide();
$("#navSidebar").hide();
$(document).ready(function(){
	window.articlesCollection = new ArticleCollection();
	articlesCollection.on("sync", function(collection){
		collection.each(function(model, i){
			$("#articlesDIV").prepend( templates.articles.article(model.toJSON()) );
			if (getURLParameter("id") != null){
				var id = getURLParameter("id");
				$(".article").not("#" + id).addClass("hidden");
			}
			
		});
	});
	articlesCollection.fetch({update: true});
	
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
	
	
	
//	$("button.btn-navbar").click(function(){
//		
//		if (!$("div.nav-collapse").hasClass("in")){
////			$("#toolbar").css("top", $("div.nav-collapse.collapse").height());
//			$("#toolbar").addClass("in");
//		}else{
////			$("#toolbar").css("top", "");
//			$("#toolbar").removeClass("in");
//		}
//	});
	
}); //end document ready function

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
