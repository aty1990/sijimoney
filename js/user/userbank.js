$(function() {

	var accessToken = constans.accessToken;
	$('.input_p').bind('input propertychange', function() {
		var name = $("#bank_name").val();
		
		var card =$("#bank_card").val().replace(/[ ]/g, "");
		if(name != "" && card != ""&& (/^[0-9]{12,32}$/.test(card))) {
			$(".bank_money").removeAttr("disabled");
			$(".bank_money").css("background", "url(../../images/btn_normal@2x.png) no-repeat");
			$(".bank_money").css("background-size", "100% 100%");
		} else {
			$(".bank_money").attr("disabled", "disabled");
			$(".bank_money").css("background", "url(../../images/btn_disabled@2x.png) no-repeat");
			$(".bank_money").css("background-size", "100% 100%");
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
				rand: Math.round(Math.random()*89999) + 10000,
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
				
				$("#bank_name").val(data.body.userName);
			}
		})
	$(".weui1 li").on("click", function() {
		if($(this).hasClass('bg')) {
			$(this).removeClass("bg");
			if(!$(".weui1 li").hasClass('bg')) {
				$(".sumbit1").css("background", "url(../../images/btn_disabled@2x.png)  no-repeat");
				$(".sumbit1").css("background-size", "100% 100%");
				$(".input_p").attr("disabled", "disabled");
			}
		} else {
			$(this).addClass("bg");
			$(".sumbit1").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
			$(".sumbit1").css("background-size", "100% 100%");
			$(".input_p").removeAttr("disabled");
		}
	})
     $(".explain").on("click", function() {
     	$(".hide").show();
     	$(".show").hide();
     })
	//      
	$('#bank_card').on('keyup mouseout input', function() {
		var $this = $(this),
			v = $this.val();
		/\S{5}/.test(v) && $this.val(v.replace(/\s/g, '').replace(/(.{4})/g, "$1 "));
	});

	
	logLevel = 'debug',
		$mode1 = $("#mode11"),
		handler = {

			error: function(url) {
				$.ajax({
					type: 'post',
					url: constans.serviceUrl + '/credit/wxpollbb',
					async: true,
					beforeSend: function() {
						$mode1.show();
						console.log(8888)
					},
					headers: {   
						loginTerm: 'wx' ,
						rand: Math.round(Math.random() * 89999) + 10000,
						accessToken: accessToken,
						jhVer: '2.0' 
					},
					success: function(data) {

						if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
						if(data.code == 500) {
							$mode1.hide();

							$('#mode').show();
							$('#mode').html(data.msg);
							setTimeout(function() {
								$('#mode').hide();
								$(".bank_money").removeAttr("disabled");
							}, 2000);
						}
						if(data.code == 201) {
							console.log('上面我轮询')
							setTimeout(function() {
								handler.error();
							}, 1000);
						}
						if(data.code == 200) {

							var bankCardId = data.body;
							var userId = sessionStorage.getItem("userId")
							$.ajax({
								type: 'post',
								url: constans.serviceUrl + '/trans/wxaskwithdraw',
								async: true,
								data: { bankCardId: bankCardId, userId: userId },
								beforeSend: function() {
									$mode1.show();
								},
								headers: {   
									loginTerm: 'wx' ,
									rand: Math.round(Math.random() * 89999) + 10000,
									accessToken: accessToken,
									jhVer: '2.0' 
								},
								success: function(data) {
									console.log(data);
									if(!$.trim(data)) {
										setTimeout(function() {
											$mode1.hide();
											window.location.href = constans.htmlUrl + "/index.html" + "?home=" + (new Date().getTime());
										}, 8000);
										return true;
									}
									if(data.code == 500) {
										$mode1.hide();
										$('#mode').show();
										$('#mode').html(data.msg);
										setTimeout(function() {
											$('#mode').hide();
											$(".bank_money").removeAttr("disabled");
										}, 2000);
									}
									if(data.code == 200) {
										$mode1.hide();
										$(".modes1").show();
										$("#swear1").unbind('click');
										$("#swear1").on("click", function() {
											var text1 = "";
											for(var i = 0; i < $(".bg").length; i++) {
												text1 += $($(".bg")[i]).find("span").html() + ' && ';
											}

											var data = { activityId: "2", oathWords: text1 };
											$.ajax({
												url: constans.serviceUrl + '/withdraw/oaths',
												type: "post",
												async: true,
												data: data,
												headers: {    
													loginTerm: "wx" ,
													rand: Math.round(Math.random() * 89999) + 10000,
													accessToken: accessToken,
													jhVer: 2.0 
												},
												success: function(data) {
													if(data.code == 200) {
														$(".modes1").hide();
														window.location.href = constans.htmlUrl + "/index.html" + "?home=" + (new Date().getTime());
													} else {
														$("#mode").show();
														$("#mode").html(data.msg);
														setTimeout(function() {
															$("#mode").hide();
														}, 2000);
													}

												}
											})
										})

										$(".bank_money").attr("disabled", "disabled");

									}
								}
							})
						}
					},
					error: function() {
						handler[500].call({ msg: '系统错误，请联系客服' });
					}
				})
			}
		},
		sendRequest = function(url, data) {
			if(logLevel == 'debug') console.log('认证开始，参数：%o', data);
			$.ajax({
				type: 'post',
				url: constans.serviceUrl + url,
				async: true,
				data: data,
				headers: {    
					loginTerm: 'wx' ,
					rand: Math.round(Math.random() * 89999) + 10000,
					accessToken: accessToken,
					jhVer: '2.0' 
				},
				success: function(data) {
					if(!$.trim(data)) {
						setTimeout(function() {
							handler.error();
						}, 3000);
						return true;
					}

					if(data.code == 500) {
						$mode1.hide();
						$("#mode").show();

						$("#mode").html(data.msg);
						setTimeout(function() {
							$("#mode").hide();
							$(".bank_money").removeAttr("disabled");
						}, 2000);
					}
					if(data.code == 200) {
						var bankCardId = data.body;
						var userId = sessionStorage.getItem("userId")
						$.ajax({
							type: 'post',
							url: constans.serviceUrl + '/trans/wxaskwithdraw',
							async: true,
							data: { bankCardId: bankCardId, userId: userId },
							headers: {   
								loginTerm: 'wx' ,
								rand: Math.round(Math.random() * 89999) + 10000,
								accessToken: accessToken,
								jhVer: '2.0' 
							},
							beforeSend: function() {
								$mode1.show();
							},
							success: function(data) {
								if(!$.trim(data)) {
									setTimeout(function() {
										$mode1.hide();
										window.location.href = constans.htmlUrl + "/index.html" + "?home=" + (new Date().getTime());
									}, 8000);
									return true;
								}
								console.log(data)
								if(data.code == 500) {
									$mode1.hide();

									$('#mode').show();
									$('#mode').html(data.msg);
									setTimeout(function() {
										$('#mode').hide();
										if(data.msg == "您已提现，请不要重复操作") {
											window.location.href = constans.htmlUrl + "/index.html" + "?home=" + (new Date().getTime());
										}
										$(".bank_money").removeAttr("disabled");
									}, 2000);

								}
								if(data.code == 200) {

									$mode1.hide();
									$(".modes1").show();
									$("#swear1").unbind('click');
									$("#swear1").on("click", function() {
										var text1 = "";
										for(var i = 0; i < $(".bg").length; i++) {
											text1 += $($(".bg")[i]).find("span").html() + ' && ';
										}

										var data = { activityId: "2", oathWords: text1 };
										$.ajax({
											url: constans.serviceUrl + '/withdraw/oaths',
											type: "post",
											async: true,
											data: data,
											headers: {    
												loginTerm: "wx" ,
												rand: Math.round(Math.random() * 89999) + 10000,
												accessToken: accessToken,
												jhVer: 2.0 
											},
											success: function(data) {
												if(data.code == 200) {
													$(".modes1").hide();
													window.location.href = constans.htmlUrl + "/index.html" + "?home=" + (new Date().getTime());
												} else {
													$("#mode").show();
													$("#mode").html(data.msg);
													setTimeout(function() {
														$("#mode").hide();
													}, 2000);
												}

											}
										})
									})

									$(".bank_money").attr("disabled", "disabled");
								}
							}
						})
					}

				},

				error: function() {
					if(logLevel == 'debug') console.log('请求错误', arguments);
					setTimeout(function() {
						handler.error();
					}, 3000);
				}
			});
		};
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
	var click = false;
	$(".bank_money").on("click", function() {
		click = true;
		$(".usera a").attr("href", "#");				
		var accNo = $("#bank_card").val().replace(/[ ]/g, "");
		$mode1.show();
		$(".bank_money").attr("disabled", "disabled")
		sendRequest('/credit/bindcard14', { accNo: accNo});
	})

	if(click == false) {
		$("#bank_yin").val('');
	}
	$(".xieyi").on("click", function() {
		window.location = constans.htmlUrl + "/html/home/hetong.html";
	})
	$(".close").on("click", function() {
		$(".hide").hide();
		$(".show").show();
	})
})