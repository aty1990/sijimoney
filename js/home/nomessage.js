$(function() {
	var accessToken = constans.accessToken;

	if(typeof(accessToken) != 'undefined') {
		$(".usera").on("click", function() {
			if(localStorage.getItem("backmess")==1){
				localStorage.removeItem('backmess');
				window.location = constans.htmlUrl + "/user.html";
			}else{
				window.location = constans.htmlUrl + "/index.html";
			}
			
		})		
		normal();

		function normal() {
			var data = { type: "normal", page: 1, size: 1000 }
			$.ajax({
				url: constans.serviceUrl + '/showMsgNew',
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
					console.log(data);
					if(data.code == 111) {
						window.location.href = constans.htmlUrl + "/index";
					}
					if(data.body.total == 0) {
						$(".mess").hide();
						$(".nomess").show();
					} else {
						$(".mess").show();
						$(".nomess").hide();
					}
					var html = template('home', data);
					$('.mess').html(html);
					for(var i = 0; i < $(".swiper-slide .ul").length; i++) {
						if($(".swiper-slide .ul").eq(i).attr("msgStat") == 1) {
							$(".swiper-slide .ul").eq(i).find(".circle").hide();
						} else {
							$(".swiper-slide .ul").eq(i).find(".circle").show();
						}
					}
					$(".mess .ul").on("click", function() {
						
						var msgId = $(this).attr("name");
						var msgType = $(this).attr("msgType");
						var msgLink = $(this).attr("link");
						var data = { msgId: msgId, type: "normal" }
						$.ajax({
							url: constans.serviceUrl + '/readMsgNew',
							type: "post",
							async: false,
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
								if(data.code == 200){
									var getUrlParam = function() {
										var r = msgLink.match(/zz=([^?&]*)/); //匹配目标参数
										if(r != null) return unescape(r[1]);
										return null; //返回参数值       
									}
									var linkout = getUrlParam();
									if(linkout == "out") {
										window.location.href =constans.htmlUrl + "/html/home/messdetails.html?msgLink=" + msgLink;
										localStorage.setItem("refurbish", '1');
									} else {
										window.location.href = constans.htmlUrl + "/html/home/messdetails.html" + "?msgId=" + msgId + "&msgType=" + msgType + "&type=" + "normal";
									}
								}
							}
						})
						

					})
				}
			})
		}
		$(".one").on("click", function() {
			normal();
		})

		$(".two").on("click", function() {
			var data = { type: "notice", page: 1, size: 1000 }
			$.ajax({
				url: constans.serviceUrl + '/showMsgNew',
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
					console.log(data);
					if(data.body.total == 0) {
						$(".mess1").hide();
						$(".nomess").show();
					} else {
						$(".mess1").show();
						$(".nomess").hide();
					}
					var html = template('home1', data);
					$('.mess1').html(html);
					for(var i = 0; i < $(".swiper-slide .ul").length; i++) {
						if($(".swiper-slide .ul").eq(i).attr("msgStat") == 1) {
							$(".swiper-slide .ul").eq(i).find(".circle").hide();
						} else {
							$(".swiper-slide .ul").eq(i).find(".circle").show();
						}
					}
					$(".mess1 .ul").on("click", function() {
						
						var msgId = $(this).attr("name");
						var msgType = $(this).attr("msgType");
						var msgLink = $(this).attr("link");

						var data = { msgId: msgId, type: "notice" }
						$.ajax({
							url: constans.serviceUrl + '/readMsgNew',
							type: "post",
							async: false,
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
								if(data.code == 200){
									var getUrlParam = function() {
										var r = msgLink.match(/zz=([^?&]*)/); //匹配目标参数
										if(r != null) return unescape(r[1]);
										return null; //返回参数值       
									}
									var linkout = getUrlParam();
									if(linkout == "out") {
										window.location.href =constans.htmlUrl + "/html/home/messdetails.html?msgLink=" + msgLink;
										localStorage.setItem("refurbish", '1')
									} else {
										window.location.href = constans.htmlUrl + "/html/home/messdetails.html" + "?msgId=" + msgId + "&msgType=" + msgType + "&type=" + "notice";
									}
								}
							}
						})
						

					})
				}
			})
		})
		$(".three").on("click", function() {
			var data = { type: "act", page: 1, size: 1000 }
			$.ajax({
				url: constans.serviceUrl + '/showMsgNew',
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
					console.log(data);
					if(data.body.total == 0) {
						$(".mess2").hide();
						$(".nomess").show();
					} else {
						$(".act").hide();
						$(".mess2").show();
						$(".nomess").hide();
					}
					var html = template('home2', data);
					$('.mess2').html(html);
					$(".mess2 .ul").on("click", function() {
						
						var msgId = $(this).attr("name");
						var msgType = $(this).attr("msgType");
						var msgLink = $(this).attr("link");
						var data = { msgId: msgId, type: "act" }
						$.ajax({
							url: constans.serviceUrl + '/readMsgNew',
							type: "post",
							async: false,
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
								if(data.code ==200){
									var getUrlParam = function() {
										var r = msgLink.match(/zz=([^?&]*)/); //匹配目标参数
										if(r != null) return unescape(r[1]);
										return null; //返回参数值       
									}
									var linkout = getUrlParam();
									if(linkout == "out") {
										window.location.href =constans.htmlUrl + "/html/home/messdetails.html?msgLink=" + msgLink;
										localStorage.setItem("refurbish", '1')
									} else {
										window.location.href = constans.htmlUrl + "/html/home/messdetails.html" + "?msgId=" + msgId + "&msgType=" + msgType + "&type=" + "act";
									}
								}
								
							}
						})

					})
				}
			})
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
				if(data.code == 200){
					if(data.body.act == 0) {
						$(".act").hide();
					} else {
						$(".act").show();
						$(".act").html(data.body.act);
					}
					if(data.body.notice == 0) {
						$(".notice").hide();
					} else {
						$(".notice").show();
						$(".notice").html(data.body.notice);
					}
					if(data.body.normal == 0) {
						$(".normal").hide();
					} else {
						$(".normal").show();
						$(".normal").html(data.body.normal);
					}
				}
				
			}
		})
	}
})