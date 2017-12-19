$(function() {

	var accessToken = constans.accessToken;

	var userId = sessionStorage.getItem("userId");

	$('.input_p').bind('input propertychange', function() {
		var work_name1 = $(".work_name1").val();
		var work_name2 = $(".work_name2").val();
		var work_address = $(".work_address").val();
		var work_num = $(".work_num").val();
		var work_tel = $(".work_tel").val();
		var work_money = $(".work_money").val();
		var work_time = $(".work_time").val();
		var result = (work_money.toString()).indexOf(".");
		if(result != -1) {
			var len = work_money.toString().split(".")[1].length;
			var result1 = work_money.substr(0, work_money.indexOf(".") + 3);
			$(".work_money").val(result1);
			work_money = $(".work_money").val();
		}
		if(work_name1 != "" && work_name2 != "" && work_num != "" && work_tel != "" && (/^\d{7,8}$/.test(work_tel)) && work_money != "") {
			$(".address").bind("click", function() {
				$(".work_keep").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
				$(".work_keep").css("background-size", "100% 100%");
				$(".work_keep").removeAttr("disabled");

			});
			$(".work_time").blur(function() {
				if(work_address != "") {
					$(".work_keep").removeAttr("disabled");
					$(".work_keep").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
					$(".work_keep").css("background-size", "100% 100%");

				}
			})
			$(".work_time").focus(function() {

				$(".work_keep").css("background", "url(../../images/btn_disabled@2x.png)  no-repeat");
				$(".work_keep").css("background-size", "100% 100%");
				$(".work_keep").attr("disabled", "disabled");

			});
			if(work_time != "" && work_address != "") {
				$(".work_keep").removeAttr("disabled");
				$(".work_keep").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
				$(".work_keep").css("background-size", "100% 100%");

			} else {
				$(".work_keep").css("background", "url(../../images/btn_disabled@2x.png)  no-repeat");
				$(".work_keep").css("background-size", "100% 100%");
				$(".work_keep").attr("disabled", "disabled");

			}

		} else {
			$(".work_keep").css("background", "url(../../images/btn_disabled@2x.png)  no-repeat");
			$(".work_keep").css("background-size", "100% 100%");
			$(".work_keep").attr("disabled", "disabled");

		}

	})
	if(localStorage.getItem("work") == 2) {
		$("#test").remove();
		$('.work_keep').hide();
		$('.input_p').attr("disabled", "disabled");
		$('.mymessage input[disabled]').css("-webkit-text-fill-color", "#000")
		$('.mymessage input[disabled]').css("opacity", "1")
	}

	$('.user_message').bind("click", function() {
		if(localStorage.getItem("work") == 1) {
			var work_num = $(".work_num").val();
			var work_address = $(".work_address").val();
			$('.input_p').bind('input propertychange', function() {
				var work_name1 = $(".work_name1").val();
				var work_num = $(".work_num").val();
				var work_tel = $(".work_tel").val();
				var work_money = $(".work_money").val();
				if(work_name1 != "" && work_num != "" && work_tel != "" && (/^\d{7,8}$/.test(work_tel)) && work_money != "") {
					$(".address").bind("click", function() {
						$(".work_keep").removeAttr("disabled");
						$(".work_keep").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
						$(".work_keep").css("background-size", "100% 100%");

					})
				}
			})
			if(work_num != "" && work_address != "") {
				$(".work_keep").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
				$(".work_keep").css("background-size", "100% 100%");
				$(".work_keep").removeAttr("disabled");

			}
		}
	})

	function CompareDate(d1, d2) {
		return((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
	}

	function p(s) {
		return s < 10 ? '0' + s : s;
	}

	function reurl() {
		url = location.href; //把当前页面的地址赋给变量 url	
		var times = url.split("?"); //分切变量 url 分隔符号为 "?"	
		if(times[1] != 1) { //如果?后的值不等于1表示没有刷新	
			url += "?1"; //把变量 url 的值加入 ?1	
			self.location.replace(url); //刷新页面	
		}
	}

	//  渲染工作信息详情
	var data = {
		userId: userId
	};
	$.ajax({
		url: constans.serviceUrl + '/credit/detailCareer',
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
				console.log(data.msg)
			} else {

				$(".work_name1").val(data.body.companyName)
				$(".work_name2").val(data.body.affiDepart);
				$(".work_address").val(data.body.addrUp);
				$(".work_num").val(data.body.addrDown);
				$(".work_tel").val(data.body.companyTel.split("-")[1]);
				$(".work_money").val(data.body.userIncome);
				$(".work_time").val(data.body.careerTime);
				if(localStorage.getItem("work") == 1 && $(".work_time").val() != "" && $(".work_address").val() != "") {
					$(".work_time").blur(function() {
						$(".work_keep").removeAttr("disabled");
						$(".work_keep").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
						$(".work_keep").css("background-size", "100% 100%");

					})
					$(".work_time").focus(function() {
						$(".work_keep").css("background", "url(../../images/btn_disabled@2x.png)  no-repeat");
						$(".work_keep").css("background-size", "100% 100%");

						$(".work_keep").attr("disabled", "disabled");

					});
				}
				if(data.body.companyTel != '') {
					$(".citycode").html(data.body.companyTel.split("-")[0] + '-')
				}

				var addrUp = data.body.addrUp;
				var companyName = data.body.companyName;
				var addrDown = data.body.addrDown;
				var companyAddr = data.body.companyAddr;
				var companyTel = data.body.companyTel;
				var userIncome = data.body.userIncome;
				var companyCity = data.body.city;
				var companyProvince = data.body.province;
				var companyCountry = data.body.country;
				var careerTime = data.body.careerTime;
				var citycode = data.body.companyTel.split("-")[0];
				var affiDepart = data.body.affiDepart
				if(localStorage.getItem("work") == 0) {
					if(addrUp.length != 0 && addrDown.length != 0 && companyTel.length != 0 && companyName.length != 0 && userIncome.length != 0 && affiDepart.length != 0 && careerTime.length != 0) {
						$(".work_keep").removeAttr("disabled");
						$(".work_keep").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
						$(".work_keep").css("background-size", "100% 100%");
						$('.input_p').bind('input propertychange', function() {
							var work_name1 = $(".work_name1").val();
							var work_num = $(".work_num").val();
							var work_tel = $(".work_tel").val();
							var work_money = $(".work_money").val();
							if(work_name1 != "" && work_num != "" && work_tel != "" && (/^\d{7,8}$/.test(work_tel)) && work_money != "") {
								$(".work_keep").removeAttr("disabled");
								$(".work_keep").css("background", "url(../../images/btn_normal@2x.png)  no-repeat");
								$(".work_keep").css("background-size", "100% 100%");

							}
						})
					}
				}
				if(userIncome == 0) {
					$(".work_money").val('');
				}
				//				alert("区号拿到时候:"+citycode);
				if(localStorage.getItem("work") == 2 || localStorage.getItem("work") == 1) {
					$(".citycode").html(data.body.companyTel.split("-")[0] + '-');
					$(".work_tel").val(data.body.companyTel.split("-")[1]);
				}
				if(localStorage.getItem("work") == 2 || localStorage.getItem("work") == 1) {
					$(".work_money").val(userIncome);
				}

				var affiDepartId = data.body.affiDepartId;
				if(localStorage.getItem("work") != 2) {
					
					
					//   地图
					$(".address").on("click", function() {
						$(".content_address").show();
					})
					var lng;
					var lat;
					var flag = 0;
					var latitude = localStorage.getItem("latitude");
					var longitude = localStorage.getItem("longitude");
					if(latitude == null && longitude == null) {
						latitude = "31.230416";
						longitude = "121.473701";
					}
					//地图
					var map = new AMap.Map('container', {
						resizeEnable: true,
						zoom: 15,
						center: [longitude, latitude]
					});
					//输入提示
					var autoOptions = {
						input: "tipinput"
					};
					var auto = new AMap.Autocomplete(autoOptions);
					var placeSearch = new AMap.PlaceSearch({
						map: map
					});
					AMap.event.addListener(auto, "select", select);

					function select(e) {
						placeSearch.setCity(e.poi.adcode);
						placeSearch.search(e.poi.name);
						flag = 1;
						companyAddr = e.poi.address;
						$("#tipinput").val("");
						AMap.service('AMap.Geocoder', function() { //回调函数

							geocoder = new AMap.Geocoder({
								city: "021"
							});
							var marker = new AMap.Marker({
								map: map,
								bubble: true
							})

							if(e.poi.location == "") {
								placeSearch.search(e.poi.name, function(status, result) {
									console.log(result);
									var aaa = [result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat];
									geocoder.getAddress(aaa, function(status, result) {

										if(status === 'complete' && result.info === 'OK') {
											console.log(result)
											companyProvince = result.regeocode.addressComponent.province
											if(result.regeocode.addressComponent.city == '') {
												companyCity = result.regeocode.addressComponent.province
											} else {
												companyCity = result.regeocode.addressComponent.city
											}
											companyCountry = result.regeocode.addressComponent.district;
											addrUp = result.regeocode.formattedAddress;
											citycode = result.regeocode.addressComponent.citycode;
											if(e.poi.address == "") {
												companyAddr = result.regeocode.addressComponent.street + result.regeocode.addressComponent.streetNumber
											}
											if(result.regeocode.addressComponent.street == "" && result.regeocode.addressComponent.streetNumber == "" && e.poi.address == "") {
												companyAddr = result.regeocode.addressComponent.township;
											}

											$(".citycode").html(citycode + '-');
											$(".work_address").val(e.poi.name);
											$(".content_address").hide();
											$("#tipinput").val("");
										}

									})
								});

							} else {
								var aaa = [e.poi.location.lng, e.poi.location.lat];
							}
							geocoder.getAddress(aaa, function(status, result) {

								if(status === 'complete' && result.info === 'OK') {
									console.log(result)
									companyProvince = result.regeocode.addressComponent.province
									if(result.regeocode.addressComponent.city == '') {
										companyCity = result.regeocode.addressComponent.province
									} else {
										companyCity = result.regeocode.addressComponent.city
									}
									companyCountry = result.regeocode.addressComponent.district
									addrUp = result.regeocode.formattedAddress;
									citycode = result.regeocode.addressComponent.citycode;
									if(e.poi.address == "") {
										companyAddr = result.regeocode.addressComponent.street + result.regeocode.addressComponent.streetNumber
									}
									if(result.regeocode.addressComponent.street == "" && result.regeocode.addressComponent.streetNumber == "" && e.poi.address == "") {
										companyAddr = result.regeocode.addressComponent.township;
									}

									$(".citycode").html(citycode + '-');
									//									$("#sure").on('click', function(e) {
									$(".work_address").val(e.poi.name);
									$(".content_address").hide();
									$("#tipinput").val("");
									//									})
								}
							})

						})
					}
					AMap.plugin('AMap.Geocoder', function() {
						var geocoder = new AMap.Geocoder({
							city: "010" //城市，默认：“全国”
						});
						var marker = new AMap.Marker({
							map: map,
							bubble: true
						})
						map.on('click', function(e) {
							marker.setPosition(e.lnglat);
							geocoder.getAddress(e.lnglat, function(status, result) {
								if(status == 'complete' && result.info === 'OK') {
									companyProvince = result.regeocode.addressComponent.province;
									companyCountry = result.regeocode.addressComponent.district;
									if(result.regeocode.addressComponent.city == '') {
										companyCity = result.regeocode.addressComponent.province;
										addrUp = result.regeocode.formattedAddress.substring((companyProvince + companyCountry).length);
									} else {
										companyCity = result.regeocode.addressComponent.city;
										addrUp = result.regeocode.formattedAddress.substring((companyProvince + companyCity + companyCountry).length);
									}

									citycode = result.regeocode.addressComponent.citycode;
									if(result.regeocode.addressComponent.street == "" && result.regeocode.addressComponent.streetNumber == "") {
										companyAddr = result.regeocode.addressComponent.township;
									} else {
										companyAddr = result.regeocode.addressComponent.street + result.regeocode.addressComponent.streetNumber;
									}

									$(".citycode").html(citycode + '-');
									$("#tipinput").val(addrUp);
								}
							})
							$("#sure").on('click', function(e) {
								if($("#tipinput").val() != "") {
									$(".work_address").val($("#tipinput").val());
									$(".content_address").hide();
								}
							})
						})

					});
				}
				$(".work_tel").val(companyTel.split("-")[1]);
				//				alert("工作电话处理时候:"+companyTel.split("-")[1]);

				$(".work_time").val(careerTime);
				$("#work_keep1").on("click", function() {
					addrUp = $(".work_address").val();
					companyAddr = companyAddr;
					var careerTime = $(".work_time").val();
					var companyTel = $(".citycode").html() + $(".work_tel").val();
					var companyName = $(".work_name1").val();
					var affiDepartId = $(".work_name2").val();
					var addrDown = $(".work_num").val();
					var userIncome = $(".work_money").val();
					data = {
						addrDown: addrDown,
						addrUp: addrUp,
						companyName: companyName,
						affiDepart: affiDepartId,
						companyAddr: companyAddr,
						companyCity: companyCity,
						companyProvince: companyProvince,
						companyCountry: companyCountry,
						companyTel: companyTel,
						userId: userId,
						careerTime: careerTime,
						userIncome: userIncome
					}
					if(careerTime == "") {
						$("#mode").show();
						$("#mode").html("请填写入职时间");
						setTimeout(function() {
							$("#mode").hide();
						}, 3000)
					} else {
						$.ajax({
							url: constans.serviceUrl + '/credit/submitcareer',
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
									$("#mode").show();
									$("#mode").html(data.msg);
									setTimeout(function() {
										$("#mode").hide();
									}, 2000)
								} else {
									$("#mode").show();
									$(".work_keep").attr("disabled", "disabled")
									$("#mode").html(data.msg);
									setTimeout(function() {
										window.location = constans.htmlUrl + "/html/user/userInfoList.html";
										$("#mode").hide();
									}, 1000)
								}
							}
						})
					}
				})
                $("#work_keep2").on("click", function() {
					addrUp = $(".work_address").val();
					companyAddr = companyAddr;
					var careerTime = $(".work_time").val();
					var companyTel = $(".citycode").html() + $(".work_tel").val();
					var companyName = $(".work_name1").val();
					var affiDepartId = $(".work_name2").val();
					var addrDown = $(".work_num").val();
					var userIncome = $(".work_money").val();
					data = {
						addrDown: addrDown,
						addrUp: addrUp,
						companyName: companyName,
						affiDepart: affiDepartId,
						companyAddr: companyAddr,
						companyCity: companyCity,
						companyProvince: companyProvince,
						companyCountry: companyCountry,
						companyTel: companyTel,
						userId: userId,
						careerTime: careerTime,
						userIncome: userIncome
					}
					if(careerTime == "") {
						$("#mode").show();
						$("#mode").html("请填写入职时间");
						setTimeout(function() {
							$("#mode").hide();
						}, 3000)
					} else {
						$.ajax({
							url: constans.serviceUrl + '/credit/submitcareer',
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
							success: function(data) {

								if(data.code == 111) {						
									window.location.href = constans.htmlUrl + "/index";							
								}
								if(data.code == 500) {
									$("#mode").show();
									$("#mode").html(data.msg);
									setTimeout(function() {
										$("#mode").hide();
									}, 2000)
								} else {
									$.ajax({
										url: constans.serviceUrl + '/user/saveUserContinue',
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
											console.log(data.body.nextPage);
											if(data.body.nextPage == 0){
												window.location = constans.htmlUrl + "/html/user/userInfoList.html";
											}
											if(data.body.nextPage == 1){
												window.location = constans.htmlUrl + "/html/user/usermessage.html";
											}
											if(data.body.nextPage == 2){
												window.location = constans.htmlUrl + "/html/user/workinfomation.html";
											}
											if(data.body.nextPage == 3){
												window.location = constans.htmlUrl + "/html/user/contacts.html";
											}
											if(data.body.nextPage == 6){
												window.location = constans.htmlUrl + "/index.html";
												 localStorage.removeItem("homefail");
											}
										}
							       })		
								}
							}
						})
					}
				})
				if(localStorage.getItem("work") == 0) {

					var data = { rePage: '100082' }
					$.ajax({
						url: constans.serviceUrl + '/reputations/isCommited',
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
								console.log(data)
							} else {
								if(!data.body) {
									$(".info a").on("click", function() {
										$(".info a").attr("href", "#")
										$(".wx").show();
										$("#mode2").show();
										$(".try").on("click", function() {
											window.location = constans.htmlUrl + "/html/user/workinfomation.html";
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
												rePage: 100082,
												reTitle: reTitle,
												reTroubleType: num
											}
											$.ajax({
												url: constans.serviceUrl + '/reputations',
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

													if(data.code == 200) {
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
			}
		}
	})
})