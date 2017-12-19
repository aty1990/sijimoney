$(function() {
	var accessToken = constans.accessToken;
	
	if(typeof(accessToken) != "undefined") {
		$(".shutdown").on("click", function() {
			window.location.href=constans.serviceUrl + '/sigOut';
			
		})
	} else {
		console.log("没有登录")
	}

})