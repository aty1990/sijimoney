$(function() {
	
	var list = new Array();
	var flagnum = 0;
	var clicked = 0;
	var flagnum1 = 0;
	var balAmount,isBal;
	var accessToken = constans.accessToken;
	$('.input_p').bind('input propertychange', function() {
		var repayMoney = $(".yinhuan1").val();
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
	
	var data = { accessToken: accessToken };
	$.ajax({
		url: constans.serviceUrl + '/support/verUser',
		type: "post",

		data: data,
		headers: {    
			loginTerm: "wx" ,
			accessToken: accessToken,
			rand: Math.round(Math.random()*89999) + 10000,
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
					rand: Math.round(Math.random()*89999) + 10000,
					jhVer: 2.0   
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
					if(data.code == 500) {
						console.log(data.msg);
					} else {
						$(".bg").on("click", function() {
							$("#mode_up").show();
							$(".select_up").show();
							data.balAmount = balAmount;
							data.isBal =isBal;   
							console.log(isBal);
							
							var html = template('homebank', data);						
							$('.radio').html(html);
							if(clicked == 0) {
								$(".weui_cell_ft input").eq(flagnum).attr("checked", "checked");
							} else {
								$(".weui_cell_ft input").eq(flagnum1).attr("checked", "checked");
							}
                            $(".weui_cells label").unbind("click");
							$(".weui_cells label").one("click", function() {
								
								$(".bg").css("background", data.body[$(this).index()].backgroundColour.substr(0, 7));
								$(".bank1").html(data.body[$(this).index()].bankName);
								$(".num").html("尾号"+data.body[$(this).index()].accountNo.substr(data.body[$(this).index()].accountNo.length - 4, 4));
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
				url: constans.serviceUrl + '/trans/repaymentpre',
				type: "post",

				data: data,
				headers: {    
					loginTerm: "wx",
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
                      console.log(data);
					
					if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
					if(data.code == 500) {
						console.log(data.msg);
					} else {
        
						$(".bg").css("background", data.body.backgroundColor.substr(0, 7));
						$(".bank").html(data.body.bankName);
						var len = data.body.accountNo.length;
						$(".cardnum").html("尾号"+data.body.accountNo.substr(len - 4, 4));
						var img = data.body.bankLogo;
						$(".bank_img").attr("src", img);
						$(".yinhuan").html(data.body.periodAmount);
						$(".benjin").html(data.body.periodCaptial);
						$(".fuwu").html(data.body.serviceAmount);
						$(".yuqi").html(data.body.penaltyAmount);
						$(".daoqi").html(data.body.accountEnd);
						$(".yinhuan1").val(data.body.periodAmount);
						balAmount=data.body.balAmount;
						isBal=data.body.isBal;
                        
                                         
						var periodAmount = data.body.periodAmount
						var lowestRepayment = data.body.lowestRepayment
						var bankCardId1 = data.body.bankCardId
						var periodNum1=data.body.periodNum
						var taskId1=data.body.taskId
						$(".yinhuan1").focus(function() {
							$(".yinhuan1").css("text-align", "left")
						})
						$(".yinhuan1").blur(function() {
							$(".yinhuan1").css("text-align", "right")
						})
						for(var i = 0; i < list.length; i++) {
							if(data.body.accountNo.substr(data.body.accountNo.length - 4, 4) == list[i].accountNo.substr(list[i].accountNo.length - 4, 4)) {
								flagnum = i
							}
						}
						if(parseFloat(periodAmount) <= parseFloat(lowestRepayment)) {
							
							$(".yinhuan1").attr("disabled", "disabled");

							$(".huankuan").on("click", function() {
								
								if(localStorage.getItem('bank') != null) {
									var bankCardId = localStorage.getItem('bank');
								} else {
									var bankCardId = bankCardId1;
								}
								var repayMoney = $(".yinhuan1").val();
								
								var data = {
									userId: userId,
									taskId: taskId1,
									periodNum: periodNum1,
									bankCardId: bankCardId,
									repayMoney: repayMoney
								};
								$.ajax({
									url: constans.serviceUrl + '/trans/askrepay',
									type: "post",

									data: data,
									headers: {    
										loginTerm: "wx",
										rand: Math.round(Math.random()*89999) + 10000,
										accessToken: accessToken,
										jhVer: 2.0   
									},
									beforeSend: function() {
										$("body").Loading("show");
									},
									success: function(data) {
										if(!$.trim(data)){											
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

							var periodAmount = data.body.periodAmount
							var lowestRepayment = data.body.lowestRepayment
							$(".huankuan").on("click", function() {
								
								if(localStorage.getItem('bank') != null) {
									var bankCardId = localStorage.getItem('bank');
								} else {
									var bankCardId = bankCardId1;
								}
								
								var repayMoney = $(".yinhuan1").val();
								
								if(parseFloat(repayMoney) - parseFloat(periodAmount) > 0) {
									$("#mode").show();
									$("#mode").html('还款金额不得大于最高还款金额' + periodAmount + '元');
									setTimeout(function() {
										$("#mode").hide();
									}, 2000);
								} else {
									if(parseFloat(repayMoney) < parseFloat(lowestRepayment)) {
										$("#mode").show();
										$("#mode").html('还款金额不得小于最低还款金额' + lowestRepayment + '元');
										setTimeout(function() {
											$("#mode").hide();
										}, 2000);
									} else {
										var data = {
											userId: userId,
											taskId: taskId1,
											periodNum: periodNum1,
											bankCardId: bankCardId,
											repayMoney: repayMoney
										};
										$.ajax({
											url: constans.serviceUrl + '/trans/askrepay',
											type: "post",

											data: data,
											headers: {    
												loginTerm: "wx",
												rand: Math.round(Math.random()*89999) + 10000,
												accessToken: accessToken,
												jhVer: 2.0   
											},
											beforeSend: function() {
												$("body").Loading("show");
											},											
											success: function(data) {
												if(!$.trim(data)){											
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