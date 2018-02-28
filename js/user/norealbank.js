$(function() {
	var accessToken = constans.accessToken;
	var mobile = $.cookie("userName");
	$('.input_p').bind('input propertychange', function() {
		var name = $("#bank_name").val();
		var num = $("#bank_num").val();		
		var card = $("#bank_card").val().replace(/[ ]/g, "");

		if(num != "") {
			$("#bank_num").next(".close").show();
		}
		if(card != "") {
			$("#bank_card").next(".close").show();
		}
		if(name != "" && num != "" && (/^[0-9A-Za-z]{15,}$/.test(num))) {
			$(".bank_money").removeAttr("disabled");
			$(".bank_money").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
			$(".bank_money").css("background-size", "100% 100%");

		} else {
			$(".bank_money").attr("disabled", "disabled");
			$(".bank_money").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
			$(".bank_money").css("background-size", "100% 100%");

		}
		if(card != "" && (/^[0-9]{12,32}$/.test(card))) {
			$(".bank_money1").removeAttr("disabled");
			$(".bank_money1").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
			$(".bank_money1").css("background-size", "100% 100%");
		} else {
			$(".bank_money1").attr("disabled", "disabled");
			$(".bank_money1").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
			$(".bank_money1").css("background-size", "100% 100%");
		}

	})

	$(".explain").on("click", function() {
		$(".hide").show();
		$(".show").hide();
	})
	$('#bank_card').on('keyup mouseout input', function() {
		var $this = $(this),
			v = $this.val();
		/\S{5}/.test(v) && $this.val(v.replace(/\s/g, '').replace(/(.{4})/g, "$1 "));
	});
	//清空input框
	$(".close").on("click", function() {
		$(this).prev("input").val("");
		$(this).hide();
		$(".bank_money").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
		$(".bank_money").css("background-size", "100% 100%");
		$(".bank_money").css("color", "#888")
	})
	$(".bank_money").on("click", function() {
		$(".user_message").hide();
		$(".user_message1").show();
	})
	$(".bank_money1").on("click", function() {
		var bank_num = $("#bank_num").val();
		var bank_name = $("#bank_name").val();
		var bank_card = $("#bank_card").val().replace(/[ ]/g, "");
		var data = {
			accNo: bank_card,
			idCard: bank_num,
			idHolder: bank_name,
		};
		$.ajax({
			url: constans.serviceUrl + '/credit/fourbindcard14',
			type: "post",
			data: data,
			headers: {    
				loginTerm: "wx" ,
				rand: Math.round(Math.random() * 89999) + 10000,
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
				if(data.code == '500') {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {
						$("#mode").hide();
					}, 2000)
				}
				if(data.code == '200') {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {
						if(localStorage.getItem("isAuth") == 0){
							localStorage.removeItem("isAuth");
							window.location = constans.htmlUrl + "/html/home/tixian.html";
						}else{
							window.location = constans.htmlUrl + "/html/user/bankInfoList.html";
						}
						$("#mode").hide();
					}, 2000)
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
	$(".close1").on("click", function() {
		$(".hide").hide();
		$(".show").show();
	})
})