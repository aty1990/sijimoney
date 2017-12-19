getUserId = function() {
	//登录后权限验证
	var accessToken = constans.accessToken;	
	if(typeof(accessToken) != 'undefined') {
		var data = { accessToken: accessToken };		
		$.ajax({
			url: constans.serviceUrl + '/support/verUser',
			type: "post",
			async: true,
			data: data,
			headers: {    
				loginTerm: "wx" ,
				accessToken: accessToken,
                rand: Math.round(Math.random()*89999) + 10000,				
				jhVer:"2.0" 
			},
			beforeSend: function() {
				$("body").Loading("show");
			},
			complete: function() {
				$("body").Loading("hide");
			},
			success: function(data) {				
				var userId=data.body.userId;
				var userStat=data.body.userStat;
		  		sessionStorage.setItem("userId",userId);
		  		sessionStorage.setItem("userStat",userStat);
		  		if(data.code == 111){
			  		window.location = constans.htmlUrl + "/html/login/loginnext.html";
			  	}
			}
		})
	}
}