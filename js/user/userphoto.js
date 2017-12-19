$(function() {

	var accessToken = constans.accessToken;
	var userId = sessionStorage.getItem("userId");
   	
	if(localStorage.getItem("face") == 0) {
		
		var data = { rePage:'100093' }
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
					if(data.body == false) {
						$(".info a").on("click", function() {
							$(".info a").attr("href", "#")
							$(".wx").show();
							$("#mode2").show();
							$(".try").on("click", function() {
								window.location = constans.htmlUrl + "/html/user/userphoto.html";
							})
							$(".sure").on("click", function() {
							
								var reContent = $("#packagingDesc").val();
								
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
									rePage: 100093,
									reTitle: reTitle,
									reTroubleType: num
								}
								$.ajax({
									url: constans.serviceUrl + '/reputations',
									type: "post",
									async:true,
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
										
										if(data.code == 200){
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
	if(localStorage.getItem("face") == 0) {
		$(".msghide").show();
		$(".msg").hide();
	}
	if(localStorage.getItem("face") == 1 || localStorage.getItem("face") == 2) {
		$(".photo_up").val("人脸识别已完成");
		$(".photo_up").css("background","#fafafa");
		$(".photo_up").css("color","#000");
		$(".photo_up").attr("disabled", "disabled");
		$("#file").attr("disabled", "disabled");
	}

	//活体状态判断
	var data = { userId: userId }
	$.ajax({
		type: "post",
		url: constans.serviceUrl + "/credit/submitlivingstat",
		async: true,
		data: data,
		headers: {    
			loginTerm: "wx" ,
			rand: Math.round(Math.random()*89999) + 10000,
			accessToken: accessToken,
			jhVer: "2.0" 
		},
		beforeSend: function() {
			$("#mode1").show();
		},
		complete: function() {
			$("#mode1").hide();
		},
		success: function(data) {
			
			if(data.code == 500) {
				console.log(data.msg)
			} else {
				var pic_path = data.body.pic_path
				localStorage.setItem('img1',pic_path);
				$('.user_photo').attr('src', pic_path);
				
				if(localStorage.getItem("face") == 2 || localStorage.getItem("face") == 1) {
					$(".msghide").hide();
					$(".msg").show();					
				}						
			}
		}
	})

})