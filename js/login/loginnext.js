$(function() {
	//清空input框
	$(".close").on("click", function() {
		$(this).prev("input").val("");
		$(this).hide();
		$(".login_style").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
		$(".login_style").css("background-size", "100% 100%");	
		
	})
	
	if($.cookie('userName')){
		var userName = $("#tell").val($.cookie('userName'));
		$(".register_next").removeAttr("disabled");
		$(".register_next").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
		$(".register_next").css("background-size", "100% 100%");
		
	}
	if(localStorage.getItem("register") == 1){
		var userName = $("#tell").val($.cookie('userName'));
		$(".register_next").removeAttr("disabled");
		$(".register_next").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
		$(".register_next").css("background-size", "100% 100%");
			
	}
	
     var userName = $("#tell").val();		
		if(userName != "") {
			$("#tell").next(".close").show();
		}		
		if(userName != "" && (/^1[34578]\d{9}$/.test(userName))) {
			$(".register_next").removeAttr("disabled");
			$(".register_next").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".register_next").css("background-size", "100% 100%");
			
		} 
		
    $('.input_p').bind('input propertychange', function() {
		var userName = $("#tell").val();		
		if(userName != "") {
			$("#tell").next(".close").show();
		}		
		if(userName != "" && (/^1[34578]\d{9}$/.test(userName))) {
			$(".register_next").removeAttr("disabled");
			$(".register_next").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".register_next").css("background-size", "100% 100%");
			
		} else {
			$(".register_next").attr("disabled", "disabled");
			$(".register_next").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".register_next").css("background-size", "100% 100%");
			
		}		
	})
	//  检查手机格式
	function tellcheck() {
		var userName = $("#tell").val();
		if(userName == "") {
			return false;
		} else if(!(/^1[34578]\d{9}$/.test(userName))) {
			return false;
		} else {
			$(".register_next").removeAttr("disabled");
			$(".register_next").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".register_next").css("background-size", "100% 100%");
			
			return true;
		}
	}
	
	$(".register_next").on("click", function() {
		var userName = $("#tell").val();
		
		$.cookie('userName',userName, { expires: 30, path: '/' });				
		if(tellcheck()){
			var userMob = $('#tell').val();
			var data = { userMob: userMob };
			$.ajax({
				url: constans.serviceUrl + '/user/mobver',
				type: "post",
				
				data: data,
				headers: { 						  						
					loginTerm: "wx",
					rand: Math.round(Math.random()*89999) + 10000,
				},
				beforeSend: function() {
					$("body").Loading("show");
				},
				complete: function() {
					$("body").Loading("hide");
				},
				success: function(data) {						
					if(data.code == '500') {                        						
						window.location=constans.htmlUrl+"/html/login/login.html";						
					}else{
						window.location=constans.htmlUrl+"/html/login/register.html";					
					}
				}
			})
         }
	   })
								   
})