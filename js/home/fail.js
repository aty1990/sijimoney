$(function() {
	var accessToken = constans.accessToken;

	var page = 1;
	var size = 100;
	var data = {
		page: page,
		size: size,
	};
	$.ajax({
		url: constans.serviceUrl + '/reCommand/records',
		type: "post",
		data: data,
		headers: {
			loginTerm: "wx",
			accessToken: accessToken,
			jhVer: 2.0,
			rand: Math.round(Math.random() * 89999) + 10000,
		},
		beforeSend: function() {
			$("body").Loading("show");
		},
		complete: function() {
			$("body").Loading("hide");
		},
		success: function(data) {
			console.log(data)
			var dd = data.body.data;
			$(".smallHorn").html(data.body.smallHorn)
			var html = template('homefail', data);
			$('.banner').html(html);
			var html = template('homefail1', data);
			$('.access').html(html);
			var html = template('homefail2', data);
			$('.banner1').html(html);
			new Swiper('#swiper-container1', {
				loop: true,
				pagination: '.swiper-pagination',
				paginationClickable: true,
				spaceBetween: 0,
				centeredSlides: true,
				autoplayDisableOnInteraction: false
			})
			new Swiper('#swiper-container2', {
				slidesPerView: 'auto',
				loopedSlides: 6,
			})
			$(".access").find(".fail_product").on("click", function() {
				var channelId = $(this).attr("name");
				var data = { channelId: channelId };
				$.ajax({
					url: constans.serviceUrl + '/channels/records',
					type: "post",
					data: data,
					headers: {
						loginTerm: "wx",
						accessToken: accessToken,
						jhVer: 2.0,
						rand: Math.round(Math.random() * 89999) + 10000,
					},
					beforeSend: function() {
						$("body").Loading("show");
					},
					complete: function() {
						$("body").Loading("hide");
					},
					success: function(data) {
						console.log(data)
					}
				})
			});
			$(".banner1").find(".hot").on("click", function() {
				var channelId = $(this).attr("name");
				var data = { channelId: channelId };
				$.ajax({
					url: constans.serviceUrl + '/channels/records',
					type: "post",
					data: data,
					headers: {
						loginTerm: "wx",
						accessToken: accessToken,
						jhVer: 2.0,
						rand: Math.round(Math.random() * 89999) + 10000,
					},
					beforeSend: function() {
						$("body").Loading("show");
					},
					complete: function() {
						$("body").Loading("hide");
					},
					success: function(data) {
						console.log(data)
					}
				})
			});
			if(data.code == 111) {
				window.location.href = constans.htmlUrl + "/index";
			}
		}
	})

})