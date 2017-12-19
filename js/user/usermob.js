$(function(){
	'use strict'
	var accessToken = constans.accessToken,
	user = $.cookie("phoneNo"),
	$usermob = $('#usermob'),
	$confirm1 = $('.confirm1'),
	$serve_pwd = $('#serve_pwd'),
	$confirm = $('.confirm'),
	$con = $(".con"),
	logLevel = 'debug',
	mobileFlag = localStorage.getItem("mobile"),
	$mode1 = $("#mode11"),
	handler = {
		100000 : function(){
			var $mode = $('#mode');
			$mode1.hide();
			$('.sumbit').hide();
			$('.sumbit1').hide();
			$confirm.show();
			$mode.html(this.msg);
			$confirm.removeAttr('disabled');
			$mode.show();
			setTimeout(function() {
				$mode.hide();
			}, 3000);
			$('.serve_usermob').hide();
			$('.code_usermob').show();
		},
		100001 : function(){
			var $mode = $('#mode');
			$mode.html(this.msg);
			$mode1.hide();
			$mode.show();
			setTimeout(function() {
				$mode.hide();
			}, 2000);
			$confirm1.removeAttr('disabled');
		},
		100002 : function(){
			var $mode = $('#mode');
			$mode.html(this.msg);
			$mode.show();
			$mode1.hide();
			setTimeout(function() {
				$mode.hide();
			}, 2000);
			$confirm1.removeAttr('disabled');
			$confirm.removeAttr('disabled');
			$con.removeAttr('disabled');
		},
		100003 : function(){
			var $mode = $('#mode');
			$mode.html(this.msg);
			$mode.show();
			$mode1.hide();
			setTimeout(function() {
				$mode.hide();
				window.location = constans.htmlUrl + '/html/user/userInfoList.html';
			}, 1000);
		},
		100004 : function(){
			var $mode = $('#mode');
			$('.sumbit').hide();
			$('.sumbit1').hide();
			$con.removeAttr('disabled');
			$con.show();
			$mode1.hide();
			$mode.html(this.msg);
			$mode.show();
			setTimeout(function() {
				$mode.hide();
			}, 3000);
			$(".serve_usermob").hide();
			$(".check_usermob").show();
		},
		error : function(){
			$.ajax({
				type: 'post',
				url: constans.serviceUrl + '/tel/authentications/status',
				async: true,														
				headers: {   
					loginTerm: 'wx' ,
					rand:Math.round(Math.random()*89999) + 10000,
					accessToken: accessToken,
					jhVer: '2.0' 
				},
				success: function(data) {
					if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
					if(data.code == 500){
						setTimeout(function() {
				           handler.error();
			            }, 1000);						
					}else{
						var process = handler[data.code];
						if(process != null){
							process.call(data);
						}else{
							// 返回的错误码不能识别
						handler[100002].call({msg:'系统错误，请联系客服'});
						}						
					}
				},
				error : function(){
					handler[100002].call({msg:'系统错误，请联系客服'});
				}
			})
		}
	},
	sendRequest = function(url, data){
		if(logLevel == 'debug') console.log('手机服务密码认证开始，参数：%o', data);
		$.ajax({
			type : 'post',
			url : constans.serviceUrl + url,
			async : true,			
			data : data,
			headers: {    
				loginTerm:'wx' ,
				rand:Math.round(Math.random()*89999) + 10000,
				accessToken: accessToken,
				jhVer: '2.0' 
			},
			success:function(data){
				if(!$.trim(data)){
					setTimeout(function() {
					  handler.error();
				    }, 3000);
				    return true;
				}
				
				if(logLevel == 'debug') console.log('手机服务密码认证请求成功，响应结果：%o', data);
				var process = handler[data.code];
				if(process != null){
					process.call(data);
				}else{
					// 返回的错误码不能识别
				   handler[100002].call({msg:'系统错误，请联系客服'});
				}
				
			},
			
			error:function(){
				if(logLevel == 'debug') console.log('手机服务密码认证请求错误，响应结果：%o', arguments);				
				setTimeout(function() {
				  handler.error();
			    }, 3000);
			}
		});
	};
	
	$('.input_p').bind('input propertychange', function() {
		var serve_pwd = $serve_pwd.val();
		if(serve_pwd) {
			$serve_pwd.next('.close').show();
		}
		
		if(serve_pwd && (/^[\w\W]{6,}$/.test(serve_pwd))) {
			$confirm1.css({
				background : 'url(../../images/btn_normal@2x.png) no-repeat',
				'background-size' : '100% 100%'
				
			});
			$confirm1.removeAttr('disabled');
		} else {
			$confirm1.css({
				background : 'url(../../images/btn_disabled@2x.png) no-repeat',
				'background-size' : '100% 100%'
				
			});
			$confirm1.attr('disabled','disabled');
		}
	});
	
	$('.close').click(function() {
		var $this = $(this);
		$this.prev('input').val('');
		$this.hide();
		$confirm1.css({
			background : 'url(../../images/btn_disabled@2x.png) no-repeat',
			'background-size' : '100% 100%'
		});
	});
	
	$(".pwd_show").on("click", function() {
		if($("#serve_pwd").attr("type") == "password") {
			$("#serve_pwd").attr("type", "text");
			$('.pwd_show img').attr("src", "../../images/ico_show@2x.png");
		} else {
			$("#serve_pwd").attr("type", "password");
			$('.pwd_show img').attr("src", "../../images/ico_hide@2x.png");
		}
	})
	
	$confirm1.click(function(){
		if(logLevel == 'debug') console.log('手机服务密码认证请求加载中...');
		$mode1.show();			
		$confirm1.attr('disabled','disabled');
		$('.userfindpwd').attr('href','#');
		sendRequest('/tel/servicePwd/authentications', {servicePwd:$serve_pwd.val()});
     
	});
	
	$confirm.click(function(){
		if(logLevel == 'debug') console.log('手机服务密码认证请求加载中...');
		$mode1.show();	
		$confirm.attr('disabled','disabled');
		sendRequest('/tel/captcha/authentications', {captcha:$('#serve_code').val()});
	});
	
	$con.click(function() {
		if(logLevel == 'debug') console.log('手机服务密码认证请求加载中...');
		$mode1.show();
		$con.attr('disabled','disabled');
		sendRequest('/tel/queryPwd/authentications', {queryPwd:$("#check_code").val()});
	});
			
 	
	$usermob.val(user);
	if(mobileFlag == 2) {
		$(".hide").hide();
		$(".show").show();
	}
	else if(mobileFlag == 0) {
		$.ajax({
			url: constans.serviceUrl + '/reputations/isCommited',
			type: "post",
			async: true,
			data: { rePage: '100094' }, 
			headers: { 
				loginTerm: "wx" ,
				rand:Math.round(Math.random()*89999) + 10000,
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
					console.log(data)
				}else{
					if(!data.body) {
						$(".info a").on("click", function() {
							$(this).attr("href", "#");
							$(".wx").show();
							$("#mode2").show();
							$(".try").click(function() {
								window.location = constans.htmlUrl + "/html/user/usermob.html";
							});
							$(".sure").click(function() {
							
								var reContent = $("#packagingDesc").val();
								if(reTroubleType == '我不想借款了') {
									var num = '100077';
								} else {
									var num = '100078';
								}
								var reTitle = $("header p").html();
								var reTroubleType = $(".bg span").html();
								var data = {
									isLeave :0,
									reContent: reContent,									
									rePage: 100094,
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
										rand:Math.round(Math.random()*89999) + 10000,
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
										if(data.code == 200){
											window.location = constans.htmlUrl + "/html/user/userInfoList.html";
										}
									}
								});
							});
						});
					}
				}
			}
		})
	}
});