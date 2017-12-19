$(function() {
	var accessToken = constans.accessToken;
	var userId = sessionStorage.getItem("userId");
	
	var index=1;
	$(".edit").on("click", function() {
		if(index++%2==1){
		  $(".user_name").removeAttr("disabled");
		  $(".user_name").focus();
		}else{
		  $(".user_name").attr("disabled","disabled");
		  $(".user_name").blur();
		}
	})


	
	//  渲染身份页面详情
	var data = {
		userId: userId
	};
	$.ajax({
		url: constans.serviceUrl + '/credit/detailUserInfo',
		type: "post",
		async: true,
		data: data,
		headers: {    
			loginTerm: "wx" ,
			rand: Math.round(Math.random()*89999) + 10000,
			accessToken: accessToken,
			jhVer: 2.0 
		},
		beforeSend: function() {
			$("body").Loading("show");
		},
		complete: function() {
			$("body").Loading("hide");
		},
		success: function(data) {
			if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
			if(data.code == 500) {
				console.log(data.msg)
			} else {
				
				if(data.body.rnAuth == 1){				
					$('.pic_front').attr('src',data.body.idCardFront);
					$('.pic_back').attr('src',data.body.idCardBack);
					$(".file_back").hide();
					$(".file_front").hide();
					$(".prompt").hide();
					$(".user_keep").hide();
					$(".edit").hide();
					$(".photograph_left").find("p").html("身份证正面");
					$(".photograph_right").find("p").html("身份证反面");
				}				
				$(".user_name").val(data.body.userName);				
				$(".user_number").html(data.body.userCard);
				$(".user_address").html(data.body.cardAddr);
				
                
			}

		}
	})
})