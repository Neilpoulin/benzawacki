$(document).ready(function(){
	$("#tabsDIV li.admin ul li").each(function(index){
		$(this).clone().appendTo("#adminLinks").children().removeAttr('style').removeClass("ui-widget-header");
	});
	console.log($("#adminLinks"));
});