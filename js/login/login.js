$(function() {
	var accessToken = constans.accessToken;
	var user = $.cookie('userName');
	$("#tell").val(user);

	$(".back_password").on("click", function() {
		window.location = "findpwd.html";
	})
	var aaa = Math.random();
	$("#codePic").attr("src", constans.serviceUrl + "/support/kaptcha?flag=" + aaa);
	$(".code").on("click", function() {
		$("#codePic").attr("src", constans.serviceUrl + "/support/kaptcha?flag=" + aaa);
	});
	var lat = "";
	var lon = "";
	var thisUrl = location.href.split('#')[0];
	var data = { url: thisUrl };
	$.ajax({
		url: constans.serviceUrl + '/wx/getWxSign',
		type: 'post',
		data: data,
		headers: { 
			loginTerm: 'wx'          
		},
		beforeSend: function() {
			$("body").Loading("show");
		},
		complete: function() {
			$("body").Loading("hide");
		},
		success: function(data) {

			console.log(data.body);
			var appId = data.body.appid
			var nonceStr = data.body.noncestr
			var signature = data.body.signature
			var timestamp = data.body.timestamp

			wx.config({
				debug: false,
				appId: appId,
				timestamp: timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: ['openLocation', 'getLocation']
			});

			wx.ready(function() {
				wx.getLocation({
					type: 'gcj02',
					success: function(res) {
						lat = res.latitude;
						lon = res.longitude;
						localStorage.setItem("latitude", lat);
						localStorage.setItem("longitude", lon);
						console.log(lat);
					},

					cancel: function(res) {
						alert("用户拒绝授权获取地理位置")
					}
				})

			})

		}
	})
	$('.input_p').bind('input propertychange', function() {
		var userName = $("#tell").val();
		var pwd = $("#password").val();

		if(userName != "") {
			$("#tell").next(".close").show();
		}
		if(pwd != "") {
			$("#password").next(".close").show();
		}
		if(userName != "" && pwd != "" && (/^1[34578]\d{9}$/.test(userName))) {
			$(".login").removeAttr("disabled");
			$(".login").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".login").css("background-size", "100% 100%");

		} else {
			$(".login").attr("disabled", "disabled");
			$(".login").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".login").css("background-size", "100% 100%");

		}
	})
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
	//  检查电话格式
	function tellcheck() {
		var userName = $("#tell").val();
		if(userName == "") {
			return false;
		} else {
			var phone = $('#tell').val();
			if(!(/^1[34578]\d{9}$/.test(phone))) {
				return false;
			} else {
				pwdcheck();
			}
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
	sessionStorage.removeItem("code");
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
	//清空input框
	$(".close").on("click", function() {
		$(this).prev("input").val("");
		$(this).hide();
		$(".login_style").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
		$(".login_style").css("background-size", "100% 100%");

	})
	//登录
	$(".login").on("click", function() {
		var userName = $("#tell").val();

		if(userName == "") {
			return false;
		} else {
			var phone = $('#tell').val();
			if(!(/^1[34578]\d{9}$/.test(phone))) {
				return false;
			} else {
				var pwd = $("#password").val();
				if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(pwd))) {
					$("#mode").show();
					$("#mode").html("请输入正确的密码格式");
					setTimeout(function() {
						$("#mode").hide();
					}, 3000);
				} else {
					var weixin = 'wx1';
					if(sessionStorage.getItem("code") == 500) {
						var weixin = $.cookie("weixin");
						sessionStorage.removeItem("code")
					}
					console.log(weixin)
					var userMob = $.cookie('userName');
					var pwd = $("#password").val();
					var kaptcha = $("#checkCode").val();
					var userPwd = hex_md5(pwd);
					var data = {
						userMob: userMob,
						userPwd: userPwd,
						kaptcha: kaptcha,
						jhVer: 2.0,

					};
					var lat = localStorage.getItem("latitude");
					var lon = localStorage.getItem("longitude");
					if(lat == null && lon == null) {
						lat = "";
						lon = "";
					}
					$.ajax({
						url: constans.serviceUrl + '/user/login',
						type: "post",

						data: data,
						headers: { 
							loginTerm: weixin,
							long: lon,
							lati: lat,
							rand: Math.round(Math.random() * 89999) + 10000,
							equipNum: "000",
							kaptcha: aaa
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
								$(".input_code").show();
								weixin = 'wx'
								$.cookie("weixin", weixin, { expires: 7 });
								sessionStorage.setItem("code", data.code);
								$("#mode").show();
								$("#mode").html(data.msg);
								setTimeout(function() {
									$("#mode").hide();
								}, 3000);
								$(".input_code").show();
							} 
							if(data.code == 200) {
								window.location = constans.htmlUrl + "/index.html";
								var flag = 1;
								localStorage.setItem("flag", flag);
							}
						}
					})
				}
			}
		}
	})
})