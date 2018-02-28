$(function() {
	var accessToken = constans.accessToken;
	var mobile = $.cookie("userName");
	$(".user_mob").val(mobile);
	$('.input_p').bind('input propertychange', function() {
		var serve_pwd = $("#serve_pwd").val();
		var readcode = $("#readcode").val();
		if(serve_pwd != "") {
			$("#serve_pwd").next(".close").show();
		}
		if(serve_pwd != "" && (/^[0-9]{4,12}$/.test(serve_pwd))) {
			$(".getnode").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
			$(".getnode").css("background-size", "100% 100%");
			$(".getnode").removeAttr("disabled");

		} else {
			$(".getnode").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
			$(".getnode").css("background-size", "100% 100%");
			$(".getnode").attr("disabled", "disabled");
		}
		if(readcode != "" && (/^[0-9A-Za-z]{4,}$/.test(readcode))) {
			$(".makepwd").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
			$(".makepwd").css("background-size", "100% 100%");
			$(".makepwd").removeAttr("disabled");

		} else {
			$(".makepwd").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
			$(".makepwd").css("background-size", "100% 100%");
			$(".makepwd").attr("disabled", "disabled");
		}
	});

	$('.close').click(function() {
		var $this = $(this);
		$this.prev('input').val('');
		$this.hide();
		$(".getnode").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
		$(".getnode").css("background-size", "100% 100%");

	});

	$(".pwd_show").on("click", function() {
		if($("#serve_pwd").attr("type") == "password") {
			$("#serve_pwd").attr("type", "text");
			$('.pwd_show img').attr("src", "../../images/ico_show@2x.png");
		} else {
			$("#serve_pwd").attr("type", "password");
			$('.pwd_show img').attr("src", "../../images/ico_hide@2x.png");
		}
	})
	$(".getnode").on("click", function() {
		var serviceNo = $('#serve_pwd').val();
		var data = { serviceNo: serviceNo };
		$.ajax({
			url: constans.serviceUrl + '/tel/pwds',
			type: "post",
			data: data,
			headers: { 
				loginTerm: "wx" ,
				rand: Math.round(Math.random() * 89999) + 10000,
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
                if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}			
				if(data.code == '100000') {
					$("#mode").show();
					$("#mode").html(data.msg);
					$(".one1").hide();
					$(".two1").show();
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
					setTimeout(function() {						
						$("#mode").hide();
					}, 2000)
				}
				if(data.code == '100003') {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {	
						window.location.href = constans.htmlUrl + "/html/user/usermob.html";
						$("#mode").hide();
					}, 2000)
				}
				if(data.code != '100000' && data.code != '100003') {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {							
						$("#mode").hide();
					}, 2000)
				}
			}
		})
	})
	$("#getcode").click(function() {
		getNote();
	})
	function getNote() {
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
				
		$.ajax({
			url: constans.serviceUrl + '/tel/captchas',
			type: "post",
			
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
					$("#mode").show();
					$("#mode").html('会话失效，请重新登录');
					setTimeout(function() {
						window.location.href = constans.htmlUrl + "/html/login/loginnext.html";
						$("#mode").hide();
					}, 2000);
				}				
				if(data.code == '100000') {
					$("#mode").show();
					$("#mode").html(data.msg);
					$(".one1").hide();
					$(".two1").show();
					setTimeout(function() {						
						$("#mode").hide();
					}, 2000)
				}
				if(data.code == '100003') {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {	
						window.location.href = constans.htmlUrl + "/html/user/usermob.html";
						$("#mode").hide();
					}, 2000)
				}
				if(data.code != '100000' && data.code != '100003') {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {							
						$("#mode").hide();
					}, 2000)
				}
				
			}
		})
	}
	$(".makepwd").on("click",function(){
		var captcha = $('#readcode').val();
		var data = { captcha: captcha };
		$.ajax({
			url: constans.serviceUrl + '/tel/pwds/captchas',
			type: "post",
			data: data,
			headers: { 
				loginTerm: "wx" ,
				rand: Math.round(Math.random() * 89999) + 10000,
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
                if(data.code == 111) {
					$("#mode").show();
					$("#mode").html('会话失效，请重新登录');
					setTimeout(function() {
						window.location.href = constans.htmlUrl + "/html/login/loginnext.html";
						$("#mode").hide();
					}, 2000);
				}				
				if(data.code == '100000') {
					$("#mode").show();
					$("#mode").html(data.msg);
					$(".one1").hide();
					$(".two1").show();
					setTimeout(function() {						
						$("#mode").hide();
					}, 2000)
				}
				if(data.code == '100003') {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {	
						window.location.href = constans.htmlUrl + "/html/user/usermob.html";
						$("#mode").hide();
					}, 2000)
				}
				if(data.code != '100000' && data.code != '100003') {
					$("#mode").show();
					$("#mode").html(data.msg);
					setTimeout(function() {							
						$("#mode").hide();
					}, 2000)
				}
			}
		})
	})
	$(".other").on("click",function(){
		window.location.href = constans.htmlUrl + "/html/user/userswiper.html";
	})
})