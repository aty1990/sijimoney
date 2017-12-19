$(function() {
	var accessToken = constans.accessToken;
	
	if(typeof(accessToken) != 'undefined') {
		$(".no_repay").hide();
		$(".repay").show();
		$(".bottom").show();
		var data = { accessToken: accessToken };
		$.ajax({
			url: constans.serviceUrl + '/support/verUser',
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
				var userId = data.body.userId;
				var data = {
					userId: userId
				};
				$.ajax({
					url: constans.serviceUrl + '/trans/loanrecord',
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
						if(data.code == 803) {
							
							$(".no_repay").show();
							$(".repay").hide();
							$(".bottom").hide();
							$(".onrepay").on("click", function() {
								window.location = constans.htmlUrl + "/index.html";
							})
						} else {
							var html = template('homebank', data);
							$('.repay').html(html);

							for(var i = 0; i < data.body.length; i++) {
								
								$(".repaymo").eq(i).on("click", function() {
									var index = $(this).index();
									localStorage.setItem("index", index);
									window.location = constans.htmlUrl + "/html/home/record.html";
								})
							}

						}

					}
				})
			}
		})
	} else {
		$(".no_repay").show();
		$(".repay").hide();
	}
})