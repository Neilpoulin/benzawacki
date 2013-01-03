$(document).ready(function(){
	var pathname = window.location.pathname;	
	
	var textlogo = "/data/images/text-header-logo.png";
	var beachHeader = "/data/images/Picture6.jpg";
	
	
	var currentLogo = textlogo;
	
	var mainImagePath = currentLogo;
	var adminImagePath = ".." + currentLogo;
	
	if (currentLogo.substring(0,4) == "http"){
		mainImagePath = currentLogo;
		adminImagePath = currentLogo;
	}
	
	$("#tabsDIV").addClass("ui-widget-header");
	
	$("#tabsDIV li a")
		.hover(function(){
				$(this).addClass("ui-state-hover");
			},function(){
				$(this).removeClass("ui-state-hover");
			})
		.addClass("ui-widget-header");
	
	$("#titleText").click(function(e){
		e.preventDefault();
	})
	
	$("a").filter("[href='" + pathname + "']").addClass("ui-state-active selected").closest("ul.subnav").siblings("a").addClass("ui-state-active selected");	
	
	window.winW = 630;
	window.winH = 460;
	windowSize();
	titleImgCSS();
	
	$(window).resize(function(){
		windowSize();
		titleImgCSS();
	});

	if (/^\/\admin/i.test(pathname)){
		$("#titleImg").attr('src', function(i, title){
			return adminImagePath;
		});
		$("li.admin a").attr('href', function(){
			//return '..' + $(this).attr('href');
			return $(this).attr('href');
		});
	} else {
		$("#titleImg").attr("src", function(i, title){	
			return mainImagePath;
		});
		$("li.admin a").attr('href', function(){
			return $(this).attr('href');
		});
	}
	window.isAdmin = false;
	window.loggedIn = false;
	if ($('#admin:contains("true")').text()){
		isAdmin = true;
		$("li.admin").css({
				'display': 'inline',
				'float': 'right'
			}).filter(":first").css("margin-left", "0em");
	} else {
		isAdmin = false;
		$("li.admin").css("display", "none");
	}
	
	$("li.login").css({
		'display': 'inline',
		'float': 'right'
	});
	
	if ( $('#loggedIn:contains("true")').text() ){
		loggedIn = true;
		$("li.login a").html("Sign Out").attr("href", $("#logoutURL").html().trim());
	} 
	
	//$("ul.subnav").parent().append("<span class='ui-icon ui-icon-triangle-1-s'></span>"); //Only shows drop down trigger when js is enabled (Adds empty span tag after ul.subnav*)
	$("ul.subnav").parent().hover(function(){
		$(this).find("a span").css({ //mouse hovering 
			'background-image': 'url(../stylesheets/ui-lightness/images/ui-icons_ffffff_256x240.png)', 
			'background-position': '-64px -16px',
			'margin': '.3em 0 0 0'
			});
		$(this).find("ul.subnav").stop(true, true).slideDown('fast').show(); //Drop down the subnav on hover
	},	function(){ //mouse out
			$(this).find("a span").css({'background-position': '-32px -16px','margin': '.1em 0 0 0' });
			$(this).parent().find("ul.subnav").stop(true, true).slideUp('fast'); //When the mouse hovers out of the subnav, move it back up
		}
	);
	
	noticeShift();
	
});

function noticeShift(){
	$("#loginDIV").css({ marginTop: $("#headNotice").height() + 25 });
	
}

function titleImgCSS(){
	$("#titleImg").css({
		"max-width" : winW*.95
	});
}
function windowSize(){
	winW = 630;
	winH = 460;
	if (document.body && document.body.offsetWidth) {
	 winW = document.body.offsetWidth;
	 winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
	    document.documentElement &&
	    document.documentElement.offsetWidth ) {
	 winW = document.documentElement.offsetWidth;
	 winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
	 winW = window.innerWidth;
	 winH = window.innerHeight;
	}
}
