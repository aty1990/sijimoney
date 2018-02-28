$(function() {

	var accessToken = constans.accessToken;
	var data = { type: "100024" };
	$.ajax({
		url: constans.serviceUrl + '/support/selectinfo',
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

			if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
			if(data.code == 500) {
				console.log(data.msg);
			} else {
				var html = template('home', data);
				$('.ul').html(html);

				$(".ul").find("li").on("click", function() {
					var reportkey = $(this).attr("name")
					localStorage.setItem("reportkey", reportkey);
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
					if($('.ul li').hasClass('active')) {

						$(".tijiao").removeAttr("disabled");
						$(".tijiao").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
						$(".tijiao").css("background-size", "100% 100%");

					} else {
						$(".tijiao").attr("disabled", "dsiabled");
						$(".tijiao").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
						$(".tijiao").css("background-size", "100% 100%");

					}
				})

				$(".tijiao").on("click", function() {
					var formData = new FormData(),
						$obj = $('.obj');
					for(var i = 0; i < $obj.length; i++) {
						formData.append('files', $obj[i].file);
					}
					var accessToken = constans.accessToken;
					var smCreateId = sessionStorage.getItem("userId");
					var name = $("#packagingDesc").val();					
					var smContent1 = /^[\u4E00-\u9FA5\w,\s\.·——。，？！@#￥%……&*（）——\+?,!@#$%^&*()_+;:：；‘’''""”“｜]+$/.test(name);
					if(smContent1 == false && name != "") {
						alert("格式错误，不能输入非法字符，请重新输入");
					} else {
						var smContent = name;
						var smTroubleType = localStorage.getItem("reportkey");
						formData.append("smContent", smContent);
						formData.append("smTroubleType", smTroubleType);
						formData.append("smTitle", "");
						$.ajax({
							url: constans.serviceUrl + '/reputations/smalls',
							type: "post",
							async: true,
							data: formData,
							processData: false,
							contentType: false,
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
								if(!$.trim(data)) {
									$(".tijiao").attr("disabled", "dsiabled");
									setTimeout(function() {
										window.location = constans.htmlUrl + "/user.html";
									}, 2000);
									return true;
								}

								if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
								if(data.code == 500) {
									$("#mode").show();
									$("#mode").html(data.msg);									
									setTimeout(function() {										
										$("#mode").hide();
									}, 1000);
								} else {
									$("#mode").show();
									$("#mode").html(data.msg);
									$(".tijiao").attr("disabled", "dsiabled");
									setTimeout(function() {
										window.location = constans.htmlUrl + "/user.html";
										$("#mode").hide();
									}, 1000);
								}
							}
						})
					}

				})
			}

		}
	})

})