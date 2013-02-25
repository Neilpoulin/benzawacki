$(document).ready(function(){
	getArticle();
});

function getArticle(){
	$.ajax({
		url: "/articleServlet",
		data: {num: "1", start: "0", direction: "descending" },
		type: "GET",
		dataType: "json",
		success: function(data){
			console.log(data);
			$("#article div.article").html(templates.articles.mainSummary(data.info[0]));

		} //end success function
	});	//end ajax call
}