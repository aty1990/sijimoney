$(function() {
	//图片验证码刷新
	$("#codePic").attr("src", constans.serviceUrl + "/support/kaptcha");
	$(".code").on("click", function() {
		$("#codePic").attr("src", constans.serviceUrl + "/support/kaptcha?flag=" + Math.random());
	});

	var thisUrl = location.href.split('#')[0];

	var getUrlParam1 = function(name) {
		var r1 = thisUrl.match(/loginChannel=([^?&]*)/); //匹配目标参数
		if(r1 != null) return unescape(r1[1]);
		return; //返回参数值        
	}
	
	getUrlParam1(name);
	var str1 = getUrlParam1(name);
	console.log(str1)

	//清空input框
	$(".close").on("click", function() {
		$(this).prev("input").val("");
		$(this).hide();
		$(".login_style").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
		$(".login_style").css("background-size", "100% 100%");
	})

	//	if($(".input_p").focus()){
	//		alert(000)
	//	    $(".bottom").hide();  
	//	}else{
	//		$(".bottom").show();  
	//	}
	//输入框获得焦点时，文字隐藏
	$(".input_p").focus(function() {
		$(".bottom").hide();
	})
	//输入框失去焦点时，文字显示
	$(".input_p").blur(function() {
		$(".bottom").show();
	})

	//input焦点换按钮图
	$('.input_p').bind('input propertychange', function() {
		var userName = $("#tell").val();
		var pwd = $("#password").val();
		var smsNum = $("#readcode").val();
		if(userName != "") {
			$("#tell").next(".close").show();
		}
		if(pwd != "") {
			$("#password").next(".close").show();
		}
		if(userName != "" && (/^1[34578]\d{9}$/.test(userName)) && pwd != "" && smsNum != "") {
			$(".register").removeAttr("disabled");			

		} else {
			$(".register").attr("disabled", "disabled");			
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
	
	//点击接收验证码

	$("#getcode").on("click", function() {
		var userMob = $('#tell').val();
		if(userMob == "") {			
				$("#mode").show();
				$("#mode").html('手机号不能为空');
				setTimeout(function() {
					$("#mode").hide();
				}, 2000)
			
		} else {
			if(!(/^1[34578]\d{9}$/.test(userMob))) {				
				$("#mode").show();
				$("#mode").html('请输入正确的手机号');
				setTimeout(function() {
					$("#mode").hide();
				}, 2000)				
			} else {
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
						console.log(data);
						if(data.code == 500) {
							if(data.msg =='此账号已注册，请直接登录'){
								$("#mode").show();
								$("#mode").html('您已经注册过飞鸟贷，去下载App提现吧~');
								setTimeout(function() {
									$("#mode").hide();									
									   window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.fengniao.action";								   
								}, 2000)
							 }
						} else {
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
							var userMob = $("#tell").val();
							var before = new Date();
							var rsa = new RSAKey();
							rsa.setPublic(constans.regSecKey, '10001');
							var res = rsa.encrypt(userMob);
							var tel = linebrk(hex2b64(res), 64);
							console.log(tel);
							var smsNum = $("#readcode").val();

							var data = { userMob: tel, tempId: "10000" };
							$.ajax({
								url: constans.serviceUrl + '/support/sendcode',
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
									if(data.code == '200') {
										console.log('短信已经发送');
									}
								}
							})
						}
					}
				})
			}
		}
	})
    var term;
    if(browser.versions.ios){
    	term ="ios";
    }else if(browser.versions.android){
    	term ="android";
    }else{
    	term ="wx";
    }
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
			var userMob = $("#tell").val();
			var pwd = $("#password").val();
			var smsNum = $("#readcode").val();
			var kaptcha = $("#checkCode").val();
			var plainNum = $(".qrcodeContent").html();
			var userPwd = hex_md5(pwd);
			var data = {
				userMob: userMob,
				userPwd: userPwd,
				smsNum: smsNum,				
				jhVer: 2.0,
				plainNum: plainNum
			};
			$.ajax({
				url: constans.serviceUrl + '/user/out/register',
				type: "post",

				data: data,
				headers: {    
					loginTerm: term,
					loginChannel: str1,
					rand: Math.round(Math.random()*89999) + 10000, 
				},
				beforeSend: function() {
					$("body").Loading("show");
				},
				complete: function() {
					$("body").Loading("hide");
				},
				success: function(data) {
					console.log(data)
					if(data.code == 500) {
						$("#mode").show();
						$("#mode").html(data.msg);
						setTimeout(function() {
							$("#mode").hide();
						}, 2000)
					} 
					if(data.code == 111) {
						$("#mode").show();
						$("#mode").html(data.msg);
						setTimeout(function() {
							$("#mode").hide();
						}, 2000)
					} 
					if(data.code == 200) {
						$("#mode").show();
						$("#mode").html(data.msg);
						$(".register").attr("disabled","disabled");
						setTimeout(function() {							
								window.location ="http://a.app.qq.com/o/simple.jsp?pkgname=com.fengniao.action";														
							$("#mode").hide();
						}, 2000)
					}
				}
			})
		}

	})	
	$(".yinsi").on("click", function() {
		window.location = constans.htmlUrl + "/html/login/yinsixieyi.html";
	})	
})