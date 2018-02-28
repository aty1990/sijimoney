$(function() {

	getUserId();
	var userId = sessionStorage.getItem("userId");
	var accessToken = constans.accessToken;

	$('.input_p').bind('input propertychange', function() {
		var direct = $(".direct").val();
		var direct_name = $(".direct_name").val();
		var direct_tell = $(".direct_tell").val();
		var other = $(".other").val();
		var other_name = $(".other_name").val();
		var other_tell = $(".other_tell").val();
		if(direct_name != "" && direct_tell != "" && other_name != "" && other_tell != "" && (/^1[34578]\d{9}$/.test(other_tell)) && (/^1[34578]\d{9}$/.test(direct_tell))) {

			$(".picker").bind("click", function() {
				if($(".direct").length <= 0 && $(".other").length <= 0) {
					$(".contacts").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
					$(".contacts").css("background-size", "100% 100%");
					$(".contacts").removeAttr("disabled");

				} else {
					$(".contacts").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
					$(".contacts").css("background-size", "100% 100%");
					$(".contacts").attr("disabled", "disabled");

				}

			});
			if($(".direct").length <= 0 && $(".other").length <= 0) {
				$(".contacts").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
				$(".contacts").css("background-size", "100% 100%");
				$(".contacts").removeAttr("disabled");

			} else {
				$(".contacts").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
				$(".contacts").css("background-size", "100% 100%");
				$(".contacts").attr("disabled", "disabled");

			}
			if($(".direct").val() != "" && $(".other").val() != "") {
				$(".contacts").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
				$(".contacts").css("background-size", "100% 100%");
				$(".contacts").removeAttr("disabled");

			} 
		} else {
			$(".contacts").attr("disabled", "disabled");
			$(".contacts").css("background", "url(../../images/nd-disabled-btn.png) no-repeat");
			$(".contacts").css("background-size", "100% 100%");

		}

	})

	if(localStorage.getItem("contact") == 2) {
		$(".contacts").hide();
		$('.input_p').attr("disabled", "disabled");
		$('.mymessage input[disabled]').css("-webkit-text-fill-color","#000")
		$('.mymessage input[disabled]').css("opacity","1")
	}
	$('.user_message').bind("click", function() {
		if(localStorage.getItem("contact") == 1) {
			$(".contacts").removeAttr("disabled");
			$(".contacts").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
			$(".contacts").css("background-size", "100% 100%");
			$('.input_p').bind('input propertychange', function() {
				var direct_name = $(".direct_name").val();
				var direct_tell = $(".direct_tell").val();
				var other_name = $(".other_name").val();
				var other_tell = $(".other_tell").val();
				if(direct_name != "" && direct_tell != "" && other_name != "" && other_tell != "" && (/^1[34578]\d{9}$/.test(other_tell)) && (/^1[34578]\d{9}$/.test(direct_tell))) {
					$(".contacts").removeAttr("disabled");
					$(".contacts").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
					$(".contacts").css("background-size", "100% 100%");

				}
			})
		}
	})
	

	//  渲染联系人信息详情
	var data = {
		userId: userId
	};
	$.ajax({
		url: constans.serviceUrl + '/credit/detailContact',
		type: "post",
		async: true,
		data: data,
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
										window.location.href = constans.htmlUrl + "/index";							
									}
			if(data.code == 500) {
				console.log(data.msg)
			} else {
				$(".direct").val(data.body.relationShip1);
				$(".direct_name").val(data.body.relationName1);
				$(".direct_tell").val(data.body.relationMob1);
				$(".other").val(data.body.relationShip2);
				$(".other_name").val(data.body.relationName2);
				$(".other_tell").val(data.body.relationMob2);
				var relationMob1 = data.body.relationMob1;
				var relationName1 = data.body.relationName1;
				var relationMob2 = data.body.relationMob2;
				var relationName2 = data.body.relationName2;
				var relationShip1Id = data.body.relationShip1Id;
				var relationShip2Id = data.body.relationShip2Id;
				if(localStorage.getItem("contact") == 0) {
					if(relationMob1.length != 0 && relationName1.length != 0 && relationMob2.length != 0 && relationName2.length != 0 && relationShip1Id.length != 0 && relationShip2Id.length != 0) {
						$(".contacts").removeAttr("disabled");
						$(".contacts").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
						$(".contacts").css("background-size", "100% 100%");
						$('.input_p').bind('input propertychange', function() {
							var direct_name = $(".direct_name").val();
							var direct_tell = $(".direct_tell").val();
							var other_name = $(".other_name").val();
							var other_tell = $(".other_tell").val();
							if(direct_name != "" && direct_tell != "" && other_name != "" && other_tell != "" && (/^1[34578]\d{9}$/.test(other_tell)) && (/^1[34578]\d{9}$/.test(direct_tell))) {
								$(".contacts").removeAttr("disabled");
								$(".contacts").css("background", "url(../../images/nd-normal-btn.png) no-repeat");
								$(".contacts").css("background-size", "100% 100%");
							}
						})
					}
				}
				if(localStorage.getItem("contact") != 2) {
					var data = { type: "100004" };
					$.ajax({
						url: constans.serviceUrl + '/support/selectinfo',
						type: "post",
						async: true,
						data: data,
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
							var data3 = [];
							
							for(i in data.body) {
								data3.push({ text: data.body[i].value, value: data.body[i].key })
								
							}

							var picker3 = new Picker({
								data: [data3]
							});
							var picker3El = document.getElementById('picker3');
							picker3.on('picker.select', function(selectedVal, selectedIndex) {
								picker3El.innerText = data3[selectedIndex[0]].text;
								$("#picker3").css("margin-left", "10px");
								relationShip1Id = data3[selectedIndex[0]].value;

							});
							picker3El.addEventListener('click', function() {
								picker3.show();
							});
						}
					})
					var data = { type: "100005" };
					$.ajax({
						url: constans.serviceUrl + '/support/selectinfo',
						type: "post",
						async: true,
						data: data,
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
							var data4 = [];
							
							for(i in data.body) {
								data4.push({ text: data.body[i].value, value: data.body[i].key })
								
							}

							var picker4 = new Picker({
								data: [data4]
							});

							var picker4El = document.getElementById('picker4');

							picker4.on('picker.select', function(selectedVal, selectedIndex) {
								picker4El.innerText = data4[selectedIndex[0]].text;
								$("#picker4").css("margin-left", "10px");
								relationShip2Id = data4[selectedIndex[0]].value;
							});
							$(".myother").on("click", function() {
								picker4.show();
							})
						}
					})
				}
				$("#contacts1").on("click", function() {
					var relationName1 = $(".direct_name").val();
					var relationMob1 = $(".direct_tell").val();
					var relationName2 = $(".other_name").val();
					var relationMob2 = $(".other_tell").val();				
					var data = {
						relationMob1: relationMob1,
						relationMob2: relationMob2,
						relationName1: relationName1,
						relationName2: relationName2,
						relationShip1: relationShip1Id,
						relationShip2: relationShip2Id,
						userId: userId
					};
					$.ajax({
						url: constans.serviceUrl + '/credit/insertUserContactList',
						type: "post",
						async: true,
						data: data,
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
										window.location.href = constans.htmlUrl + "/index";							
									}
							if(data.code == 500) {
								$("#mode").show();
								$("#mode").html(data.msg);
								setTimeout(function() {
									$("#mode").hide();
								}, 2000)
							} else {
								$("#mode").show();
								$(".contacts").attr("disabled", "disabled");
								$("#mode").html(data.msg);
								setTimeout(function() {
									window.location = constans.htmlUrl + "/html/user/userInfoList.html";
									$("#mode").hide();
								}, 1000)
							}

						}
					})					
				})
                $("#contacts2").on("click", function() {
					var relationName1 = $(".direct_name").val();
					var relationMob1 = $(".direct_tell").val();
					var relationName2 = $(".other_name").val();
					var relationMob2 = $(".other_tell").val();				
					var data = {
						relationMob1: relationMob1,
						relationMob2: relationMob2,
						relationName1: relationName1,
						relationName2: relationName2,
						relationShip1: relationShip1Id,
						relationShip2: relationShip2Id,
						userId: userId
					};
					$.ajax({
						url: constans.serviceUrl + '/credit/insertUserContactList',
						type: "post",
						async: true,
						data: data,
						headers: {    
							loginTerm: "wx" ,
							rand: Math.round(Math.random()*89999) + 10000,
							accessToken: accessToken,
							jhVer: 2.0 
						},
						beforeSend: function() {
							$("body").Loading("show");
						},						
						success: function(data) {
							
							if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
							if(data.code == 500) {
								$("#mode").show();
								$("#mode").html(data.msg);
								setTimeout(function() {
									$("#mode").hide();
								}, 2000)
							} else {
								$.ajax({
										url: constans.serviceUrl + '/user/saveUserContinue',
										type: "post",
										async: true,
										data: data,
										headers: {    
											loginTerm: "wx" ,
											rand: Math.round(Math.random() * 89999) + 10000,
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
											console.log(data.body.nextPage);
											if(data.body.nextPage == 0){
												window.location = constans.htmlUrl + "/html/user/userInfoList.html";
											}
											if(data.body.nextPage == 1){
												window.location = constans.htmlUrl + "/html/user/usermessage.html";
											}
											if(data.body.nextPage == 2){
												window.location = constans.htmlUrl + "/html/user/workinfomation.html";
											}
											if(data.body.nextPage == 3){
												window.location = constans.htmlUrl + "/html/user/contacts.html";
											}
											if(data.body.nextPage == 6){
												window.location = constans.htmlUrl + "/index.html";
												 localStorage.removeItem("homefail");
											}
										}
							       })		
							}

						}
					})					
				})
				if(localStorage.getItem("contact") == 0) {

					var data = { rePage: '100092' }
					$.ajax({
						url: constans.serviceUrl + '/reputations/isCommited',
						type: "post",
						async: true,
						data: data,
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
										window.location.href = constans.htmlUrl + "/index";							
									}
							if(data.code == 500) {
								console.log(data)
							} else {
								if(!data.body) {
									$(".info a").on("click", function() {
										$(".info a").attr("href", "#")
										$(".wx").show();
										$("#mode2").show();
										$(".try").on("click", function() {
											window.location = constans.htmlUrl + "/html/user/contacts.html";
										})
										$(".sure").on("click", function() {

											var reContent = $("#packagingDesc").val();
											var rePage = location.href.split('#')[0];
											var reTitle = $("header p").html();
											var reTroubleType = $(".bg span").html();
											if(reTroubleType == '我不想借款了') {
												var num = '100077';
											} else {
												var num = '100078';
											}
											var data = {
												reContent: reContent,
												reCreateId: userId,
												rePage: 100092,
												reTitle: reTitle,
												reTroubleType: num
											}
											$.ajax({
												url: constans.serviceUrl + '/reputations',
												type: "post",
												async: true,
												data: data,
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
													
													if(data.code == 200) {
														window.location = constans.htmlUrl + "/html/user/userInfoList.html";
													}
												}
											})
										})
									})
								}
							}

						}
					})
				}
			}
		}
	})

})