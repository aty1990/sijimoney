$(function() {

	$(".button").on("click", function() {
		$(".shares").show();
		$("#mode3").show();
	})
	$(".jiangli").on("click", function() {
		$(".draw1").show();
		$("#mode2").show();
	})
	$(".close").on("click", function() {
		$(".draw1").hide();
		$(".draw2").hide();
		$(".draw3").hide();
		$(".draw4").hide();
		$("#mode2").hide();
		$("body").css({"overflow":"auto"});
	})
	$(".ip").on("click", function() {
		$(".draw2").show();
		$("#mode2").show();
	})
	$(".apply").on("click", function() {
		$(".draw4").show();
		$("#mode2").show();
	})
	$(".sumbit11").on("click", function() {
		$(".draw4").hide();
		$(".shares").show();
		$("#mode2").hide();
		$("#mode3").show();
	})
	$("#mode3").on("click", function() {
		$(".shares").hide();
		$("#mode3").hide();
	})
	$(".huodong").on("click", function() {
		$(".draw3").show();
		$("body").css({"overflow":"hidden","height":"100%"});
		$("#mode2").show();
	})
	$(".info").on("click", function() {
		window.location = constans.htmlUrl + "/user.html";
	})
	$(".list").on("click", function() {
		window.location = constans.htmlUrl + "/html/user/list.html";
	})

	$(".line").slideUp();
	var accessToken = constans.accessToken;
//	$.ajax({
//		url: constans.serviceUrl + '/homepage/info',
//		type: "post",
//		headers: {    
//			loginTerm: "wx" ,
//			accessToken: accessToken,
//			jhVer: "2.0",
//			rand: Math.round(Math.random() * 89999) + 10000,
//		},
//		beforeSend: function() {
//			$("body").Loading("show");
//		},
//		complete: function() {
//			$("body").Loading("hide");
//
//		},
//		success: function(data) {
//			var html = template('home_swiper11', data);
//			$('.line').html(html);
//
//		}
//	})
	$.ajax({
		url: constans.serviceUrl + '/v2/invitations',
		type: "post",
		async: true,
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
			$(".active").html(data.body.actRule);
			$(".banner").attr("src", data.body.bannerPicUrl);
			$(".alreadyNum").html(data.body.alreadyNum);
			$(".totalIncome").html(data.body.totalIncome);
			$(".inviteeCount").html(data.body.inviteeCount);
			
			var html = template('home_swiper11', data);
			$('.line').html(html);

			
			if(data.body.inviteeCount != 0) {
				$(".friendnum").on("click", function() {
					window.location = constans.htmlUrl + "/html/user/invitelist.html";
				})
			} else {
				$(".friendnum").on("click", function() {
					window.location = constans.htmlUrl + "/html/user/userinvite.html";
				})
			}
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
			var userId = data.body.userId;
			if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
			localStorage.setItem('code', data.body.invitationCode);
			var data = { userId: userId };
			$.ajax({
				url: constans.serviceUrl + '/v2/invitations/shares',
				type: "post",
				async: true,
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
					var list = data.body;

					var url = location.href.split('#')[0];
					if(data.code == 500) {
						console.log(data.msg);
					} else {
						var data = { url: url };
						$.ajax({
							url: constans.serviceUrl + '/wx/getWxSign',
							type: 'post',
							async: true,
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
								console.log(data);
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
									jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
								});
								wx.ready(function() {
									for(var i = 0; i < list.length; i++) {
										var code = localStorage.getItem('code')
										var shreaTitle = list[i].shreaTitle;
										var content = list[i].content;
										var shareLink = list[i].shareLink;
										var imgUrl = list[i].imgUrl;
										if(list[i].shareTerminal == 100097) {
											// 发送给朋友
											wx.onMenuShareAppMessage({
												title: shreaTitle,
												desc: content,
												link: shareLink,
												imgUrl: imgUrl,
												success: function(res) {
													console.log('已分享');
												},
												cancel: function(res) {
													console.log('已取消');
												},
												fail: function(res) {
													console.log(JSON.stringify(res));
												}
											});
										}
										if(list[i].shareTerminal == 100098) {
											// 分享朋友圈

											wx.onMenuShareTimeline({
												title: shreaTitle,
												desc: content,
												link: shareLink,
												imgUrl: imgUrl,
												success: function(res) {

													console.log(res);
												},
												cancel: function(res) {
													console.log('已取消');
												},
												fail: function(res) {
													console.log(JSON.stringify(res));
												}
											});
										}
										if(list[i].shareTerminal == 100099) {
											// 发送给qq好友
											wx.onMenuShareQQ({
												title: shreaTitle,
												desc: content,
												link: shareLink,
												imgUrl: imgUrl,
												success: function(res) {
													console.log('已分享');
												},
												cancel: function(res) {
													console.log('已取消');
												},
												fail: function(res) {
													console.log(JSON.stringify(res));
												}
											});
										}
									}

								})
							}
						})
					}
				}
			})
		}
	})
})