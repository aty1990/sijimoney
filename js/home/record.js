$(function() {
	var accessToken = constans.accessToken;
	
	var data = { accessToken: accessToken };
		$.ajax({
			url: constans.serviceUrl + '/support/verUser',
			type: "post",
			
			data: data,
			headers: {
				loginTerm: "wx",
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
				var userId = data.body.userId;
					var data = {
						userId: userId
					};
					$.ajax({
						url: constans.serviceUrl + '/trans/loanrecord',
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
							if(data.code == 500){
								console.log(data.msg)
							}else{
								var html = template('homebank1', data);
								$('.repay').html(html);
								
								var dd=data.body;								
								for(var i=0;i<dd.length;i++){
									var index=localStorage.getItem("index");
									if($('.taskStat').eq(i).html() == "还款中" || $('.taskStat').eq(i).html() == "已逾期"){										
										$('.repaymo').eq(i).show();
										$("#id").css("display","block");											
                                        $(".top").show();									
										var taskId=dd[index].taskId;
										localStorage.setItem("taskId",dd[index].taskId);
                                        console.log(taskId)											
										var data = {
											taskId:taskId,
											userId: userId
										};
										$.ajax({
											url: constans.serviceUrl + '/trans/loandetail',
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
												if(data.code == 500){
														console.log(data.msg)
												}else{	
													
													var html = template('home', data);
													$('.list').html(html);	
													$(".list ul").find(".statuser1").on("click",function(){												   
														var periodNum=$(this).attr("name")
														localStorage.setItem("periodNum",periodNum);
														window.location = constans.htmlUrl + "/html/home/payback.html";
													})
													$(".periodNum").show();
                                                    $(".xieyi").on("click",function(){											    
														localStorage.setItem("downloadUrl",data.body.downloadUrl);
														window.location = constans.htmlUrl + "/html/home/xieyi.html"+ "?taskId=" + taskId + "&accessToken=" + accessToken;
													})
                                                   	if(data.body.taskStat == '7A'){
														$("#id").hide();
														  $(".top").hide();	
													}									
												}
											}
										})		
																				
									}else{										
										$('.repaymo').eq(index).siblings().hide();
//                                       $(".top").hide();										
										var taskId=dd[index].taskId;
										localStorage.setItem("taskId",dd[index].taskId);
                                        console.log(taskId)											
										var data = {
											taskId:taskId,
											userId: userId
										};
										$.ajax({
											url: constans.serviceUrl + '/trans/loandetail',
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
												console.log(data.body.list)
												if(data.code == 500){
														console.log(data.msg)
												}else{																											
													var html = template('home', data);
													$('.list').html(html);	
													$(".list ul").find(".statuser1").on("click",function(){												   
														var periodNum=$(this).attr("name")
														localStorage.setItem("periodNum",periodNum);
														window.location = constans.htmlUrl + "/html/home/payback.html";
													})
													$(".periodNum").show();
                                                    $(".xieyi").on("click",function(){											    
														localStorage.setItem("downloadUrl",data.body.downloadUrl);
														window.location = constans.htmlUrl + "/html/home/xieyi.html"+ "?taskId=" + taskId + "&accessToken=" + accessToken;
													})
                                                   	if(data.body.taskStat == '7A'){
														$("#id").hide();
													}									
												}
											}
										})
									 										
									}																																		
									
								}
							}
						}
					})
			}
		})
})