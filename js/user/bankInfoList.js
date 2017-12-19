$(function() {
	var accessToken = constans.accessToken;

	var userStat = sessionStorage.getItem("userStat");
	var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
	var chnUnitChar = ["", "十", "百", "千"];

	function SectionToChinese(section) {
		var strIns = '',
			chnStr = '';
		var unitPos = 0;
		var zero = true;
		while(section > 0) {
			var v = section % 10;
			if(v === 0) {
				if(!zero) {
					zero = true;
					chnStr = chnNumChar[v] + chnStr;
				}
			} else {
				zero = false;
				strIns = chnNumChar[v];
				strIns += chnUnitChar[unitPos];
				chnStr = strIns + chnStr;
			}
			unitPos++;
			section = Math.floor(section / 10);
		}
		return chnStr;
	}

	function NumberToChinese(num) {
		var unitPos = 0;
		var strIns = '',
			chnStr = '';
		var needZero = false;

		if(num === 0) {
			return chnNumChar[0];
		}

		while(num > 0) {
			var section = num % 10000;
			if(needZero) {
				chnStr = chnNumChar[0] + chnStr;
			}
			strIns = SectionToChinese(section);
			strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
			chnStr = strIns + chnStr;
			needZero = (section < 1000) && (section > 0);
			num = Math.floor(num / 10000);
			unitPos++;
		}

		return chnStr;
	}
	if(typeof(accessToken) != 'undefined') {
		$(".no_bank").hide();
		$("#bankcard").show();
		var data = { accessToken: accessToken };
		$.ajax({
			url: constans.serviceUrl + '/support/verUser',
			type: "post",
			async: true,
			data: data,
			headers: {    
				loginTerm: "wx" ,
				accessToken: accessToken,
				rand: Math.round(Math.random() * 89999) + 10000,
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
					async: true,
					data: data,
					headers: {    
						loginTerm: "wx",
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
					success: function(data,status,resObj) {

						if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
						if(data.code == 803) {

							$(".no_bank").show();
							$("#bankcard").hide();

						} else {
							var html = template('homebank', data);
							$('.ulo').html(html);
							var en = resObj.getResponseHeader('num_en');
							var cn = NumberToChinese(en);
							$(".num").html(cn);
							if($(".ulo li").length >= en) {
								$(".addbank").hide();
							}
						}
					}
				})
			}
		})
		$(".addbank").on("click", function() {
			$.ajax({
				url: constans.serviceUrl + '/credit/isaddbankcard',
				type: "post",
				async: true,
				data: data,
				headers: {    
					loginTerm: "wx",
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
					if(data.code == 200) {
						if(data.body.stat != 0) {
							if(data.body.name != "") {
								window.location.href = constans.htmlUrl + "/html/user/bank.html";
							} else {
								window.location.href = constans.htmlUrl + "/html/user/norealbank.html";
							}
						} else {
							$("#mode").show();
							$("#mode").html(data.msg);
							setTimeout(function() {
								window.location.href = constans.htmlUrl + "/index.html";
								$("#mode").hide();
							}, 2000);

						}

					}
					if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
					if(data.code == 500) {
						$("#mode").show();
						$("#mode").html(data.msg);
						setTimeout(function() {
							window.location.href = constans.htmlUrl + "/index.html";
							$("#mode").hide();
						}, 2000);
					}

				}
			})
		})
	} else {
		$(".no_bank").show();
		$("#bankcard").hide();
	}
	$(".info").on("click", function() {
		window.location = constans.htmlUrl + "/user.html";
	})
})