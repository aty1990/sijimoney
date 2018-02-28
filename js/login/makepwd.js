$(function() {
	//清空input框
	$(".close").on("click", function() {
		$(this).prev("input").val("");
		$(this).hide();
		$(".login_style").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
		$(".login_style").css("background-size", "100% 100%");

	})
	$(".pwd1").on("click", function() {
		if($("#password1").attr("type") == "password") {
			$("#password1").attr("type", "text");
			$(this).find('img').attr("src", "../../images/ico_show@2x.png");
		} else {
			$("#password1").attr("type", "password");
			$(this).find('img').attr("src", "../../images/ico_hide@2x.png");
		}
	})
	$(".pwd2").on("click", function() {
		if($("#password2").attr("type") == "password") {
			$("#password2").attr("type", "text");
			$(this).find('img').attr("src", "../../images/ico_show@2x.png");
		} else {
			$("#password2").attr("type", "password");
			$(this).find('img').attr("src", "../../images/ico_hide@2x.png");
		}
	})
	$(".pwd3").on("click", function() {
		if($("#password3").attr("type") == "password") {
			$("#password3").attr("type", "text");
			$(this).find('img').attr("src", "../../images/ico_show@2x.png");
		} else {
			$("#password3").attr("type", "password");
			$(this).find('img').attr("src", "../../images/ico_hide@2x.png");
		}
	})
	$('.input_p').bind('input propertychange', function() {
		var password1 = $("#password1").val();
		var password2 = $("#password2").val();
		var password3 = $("#password3").val();
		if(password1 != "") {
			$("#password1").next(".close").show();
		}
		if(password2 != "") {
			$("#password2").next(".close").show();
		}
		if(password3 != "") {
			$("#password3").next(".close").show();
		}
		if(password1 != "" && password2 == password3 && password3 != "" && password2 != "") {
			$(".sure_pwd").removeAttr("disabled");
			$(".sure_pwd").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
			$(".sure_pwd").css("background-size", "100% 100%");

		} else {
			$(".sure_pwd").attr("disabled", "disabled");
			$(".sure_pwd").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
			$(".sure_pwd").css("background-size", "100% 100%");

		}
	})
	var accessToken = constans.accessToken;
	var userId = sessionStorage.getItem("userId");
	$(".sure_pwd").on("click", function() {
		var newPwd = $('#password2').val();
		var oldPwd = $('#password1').val();
		var userPwd1 = hex_md5(newPwd);
		var userPwd2 = hex_md5(oldPwd);
		if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(newPwd))) {
			$("#mode").show();
			$("#mode").html("密码应为6-20位数字、字母或特殊符号");
			setTimeout(function() {
				$("#mode").hide();
			}, 3000);
		} else {
			var data = {
				newPwd: userPwd1,
				oldPwd: userPwd2,
				userId: userId
			};
			$.ajax({
				url: constans.serviceUrl + '/user/modpwd',
				type: "post",

				data: data,
				headers: {
					loginTerm: "wx",
					accessToken: accessToken,
					jhVer: "2.0",
					rand: Math.round(Math.random() * 89999) + 10000,
				},
				beforeSend: function() {
					$("body").Loading("show");
				},
				complete: function() {
					$("body").Loading("hide");
				},
				success: function(data) {
					console.log(data);
					if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
					if(data.code == 500) {
						$("#mode").show();
						$("#mode").html(data.msg);
						setTimeout(function() {
							$("#mode").hide();
						}, 3000);
					} else {
						window.location = constans.htmlUrl + "/index";
					}

				}
			})
		}

	})

})