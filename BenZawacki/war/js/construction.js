$(document).ready(function(){
	var admin = $("#admin").text().trim();
	if (admin == "true"){
		$("<div>").html("You are logged in as an Administrator. <a href='/main.jsp'>Continue to Test Page</a>" ).insertAfter($("#mainDIV h1"));
	}
	
});

function getLoginURL(){
	var admin = $("#admin").text().trim();
	var loginURL = "request.getRequestURI()";

	
	if (admin == "true" || admin){
		loginURL = "/main.jsp";
	}
	var href = "<%= userService.createLoginURL("+loginURL+") %>" 
	return href;
}