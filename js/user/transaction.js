
$(function(){
	$(".invitelist ul").on("click",function(){
		window.location.href = constans.htmlUrl + "/html/user/details.html";
	})
	var accessToken = constans.accessToken;
	if(typeof(accessToken) != 'undefined') {
		list();
		function list(){
			var i = 1;
			var i = i++;
			console.log(i);
			var data = {page: i,size: 1000,list:0};
			$.ajax({
				url: constans.serviceUrl + '/trans/records',
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
					if(data.body.total == 0){
						$(".invitelist").hide();
						$(".no_repay").show();
						$(".onrepay").on("click", function() {
							window.location = constans.htmlUrl + "/index.html";
						})
					}else{
						$(".invitelist").show();
						$(".no_repay").hide();
					}
					if(data.code == 111) {						
						window.location.href = constans.htmlUrl + "/index";							
					}
					var html = template('home', data);
					$('.invitelist').html(html);
					$(".invitelist ul").on("click",function(){
						var transId = $(this).attr("name");
						var type = $(this).attr("type");
						window.location.href = constans.htmlUrl + "/html/user/details.html"+"?transId="+transId+"&type="+type;
					})
				}
			})
		}
        $(".one").on("click", function() {
			list();
		})
        $(".two").on("click", function() {
        	var i = 1;
			var i = i++;
			console.log(i);
			var data = {page: i,size: 1000,list:1};
			$.ajax({
				url: constans.serviceUrl + '/trans/records',
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
					if(data.body.total == 0){
						$(".invitelist1").hide();
						$(".no_repay").show();
						$(".onrepay").on("click", function() {
							window.location = constans.htmlUrl + "/index.html";
						})
					}else{
						$(".invitelist1").show();
						$(".no_repay").hide();
					}
					if(data.code == 111) {						
						window.location.href = constans.htmlUrl + "/index";							
					}
					var html = template('home1', data);
					$('.invitelist1').html(html);
					$(".invitelist1 ul").on("click",function(){
						var transId = $(this).attr("name");
						var type = $(this).attr("type");
						window.location.href = constans.htmlUrl + "/html/user/details.html"+"?transId="+transId+"&type="+type;
					})
				}
			})	
        })
        $(".three").on("click", function() {
        	var i = 1;
			var i = i++;
			console.log(i);
			var data = {page: i,size: 1000,list:2};
			$.ajax({
				url: constans.serviceUrl + '/trans/records',
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
					if(data.body.total == 0){
						$(".invitelist2").hide();
						$(".no_repay").show();
						$(".onrepay").on("click", function() {
							window.location = constans.htmlUrl + "/index.html";
						})
					}else{
						$(".invitelist2").show();
						$(".no_repay").hide();
					}
					if(data.code == 111) {						
						window.location.href = constans.htmlUrl + "/index";							
					}
					var html = template('home2', data);
					$('.invitelist2').html(html);
					
					$(".invitelist2 ul").on("click",function(){
						var transId = $(this).attr("name");
						var type = $(this).attr("type");
						window.location.href = constans.htmlUrl + "/html/user/details.html"+"?transId="+transId+"&type="+type;
					})
				}
			})
        })
	}
})
