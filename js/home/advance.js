$(function() {
	
	var list = new Array();
	var flagnum = 0;
	var clicked = 0;
	var flagnum1 = 0;
	var balAmount,isBal;
	$('.input_p').bind('input propertychange', function() {
		var repayMoney = $(".money").val();
		var repayMoney1 = $(".money").val();
		if(repayMoney != "") {
			$(".huankuan").removeAttr("disabled");
			$(".huankuan").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
			$(".huankuan").css("background-size", "100% 100%");

		} else {
			$(".huankuan").css("background", "url(../../images/btn_disabled@2x.png)  no-repeat");
			$(".huankuan").css("background-size", "100% 100%");
			$(".huankuan").attr("disabled", "disabled");
		}

	})
	
	var accessToken = constans.accessToken;
	var data = { accessToken: accessToken };
	$.ajax({
		url: constans.serviceUrl + '/support/verUser',
		type: "post",

		data: data,
		headers: {    
			loginTerm: "wx" ,
			accessToken: accessToken,
			jhVer: "2.0",
			rand: Math.round(Math.random()*89999) + 10000,
		},
		beforeSend: function() {
			$("body").Loading("show");
		},
		complete: function() {
			$("body").Loading("hide");
		},
		success: function(data) {
			var userId = data.body.userId;
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
					jhVer: 2.0,
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
					} else {
						$(".bg").on("click", function() {
							$("#mode_up").show();
							$(".select_up").show();
							data.balAmount = balAmount;
							data.isBal =isBal;   
							var html = template('homebank', data);
							$('.weui_cells').html(html);
                            
							if(clicked == 0) {
								$(".weui_cell_ft input").eq(flagnum).attr("checked", "checked");
							} else {
								$(".weui_cell_ft input").eq(flagnum1).attr("checked", "checked");
							}

							$(".weui_cells label").unbind("click");
							var $isChecked = $(".weui_cell_ft input").is(":checked");
							
							$(".weui_cells label").one("click", function() {
								
								$(".bg").css("background", data.body[$(this).index()].backgroundColour.substr(0, 7));
								$(".bank1").html(data.body[$(this).index()].bankName);
								$(".num").html(data.body[$(this).index()].accountNo.substr(data.body[$(this).index()].accountNo.length - 4, 4));
								$(".bankimg").attr("src", data.body[$(this).index()].bankLogo);
								$("#mode_up").hide();
								$(".select_up").hide();
								localStorage.setItem('bank', data.body[$(this).index()].bankcardId);
								clicked = 1;
								flagnum1 = $(this).index();
							})
                            if(isBal == 1){
								$(".yue").unbind("click");
	                            $(".yue").on("click", function() {
	                            	$(".bg").css("background", "#2EABE3");
									$(".bank1").html("零钱包");
									$(".num").html("余额"+balAmount+"元");
									$(".bankimg").attr("src", "../../images/icon_qianbao@2x.png");
									$("#mode_up").hide();
									$(".select_up").hide();								
									localStorage.setItem('bank', "");
									clicked = 1;
									flagnum1 = $(this).index();
								
	                            })
							}else{
								$(".dd").css("color","#999999");
								$(".yue").on("click",function(event){
									event.preventDefault();
								})
								$(".word").html("余额不足");
							}
						})
					}
					list = data.body;

				}
			})

			var taskId = localStorage.getItem("taskId");
			var periodNum = localStorage.getItem("periodNum");
			var data = {
				userId: userId,
				taskId: taskId,
				periodNum: periodNum
			};
			$.ajax({
				url: constans.serviceUrl + '/trans/aheadrepaymentpre',
				type: "post",

				data: data,
				headers: {    
					loginTerm: "wx",
					accessToken: accessToken,
					jhVer: 2.0 ,
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
					} else {
						$(".bg").css("background", data.body.backgroundColor.substr(0, 7));
						$(".bank").html(data.body.bankName);
						var len = data.body.accountNo.length;
						$(".cardnum").html(data.body.accountNo.substr(len - 4, 4));
						var img = data.body.bankLogo;
						$(".bank_img").attr("src", img);
						$(".benjin").html(data.body.periodCaptial);
						$(".fuwu").html(data.body.serviceAmount);

						$(".yinghuan1").html(data.body.periodAmount)
						$(".yuqi").html(data.body.penaltyAmount);
						$(".money").attr("placeholder", "最高还款" + data.body.allRepayment + "元");
						$(".jieqing1").html(data.body.allRepayment);
						$(".zuidi1").html(data.body.lowestRepayment);
						$(".money1").val(data.body.lowestRepayment);
						balAmount=data.body.balAmount;
						isBal=data.body.isBal;
						var bankCardId1 = data.body.bankCardId;
                        var periodNum1=data.body.periodNum;
						var taskId1=data.body.taskId;
						if(data.body.allRepayment == data.body.lowestRepayment) {
							//							 $(".money").css("width","70%");
							//						     $(".money").css("text-align","right");	
							$(".money2").val(data.body.allRepayment);
							$(".money1").hide();
							$(".money2").show();
							$(".money").attr("disabled", "disabled");

							$(".benjin").html($(".money").val());
							$(".money").css("background", "#fff");
							$(".huankuan").removeAttr("disabled");
							$(".huankuan").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
							$(".huankuan").css("background-size", "100% 100%");

						}
						if($(".money1").val() != "") {
							$(".huankuan").removeAttr("disabled");
							$(".huankuan").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
							$(".huankuan").css("background-size", "100% 100%");

						}
						$(".money1").on("click", function() {
							$(".money").focus();
							$(".money1").hide();
						})

						$(".money").focus(function() {
							$(".money").css("text-align", "left")
							$(".money1").hide();
							if($(".money").val() != ""){
								$(".money").val();
							}else{
								$(".money").val($(".money1").val())
							}
							$(".jieqing").css("display", "block");
							$(".zuidi").css("display", "block");
							$(".huankuan").removeAttr("disabled");
							$(".huankuan").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
							$(".huankuan").css("background-size", "100% 100%");

							$(".jieqing").on("click", function() {
								$(".money").css("width", "70%");
								$(".money").css("text-align", "right");
								$(".money").val(data.body.allRepayment);
								$(".jieqing").hide();
								$(".zuidi").hide();
								//						        $(".benjin").html(data.body.allRepayment);
								$(".huankuan").removeAttr("disabled");
								$(".huankuan").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
								$(".huankuan").css("background-size", "100% 100%");

							})
							$(".zuidi").on("click", function() {
								$(".money").css("width", "70%");
								$(".money").css("text-align", "right");
								$(".money").val(data.body.lowestRepayment);
								$(".benjin").html(data.body.lowestRepayment);
								$(".jieqing").hide();
								$(".zuidi").hide();
								$(".huankuan").removeAttr("disabled");
								$(".huankuan").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
								$(".huankuan").css("background-size", "100% 100%");

							})

						});

						$(".money").blur(function() {
							$(".money").css("width", "70%");
							$(".money").css("text-align", "right");

						})
						$(".foc").click(function() {
							$(".jieqing").hide();
							$(".zuidi").hide();
						})

						if(data.body.periodAmount == 0) {
							$(".benjin").html($(".money1").val());
							$(".yinghuan").hide();
							$(".money").focus(function() {
								$(".money").css("text-align", "left")
								$(".benjin").html($(".money").val());
								$(".jieqing").on("click", function() {
									$(".benjin").html(data.body.allRepayment);
								})
							})
							$(".money").blur(function() {
								$(".money").css("width", "70%");
								$(".money").css("text-align", "right");
								
								$(".benjin").html($(".money").val());

							});
						}

						for(var i = 0; i < list.length; i++) {
							if(data.body.accountNo.substr(data.body.accountNo.length - 4, 4) == list[i].accountNo.substr(list[i].accountNo.length - 4, 4)) {
								flagnum = i
							}
						}
						var allRepayment = data.body.allRepayment
						
						var lowestRepayment = data.body.lowestRepayment
						

						if(parseFloat(allRepayment) <= parseFloat(lowestRepayment)) {
							$(".money").attr("disabled", "disabled");
							$(".huankuan").on("click", function() {
								
								if(localStorage.getItem('bank') != null) {
									var bankCardId = localStorage.getItem('bank');
								} else {
									var bankCardId = bankCardId1;
								}
								var repayMoney = $(".money2").val();
								
								if($(".money2").val() != "") {
									repayMoney = $(".money2").val()
								}
								var data = {
									userId: userId,
									taskId: taskId1,
									bankCardId: bankCardId,
									repayMoney: repayMoney
								};
								$.ajax({
									url: constans.serviceUrl + '/trans/askaheadrepay',
									type: "post",

									data: data,
									headers: {    
										loginTerm: "wx",
										accessToken: accessToken,
										jhVer: 2.0 ,
										rand: Math.round(Math.random()*89999) + 10000,
									},
									beforeSend: function() {
										$("body").Loading("show");
									},
									success: function(data) {
										if(!$.trim(data)) {
											setTimeout(function() {
												$("body").Loading("hide");
												$(".huankuan").attr("disabled", "disabled");
												localStorage.removeItem('bank');
												window.location.href = constans.htmlUrl + "/index.html"+"?home="+(new Date().getTime());
											}, 8000);
											return true;
										}
										$("body").Loading("hide");
										if(data.code == 111) {						
											window.location.href = constans.htmlUrl + "/index";							
										}
										if(data.code == 500) {
											$("#mode").show();
											$("#mode").html(data.msg);
											setTimeout(function() {
												$("#mode").hide();
											}, 2000);

										}
										if(data.code == 200) {
											$("#mode").show();
											$("#mode").html(data.msg);
											$(".huankuan").attr("disabled", "disabled");
                                            $(".usera a").attr("href", "#");
											setTimeout(function() {
												localStorage.removeItem('bank');

												window.location.href = constans.htmlUrl + "/index.html";
												$("#mode").hide();
											}, 1000);
										}
										
									}
								})
							})
						} else {
							var allRepayment = data.body.allRepayment
							var lowestRepayment = data.body.lowestRepayment
							$(".huankuan").on("click", function() {
								
								if(localStorage.getItem('bank') != null) {
									var bankCardId = localStorage.getItem('bank');
								} else {
									var bankCardId = bankCardId1;
								}
								if($(".money1").val() != '' && $(".money").val() == "") {
									
									var repayMoney = $(".money1").val();
								} else {
									var repayMoney = $(".money").val();
								}

								
								if(parseFloat(repayMoney) - parseFloat(allRepayment) > 0) {
									$("#mode").show();
									$("#mode").html('还款金额不得大于最高还款金额' + allRepayment + '元');
									setTimeout(function() {
										$("#mode").hide();
									}, 2000);
								} else {
									if(parseFloat(repayMoney) - parseFloat(lowestRepayment) < 0) {
										$("#mode").show();
										$("#mode").html('还款金额不得小于最低还款金额' + lowestRepayment + '元');
										setTimeout(function() {
											$("#mode").hide();
										}, 2000);
									} else {
										var data = {
											userId: userId,
											taskId: taskId1,
											bankCardId: bankCardId,
											repayMoney: repayMoney
										};
										$.ajax({
											url: constans.serviceUrl + '/trans/askaheadrepay',
											type: "post",

											data: data,
											headers: {    
												loginTerm: "wx",
												accessToken: accessToken,
												jhVer: 2.0 ,
												rand: Math.round(Math.random()*89999) + 10000,
											},
											beforeSend: function() {
												$("body").Loading("show");
											},
											success: function(data) {
												if(!$.trim(data)) {
													setTimeout(function() {
														$("body").Loading("hide");
														$(".huankuan").attr("disabled", "disabled");
														localStorage.removeItem('bank');
														window.location.href = constans.htmlUrl + "/index.html"+"?home="+(new Date().getTime());
													}, 8000);
													return true;
												}
												$("body").Loading("hide");
												if(data.code == 111) {						
													window.location.href = constans.htmlUrl + "/index";							
												}
												if(data.code == 500) {
													$("#mode").show();
													$("#mode").html(data.msg);
													setTimeout(function() {
														$("#mode").hide();
													}, 2000);

												}
												if(data.code == 200) {
													$("#mode").show();
													$("#mode").html(data.msg);
													$(".huankuan").attr("disabled", "disabled");
                                                    $(".usera a").attr("href", "#");
													setTimeout(function() {
														localStorage.removeItem('bank');

														window.location.href = constans.htmlUrl + "/index.html";
														$("#mode").hide();
													}, 1000);
												}
												
											}
										})
									}
								}

							})
						}

					}
				}
			})

		}
	})
	$(".close_up").on("click", function() {
		$("#mode_up").hide();
		$(".select_up").hide();
	})
    $(".usera a").on("click", function() {
//		window.location.href = constans.htmlUrl + "/index.html";
		localStorage.removeItem('bank');
	})
})