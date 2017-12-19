$(function() {
	var accessToken = constans.accessToken;
	var thisUrl = location.href.split('#')[0];
	var getUrlParam = function() {
		var r = thisUrl.match(/msgId=([^?&]*)/); //匹配目标参数
		if(r != null) return unescape(r[1]);
		return null; //返回参数值       
	}
	var msgId = getUrlParam();
	var getUrlParam1 = function() {
		var r = thisUrl.match(/msgType=([^?&]*)/); //匹配目标参数
		if(r != null) return unescape(r[1]);
		return null; //返回参数值       
	}
	var msgType = getUrlParam1();
	var getUrlParam2 = function() {
		var r = thisUrl.match(/type=([^?&]*)/); //匹配目标参数
		if(r != null) return unescape(r[1]);
		return null; //返回参数值       
	}
	var type = getUrlParam2();
	var getUrlParam3 = function() {
		var r = thisUrl.match(/msgLink=([^?&]*)/); //匹配目标参数
		if(r != null) return unescape(r[1]);
		return null; //返回参数值       
	}
	var msglink = getUrlParam3();
	$(".info").on("click", function() {
		window.location = constans.htmlUrl + "/html/home/nomessage.html?v="+Math.random();
	})
	if(msglink) {
		$(".mess").hide();
		$(".mess1").append('<iframe src="' + msglink + '" style="width:100%;height:1000px;border:none;"></iframe>')
	} else {

		if(type == "normal") {
			var data = { msgId: msgId, type: "normal", term: "wx" }
			$.ajax({
				url: constans.serviceUrl + '/H5toRtf',
				type: "post",
				async: true,
				data: data,
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
					console.log(data);
					$(".mess1").hide();
					var tem = data.body
					var time = tem.createTime.substr(0, 4) + '-' + tem.createTime.substr(4, 2) + '-' + tem.createTime.substr(6, 2) + '&nbsp;' + tem.createTime.substr(8, 2) + ':' + tem.createTime.substr(10, 2) + ':' + tem.createTime.substr(12, 2)
					$(".msgTitle").html(data.body.msgTitle);
					$(".createTime").html(time);
					$(".msgContent").html(data.body.msgContent);
				}
			})
		}
		if(type == "act") {
			var data = { msgId: msgId, type: "act", term: "wx" }
			$.ajax({
				url: constans.serviceUrl + '/H5toRtf',
				type: "post",
				async: true,
				data: data,
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
					console.log(data);
					$(".mess1").hide();
					var tem = data.body
					var time = tem.createTime.substr(0, 4) + '-' + tem.createTime.substr(4, 2) + '-' + tem.createTime.substr(6, 2) + '&nbsp;' + tem.createTime.substr(8, 2) + ':' + tem.createTime.substr(10, 2) + ':' + tem.createTime.substr(12, 2)
					$(".msgTitle").html(data.body.msgTitle);
					$(".createTime").html(time);
					$(".msgContent").html(data.body.msgContent);
				}
			})
		}
		if(type == "notice") {
			var data = { msgId: msgId, type: "notice", term: "wx" }
			$.ajax({
				url: constans.serviceUrl + '/H5toRtf',
				type: "post",
				async: true,
				data: data,
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
					console.log(data);
					$(".mess1").hide();
					var tem = data.body
					var time = tem.createTime.substr(0, 4) + '-' + tem.createTime.substr(4, 2) + '-' + tem.createTime.substr(6, 2) + '&nbsp;' + tem.createTime.substr(8, 2) + ':' + tem.createTime.substr(10, 2) + ':' + tem.createTime.substr(12, 2)
					$(".msgTitle").html(data.body.msgTitle);
					$(".createTime").html(time);
					$(".msgContent").html(data.body.msgContent);
				}
			})
		}
	}
})