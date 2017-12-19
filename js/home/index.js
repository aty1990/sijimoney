$(function() {

	var accessToken = constans.accessToken;
	var userId = sessionStorage.getItem("userId");

	window.hideframe = function() {
		$(".home_mode").hide();
	}
	window.goWin = function(){
        location.href = localStorage.getItem("url");
    }
	if(typeof(accessToken) != "undefined") {
		var data = { accessToken: accessToken };
		$.ajax({
			url: constans.serviceUrl + '/support/verUser',
			type: "post",

			data: data,
			headers: {    
				loginTerm: "wx" ,
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
				//				$(".modeshow").show();
				if(data.code == 111) {
					window.location.href = constans.htmlUrl + "/index";
					return;
				}
				var userId = data.body.userId;
				sessionStorage.setItem("userId", userId);
				var userStat = data.body.userStat;
				sessionStorage.setItem("userStat", userStat);

				if(data.body.userStat == undefined) {
					$(".message").on("click", function() {
						window.location = constans.htmlUrl + "/index";
					});
					$("#page1").show();
					$("#page2").hide();
					$("body").css("background", "#fff");
					$(".apply").on("click", function() {
						window.location = constans.htmlUrl + "/index";
					})
				} else {
					$(".message").on("click", function() {
						window.location = constans.htmlUrl + "/html/home/nomessage.html";
					});

					//              已注册
					if(userStat == 0) {

						$("#mode").show();
						$("#page1").show();
						$("#page2").hide();
						$("body").css("background", "#fff");
						$.ajax({
							url: constans.serviceUrl + '/homepage/info',
							type: "post",
							headers: {    
								loginTerm: "wx" ,
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
							success: function(data, status, resObj) {
								if(data.code == 200) {
									var mon = data.body.highestAmount
									money = fmoney(mon, 2);
									var en = resObj.getResponseHeader('Activity-Url');
									if(en) {

										$(".home_mode").show();
										$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

									}
									$('.money_fnd').html(money.split(".")[0]);
									$('.line').html(data.body.homepageRollList.content);
									var html = template('home_swiper11', data);
									$('.line').html(html);
									$(".page1_word").html(data.body.homePageLinkTitle);
									$(".page1_word").attr("href", data.body.homePageLinkUrl);
								}

							}
						})
						$(".apply").on("click", function() {
							var data = { userId: userId };
							$.ajax({
								url: constans.serviceUrl + '/user/submitapp',
								type: "post",

								data: data,
								headers: {    
									loginTerm: "wx" ,
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

									if(data.code == 200) {
										$(".modes").show();
										$("#swear").unbind('click');
										$("#swear").on("click", function() {
											var text = $(".text").val();
											var smContent1 = /^[\u4E00-\u9FA5\w,\s\.·——。，？！@#￥%……&*（）——\+?,!@#$%^&*()_+;:：；‘’''""”“｜]+$/.test(text);

											if(smContent1 == false && text != "") {
												$("#mode").show();
												$("#mode").html('格式错误，不能输入非法字符，请重新输入');
												setTimeout(function() {
													$("#mode").hide();
												}, 2000);
											} else {
												var data = { activityId: "1", oathWords: text };
												$.ajax({
													url: constans.serviceUrl + '/oaths',
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
															localStorage.setItem("source", 1)
															window.location.href = constans.htmlUrl + "/html/user/userInfoList.html";
														}
														if(data.code == 500) {
															$("#mode").show();
															$("#mode").html(data.msg);
															setTimeout(function() {
																$("#mode").hide();
															}, 2000);
														}
														if(data.code == 111) {
															window.location.href = constans.htmlUrl + "/index";
														}
													}
												})
											}

										})
										$("#close").on("touchstart", function() {
											localStorage.setItem("source", 1)
											window.location.href = constans.htmlUrl + "/html/user/userInfoList.html";
										})
									} else {
										window.location = constans.htmlUrl + "/html/login/loginnext.html";
									}
									if(data.code == 111) {
										window.location.href = constans.htmlUrl + "/index";
									}

								}
							})

						})
					}
					//				系统审核中
					if(userStat == 1) {

						$("#page1").hide();
						$("#page2").show();
						var data = { userId: userId };
						$.ajax({
							url: constans.serviceUrl + '/user/auditstat',
							type: "post",

							data: data,
							headers: {    
								loginTerm: "wx" ,
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
							success: function(data, status, resObj) {

								if(data.code == 500) {
									$("#mode").show();
									$("#mode").html(data.msg);
									setTimeout(function() {
										$("#mode").hide();
									}, 2000);
								} else {
									var en = resObj.getResponseHeader('Activity-Url');
									if(en) {

										$(".home_mode").show();
										$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

									}
									$(".loanTime").html(data.body.loanTime);
									$(".regTime").html(data.body.regTime);
									$(".orgTime").html(data.body.orgTime);

									$(".apply1").on("click", function() {
										window.location.href = constans.htmlUrl + "/html/home/fail.html";
									})
								}
								if(data.code == 111) {
									window.location.href = constans.htmlUrl + "/index";
								}
							}
						})
					}
					//				审核失败
					if(userStat == 2) {
						$(".apply2").on("click", function() {
							localStorage.setItem("homefail", "1");
							$(".fail").hide();
							$(".fail_tuijian").show();
							$("body").css("background", "#f1f1f1");
							$(".fail_laba").show();
							var page = 1;
							var size = 100;
							var data = {
								page: page,
								size: size,
							};
							$.ajax({
								url: constans.serviceUrl + '/reCommand/refused',
								type: "post",
								data: data,
								headers: {
									loginTerm: "wx",
									accessToken: accessToken,
									jhVer: 2.0,
									rand: Math.round(Math.random() * 89999) + 10000,
								},
								beforeSend: function() {
									$("body").Loading("show");
								},
								complete: function() {
									$("body").Loading("hide");
								},
								success: function(data, status, resObj) {
									console.log(data);
									var en = resObj.getResponseHeader('Activity-Url');
									if(en) {

										$(".home_mode").show();
										$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

									}
									var dd = data.body.data;
									$(".smallHorn").html(data.body.smallHorn)
									var html = template('homefail', data);
									$('.banner').html(html);
									var html = template('homefail1', data);
									$('.access').html(html);
									var html = template('homefail2', data);
									$('.banner1').html(html);
									new Swiper('#swiper-container1', {
										loop: true,
										pagination: '.swiper-pagination',
										paginationClickable: true,
										spaceBetween: 0,
										centeredSlides: true,
										autoplayDisableOnInteraction: false
									})
									new Swiper('#swiper-container2', {
										slidesPerView: 'auto',
										loopedSlides: 6,
									})
									$(".access").find(".fail_product").on("click", function() {
										var channelId = $(this).attr("name");
										var data = { channelId: channelId };
										$.ajax({
											url: constans.serviceUrl + '/channels/records',
											type: "post",
											data: data,
											headers: {
												loginTerm: "wx",
												accessToken: accessToken,
												jhVer: 2.0,
												rand: Math.round(Math.random() * 89999) + 10000,
											},
											beforeSend: function() {
												$("body").Loading("show");
											},
											complete: function() {
												$("body").Loading("hide");
											},
											success: function(data) {
												console.log(data)
											}
										})
									});
									$(".banner1").find(".hot").on("click", function() {
										var channelId = $(this).attr("name");
										var data = { channelId: channelId };
										$.ajax({
											url: constans.serviceUrl + '/channels/records',
											type: "post",
											data: data,
											headers: {
												loginTerm: "wx",
												accessToken: accessToken,
												jhVer: 2.0,
												rand: Math.round(Math.random() * 89999) + 10000,
											},
											beforeSend: function() {
												$("body").Loading("show");
											},
											complete: function() {
												$("body").Loading("hide");
											},
											success: function(data) {
												console.log(data)
											}
										})
									});
									failclick();
									if(data.code == 111) {
										window.location.href = constans.htmlUrl + "/index";
									}
								}
							})
						})

						if(localStorage.getItem("homefail") == 1) {
							$(".fail").hide();
							$(".fail_tuijian").show();
							$(".fail_laba").show();
							$("body").css("background", "#f1f1f1");
							var page = 1;
							var size = 100;
							var data = {
								page: page,
								size: size,
							};
							$.ajax({
								url: constans.serviceUrl + '/reCommand/refused',
								type: "post",
								data: data,
								headers: {
									loginTerm: "wx",
									accessToken: accessToken,
									jhVer: 2.0,
									rand: Math.round(Math.random() * 89999) + 10000,
								},
								beforeSend: function() {
									$("body").Loading("show");
								},
								complete: function() {
									$("body").Loading("hide");
								},
								success: function(data, status, resObj) {
									console.log(data);
									var en = resObj.getResponseHeader('Activity-Url');
									if(en) {

										$(".home_mode").show();
										$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

									}
									var dd = data.body.data;
									$(".smallHorn").html(data.body.smallHorn)
									var html = template('homefail', data);
									$('.banner').html(html);
									var html = template('homefail1', data);
									$('.access').html(html);
									var html = template('homefail2', data);
									$('.banner1').html(html);
									new Swiper('#swiper-container1', {
										loop: true,
										pagination: '.swiper-pagination',
										paginationClickable: true,
										spaceBetween: 0,
										centeredSlides: true,
										autoplayDisableOnInteraction: false
									})
									new Swiper('#swiper-container2', {
										slidesPerView: 'auto',
										loopedSlides: 6,
									})
									$(".access").find(".fail_product").on("click", function() {
										var channelId = $(this).attr("name");
										var data = { channelId: channelId };
										$.ajax({
											url: constans.serviceUrl + '/channels/records',
											type: "post",
											data: data,
											headers: {
												loginTerm: "wx",
												accessToken: accessToken,
												jhVer: 2.0,
												rand: Math.round(Math.random() * 89999) + 10000,
											},
											beforeSend: function() {
												$("body").Loading("show");
											},
											complete: function() {
												$("body").Loading("hide");
											},
											success: function(data) {
												console.log(data)
											}
										})
									});
									$(".banner1").find(".hot").on("click", function() {
										var channelId = $(this).attr("name");
										var data = { channelId: channelId };
										$.ajax({
											url: constans.serviceUrl + '/channels/records',
											type: "post",
											data: data,
											headers: {
												loginTerm: "wx",
												accessToken: accessToken,
												jhVer: 2.0,
												rand: Math.round(Math.random() * 89999) + 10000,
											},
											beforeSend: function() {
												$("body").Loading("show");
											},
											complete: function() {
												$("body").Loading("hide");
											},
											success: function(data) {
												console.log(data)
											}
										})
									});
									failclick();
									if(data.code == 111) {
										window.location.href = constans.htmlUrl + "/index";
									}
								}
							})
						} else {
							$(".fail").show();
							$(".fail_tuijian").hide();
							$(".fail_laba").hide();
							$("body").css("background", "#fff");
						}

						$("#page1").hide();
						$("#page2").hide();
						$("#page4").show();

						var data = { accessToken: accessToken };
						$.ajax({
							url: constans.serviceUrl + '/support/verUser',
							type: "post",

							data: data,
							headers: {    
								loginTerm: "wx" ,
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

								if(data.code == 500) {
									$("#mode").show();
									$("#mode").html(data.msg);
									setTimeout(function() {
										$("#mode").hide();
									}, 2000);
								} else {
									$(".time").html(data.body.rejectTime);
									var startTime = data.body.currentTime;
									var start = new Date(startTime.replace("-", "/").replace("-", "/"));
									var endTime = data.body.rejectTime;
									var end = new Date(endTime.replace("-", "/").replace("-", "/"));

									if(end <= start) {
										$("#page1").show();
										$("#page2").hide();
										$("body").css("background", "#fff");
										$("#page4").hide();
										$(".apply").on("click", function() {
											localStorage.removeItem("homefail");
											var data = { userId: userId };
											$.ajax({
												url: constans.serviceUrl + '/user/submitapp',
												type: "post",

												data: data,
												headers: {    
													loginTerm: "wx" ,
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

													if(data.code == 200) {

														$(".modes").show();
														fail();
													} else {
														window.location = constans.htmlUrl + "/html/login/loginnext.html";
													}

												}
											})

										})
									}

								}
								if(data.code == 111) {
									window.location.href = constans.htmlUrl + "/index";
								}
							}
						})
					}
					//				待放款 或 人工审核
					if(userStat == 3 || userStat == 5) {

						$("#page1").hide();
						$("#page2").show();

						$(".color2").addClass("color");
						$(".block1").css("color", "#000");
						var data = { userId: userId };
						$.ajax({
							url: constans.serviceUrl + '/user/auditstat',
							type: "post",

							data: data,
							headers: {    
								loginTerm: "wx" ,
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
							success: function(data, status, resObj) {

								if(data.code == 500) {
									$("#mode").show();
									$("#mode").html(data.msg);
									setTimeout(function() {
										$("#mode").hide();
									}, 2000);
								} else {
									var en = resObj.getResponseHeader('Activity-Url');
									if(en) {

										$(".home_mode").show();
										$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

									}
									$(".loanTime").html(data.body.loanTime);
									$(".regTime").html(data.body.regTime);
									$(".orgTime").html(data.body.orgTime);
									$(".apply1").on("click", function() {
										window.location.href = constans.htmlUrl + "/html/home/fail.html";
									})
									if(data.body.regStat == 1) {
										$(".now1").html("已完成");
										$(".now1").css("color", "#999");
										$(".block1").css("color", "#999");
										$(".now2").html("进行中");
										$(".now2").css("color", "#000");
										$('.fang').css("color", "#F38185");
									}
								}
								if(data.code == 111) {
									window.location.href = constans.htmlUrl + "/index";
								}
							}
						})
					}

					//			   待提现或 提现中
					if(userStat == 6) {

						$("#page1").hide();
						$("#page2").hide();
						$("#page3").show();

						var data = { userId: userId };
						$.ajax({
							url: constans.serviceUrl + '/loans/withdraws',
							type: "post",

							data: data,
							headers: {    
								loginTerm: "wx" ,
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
							success: function(data, status, resObj) {
								if(data.code == 111) {
									window.location.href = constans.htmlUrl + "/index";
								}

								if(data.code == 500) {
									$("#mode").show();
									$("#mode").html(data.msg);
									setTimeout(function() {
										$("#mode").hide();
									}, 2000);
								} else {
									var en = resObj.getResponseHeader('Activity-Url');
									if(en) {

										$(".home_mode").show();
										$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

									}
									$(".amount").html(data.body.amount);
									$(".transAmount").html(data.body.transAmount);
									$(".repayEachWeek").html(data.body.repayEachWeek);
									$(".manageFeeEachWeek").html(data.body.manageFeeEachWeek);
									$(".feeEachWeek").html(data.body.feeEachWeek);
									$(".interestRate").html(data.body.interestRate);
									$(".currentWeeks").html(data.body.currentWeeks);
                                    $(".fuwuxieyi").on("click", function() {
														window.location = constans.htmlUrl + "/html/home/hetong.html";
													})
									var data = {
										userId: userId,
										jhVer: 2.0
									};
									$.ajax({
										url: constans.serviceUrl + '/user/bankInfoList',
										type: "post",

										data: data,
										headers: {    
											loginTerm: "wx",
											accessToken: accessToken,
											jhVer: 2.0 ,
											rand: Math.round(Math.random() * 89999) + 10000,
										},
										beforeSend: function() {
											$("body").Loading("show");
										},
										complete: function() {
											$("body").Loading("hide");
										},
										success: function(data) {
											$(".weui1 li").on("click", function() {
												if($(this).hasClass('bg')) {
													$(this).removeClass("bg");
													if(!$(".weui1 li").hasClass('bg')) {
														$(".sumbit1").css("background", "url(images/btn_disabled@2x.png)  no-repeat");
														$(".sumbit1").css("background-size", "100% 100%");
														$(".input_p").attr("disabled", "disabled");
													}
												} else {
													$(this).addClass("bg");
													$(".sumbit1").css("background", "url(images/btn_normal@2x.png)  no-repeat");
													$(".sumbit1").css("background-size", "100% 100%");
													$(".input_p").removeAttr("disabled");
												}
											})

											if(data.code == 803) {
												$(".withdraw").on("click", function() {
													window.location = constans.htmlUrl + "/html/user/userbank.html";

												})
											} else {
												$(".withdraw").on("click", function() {

													$("#mode_up").show();
													$(".select_up").show();
													$(".xieyi").on("click", function() {
														window.location = constans.htmlUrl + "/html/home/hetong.html";
													})
													var html = template('homebank', data);
													$('.radio').html(html);
													var isClick = false;
													if(isClick == false) {
														var bankCardId = data.body[0].bankcardId;
														$(".withdraw2").unbind('click');
														$(".withdraw2").one("click", function() {
															$("#mode_up").hide();
															$(".select_up").hide();
															var data = {
																bankCardId: bankCardId,
																userId: userId
															};
															$.ajax({
																url: constans.serviceUrl + '/trans/askwithdraw',
																type: "post",

																data: data,
																headers: {    
																	loginTerm: "wx" ,
																	accessToken: accessToken,
																	jhVer: "2.0",
																	rand: Math.round(Math.random() * 89999) + 10000,
																},
																beforeSend: function() {
																	$("#mode11").show();
																	$(".withdraw").attr("disabled", "disabled");
																},
																success: function(data) {

																	if(!$.trim(data)) {
																		setTimeout(function() {
																			$("#mode11").hide();
																			window.location.href = constans.htmlUrl + "/index.html" + "?home=" + (new Date().getTime());
																		}, 5000);
																		return true;
																	}
																	$("#mode11").hide();
																	if(data.code == 500) {

																		$("#mode").show();
																		$("#mode").html(data.msg);
																		setTimeout(function() {
																			$("#mode").hide();
																			$(".withdraw").removeAttr("disabled");
																		}, 3000);
																	}
																	if(data.code == 200) {
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

																	}
																	if(data.code == 111) {
																		window.location.href = constans.htmlUrl + "/index";
																	}
																}
															})
														})
													}

													$(".weui_cell_ft input:first").attr("checked", "checked");
													$(".weui_cells label").on("click", function() {
														localStorage.setItem('i', $(this).index())

														var bankCardId = data.body[$(this).index()].bankcardId;
														isClick = true;
														$(".withdraw2").unbind('click');
														$(".withdraw2").one("click", function() {
															$("#mode_up").hide();
															$(".select_up").hide();
															var data = {
																bankCardId: bankCardId,
																userId: userId
															};
															$.ajax({
																url: constans.serviceUrl + '/trans/askwithdraw',
																type: "post",

																data: data,
																headers: {    
																	loginTerm: "wx" ,
																	accessToken: accessToken,
																	jhVer: "2.0",
																	rand: Math.round(Math.random() * 89999) + 10000,
																},
																beforeSend: function() {
																	$("#mode11").show();
																	$(".withdraw").attr("disabled", "disabled");
																},
																success: function(data) {

																	if(!$.trim(data)) {
																		setTimeout(function() {
																			$("#mode11").hide();
																			window.location.href = constans.htmlUrl + "/index.html" + "?home=" + (new Date().getTime());
																		}, 5000);
																		return true;
																	}
																	$("#mode11").hide();
																	if(data.code == 500) {

																		$("#mode").show();
																		$("#mode").html(data.msg);
																		setTimeout(function() {
																			$("#mode").hide();
																			$(".withdraw").removeAttr("disabled");
																		}, 3000);
																	}
																	if(data.code == 200) {
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

																	}
																	if(data.code == 111) {
																		window.location.href = constans.htmlUrl + "/index";
																	}
																}
															})
														})
													});

												})
											}

										}
									})

								}
								if(data.code == 111) {
									window.location.href = constans.htmlUrl + "/index";
								}
							}
						})
					}
					if(userStat == 7) {

						$("#page1").hide();
						$("#page2").hide();
						$("#page3").show();

						var data = { userId: userId };
						$.ajax({
							url: constans.serviceUrl + '/loans/withdraws',
							type: "post",

							data: data,
							headers: {    
								loginTerm: "wx" ,
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
							success: function(data, status, resObj) {
                                $(".fuwuxieyi").on("click", function() {
														window.location = constans.htmlUrl + "/html/home/hetong.html";
													})
								if(data.code == 500) {
									$("#mode").show();
									$("#mode").html(data.msg);
									setTimeout(function() {
										$("#mode").hide();
									}, 2000);
								} else {
									var en = resObj.getResponseHeader('Activity-Url');
									if(en) {

										$(".home_mode").show();
										$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

									}
									$(".amount").html(data.body.amount);
									$(".transAmount").html(data.body.transAmount);
									$(".repayEachWeek").html(data.body.repayEachWeek);
									$(".manageFeeEachWeek").html(data.body.manageFeeEachWeek);
									$(".feeEachWeek").html(data.body.feeEachWeek);
									$(".interestRate").html(data.body.interestRate);
									$(".currentWeeks").html(data.body.currentWeeks);
								}
								if(data.code == 111) {
									window.location.href = constans.htmlUrl + "/index";
								}
							}
						})
						$(".top").hide();
						$(".withdraw").attr("disabled", "disabled");
						$(".withdraw").css("background", "url(images/btn_disabled@2x.png) no-repeat");
						$(".withdraw").css("background-size", "100% 100%");

						$(".withdraw").val("提现中,请耐心等待");
					}
					//			     还款中
					if(userStat == 4) {

						$("#page1").hide();
						$("#page2").hide();
						$("#page5").show();

						var data = {
							userId: userId
						};
						$.ajax({
							url: constans.serviceUrl + '/trans/loanrecord',
							type: "post",

							data: data,
							headers: {    
								loginTerm: "wx" ,
								accessToken: accessToken,
								jhVer: 2.0 ,
								rand: Math.round(Math.random() * 89999) + 10000,
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
									}, 2000);
								} else {
									var html = template('homebank1', data);
									$('.repay').html(html);
									var dd = data.body;
									for(var i = 0; i < dd.length; i++) {

										var taskStat = dd[i].taskStat;

										if(taskStat == "7A") {
											$('.repaymo').eq(i).hide();
										} else {
											var taskId = dd[i].taskId;
											localStorage.setItem("taskId", taskId);
											var data = {
												taskId: taskId,
												userId: userId
											};
											$.ajax({
												url: constans.serviceUrl + '/trans/loandetail',
												type: "post",

												data: data,
												headers: {    
													loginTerm: "wx" ,
													accessToken: accessToken,
													jhVer: 2.0 ,
													rand: Math.round(Math.random() * 89999) + 10000,
												},
												beforeSend: function() {
													$("body").Loading("show");
												},
												complete: function() {
													$("body").Loading("hide");
												},
												success: function(data, status, resObj) {

													if(data.code == 500) {
														$("#mode").show();
														$("#mode").html(data.msg);
														setTimeout(function() {
															$("#mode").hide();
														}, 2000);
													} else {
														var en = resObj.getResponseHeader('Activity-Url');
														if(en) {

															$(".home_mode").show();
															$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

														}
														var html = template('home', data);
														$('.list').html(html);
														$(".list ul").find(".home11").on("click", function() {
															var periodNum = $(this).attr("name")
															localStorage.setItem("periodNum", periodNum);
															window.location = constans.htmlUrl + "/html/home/payback.html";
														})

														$(".xieyi").on("click", function() {
															localStorage.setItem("downloadUrl", data.body.downloadUrl);
															window.location = constans.htmlUrl + "/html/home/xieyi.html" + "?taskId=" + taskId + "&accessToken=" + accessToken;

														})
													}
													if(data.code == 111) {
														window.location.href = constans.htmlUrl + "/index";
													}
												}
											})
										}
									}
								}
								if(data.code == 111) {
									window.location.href = constans.htmlUrl + "/index";
								}
							}
						})
					}
				}

			}
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
				console.log(data)
				if(data.body.act == 0 && data.body.notice == 0 && data.body.normal == 0) {
					$(".newmsg").hide();
				} else {
					$(".newmsg").show();
				}
			}
		})

	} else {
		$(".modeshow").hide();
		$("#page1").show();
		$("#page2").hide();
		$(".newmsg").hide();
		$(".message").on("click", function() {
			window.location = constans.htmlUrl + "/html/login/loginnext.html";
		});

		$(".apply").on("click", function() {
			window.location = constans.htmlUrl + "/html/login/loginnext.html";
		})
		$.ajax({
			url: constans.serviceUrl + '/homepage/info',
			type: "post",
			headers: {    
				loginTerm: "wx" ,
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
			success: function(data, status, resObj) {
				console.log(data);
				var en = resObj.getResponseHeader('Activity-Url');
				if(en) {

					$(".home_mode").show();
					$(".home_mode").append('<iframe src="' + en + '" style="width:100%;height:100%;border:none;"></iframe>');

				}
				var mon = data.body.highestAmount
				money = fmoney(mon, 2);
				$('.money_fnd').html(money.split(".")[0]);
				$('.line').html(data.body.homepageRollList.content);
				var html = template('home_swiper11', data);
				$('.line').html(html);
				$(".page1_word").html(data.body.homePageLinkTitle);
				$(".page1_word").attr("href", data.body.homePageLinkUrl);

			}
		})
	}

	$(".close_up").on("click", function() {
		$("#mode_up").hide();
		$(".select_up").hide();
	})

	function fmoney(s, n) {
		n = n > 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(),
			r = s.split(".")[1];
		t = "";
		for(i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
		}
		return t.split("").reverse().join("") + "." + r;
	}
	$(".addbank").on("click", function() {
		window.location = constans.htmlUrl + "/html/user/userbank.html";
	})

	function fail() {
		$("#swear").unbind('click');
		$("#swear").on("click", function() {
			var text = $(".text").val();
			var smContent1 = /^[\u4E00-\u9FA5\w,\s\.·——。，？！@#￥%……&*（）——\+?,!@#$%^&*()_+;:：；‘’''""”“｜]+$/.test(text);

			if(smContent1 == false && text != "") {
				$("#mode").show();
				$("#mode").html('格式错误，不能输入非法字符，请重新输入');
				setTimeout(function() {
					$("#mode").hide();
				}, 2000);
			} else {
				var data = { activityId: "1", oathWords: text };
				$.ajax({
					url: constans.serviceUrl + '/oaths',
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
							localStorage.setItem("source", 1)
							window.location.href = constans.htmlUrl + "/html/user/userInfoList.html";
						}
						if(data.code == 500) {
							$("#mode").show();
							$("#mode").html(data.msg);
							setTimeout(function() {
								$("#mode").hide();
							}, 2000);
						}
						if(data.code == 111) {
							window.location.href = constans.htmlUrl + "/index";
						}
					}
				})
			}

		})
		$("#close").on("touchstart", function() {
			localStorage.setItem("source", 1)
			window.location.href = constans.htmlUrl + "/html/user/userInfoList.html";
		})
	}

	function failclick() {
		$(".access").find(".fail_product").on("click", function() {
			var channelId = $(this).attr("name");
			var data = { channelId: channelId };
			$.ajax({
				url: constans.serviceUrl + '/channels/records',
				type: "post",
				data: data,
				headers: {
					loginTerm: "wx",
					accessToken: accessToken,
					jhVer: 2.0,
					rand: Math.round(Math.random() * 89999) + 10000,
				},
				beforeSend: function() {
					$("body").Loading("show");
				},
				complete: function() {
					$("body").Loading("hide");
				},
				success: function(data) {
					console.log(data)
				}
			})
		});
		$(".banner1").find(".hot").on("click", function() {
			var channelId = $(this).attr("name");
			var data = { channelId: channelId };
			$.ajax({
				url: constans.serviceUrl + '/channels/records',
				type: "post",
				data: data,
				headers: {
					loginTerm: "wx",
					accessToken: accessToken,
					jhVer: 2.0,
					rand: Math.round(Math.random() * 89999) + 10000,
				},
				beforeSend: function() {
					$("body").Loading("show");
				},
				complete: function() {
					$("body").Loading("hide");
				},
				success: function(data) {
					console.log(data)
				}
			})
		});
	}
})