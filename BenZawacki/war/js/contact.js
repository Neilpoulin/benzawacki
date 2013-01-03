$(document).ready(function(){
	$("#btnGetUrl").click(function(){
		var longurl = $("#longUrl").val();
		var shorturl = getShortUrl(longurl, $("#show"));
	});
});


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
	            $target.html('Error. ' + resp.error.message);
	            console.log("error = " + resp.error.message);
	        } else {
	            $target.html("("+longurl+"): " + resp.id);
	            console.log("id = " + resp.id);
	            shortUrl = resp.id;
	        };
	    });
	});
}






