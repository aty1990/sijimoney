$(function() {
	//登录后权限验 证
	var accessToken = constans.accessToken;		
	var userStat = sessionStorage.getItem("userStat");
	if(userStat == "undefined") {
		window.location = constans.htmlUrl + "/index.html";
	} else {
		var userId = sessionStorage.getItem("userId");
		var source = localStorage.getItem("source");
		var data = {
			userId: userId,
			source: source,
			jhVer: 2.0
		};
		$.ajax({
			url: constans.serviceUrl + '/user/userInfoList',
			type: "post",
			data: data,
			async: true,
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
				console.log(data);
				if(data.code == 111) {						
					window.location.href = constans.htmlUrl + "/index";							
				}
				if(data.code == 500) {
					console.log(data.msg);
				} else {
					localStorage.setItem("person", data.body.person);
					localStorage.setItem("work", data.body.work);
					localStorage.setItem("contact", data.body.contact);
					localStorage.setItem("face", data.body.face);
					localStorage.setItem("mobile", data.body.mobile);
					
					if(data.body.person == 0) {
						$(".weui_contact").attr("href", "#");
						$(".weui_work").attr("href", "#");
						$(".weui_contact").on("click", function() {
							window.location = constans.htmlUrl + "/html/user/nocontact.html";
						})
						$(".weui_work").on("click", function() {
							window.location = constans.htmlUrl + "/html/user/nowork.html";
						})
					} else {
						$(".person").css("color", "#333");
						$(".person").html("已填写");
						if(data.body.work == 0) {
							$(".work").html("未完善");
						} else {
							$(".work").css("color", "#333");
							$(".work").html("已填写");
						}

						if(data.body.contact == 0) {
							$(".contact").html("未完善");
						} else {
							$(".contact").css("color", "#333");
							$(".contact").html("已填写");
						}
						if(data.body.work == 1 && data.body.person == 1 && data.body.contact == 1) {
							$(".userInfo_sumbit").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
							$(".userInfo_sumbit").css("background-size", "100% 100%");							

							//									反欺诈1
							$(".userInfo_sumbit").on("click", function() {
								
								      localStorage.removeItem("homefail");
									var tokenId = localStorage.getItem("token");
									data = { tongdId: tokenId, userId: userId }
									$.ajax({
										url: constans.serviceUrl + '/riskManagements/antiFraud1',
										type: "post",
										data: data,
										async: true,
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
												}, 3000)
											}
											if(data.code == 100005) {												
												var data = {
													userId: userId,
													source: source,
													jhVer: 2.0
												};
												$.ajax({
													url: constans.serviceUrl + '/user/userInfoList',
													type: "post",
													data: data,
													async: true,
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
														
														if(data.code == 500) {
															console.log(data.msg);
														} else {
															$(".dd1").show();
															$(".userInfo").hide(); 
															$(".userInfo1").show();
															localStorage.setItem("person", data.body.person);
															localStorage.setItem("work", data.body.work);
															localStorage.setItem("contact", data.body.contact);
															localStorage.setItem("face", data.body.face);
					                                        localStorage.setItem("mobile", data.body.mobile);
															if(data.body.face == 1 || data.body.face == 2) {
																$(".face").html("已填写");
																$(".face").css("color", "#333");
																$(".weui_mobile").on("click", function() {
																	window.location = constans.htmlUrl + "/html/user/usermob.html";
																})
															}
															
															$(".userphoto").show();
															
															$(".top1").show();
															if(data.body.mobile == 4){
																$('.weui_mobile').hide();
															}else{
																$('.weui_mobile').show();
																if(data.body.mobile == 0 && data.body.face == 0){
																	$(".weui_mobile").on("click", function() {
																		window.location = constans.htmlUrl + "/html/user/nomob.html";
																	})
																}
															}
															$(".userInfo_sumbit1").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
															$(".userInfo_sumbit1").css("background-size", "100% 100%");		
															$(".default1").on("click", function() {
															    $(".dd1").hide();	
															})
														}
													}
												})																							
												
											}
											if(data.code == 100007) {
												$("#mode").show();
												$("#mode").html(data.msg);
												setTimeout(function() {
													$("#mode").hide();
												}, 3000)
											}
											if(data.code == 100006) {
												$(".dd1").hide();
												window.location = constans.htmlUrl + "/index.html";
											}
										}
									})								
							})
						}

					}
					if(data.body.face == 1 || data.body.face == 2) {
						$(".userphoto").show();
						$(".face").html("已填写");
						$(".face").css("color", "#333");
						if(data.body.mobile == 4) {
							$('.weui_mobile').hide();
							var tokenId = localStorage.getItem("token");
							//                               反欺诈2提交
								$(".userInfo_sumbit1").on("click", function() {
									data = { tongdId: tokenId, userId: userId }
									$.ajax({
										url: constans.serviceUrl + '/riskManagements/antiFraud2',
										type: "post",
										data: data,
										async: true,
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
											
											if(data.code == 500) {
												$("#mode").show();
												$("#mode").html(data.msg);
												setTimeout(function() {
													$("#mode").hide();
												}, 3000)
											} else {
												window.location = constans.htmlUrl + "/index.html";
											}
										}
									})
								})
							if(data.body.af2 == 1) {
								$(".userInfo_sumbit1").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
								$(".userInfo_sumbit1").css("background-size", "100% 100%");
								
							}
							if(data.body.af2 == 2) {
								$(".userInfo_sumbit1").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
								$(".userInfo_sumbit1").css("background-size", "100% 100%");								
								$(".userInfo_sumbit1").attr("disabled", "disabled")
							}
							if(data.body.af2 == 4) {
								$(".userInfo_sumbit1").hide();
								$(".userinfo_back").on("click", function() {
									$(".dd").hide();
									window.location = constans.htmlUrl + "/user.html";
								})
                               if(data.body.isReloan == 1){
                               	  $(".face").html("");
                               	  $(".mobile").html("");
                               	  $(".contact").html("");
                               	  $(".person").html("");						
							      $(".work").html("");
                               }
							}
						}
						if(data.body.mobile == 2) {
							$(".mobile").html("已填写");
							$(".mobile").css("color", "#333");

							var tokenId = localStorage.getItem("token");
							if(data.body.face == 1 || data.body.face == 2 && data.body.mobile == 2) {
								//                               反欺诈2提交
								$(".userInfo_sumbit1").on("click", function() {
									 localStorage.removeItem("homefail");
									data = { tongdId: tokenId, userId: userId }
									$.ajax({
										url: constans.serviceUrl + '/riskManagements/antiFraud2',
										type: "post",
										data: data,
										async: true,
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
												}, 3000)
											} else {
												window.location = constans.htmlUrl + "/index.html";
											}
										}
									})
								})
							}
							if(data.body.af2 == 1) {
								$(".userInfo_sumbit1").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
								$(".userInfo_sumbit1").css("background-size", "100% 100%");
								
							}
							if(data.body.af2 == 2) {
								$(".userInfo_sumbit1").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
								$(".userInfo_sumbit1").css("background-size", "100% 100%");								
								$(".userInfo_sumbit1").attr("disabled", "disabled")
							}
							if(data.body.af2 == 4) {
								$(".userInfo_sumbit1").hide();
								$(".userinfo_back").on("click", function() {
									$(".dd").hide();
									window.location = constans.htmlUrl + "/user.html";
								})
                               if(data.body.isReloan == 1){
                               	  $(".face").html("");
                               	  $(".mobile").html("");
                               	  $(".contact").html("");
                               	  $(".person").html("");						
							      $(".work").html("");
                               }
							}
						} else {
							$(".mobile").html("未完善");
						}
					} else {
						$(".face").html("未完善");
						if(data.body.mobile == 4 && data.body.face == 0 ) {
							$('.weui_mobile').hide();
						}
						$(".weui_mobile").attr("href", "#");
						if(data.body.face == 0){
							$(".weui_mobile").on("click", function() {
								window.location = constans.htmlUrl + "/html/user/nomob.html";
							})
						}
						
					}
					
					if(data.body.face == 4 && data.body.mobile == 4) {
						$(".userphoto").hide();
                        $('.weui_mobile').hide();
					}else{
						$(".userInfo").hide();
						$(".userInfo1").show();
						$(".userphoto").show();
                        $(".top1").show();
						if(data.body.face == 0 && data.body.mobile == 4){
							$('.weui_mobile').hide();
						}else{
							 $('.weui_mobile').show();
						}
					}
					if(data.body.face == 1 || data.body.face == 2 && data.body.mobile == 1 || data.body.mobile == 2 && data.body.person == 2 && data.body.work == 2 && data.body.contact == 2) {
						$(".userInfo").hide();
						$(".userInfo1").show();
						$(".userphoto").show();
                        $('.weui_mobile').show();
                        $(".top1").show();
					}
					
					if(data.body.face == 1 || data.body.face == 2 && data.body.mobile == 4 && data.body.person == 2 && data.body.work == 2 && data.body.contact == 2) {
						$(".userInfo").hide();
						$(".userInfo1").show();
						$(".userphoto").show();
                        $('.weui_mobile').show();
						$('.weui_mobile').hide();
						$(".top1").show();
					}
					if(data.body.face == 4 && data.body.mobile == 4 && data.body.person == 4 && data.body.work == 4 && data.body.contact == 4) {
						$(".noloan").show();
						$(".showloan").hide();
						$(".userInfo").hide();
					}
					if(data.body.person == 2 && data.body.work == 4 && data.body.contact == 4){
						$(".weui_person").show();
						$(".weui_work").hide();
						$(".weui_contact").hide();
						if(data.body.isReloan == 1){$(".person").html("");}
						if(data.body.af2 == 4) {$(".userInfo").hide();}
						
					}
					if(data.body.person == 2 && data.body.work == 2 && data.body.contact == 4){
						$(".weui_person").show();
						$(".weui_work").show();
						$(".weui_contact").hide();
						if(data.body.isReloan == 1){$(".person").html("");	$(".work").html("");}
						if(data.body.af2 == 4) {$(".userInfo").hide();}
					}
					if(data.body.person == 2 && data.body.work == 4 && data.body.contact == 2){
						$(".weui_person").show();
						$(".weui_work").hide();
						$(".weui_contact").show();
						if(data.body.isReloan == 1){$(".contact").html("");$(".person").html("");}
						if(data.body.af2 == 4) {$(".userInfo").hide();}
					}
					if(data.body.person == 2 && data.body.work == 2 && data.body.contact == 2){
						$(".weui_person").show();
						$(".weui_work").show();
						$(".weui_contact").show();
						if(data.body.isReloan == 1){$(".contact").html("");$(".person").html("");$(".work").html("");}
						if(data.body.af2 == 4) {$(".userInfo").hide();}
					}
					if(data.body.face == 4 && data.body.mobile == 4) {
						$(".userphoto").hide();
                        $('.weui_mobile').hide();
                        if(data.body.af2 == 4) {$(".userInfo1").hide();}
					}
					if(data.body.face == 2 && data.body.mobile == 4) {
						$(".userphoto").show();
                        $('.weui_mobile').hide();
                        if(data.body.af2 == 4) {$(".userInfo1").hide();}
                        if(data.body.isReloan == 1){$(".face").html("");}
					}
					if(data.body.face == 2 && data.body.mobile == 2) {
						$(".userphoto").show();
                        $('.weui_mobile').show();
                        if(data.body.af2 == 4) {$(".userInfo1").hide();}
                        if(data.body.isReloan == 1){$(".face").html("");$(".mobile").html("");}
					}
				}
			}
		})

	}

	if(localStorage.getItem("source") == 1) {
		$(".userinfo_back").on("click", function() {
			$(".dd").show();
			$(".primary").on("click", function() {
				$(".dd").hide();
			})
		})
		$(".default").on("click", function() {
			window.location = constans.htmlUrl + "/index.html";
		})
	}
	if(localStorage.getItem("source") == 2) {
		$(".userinfo_back").on("click", function() {
			window.location = constans.htmlUrl + "/user.html";
		})
	}

})

$(".user").on("click", function() {
	window.location.href = constans.htmlUrl + "/index.html";
})
var layerIndex = null;
function jkyt(){
	var html = '<ul class="jkyt-pop">\
			<li class="item gary-font">请选择实际资金用途,禁止用于购<br>房、投资及各种非消费场景</li>\
			<li class="item" type="1">个人日常消费</li>\
			<li class="item" type="2">装修</li>\
			<li class="item" type="3">旅游</li>\
			<li class="item" type="4">教育</li>\
			<li>医疗</li>\
		</ul>'
 	layerIndex = layer.open({
	    content: html
	    ,btn: ['取消']
	    ,skin: 'footer'
	    ,style:'background:#F2F2F2;width:100%;border-radius:0;'
	    ,yes: function(index){
	    	layer.close(layerIndex);
	    }
	});
}

$("body").on("click",".jkyt-pop li",function(){
	$("#jkyt").html(this.innerHTML);
 	layer.close(layerIndex);
});