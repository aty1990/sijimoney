$(function() {
	var accessToken = constans.accessToken;

	if(typeof(accessToken) != "undefined") {
		$(".user_money").show();
		$(".user_a").show();
		$(".closemode").on("click", function() {
			$(".pai").hide();
			$("#mode2").hide();
		})
		var data = { accessToken: accessToken };
		$.ajax({
			url: constans.serviceUrl + '/support/verUser',
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
				if(data.code == 200) {
					var userId=data.body.userId;
					if(data.body.userStat == 4) {
						$(".advance").on("click", function() {
							localStorage.removeItem("periodNum");
							localStorage.removeItem("taskId");
							window.location = constans.htmlUrl + "/html/home/advance.html";
						})
						$(".payback").on("click", function() {
							localStorage.removeItem("periodNum");
							localStorage.removeItem("taskId");
							window.location = constans.htmlUrl + "/html/home/payback.html";
						})
					} else {
						$(".payback").on("click", function() {
							window.location = constans.htmlUrl + "/index.html";
						})
						$(".advance").on("click", function() {
							window.location = constans.htmlUrl + "/index.html";
						})
					}
					$.ajax({
						url: constans.serviceUrl + '/user/getmyinfo',
						type: "post",

						data: { userId: userId },
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
							if(data.code == 500) {
								console.log(data.msg);
							} else {
								$(".balAmount").html(data.body.balAmount);
								$(".user_backleft").html(data.body.overdueSum);
								$(".user_backright").html(data.body.currentRepay);
								localStorage.setItem("periodNum", data.body.periodNum)
								var user = data.body.mobile;
								var muser = user.substr(0, 3) + '****' + user.substr(7);
								$(".user_tell").html(muser);
								sessionStorage.setItem("img", data.body.userIcon);
								if(data.body.userIcon == "") {
									$("#obj1").attr("src", "images/logo.png");
								} else {
									$("#obj1").attr("src", data.body.userIcon);
								}
							}

						}
					})
				}

			}
		})
		$(".user").on("click", function() {
			localStorage.setItem("source", 2)
			window.location.href = constans.htmlUrl + "/html/user/userInfoList.html";
		})		
        $.ajax({
			url: constans.serviceUrl + '/countMsgNew',
			type: "post",
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
				console.log(data);
				$(".message").on("click", function() {
					localStorage.setItem("backmess",1);
					window.location = constans.htmlUrl + "/html/home/nomessage.html";
				});
				if(data.body.act == 0 && data.body.notice == 0 && data.body.normal == 0) {
					$(".newmsg").hide();
				} else {
					$(".newmsg").show();
				}
			}
		})
	} else {
		$("#obj1").attr("src", "images/logo.png");
		$("#file").on("click", function() {
			$("#file").attr("disabled", "disabled");
			window.location = constans.htmlUrl + "/html/login/loginnext.html";
		})
		$(".user_login").on("click", function() {
			window.location = constans.htmlUrl + "/html/login/loginnext.html";
		})

		$(".user_bg").on("click", function() {
			window.location = constans.htmlUrl + "/html/login/loginnext.html";
		})

		$(".weui_cells_access").find("a").on("click", function() {
			$(this).attr("href", "#");
			window.location = constans.htmlUrl + "/html/login/loginnext.html";
		})
		$(".newmsg").hide();
		$(".message").on("click", function() {
			window.location = constans.htmlUrl + "/html/login/loginnext.html";
		});
	}

})