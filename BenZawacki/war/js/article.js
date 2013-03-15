
$(document).ready(function(){
	var params = window.location.href.split("?")[1];
	params = params.split("&");
	var req = {};
	for (i=0; i<params.length; i++){
		var temp = params[i].split("=");
		req[temp[0]] = temp[1];
	}
	console.log(req);
	getArticle(req.index, req.num, req.dir, req.id);
	
	$(window).resize(function(){
		buildArticle(false, $("#articlesDIV"), true, 500, function(){
			$("#articlesDIV").css({ opacity: 1 });
		});
	});
	$("<li><a></a></li>")
		.find("a")
		.attr('href', window.location.href).html("Article")
		.addClass("ui-widget-header ui-state-active selected")
		.hover(function(){
			$(this).addClass("ui-state-hover");
		},function(){
			$(this).removeClass("ui-state-hover");
		})
		.end()
	.insertBefore($("#tabsDIV li.login:first"));	
	
	var t = 1;
	var tm = setInterval(function(){
		if (t > 0){
			clearInterval(tm);
			console.log("resizing ended");
		}
		t++;
	}, 200);
	
	
}); //end document ready function

function getArticle(index, num, dir, id){
	$.ajax({
		url: "/articleServlet",
		data: {
			num: num,
			start: index,
			direction: dir,
			id: id
		},
		type: "GET",
		dataType: "json",
		success: function(data){
			console.log(data);
			//sortArray(data, "postDate", true);
			for (var i=0; i < data.info.length; i++){
				$("head meta[itemprop='name']").attr("content", "\"Ben Zawacki | " + data.info[i].title + "\"");
				$("head > title").html("Ben Zawacki | " + data.info[i].title);		
				$("#articlesDIV").append($("<div>").addClass("article").attr("id", "article_" + i ).html( data.html[i] ));
			} //end for loop
			$("head > title").html("Ben Zawacki | " + data.info[0].title);
			var extra = "";
			if (data.info.length >1){
				extra = " & " + Number(data.info.length - 1) + " more";
			}
			
			$("#tabsDIV li.login:first").prev().find("a").html("\""+ data.info[0].title +"\"" + extra );
			$("#articlesDIV").css({ opacity: 0 });
			buildArticle(true, $("#articlesDIV"), false, 500, function(){
				$("#articlesDIV").animate({ opacity: 1 }, 500);
				$("#articlesDIV button").button();
			} );		
		} //end success function
	}); //end ajax call
} //end function getArticle



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
	var winW = $(window).width();
	$articles = $("#articlesDIV");
	$main = $("#mainDIV");
	$articles.width(.8*winW);
	//$main.css({ margin: "0 auto 0 auto" });

}







