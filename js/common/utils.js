// js单列模式
var utils = (function() {
    var unique;

    function Utils() {}
    /**
     * 获取数据
     * @param  {[type]} options [参数对象]
     */
    Utils.prototype.fetchData = function(options) {
        var body = $("body");
        $.ajax({
            url: options.url,
            type: options.type || "POST",
            data: options.data || {},
            headers: {    
                loginTerm: options.loginTerm || "wx",
                accessToken: options.accessToken || constans.accessToken,
                jhVer: "2.0",
                rand: Math.round(Math.random() * 89999) + 10000,
            },
            beforeSend: function() {
                body.Loading("show");
            },
            complete: function() {
                body.Loading("hide");
            },
            success: function(result, status, resObj) {
                if (result.code == "111") {
                    window.location.href = constans.htmlUrl + "/index";
                } else {
                    options.success && options.success(result, status, resObj);
                }
            }
        })
    }
    Utils.prototype.getUrlParams = function() {
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
        var result = {};
        var arr = str.split("&"); //各个参数放到数组里
        arr.forEach(function(element, index) {
            var el = element.split('=');
            result[el[0]] = el[1];
        });
        return result;
    }

    // 验证手机号
    Utils.prototype.checkPhone = function(phone) {
            return /^1[34578]\d{9}$/.test(phone);
        }
        // 验证电话
    Utils.prototype.checkTel = function(tel) {
            return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel);
        }
        // 提交表单数据
    Utils.prototype.postFormData = function(options) {
        var body = $("body"),
            _self = this;
        $.ajax({
            url: options.url,
            type: options.type || "POST",
            data: options.data || {},
            async: true,
            processData: false,
            contentType: false,
            headers: {    
                loginTerm: options.loginTerm || "wx",
                accessToken: options.accessToken || constans.accessToken,
                jhVer: "2.0",
                rand: Math.round(Math.random() * 89999) + 10000,
            },
            beforeSend: function() {
                body.Loading("show");
            },
            complete: function() {
                body.Loading("hide");
            },
            success: function(result, status, resObj) {
                if (result.code == "111") {
                    window.location.href = constans.htmlUrl + "/index";
                } else {
                    options.success && options.success(result, status, resObj);
                }
            },
            error: function() {
                _self.showMsg({ msg: "系统错误" });
            }
        })
    };
    // 获取微信js-sdk
    Utils.prototype.getWxSign = function(options) {
            $.ajax({
                url: constans.serviceUrl + '/wx/getWxSign',
                type: "POST",
                data: { url: location.href.split('#')[0] },
                headers: {    
                    loginTerm: "wx",
                    accessToken: constans.accessToken,
                    jhVer: "2.0",
                    rand: Math.round(Math.random() * 89999) + 10000,
                },
                success: function(result) {
                    if (result.code == "111") {
                        window.location.href = constans.htmlUrl + "/index";
                    } else {
                        options.success && options.success(result);
                    }
                },
                error: function(xml, status, errorMsg) {
                    options.error && options.error(xml, status, errorMsg);
                }
            })
        }
        // 功能消息弹窗
    Utils.prototype.showMsg = function(options) {
        layer.open({
            content: options.msg || "",
            skin: 'msg',
            time: options.time || 3,
            end: function() {
                options.end && options.end();
            }

        });
    }
    Utils.prototype.getUserId = function() {
            //登录后权限验证
            var accessToken = constans.accessToken;
            if (accessToken) {
                var data = { accessToken: accessToken };
                $.ajax({
                    url: constans.serviceUrl + '/support/verUser',
                    type: "post",
                    async: false,
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
                        sessionStorage.setItem("userId", data.body.userId);
                        sessionStorage.setItem("userStat", data.body.userStat);
                        sessionStorage.setItem("taskId", data.body.taskId);
                        if (data.code == 111) {
                            window.location = constans.htmlUrl + "/html/login/loginnext.html";
                        }
                    }
                })
            }
        }
        // 验证必选字段{value:"",type:""} type : text为文本，tel为电话，phone为手机
    Utils.prototype.listenField = function(arr) {
            var _self = this,
                flag = true;
            for (var i in arr) {
                if (!arr[i].value) {
                    flag = false;
                    break;
                }
                if (arr[i].type == "tel") {
                    flag = _self.checkTel(arr[i].value);
                }
                if (arr[i].type == "phone") {
                    flag = _self.checkPhone(arr[i].value);
                }
            }
            return !flag;
        }
        //初始化高德地图插件
    Utils.prototype.initMap = function(options) {
        var lng, lat, latitude = localStorage.getItem("latitude"),
            longitude = localStorage.getItem("longitude"),
            returnObj = {
                companyAddr: "",
                companyCity: "",
                companyCountry: "",
                companyProvince: "",
                formattedAddress: "",
                citycode: "",
                addrUp: ""
            };
        if (!latitude && !longitude) {
            latitude = "31.230416";
            longitude = "121.473701";
        }
        var map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 15,
            center: [longitude, latitude]
        });
        var marker = new AMap.Marker({
            map: map,
            bubble: true
        })
        var geocoder = new AMap.Geocoder({
            city: "010" //城市，默认：“全国”
        });

        var placeSearch = new AMap.PlaceSearch({
            map: map
        });

        map.on('click', function(e) {
            getAddress(e.lnglat, true);

        });

        AMap.plugin('AMap.Autocomplete', function() { //回调函数
            var autoOptions = {
                city: "021", //城市，默认全国
                input: options.input //使用联想输入的input的id
            };
            var autocomplete = new AMap.Autocomplete(autoOptions);
            AMap.event.addListener(autocomplete, "select", function(data) {
                if (data.poi.location) {
                    getAddress(data.poi.location, false);
                    map.setCenter(data.poi.location);
                } else {
                    placeSearch.setCity(data.poi.adcode);
                    placeSearch.search(data.poi.name);
                    returnObj.addrUp = data.poi.name;
                    options.callback(returnObj);
                }

            });
        });

        function getAddress(lnglat, flag) {
            geocoder.getAddress(lnglat, function(status, result) {
                marker.setPosition(lnglat);
                if (status == 'complete' && result.info === 'OK') {
                    var regeocode = result.regeocode;
                    returnObj.companyProvince = regeocode.addressComponent.province; //省份
                    returnObj.companyCountry = regeocode.addressComponent.district; //区
                    if (!regeocode.addressComponent.city) {
                        returnObj.companyCity = regeocode.addressComponent.province;
                        returnObj.formattedAddress = regeocode.formattedAddress.substring((returnObj.companyProvince + returnObj.companyCountry).length);
                    } else {
                        returnObj.companyCity = regeocode.addressComponent.city;
                        returnObj.formattedAddress = regeocode.formattedAddress.substring((returnObj.companyProvince + returnObj.companyCity + returnObj.companyCountry).length);
                    }
                    returnObj.citycode = regeocode.addressComponent.citycode + "-";
                    if (!regeocode.addressComponent.street && !regeocode.addressComponent.streetNumber) {
                        returnObj.companyAddr = regeocode.addressComponent.township;
                    } else {
                        returnObj.companyAddr = regeocode.addressComponent.street + regeocode.addressComponent.streetNumber;
                    }
                    sessionStorage.setItem("companyProvince", returnObj.companyProvince);
                    sessionStorage.setItem("companyCity", returnObj.companyCity);
                    sessionStorage.setItem("companyCountry", returnObj.companyCountry);
                    sessionStorage.setItem("companyAddr", returnObj.companyAddr);
                    returnObj.addrUp = returnObj.formattedAddress;
                    if (flag) {
                        $("#" + options.input).val(returnObj.formattedAddress);
                        sessionStorage.setItem("detailAddr", returnObj.formattedAddress);
                    }
                    options.callback(returnObj);
                }
            })
        }
    }
    unique = new Utils();

    return unique;
})();