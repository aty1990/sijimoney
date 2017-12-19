$(function() {
	$("#getcode").click(function() {
		getNote();
	})
	var accessToken = constans.accessToken;
	//验证码倒计时 
	
	function getNote() {
		
		var userMob = $('#tell').val();
		var before = new Date();
		var rsa = new RSAKey();
		rsa.setPublic(constans.regSecKey, '10001');
		var res = rsa.encrypt(userMob);
		var tel = linebrk(hex2b64(res), 64);		
		var data = { userMob: tel, tempId: "10001" };
		
		$.ajax({
			url: constans.serviceUrl + '/support/sendcode',
			type: "post",
			data: data,
			headers: {    
				loginTerm: "wx" ,
				rand: Math.round(Math.random()*89999) + 10000,
				accessToken: accessToken,
				jhVer: 2.0 
			},
			beforeSend: function() {
				$("body").Loading("show");
				setTimeout(function() {
					$("body").Loading("hide");
				}, 3000)
			},
			complete: function() {
				$("body").Loading("hide");
			},
			success: function(data) {				
				if(data.code == '500') {
					$("#mode").show();
					$("#mode").html(data.msg);						
					setTimeout(function() {																			
						$("#mode").hide();
					}, 2000)
				} 
				if(data.code == '200') {
					$("#mode").show();
					$('.get_tId').hide();
					$('.set_time').show();
					var num = 60;
					$('.set_time span').text(num);
					timer = setInterval(function() {
						num--;
						$('.set_time span').text(num);
					}, 1000)
					setTimeout(function() {
						$('.get_tId').show();
						$('.set_time').hide();
						clearInterval(timer);
					}, 60000);
					$(".one1").hide();
					$(".two1").show();
					$(".two").addClass("active-nav")
					$(".one").removeClass("active-nav");
					$("#mode").html(data.msg);						
					setTimeout(function() {																			
						$("#mode").hide();
					}, 2000)
				}
			}
		})
	}

	//手机号input焦点
	$('.input_p').bind('input propertychange', function() {
		var userName = $("#tell").val();
		var newpwd = $(".newpwd").val();
		var sure_newpwd = $(".sure_newpwd").val();
		var smsNum = $("#readcode").val();
		if(userName != "") {
			$("#tell").next(".close").show();
		}
		if(newpwd != "") {
			$(".newpwd").next(".close").show();
		}
		if(sure_newpwd != "") {
			$(".sure_newpwd").next(".close").show();
		}

		if(userName != "" && (/^1[34578]\d{9}$/.test(userName))) {
			$(".getnode").removeAttr("disabled");
			$(".getnode").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".getnode").css("background-size", "100% 100%");

		} else {
			$(".getnode").attr("disabled", "disabled");
			$(".getnode").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".getnode").css("background-size", "100% 100%");

		}
		if(smsNum != "" && (/^\d{6}$/.test(smsNum))) {
			$(".makepwd").removeAttr("disabled");
			$(".makepwd").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".makepwd").css("background-size", "100% 100%");

		} else {
			$(".makepwd").attr("disabled", "disabled");
			$(".makepwd").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".makepwd").css("background-size", "100% 100%");

		}
		if(newpwd != "" && sure_newpwd != "" && newpwd == sure_newpwd && (/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(newpwd))) {
			$(".sure_pwd").removeAttr("disabled");
			$(".sure_pwd").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".sure_pwd").css("background-size", "100% 100%");

		} else {
			$(".sure_pwd").attr("disabled", "disabled");
			$(".sure_pwd").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".sure_pwd").css("background-size", "100% 100%");

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
			
		}
	}
	//手机短信验证码格式
	function smscheck() {
		var smsNum = $("#readcode").val();
		if(smsNum == "") {
			return false;
		} else {
			if(!(/^\d{6}$/.test(smsNum))) {
				return false;
			} else {
				$(".two1").hide();
				$(".three1").show();
				$(".three").addClass("active-nav");
				$(".two").removeClass("active-nav");
			}
		}
	}
	// 检查密码格式
	function pwdcheck() {
		var pwd = $(".bind").val();
		if(pwd == "") {
			return false;
		} else {
			if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(pwd))) {
				return false;
			} else {

			}
		}
	}

	//密码显示与隐藏
	$(".dd1").on("click", function() {
		if($("#password").attr("type") == "password") {
			$("#password").attr("type", "text");
			$('.dd1 img').attr("src", "../../images/ico_show@2x.png");
		} else {
			$("#password").attr("type", "password");
			$('.dd1 img').attr("src", "../../images/ico_hide@2x.png");
		}
	})
	$(".dd").on("click", function() {
		if($(".newpwd").attr("type") == "password") {
			$(".newpwd").attr("type", "text");
			$('.dd img').attr("src", "../../images/ico_show@2x.png");
		} else {
			$(".newpwd").attr("type", "password");
			$('.dd img').attr("src", "../../images/ico_hide@2x.png");
		}
	})
	//清空input框
	$(".close").on("click", function() {
		$(this).prev("input").val("");
		$(this).hide();
		$(".login_style").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
		$(".login_style").css("background-size", "100% 100%");

	})

	//获取验证码
	$(".getnode").click(function() {
		tellcheck();
		getNote();

	})
	//设置密码
	$(".makepwd").on("click", function() {
		
		
		var userMob = $('#tell').val();
		var verCode = $("#readcode").val();					
		var data = {
			userMob: userMob,						
			verCode: verCode			
		};
		$.ajax({
			url: constans.serviceUrl + '/user/modpwdpre',
			type: "post",
			data: data,
			headers: {
				accessToken: accessToken,
				jhVer: 2.0 ,				 
				loginTerm: "wx" ,				   
				rand: Math.round(Math.random()*89999) + 10000,
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
					console.log(data.msg);
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {
						$("#mode").hide();
					}, 3000)
				}else{
					smscheck();
				}
			}
		})
	})

	//确定修改密码
	$(".sure_pwd").on("click", function() {
		var userMob = $('#tell').val();
		var pwd = $("#password").val();
		var verCode = $("#readcode").val();
		var userPwd = hex_md5(pwd);
		var Num = "";
		for(var i = 0; i < 5; i++) {
			Num += Math.floor(Math.random() * 10);
		}
		console.log(Num)
		var data = {
			userMob: userMob,
			userPwd: userPwd,
			rand: Num,
			verCode: verCode,
			jhVer: 2.0,
		};
		$.ajax({
			url: constans.serviceUrl + '/user/resetpwd',
			type: "post",

			data: data,
			headers: {
				accessToken: accessToken,
				jhVer: 2.0 ,				 
				loginTerm: "wx" ,				   
				rand: Math.round(Math.random()*89999) + 10000,
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
					console.log(data.msg);
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {
						$("#mode").hide();
					}, 3000)
				} else {
					$("#mode").show();
					$("#mode").html(data.msg);
					$(".sure_pwd").attr("disabled","disabled");
					setTimeout(function() {
						window.location = constans.htmlUrl + "/index.html";
						$("#mode").hide();
					}, 3000)
				}
			}
		})
	})
})