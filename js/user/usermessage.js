$(function() {
	FastClick.attach(document.body);
	getUserId();
	var userId = sessionStorage.getItem("userId");
	var accessToken = constans.accessToken;
	//进入身份信息采集
	$(".userInfomation").on("click", function() {
		window.location = constans.htmlUrl + "/html/user/userinformation.html";
	})

	$('.input_p').bind('input propertychange', function() {
		var id_name = $(".user_name").val();
		var user_selectinfo1 = $(".user_selectinfo1").val();
		var user_selectinfo2 = $(".user_selectinfo2").val();
		var new_place = $(".new_place").val();
		var user_num = $(".user_num").val();
		if(id_name != "" && user_num != "") {

			$(".new_address").bind("click", function() {

				if($(".user_selectinfo1").length <= 0 && $(".user_selectinfo2").length <= 0) {
					$(".user_keep").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
					$(".user_keep").css("background-size", "100% 100%");
					$(".user_keep").removeAttr("disabled");

				} else {
					$(".user_keep").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
					$(".user_keep").css("background-size", "100% 100%");
					$(".user_keep").attr("disabled", "disabled");

				}
			});
			$(".picker").bind("click", function() {
				if($(".user_selectinfo1").length <= 0 && $(".user_selectinfo2").length <= 0) {
					if($(".new_place").val() != "") {
						$(".user_keep").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
						$(".user_keep").css("background-size", "100% 100%");
						$(".user_keep").removeAttr("disabled");

					}
				} else {
					$(".user_keep").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
					$(".user_keep").css("background-size", "100% 100%");
					$(".user_keep").attr("disabled", "disabled");

				}

			});

			if($(".user_selectinfo1").length <= 0 && $(".user_selectinfo2").length <= 0 && new_place != "") {
				$(".user_keep").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
				$(".user_keep").css("background-size", "100% 100%");
				$(".user_keep").removeAttr("disabled");

			} else {
				$(".work_keep").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
				$(".work_keep").css("background-size", "100% 100%");
				$(".work_keep").attr("disabled", "disabled");

			}
			if($(".user_selectinfo1").val() != "" && $(".user_selectinfo2").val() != "" && new_place != "") {
				$(".user_keep").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
				$(".user_keep").css("background-size", "100% 100%");
				$(".user_keep").removeAttr("disabled");

			}
		} else {
			$(".user_keep").css("background", "url(../../images/nd-disabled-btn.png)  no-repeat");
			$(".user_keep").css("background-size", "100% 100%");
			$(".user_keep").attr("disabled", "disabled");

		}
	})

	$('.user_message').bind("click", function() {
		if(localStorage.getItem("person") == 1) {

            var user_num = $(".user_num").val();
			var new_place = $(".new_place").val();
			$('.input_p').bind('input propertychange', function() {
				var id_name = $(".user_name").val();		
				var user_num = $(".user_num").val();
				var new_place = $(".new_place").val();
				if(id_name != "" && user_num != "") {
					$(".new_address").bind("click", function () {								
				          $(".user_keep").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
							$(".user_keep").css("background-size", "100% 100%");	
							$(".user_keep").removeAttr("disabled");
												
			       });						
				}								
			})
			if(user_num != "" && new_place != ""){
				$(".user_keep").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
				$(".user_keep").css("background-size", "100% 100%");	
				$(".user_keep").removeAttr("disabled");
				
			}
		}
	});
	//	
	if(localStorage.getItem("person") == 2) {
		$("#test").remove();
		$(".user_keep").hide();
		$('.user_num').attr("disabled", "disabled");
		if($('.user_num').val() != ""){
			$('.mymessage1 input[disabled]').css("-webkit-text-fill-color","#000")
		    $('.mymessage1 input[disabled]').css("opacity","1")
		}			
		
	}

	//  渲染个人信息详情
	var data = {
		userId: userId
	};
	$.ajax({
		url: constans.serviceUrl + '/credit/detailUserInfo',
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
				$(".user_name").val(data.body.userName)
				$(".user_selectinfo1").val(data.body.eduLv);
				$(".user_selectinfo2").val(data.body.isMarry);
				$(".new_place").val(data.body.liveAddrUp);
				$(".user_num").val(data.body.liveAddrDown);

				var eduLv = data.body.eduLvId;
				var isMarry = data.body.isMarryId;
				var addrUp = data.body.liveAddrUp;
				var city = data.body.city;
				var country = data.body.country;
				var province = data.body.province;
				var addrDown = data.body.liveAddrDown;
				var addr = data.body.liveAddr;
				if(localStorage.getItem("person") == 0) {
					if(eduLv.length != 0 && isMarry.length != 0 && addrDown.length != 0 && addrUp.length != 0) {
						$(".user_keep").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
						$(".user_keep").css("background-size", "100% 100%");

						$(".user_keep").removeAttr("disabled");
						$('.input_p').bind('input propertychange', function() {
							var id_name = $(".user_name").val();
							var user_num = $(".user_num").val();
							if(id_name != "" && user_num != "") {
								$(".user_keep").css("background", "url(../../images/nd-normal-btn.png)  no-repeat");
								$(".user_keep").css("background-size", "100% 100%");
								$(".user_keep").removeAttr("disabled");

							}
						})
					}
				}
				//选择学历
				if(localStorage.getItem("person") != 2) {
					var data = { type: "100001" };
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
							var data2 = [];
							//				    console.log(JSON.stringify(data.body));
							for(i in data.body) {
								data2.push({ text: data.body[i].value, value: data.body[i].key })

							}

							var picker2 = new Picker({
								data: [data2]
							});

							var picker2El = document.getElementById('picker2');

							picker2.on('picker.select', function(selectedVal, selectedIndex) {
								picker2El.innerText = data2[selectedIndex[0]].text;
								$("#picker2").css("margin-left", "10px");
								isMarry = data2[selectedIndex[0]].value
							});
							$(".user2").on("click", function() {
								picker2.show();
							})
						}
					})

					//   选择婚姻状况
					var data = { type: "100000" };
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
							var data1 = [];
							//				console.log(JSON.stringify(data.body));
							for(i in data.body) {
								data1.push({ text: data.body[i].value, value: data.body[i].key })
								//					console.log(data.body[i].key)
							}

							var picker1 = new Picker({
								data: [data1]
							});
							var picker1El = document.getElementById('picker1');

							picker1.on('picker.select', function(selectedVal, selectedIndex) {
								picker1El.innerText = data1[selectedIndex[0]].text;
								$("#picker1").css("margin-left", "10px");
								eduLv = data1[selectedIndex[0]].value

							});
							picker1El.addEventListener('click', function() {
								picker1.show();
							});
						}
					})
					//   地图
					$(".new_address").on("click", function() {
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
						addr = e.poi.address;
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
									console.log(result.poiList.pois[0].location);
									var aaa = [result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat];
									geocoder.getAddress(aaa, function(status, result) {

										if(status === 'complete' && result.info === 'OK') {

											province = result.regeocode.addressComponent.province
											if(result.regeocode.addressComponent.city == '') {
												city = result.regeocode.addressComponent.province
											} else {
												city = result.regeocode.addressComponent.city
											}
											country = result.regeocode.addressComponent.district
											addrUp = result.regeocode.formattedAddress
											if(e.poi.address == "") {
												addr = result.regeocode.addressComponent.street + result.regeocode.addressComponent.streetNumber
											}
											if(result.regeocode.addressComponent.street == "" && result.regeocode.addressComponent.streetNumber == "" && e.poi.address == "") {
												addr = result.regeocode.addressComponent.township;
											}
											
											
											$(".new_place").val(e.poi.name);
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

									province = result.regeocode.addressComponent.province
									if(result.regeocode.addressComponent.city == '') {
										city = result.regeocode.addressComponent.province
									} else {
										city = result.regeocode.addressComponent.city
									}
									country = result.regeocode.addressComponent.district
									addrUp = result.regeocode.formattedAddress
									if(e.poi.address == "") {
										addr = result.regeocode.addressComponent.street + result.regeocode.addressComponent.streetNumber
									}
									if(result.regeocode.addressComponent.street == "" && result.regeocode.addressComponent.streetNumber == "" && e.poi.address == "") {
										addr = result.regeocode.addressComponent.township;
									}
                                    
									//									$("#sure").on('click', function(e) {

									$(".new_place").val(e.poi.name);
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
									console.log(result.regeocode)
									province = result.regeocode.addressComponent.province;
									country = result.regeocode.addressComponent.district;
									if(result.regeocode.addressComponent.city == '') {
										city = result.regeocode.addressComponent.province;
										addrUp = result.regeocode.formattedAddress.substring((province + country).length);
									} else {
										city = result.regeocode.addressComponent.city;
										addrUp = result.regeocode.formattedAddress.substring((province + city + country).length);
									}
									if(result.regeocode.addressComponent.street == "" && result.regeocode.addressComponent.streetNumber == "") {
										addr = result.regeocode.addressComponent.township;
									} else {
										addr = result.regeocode.addressComponent.street + result.regeocode.addressComponent.streetNumber
									}
									$("#tipinput").val(addrUp);
								}
							})
	                        $("#sure").on('click', function(e) {
								if($("#tipinput").val() != "") {
									$(".new_place").val($("#tipinput").val());
									$(".content_address").hide();
								}
							})
						})
						

					});
				}
				//				保存
				$("#user_keep1").on("click", function() {
					addrUp = $(".new_place").val();
					var tokenId = localStorage.getItem("token");
					var addrDown = $(".user_num").val();
					addr = addr;
					var data = {
						addr: addr,
						eduLv: eduLv,
						city: city,
						addrUp: addrUp,
						province: province,
						isMarry: isMarry,
						addrDown: addrDown,
						country: country,
						userId: userId,
						tdId: tokenId
					};
					$.ajax({
						url: constans.serviceUrl + '/credit/submitperson',
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
								$(".user_keep").attr("disabled", "disabled")
								$("#mode").html(data.msg);
								setTimeout(function() {
									window.location = constans.htmlUrl + "/html/user/userInfoList.html";
									$("#mode").hide();
								}, 1000)
							}
						}
					})
				})
                //	保存并继续
				$("#user_keep2").on("click", function() {
					addrUp = $(".new_place").val();
					var tokenId = localStorage.getItem("token");
					var addrDown = $(".user_num").val();
					addr = addr;
					var data = {
						addr: addr,
						eduLv: eduLv,
						city: city,
						addrUp: addrUp,
						province: province,
						isMarry: isMarry,
						addrDown: addrDown,
						country: country,
						userId: userId,
						tdId: tokenId
					};
					$.ajax({
						url: constans.serviceUrl + '/credit/submitperson',
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
				})
				if(localStorage.getItem("person") == 0) {

					var data = { rePage: '100081' }
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
								if(data.body == false) {
									$(".info a").on("click", function() {
										$(".info a").attr("href", "#")
										$(".wx").show();
										$("#mode2").show();
										$(".try").on("click", function() {
											window.location = constans.htmlUrl + "/html/user/usermessage.html";
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
												rePage: 100081,
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