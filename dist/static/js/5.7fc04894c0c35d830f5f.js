webpackJsonp([5],{172:function(t,e,n){n(212);var i=n(85)(n(197),n(221),null,null);t.exports=i.exports},173:function(t,e,n){"use strict";function i(t,e,n){var i=!1;!function(t){if(window.WebViewJavascriptBridge)return t(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(t);window.WVJBCallbacks=[t];var e=document.createElement("iframe");e.style.display="none",e.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(e),setTimeout(function(){document.documentElement.removeChild(e)},0)}(function(n){n.callHandler(t,e,function(t){i=!0})}),setTimeout(function(){!i&&n&&alert("请升级App至最新版本提现，或使用「飞鸟贷APP」微信公众号提现")},1e3)}function o(){var t=location.href,e=t.indexOf("?");t=t.substr(e+1);var n={};return t.split("&").forEach(function(t,e){var i=t.split("=");n[i[0]]=i[1]}),n}function r(t,e){var n,i,o;try{n=t.toString().split(".")[1].length}catch(t){n=0}try{i=e.toString().split(".")[1].length}catch(t){i=0}return o=Math.pow(10,Math.max(n,i)),(t*o+e*o)/o}function a(t,e){var n,i,o,r;try{n=t.toString().split(".")[1].length}catch(t){n=0}try{i=e.toString().split(".")[1].length}catch(t){i=0}return o=Math.pow(10,Math.max(n,i)),r=n>=i?n:i,((t*o-e*o)/o).toFixed(r)}function s(t){var e=new f.a(document.getElementById(t.id));e.on("success",function(e){t.success&&t.success(e),e.clearSelection()}),e.on("error",function(e){t.error&&t.error(e)})}function c(t){wx.config({debug:!1,appId:t.appid,timestamp:t.timestamp,nonceStr:t.noncestr,signature:t.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"]})}function l(t){wx.ready(function(){for(var e=0;e<t.length;e++){var n=t[e].shreaTitle,i=t[e].content,o=t[e].shareLink,r=t[e].imgUrl;"100097"==t[e].shareTerminal&&wx.onMenuShareAppMessage({title:n,desc:i,link:o,imgUrl:r,type:"",dataUrl:"",success:function(){console.log("分享成功")},cancel:function(){console.log("已取消")}}),"100098"==t[e].shareTerminal&&wx.onMenuShareTimeline({title:n,link:o,imgUrl:r,success:function(){console.log("分享成功")},cancel:function(){console.log("已取消")}}),"100099"==t[e].shareTerminal&&wx.onMenuShareQQ({title:n,desc:i,link:o,imgUrl:r,success:function(){console.log("分享成功")},cancel:function(){console.log("已取消")}})}}),wx.error(function(t){console.log(t)})}e.b=i,e.a=o,e.f=r,e.g=a,e.e=s,e.c=c,e.d=l;var u=(n(12),n(175)),f=n.n(u)},174:function(t,e,n){var i,o,r;!function(a,s){o=[t,n(180)],i=s,void 0!==(r="function"==typeof i?i.apply(e,o):i)&&(t.exports=r)}(0,function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(t){return t&&t.__esModule?t:{default:t}}(e),o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e){n(this,t),this.resolveOptions(e),this.initSelection()}return r(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":o(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=a})},175:function(t,e,n){var i,o,r;!function(a,s){o=[t,n(174),n(181),n(179)],i=s,void 0!==(r="function"==typeof i?i.apply(e,o):i)&&(t.exports=r)}(0,function(t,e,n,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=o(e),u=o(n),f=o(i),d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),h=function(t){function e(t,n){r(this,e);var i=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.resolveOptions(n),i.listenClick(t),i}return s(e,t),p(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===d(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,f.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return c("action",t)}},{key:"defaultTarget",value:function(t){var e=c("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return c("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}(u.default);t.exports=h})},176:function(t,e){function n(t,e){for(;t&&t.nodeType!==i;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var i=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var o=Element.prototype;o.matches=o.matchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector||o.webkitMatchesSelector}t.exports=n},177:function(t,e,n){function i(t,e,n,i,r){var a=o.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function o(t,e,n,i){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&i.call(t,n)}}var r=n(176);t.exports=i},178:function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},179:function(t,e,n){function i(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!s.string(e))throw new TypeError("Second argument must be a String");if(!s.fn(n))throw new TypeError("Third argument must be a Function");if(s.node(t))return o(t,e,n);if(s.nodeList(t))return r(t,e,n);if(s.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return c(document.body,t,e,n)}var s=n(178),c=n(177);t.exports=i},180:function(t,e){function n(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(t),i.removeAllRanges(),i.addRange(o),e=i.toString()}return e}t.exports=n},181:function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function i(){o.off(t,i),e.apply(n,arguments)}var o=this;return i._=e,this.on(t,i,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,o=n.length;for(i;i<o;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],o=[];if(i&&e)for(var r=0,a=i.length;r<a;r++)i[r].fn!==e&&i[r].fn._!==e&&o.push(i[r]);return o.length?n[t]=o:delete n[t],this}},t.exports=n},182:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"header",props:["headerObj"],mounted:function(){this.$on("hdgz",function(){this.$parent.$router.push("/lqb/friends/hdgz")}),this.$on("hylb",function(){this.$parent.showMsg()})},methods:{back:function(){this.$router.go(-1)},emitFn:function(){this.$emit(this.headerObj.method)}}}},183:function(t,e,n){e=t.exports=n(166)(),e.push([t.i,".mint-header{background-color:#fff;color:#000;box-shadow:0 0 2px #adadad}",""])},184:function(t,e,n){var i=n(183);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(167)("6fc72ea7",i,!0)},185:function(t,e,n){n(184);var i=n(85)(n(182),n(186),null,null);t.exports=i.exports},186:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("mt-header",{staticStyle:{width:"100%",height:"44px"},attrs:{title:t.headerObj.title}},[n("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.back},slot:"left"}),t._v(" "),"hdgz"==t.headerObj.method?n("mt-button",{attrs:{slot:"right"},on:{click:t.emitFn},slot:"right"},[t._v("活动规则")]):t._e(),t._v(" "),"hylb"==t.headerObj.method?n("mt-button",{attrs:{slot:"right"},on:{click:t.emitFn},slot:"right"},[n("i",{staticClass:"icon-jieshishuoming fnd-icon scale-4"})]):t._e()],1)},staticRenderFns:[]}},197:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(185),o=n.n(i),r=n(86),a=n(173),s=n(23);n.n(s);e.default={name:"yqgn",data:function(){return{headerObj:{title:"邀请攻略",method:""},code:"",popShow:!1,isFalse:!0,invitedNumber:"",inviteeAmount:"",inviter1Amount:"",inviter2Amount:"",inviter3Amount:"",inviterSum:0,top:"44px"}},mounted:function(){var t=this;r.a.strategy({}).then(function(e){if("200"==e.code){t.code=e.body.code,t.invitedNumber=e.body.invitedNumber,t.inviteeAmount=e.body.inviteeAmount,t.inviter1Amount=e.body.inviter1Amount,t.inviter2Amount=e.body.inviter2Amount,t.inviter3Amount=e.body.inviter3Amount;var n=a.f(e.body.inviter1Amount,e.body.inviter2Amount);t.inviterSum=a.f(n,e.body.inviter3Amount)}}),a.e({id:"copyText",success:function(t){layer.open({content:"复制邀请码成功",skin:"msg",time:2})}})},components:{"v-header":o.a},methods:{ljyq:function(){this.$parent.$router.push({path:"/lqb/friends/yqgn/invate",query:{env:"h5"}})},leave:function(){document.getElementById("copyText").remove()}}}},204:function(t,e,n){e=t.exports=n(166)(),e.push([t.i,".ui-yqgn{transition:all .3s ease;height:100%;width:100%;position:fixed;top:0;left:0;background:#fff;z-index:9}.ui-yqgn .flex{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ui-yqgn .content{bottom:0}.ui-yqgn .pink-font{color:#e8476b}.ui-yqgn p{line-height:1.6em}.ui-yqgn .grow{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}.ui-yqgn .grow .fnd-icon{margin-right:0}.ui-yqgn .row{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.ui-yqgn .vertical{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;text-align:center}.ui-yqgn .fix-w{width:60px}.ui-yqgn .td,.ui-yqgn .tr{border:1px solid #adadad}.ui-yqgn .td{border-top:none;margin-bottom:10px}.ui-yqgn .code{width:100px;color:#e8476b;border:none;text-align:center}.ui-yqgn .pop-cls{height:50px}",""])},212:function(t,e,n){var i=n(204);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(167)("78c58658",i,!0)},221:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"move"},on:{leave:t.leave}},[n("div",{staticClass:"ui-yqgn"},[t.isFalse?n("v-header",{attrs:{headerObj:t.headerObj}}):t._e(),t._v(" "),n("div",{staticClass:"pd-all-12 content",style:{top:t.top}},[n("p",{staticClass:"text-left"},[t._v("我的邀请码：\n                "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],staticClass:"code",attrs:{type:"text",id:"iUrl",readonly:""},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),t._v(" "),n("span",{staticClass:"pink-font",attrs:{id:"copyText","data-clipboard-target":"#iUrl"}},[t._v("（点击复制）")])]),t._v(" "),n("p",{staticClass:"pdt-10 pdb-10"},[t._v("你可同时获得三级好友的现金奖励，每级邀请人数不限；")]),t._v(" "),n("div",{staticClass:"flex row pdt-10 pdb-10 tr"},[n("span",{staticClass:"grow fix-w text-align"},[t._v("/")]),t._v(" "),n("span",{staticClass:"grow"},[t._v("一级好友")]),t._v(" "),n("span",{staticClass:"grow"},[t._v("二级好友")]),t._v(" "),n("span",{staticClass:"grow"},[t._v("三级好友")])]),t._v(" "),n("div",{staticClass:"flex row pdt-10 pdb-10 td"},[n("span",{staticClass:"grow fix-w text-align"},[t._v("奖励金额")]),t._v(" "),n("span",{staticClass:"grow pink-font"},[t._v(t._s(t.inviter1Amount)+"元/位")]),t._v(" "),n("span",{staticClass:"grow pink-font"},[t._v(t._s(t.inviter2Amount)+"元/位")]),t._v(" "),n("span",{staticClass:"grow pink-font"},[t._v(t._s(t.inviter3Amount)+"元/位")])]),t._v(" "),n("p",{staticClass:" pdb-10 pink-font text-left"},[t._v("举个例子:")]),t._v(" "),n("img",{attrs:{src:"/fnd/dist/static/pic.png",width:"100%"}}),t._v(" "),n("p",[t._v("小明算你的"),n("span",{staticClass:"pink-font"},[t._v("一级好友")]),t._v("，小红算"),n("span",{staticClass:"pink-font"},[t._v("二级好友")]),t._v("  小白算"),n("span",{staticClass:"pink-font"},[t._v("三级好友")]),t._v("若 小明、小红、小白都成功借款；你总共可以获得 "),n("span",{staticClass:"pink-font"},[t._v(t._s(t.inviter1Amount)+"元 + "+t._s(t.inviter2Amount)+"元 + "+t._s(t.inviter3Amount)+"元 = "+t._s(t.inviterSum)+"元")]),t._v(" 的现金奖励；假如你们都各邀请了 "),n("span",{staticClass:"pink-font"},[t._v(t._s(t.invitedNumber))]),t._v("个 好友成功借款并提现，则你可以获得 "),n("span",{staticClass:"pink-font"},[t._v(t._s(t.inviteeAmount))]),t._v("元 现金奖励。")]),t._v(" "),n("div",{staticClass:"btn-ljyq flex pdt-10 pdb-10"},[n("img",{attrs:{src:"/fnd/dist/static/ljyq.png",width:"70%"},on:{click:t.ljyq}})])]),t._v(" "),n("router-view")],1)])},staticRenderFns:[]}}});