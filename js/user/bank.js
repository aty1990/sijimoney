$(function() {
	var accessToken = constans.accessToken;
	$('.input_p').bind('input propertychange', function() {
		var name = $("#bank_name").val();
		
		var card = $("#bank_card").val().replace(/[ ]/g, "");
		if(name != ""  && card != "" && (/^[0-9]{12,32}$/.test(card))) {
			$(".bank_money").removeAttr("disabled");
			$(".bank_money").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".bank_money").css("background-size", "100% 100%");

		} else {
			$(".bank_money").attr("disabled", "disabled");
			$(".bank_money").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".bank_money").css("background-size", "100% 100%");

		}
	})
    var data = { accessToken: accessToken };
		$.ajax({
			url: constans.serviceUrl + '/support/verUser',
			type: "post",
			async: true,
			data: data,
			headers: {    
				loginTerm: "wx" ,
				rand: Math.round(Math.random()*89999) + 10000,
				accessToken: accessToken,
				jhVer: "2.0"
			},
			beforeSend: function() {
				$("body").Loading("show");
			},
			complete: function() {
				$("body").Loading("hide");
			},
			success: function(data) {
				
				$("#bank_name").val(data.body.userName);
			}
		})
	//      
	$('#bank_card').on('keyup mouseout input', function() {
		var $this = $(this),
			v = $this.val();
		/\S{5}/.test(v) && $this.val(v.replace(/\s/g, '').replace(/(.{4})/g, "$1 "));
	});
	$(".explain").on("click", function() {
		$(".hide").show();
		$(".show").hide();
	})

	var click = false;
	$(".bank_money").on("click", function() {
		click = true;
		$(".usera a").attr("href", "#");
		var accNo = $("#bank_card").val().replace(/[ ]/g, "");
		var data = { accNo: accNo }
		$.ajax({
			type: 'post',
			url: constans.serviceUrl + "/credit/bindcard14",
			async: true,
			data: data,
			headers: {    
				loginTerm: 'wx' ,
				rand: Math.round(Math.random() * 89999) + 10000,
				accessToken: accessToken,
				jhVer: '2.0' 
			},
			beforeSend: function() {
				$("body").Loading("show");
			},
			complete: function() {
				$("body").Loading("hide");
			},
			success: function(data) {
				if(!$.trim(data)) {
					setTimeout(function() {
						handler.error();
					}, 3000);
					return true;
				}

				if(data.code == 500) {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {
						$("#mode").hide();
						$(".bank_money").removeAttr("disabled");
					}, 2000);
				}
				if(data.code == 200) {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {
						$("#mode").hide();						
						if(localStorage.getItem("isAuth") == 1){
							localStorage.removeItem("isAuth");
							window.location = constans.htmlUrl + "/html/home/tixian.html";
						}else{
							window.location = constans.htmlUrl + "/html/user/bankInfoList.html";
						}
					}, 2000);
				}
			}
		})

	})
	$.ajax({
		type: 'post',
		url: constans.serviceUrl + "/support/supBankList",
		async: true,
		headers: {    
			loginTerm: 'wx' ,
			rand: Math.round(Math.random() * 89999) + 10000,
			accessToken: accessToken,
			jhVer: '2.0' 
		},
		beforeSend: function() {
			$("body").Loading("show");
		},
		complete: function() {
			$("body").Loading("hide");
		},
		success: function(data) {
			console.log(data);
			var html = template('home_swiper', data);
			$('.bank').html(html);
		}
	})
	if(click == false) {
		$("#bank_yin").val('');
	}
	$(".xieyi").on("click", function() {
		window.location = constans.htmlUrl + "/html/home/hetong.html";
	})
	$(".close").on("click", function() {
		$(".hide").hide();
		$(".show").show();
	})
})