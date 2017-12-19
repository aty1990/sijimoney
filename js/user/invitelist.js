$(function() {
	var accessToken = constans.accessToken;
	
	var data = { accessToken: accessToken };
	$.ajax({
		url: constans.serviceUrl + '/support/verUser',
		type: "post",
		async: true,
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
			var data = { page: 1, userId: userId };
			$.ajax({
				url: constans.serviceUrl + '/invitations/persons',
				type: "post",
				async: true,
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
					console.log(data);
					if(data.code == 111) {						
										window.location.href = constans.htmlUrl + "/index";							
									}
					if(data.code == 500) {
						console.log(data.msg);
					} else {
						var html = template("invite", data);
						$('.invitelist').html(html);

					}
				}
			})
		}
	})
})