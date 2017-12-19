$(function(){
	var accessToken = constans.accessToken;
	var flag = localStorage.getItem("flag");
	if(flag == null) {
		if(browser.versions.weixin) {
			var thisUrl = location.href.split('#')[0];
			var data = { url: thisUrl };
			$.ajax({
				url: constans.serviceUrl + '/wx/getWxSign',
				type: 'post',				
				data: data,
				headers: { 
					loginTerm: 'wx'		            
				},
				beforeSend: function() {
					$("body").Loading("show");
				},
				complete: function() {
					$("body").Loading("hide");
				},
				success: function(data) {					
					console.log(data.body);
					var appId = data.body.appid;
					var nonceStr = data.body.noncestr;
					var signature = data.body.signature;
					var timestamp = data.body.timestamp;

					wx.config({
						debug: false,
						appId: appId,
						timestamp: timestamp,
						nonceStr: nonceStr,
						signature: signature,
						jsApiList: ['openLocation','getLocation']
					});
					
					wx.ready(function() {							
						wx.getLocation({
							type: 'gcj02',
							success: function(res) {								
								var latitude = res.latitude;
								var longitude = res.longitude;										
							},							
							cancel: function(res) {
								alert("用户拒绝授权获取地理位置")
							}
						})
						
					})
	
				}
			})
		} 		
	} 
})