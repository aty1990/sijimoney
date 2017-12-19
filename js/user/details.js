$(function(){	
	var accessToken = constans.accessToken;
	if(typeof(accessToken) != 'undefined') {
		var thisUrl = location.href.split('#')[0];
		var getUrlParam = function() {
			var r = thisUrl.match(/transId=([^?&]*)/); //匹配目标参数
			if(r != null) return unescape(r[1]);
			return null; //返回参数值       
		}
		var transId = getUrlParam();
		var getUrlParam1 = function() {
			var r = thisUrl.match(/type=([^?&]*)/); //匹配目标参数
			if(r != null) return unescape(r[1]);
			return null; //返回参数值       
		}
		var type = getUrlParam1();
		var data = { accessToken: accessToken };
		$.ajax({
			url: constans.serviceUrl + '/support/verUser',
			type: "post",
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
				if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
				var userId = data.body.userId;
				var data = {transId:transId,type:type,userId:userId};
				$.ajax({
					url: constans.serviceUrl + '/trans/detail',
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
						console.log(data);
						
						if(type == 4 ||type == 2){							
						   			
						    $(".type").html("支出");
						    $(".paymentName").html(data.body.paymentName);
						    $(".time").html(data.body.time);
						    $(".iconUrl").attr("src",data.body.iconUrl)
						    $(".transId").html(data.body.transId);
						    $(".amount").html(data.body.amount);						    
						    $(".typeName").html(data.body.typeName+data.body.status);
						    $(".bankName").html(data.body.bankName);
						}
						if(type == 5 ||type == 1 ||type == 3 ||type == 6){	
							$(".type").html("收入");
							$(".iconUrl").attr("src",data.body.iconUrl);			   
						    $(".paymentName").html(data.body.paymentName);
						    $(".time").html(data.body.time);
						    $(".transId").html(data.body.transId);
						    $(".amount").html(data.body.amount);						    
						    $(".typeName").html(data.body.typeName+data.body.status);
						    $(".bankName").html(data.body.bankName)
						}
						if(type == 3){
							$(".charge1").show();
							$(".charge").html(data.body.charge);
						}
					}
				})
				
			}
		})
		
	}
})
