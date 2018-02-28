/* Author：mingyuhisoft@163.com
 * Github:https://github.com/imingyu/jquery.loading
 * Npm:npm install jquery.loading.js
 * Date：2016-7-4
 */

;
(function(root, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'), root);
    }
    if (typeof define === "function") {
        if (define.cmd) {
            define(function(require, exports, module) {
                var $ = require("jquery");
                factory($, root);
            });
        } else {
            define(["jquery"], function($) {
                factory($, root);
            });
        }
    } else {
        factory(root.jQuery, root);
    }
}(typeof window !== "undefined" ? window : this, function($, root, undefined) {
    'use strict';
    if (!$) {
        $ = root.jQuery || null;
    }
    if (!$) {
        throw new TypeError("必须引入jquery库方可正常使用！");
    }

    var arraySlice = Array.prototype.slice,
        comparison = function(obj1, obj2) {
            var result = true;
            for (var pro in obj1) {
                if (obj1[pro] !== obj2[obj1]) {
                    result = true;
                    break;
                }
            }
            return result;
        }

    function loading(dom, options) {
        options = options || {};
        this.dom = dom;
        this.options = $.extend(true, {}, loading.defaultOptions, options);
        this.curtain = null;
        this.render().show();
    }
    loading.prototype = {
        constructor: loading,
        initElement: function() {
            var dom = this.dom,
                ops = this.options;
            var curtainElement = dom.children(".loading"),
                bodyElement = curtainElement.children('.loading-body'),
                barElement = bodyElement.children('.loading-bar'),
                iconElement = barElement.children('.loading-icon'),
                textElement = barElement.find(".loading-text");
            if (curtainElement.length == 0) {
                curtainElement = $('<div class="loading"></div>');
                dom.append(curtainElement);
            }
            if (bodyElement.length == 0) {
                bodyElement = $('<div class="loading-body"></div>');
                curtainElement.append(bodyElement);
            }
            if (barElement.length == 0) {
                barElement = $('<div class="loading-bar"></div>');
                bodyElement.append(barElement);
            }
            if (iconElement.length == 0) {
                var _iconElement = document.createElement(ops.iconTag);
                iconElement = $(_iconElement);
                iconElement.addClass("loading-icon");
                iconElement.attr('id', 'change');
                barElement.append(iconElement);
            }
            if (textElement.length == 0) {
                textElement = $('<div class="loading-text"></div>');
                barElement.append(textElement);
            }

            this.curtainElement = curtainElement;
            this.bodyElement = bodyElement;
            this.barElement = barElement;
            this.iconElement = iconElement;
            this.textElement = textElement;
            return this;
        },
        render: function() {
            var dom = this.dom,
                ops = this.options;
            this.initElement();
            if (dom.is("html") || dom.is("body")) {
                this.curtainElement.addClass("loading-full");
            } else {
                this.curtainElement.removeClass("loading-full");

                if (!dom.hasClass("loading-container")) {
                    dom.addClass("loading-container");
                }
            }
            if (ops.mask) {
                this.curtainElement.addClass("loading-mask");
            } else {
                this.curtainElement.removeClass("loading-mask");
            }
            if (ops.content != "" && typeof ops.content != "undefined") {
                if (ops.html) {
                    this.bodyElement.html(ops.content);
                } else {
                    this.bodyElement.text(ops.content);
                }
            } else {
                this.iconElement.attr("src", ops.icon);
                if (ops.html) {
                    this.textElement.html(ops.text);
                } else {
                    this.textElement.text(ops.text);
                }
            }

            return this;
        },
        setOptions: function(options) {
            options = options || {};
            var oldOptions = this.options;
            this.options = $.extend(true, {}, this.options, options);
            if (!comparison(oldOptions, this.options)) this.render();
        },
        show: function() {
            var dom = this.dom,
                ops = this.options,
                barElement = this.barElement;
            this.curtainElement.addClass("active");
            barElement.css({
                "marginTop": "-" + barElement.outerHeight() / 2 + "px",
                "marginLeft": "-" + barElement.outerWidth() / 2 + "px"
            });

            return this;
        },
        hide: function() {
            var dom = this.dom,
                ops = this.options;
            this.curtainElement.removeClass("active");
            if (!dom.is("html") && !dom.is("body")) {
                dom.removeClass("loading-container");
            }
            return this;
        },
        destroy: function() {
            var dom = this.dom,
                ops = this.options;
            this.curtainElement.remove();
            if (!dom.is("html") && !dom.is("body")) {
                dom.removeClass("loading-container");
            }
            dom.removeData(loading.dataKey);
            return this;
        }
    };
    loading.dataKey = "loading";
    loading.defaultOptions = {
        text: "页面载入中，请等待...",
        iconTag: "img",
        icon: "http://172.16.16.68/sijimoney/images/loading.png",
        //icon:"${project.domain}/images/loading.png",
        html: false,
        content: "", //设置content后，text和icon设置将无效
        mask: true //是否显示遮罩（半透明背景）
    };

    $.fn.Loading = function(options) {
        var ops = {},
            funName = "",
            funArgs = [];
        if (typeof options === "object") {
            ops = options;
        } else if (typeof options === "string") {
            funName = options;
            funArgs = arraySlice.call(arguments).splice(0, 1);
        }
        return this.each(function(i, element) {
            var dom = $(element),
                plsInc = dom.data(loading.dataKey);
            if (!plsInc) {
                plsInc = new loading(dom, ops);
            }

            if (funName) {
                var fun = plsInc[funName];
                if (typeof fun === "function") {
                    fun.apply(plsInc, funArgs);
                }
            }
        });
    }
}));