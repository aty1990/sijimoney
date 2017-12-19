$(function() {
	var accessToken = constans.accessToken;
	//清空input框
	$(".close").on("click", function() {
		$(this).prev("input").val("");
		$(this).hide();
		$(".login_style").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
		$(".login_style").css("background-size", "100% 100%");
		
	})


	//input焦点换按钮图
	$('.input_p').bind('input propertychange', function() {
		var userName = $("#tell").val();
		var pwd = $("#password").val();
		var smsNum = $("#readcode").val();
		var verCode = $("#checkCode").val();
		if(userName != "") {
			$("#tell").next(".close").show();
		}
		if(pwd != "") {
			$("#password").next(".close").show();
		}
		if(userName != "" && (/^1[34578]\d{9}$/.test(userName))) {
			$(".register_next").removeAttr("disabled");
			$(".register_next").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".register_next").css("background-size", "100% 100%");
			
		} else {

			$(".register_next").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".register_next").css("background-size", "100% 100%");
			
		}
		if(pwd != "" && smsNum != "" && verCode != "") {
			$(".register").removeAttr("disabled");
			$(".register").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".register").css("background-size", "100% 100%");
			
		} else {
			//			$(".register").attr("disabled", "disabled");
			$(".register").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".register").css("background-size", "100% 100%");
			
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
			$("#page1").css("display", "none");
			$("#page2").css("display", "block");
		}
	}
	// 检查密码格式
	function pwdcheck() {
		var pwd = $("#password").val();
		if(pwd == "") {
			return false;
		} else {
			if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(pwd))) {
				return false;
				$("#mode").show();
				$("#mode").html("请输入正确的密码格式");
				setTimeout(function() {
					$("#mode").hide();
				}, 3000);
			} else {
				return true;

			}
		}
	}
	//图片验证
	function vercheck() {
		var verCode = $("#checkCode").val();
		if(verCode == "") {
			return false;
		} else {
			if(!(/ ^\d{4}$/.test(verCode))) {
				return false;
			} else {
				return true;
			}
		}

	}
	//手机短信验证码格式
	function smscheck() {
		var smsNum = $("#readcode").val();
		if(smsNum == "") {
			return false;
		} else {
			if(!(/ ^\d{6}$/.test(smsNum))) {
				return false;
			} else {
				return true;
			}
		}
	}
	
	//密码显示与隐藏
	$(".pwd_show").on("click", function() {
		if($("#password").attr("type") == "password") {
			$("#password").attr("type", "text");
			$('.pwd_show img').attr("src", "../../images/ico_show@2x.png");
		} else {
			$("#password").attr("type", "password");
			$('.pwd_show img').attr("src", "../../images/ico_hide@2x.png");
		}
	})
	var msgflag = 0;
	//点击接收验证码
	$("#getcode").click(function() {
		
		
		var userMob = $.cookie('userName');		
		var before = new Date();
		var rsa = new RSAKey();
		rsa.setPublic(constans.regSecKey, '10001');
		var res = rsa.encrypt(userMob);
		var tel=linebrk(hex2b64(res), 64);		
		
		var data = { userMob: tel , tempId: "10000" };

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
					$('.get_tId').hide();
		$('.set_time').show();
		var num = 60;
		$('.set_time span').text(num);
		timer = setInterval(function() {
			num--;
			$('.set_time span').text(num);

		}, 1000)
		setTimeout(function() {
			$('.get_tId').html("重新获取");
			$('.get_tId').show();
			$('.set_time').hide();
			clearInterval(timer);
		}, 60000);
					$("#mode").show();
					$("#mode").html(data.msg);						
					setTimeout(function() {																			
						$("#mode").hide();
					}, 2000)
				}
			}
		})

		
	})

	//注册    
	$(".register").on("click", function() {
		var pwd = $("#password").val();
		if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(pwd))) {
			$("#mode").show();
			$("#mode").html("请输入正确的密码格式");
			setTimeout(function() {
				$("#mode").hide();
			}, 3000);
		} else {
			var userMob = $.cookie('userName');
			var pwd = $("#password").val();
			var smsNum = $("#readcode").val();
			var kaptcha = $("#checkCode").val();
			var plainNum = $("#plainNum").val();
			var userPwd = hex_md5(pwd);
			var data = {
				userMob: userMob,
				userPwd: userPwd,
				smsNum: smsNum,
				kaptcha: kaptcha,
				jhVer: 2.0,
				plainNum: plainNum
			};
			$.ajax({
				url: constans.serviceUrl + '/user/register',
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
					if(data.code == 500) {
						$("#mode").show();
						$("#mode").html(data.msg);
						setTimeout(function() {
							$("#mode").hide();
						}, 2000)
					} else {
						$("#mode").show();
						$("#mode").html(data.msg);
						$(".register").attr("disabled","disabled");
						setTimeout(function() {							
							window.location = constans.htmlUrl + "/index.html";							
							$("#mode").hide();
						}, 2000)
						var register =1;
						localStorage.setItem("register",register);		
					}
				}
			})

		}
	})
	$(".baomi").on("click", function() {
		window.location = constans.htmlUrl + "/html/login/baomixieyi.html";
	})
	$(".yinsi").on("click", function() {
		window.location = constans.htmlUrl + "/html/login/yinsixieyi.html";
	})
})