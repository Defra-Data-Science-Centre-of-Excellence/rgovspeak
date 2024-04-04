function parseCookie(e) {
    var t = JSON.parse(e);
    return "object" != typeof t && (t = JSON.parse(t)), t
}! function(e) {
    "use strict";
    var f = e.GOVUK || {};
    f.Modules = f.Modules || {}, f.modules = {
        find: function(e) {
            var t, n = "[data-module]";
            t = (e = e || document).querySelectorAll(n);
            for (var o = [], i = 0; i < t.length; i++) o.push(t[i]);
            return e !== document && e.getAttribute("data-module") && o.push(e), o
        },
        start: function(e) {
            function t(e) {
                return o(n(e))
            }

            function n(e) {
                return e.replace(/-([a-z])/g, function(e) {
                    return e.charAt(1).toUpperCase()
                })
            }

            function o(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }
            for (var i = this.find(e), r = 0, s = i.length; r < s; r++)
                for (var a = i[r], c = a.getAttribute("data-module").split(" "), u = 0, l = c.length; u < l; u++) {
                    var d = t(c[u]),
                        p = a.getAttribute("data-" + c[u] + "-module-started");
                    if ("function" == typeof f.Modules[d] && !p && f.Modules[d].prototype.init) try {
                        new f.Modules[d](a).init(), a.setAttribute("data-" + c[u] + "-module-started", !0)
                    } catch (m) {
                        console.error("Error starting " + d + " component JS: ", m, window.location)
                    }
                }
        }
    }, e.GOVUK = f
}(window), document.addEventListener("DOMContentLoaded", function() {
        window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}, window.GOVUK.analyticsVars = window.GOVUK.analyticsVars || {}, "undefined" != typeof window.GOVUK.loadAnalytics && (window.GOVUK.loadAnalytics.loadExtraDomains(), "undefined" == typeof window.GOVUK.analyticsGa4.vars && window.GOVUK.loadAnalytics.loadGa4(), "undefined" == typeof window.GOVUK.analyticsVars.gaProperty && window.GOVUK.loadAnalytics.loadUa()), window.GOVUK.modules.start()
    }),
    function() {
        "use strict";
        window.GOVUK = window.GOVUK || {}, window.GOVUK.triggerEvent = function(e, t, n) {
            var o, i = n || {},
                r = i.keyCode;
            Object.prototype.hasOwnProperty.call(i, "bubbles") || (i.bubbles = !0), Object.prototype.hasOwnProperty.call(i, "cancelable") || (i.cancelable = !0), "function" == typeof window.CustomEvent ? o = new window.CustomEvent(t, i) : (o = document.createEvent("CustomEvent")).initCustomEvent(t, i.bubbles, i.cancelable, i.detail), r && (o.keyCode = r), i.shiftKey && (o.shiftKey = !0), e.dispatchEvent(o)
        }
    }(window),
    function() {
        "use strict";
        window.GOVUK = window.GOVUK || {};
        var i = {
                essential: !0,
                settings: !1,
                usage: !1,
                campaigns: !1
            },
            r = {
                cookies_policy: "essential",
                seen_cookie_message: "essential",
                cookie_preferences_set: "essential",
                cookies_preferences_set: "essential",
                "_email-alert-frontend_session": "essential",
                intervention_campaign: "essential",
                licensing_session: "essential",
                govuk_contact_referrer: "essential",
                multivariatetest_cohort_coronavirus_extremely_vulnerable_rate_limit: "essential",
                dgu_beta_banner_dismissed: "settings",
                global_bar_seen: "settings",
                govuk_browser_upgrade_dismisssed: "settings",
                govuk_not_first_visit: "settings",
                analytics_next_page_call: "usage",
                user_nation: "settings",
                _ga: "usage",
                _gid: "usage",
                _gat: "usage",
                "JS-Detection": "usage",
                TLSversion: "usage",
                _ga_VBLT2V3FZR: "usage",
                _ga_P1DGM6TVYF: "usage",
                _ga_S5RQ7FTGVR: "usage"
            };
        window.GOVUK.cookie = function(e, t, n) {
            return void 0 !== t ? !1 === t || null === t ? window.GOVUK.setCookie(e, "", {
                days: -1
            }) : (void 0 === n && (n = {
                days: 30
            }), window.GOVUK.setCookie(e, t, n)) : window.GOVUK.getCookie(e)
        }, window.GOVUK.setDefaultConsentCookie = function() {
            window.GOVUK.setConsentCookie(i)
        }, window.GOVUK.approveAllCookieTypes = function() {
            var e = {
                essential: !0,
                settings: !0,
                usage: !0,
                campaigns: !0
            };
            window.GOVUK.setCookie("cookies_policy", JSON.stringify(e), {
                days: 365
            })
        }, window.GOVUK.getConsentCookie = function() {
            var e, t = window.GOVUK.cookie("cookies_policy");
            if (!t) return null;
            try {
                e = JSON.parse(t)
            } catch (n) {
                return null
            }
            return "object" != typeof e && null !== e && (e = JSON.parse(e)), e
        }, window.GOVUK.setConsentCookie = function(e) {
            var t = window.GOVUK.getConsentCookie();
            for (var n in t || (t = JSON.parse(JSON.stringify(i))), e)
                if (t[n] = e[n], !e[n])
                    for (var o in r) r[o] === n && window.GOVUK.deleteCookie(o);
            window.GOVUK.setCookie("cookies_policy", JSON.stringify(t), {
                days: 365
            })
        }, window.GOVUK.checkConsentCookieCategory = function(e, t) {
            var n = window.GOVUK.getConsentCookie();
            if (!n && r[e]) return !0;
            n = window.GOVUK.getConsentCookie();
            try {
                return n[t]
            } catch (o) {
                return console.error(o), !1
            }
        }, window.GOVUK.checkConsentCookie = function(e, t) {
            if ("cookies_policy" === e || null === t || !1 === t) return !0;
            if (e.match("^govuk_surveySeen") || e.match("^govuk_taken")) return window.GOVUK.checkConsentCookieCategory(e, "settings");
            if (r[e]) {
                var n = r[e];
                return window.GOVUK.checkConsentCookieCategory(e, n)
            }
            return !1
        }, window.GOVUK.setCookie = function(e, t, n) {
            if (window.GOVUK.checkConsentCookie(e, t)) {
                void 0 === n && (n = {});
                var o = e + "=" + t + "; path=/";
                if (n.days) {
                    var i = new Date;
                    i.setTime(i.getTime() + 24 * n.days * 60 * 60 * 1e3), o = o + "; expires=" + i.toGMTString()
                }
                "https:" === document.location.protocol && (o += "; Secure"), document.cookie = o
            }
        }, window.GOVUK.getCookie = function(e) {
            for (var t = e + "=", n = document.cookie.split(";"), o = 0, i = n.length; o < i; o++) {
                for (var r = n[o];
                    " " === r.charAt(0);) r = r.substring(1, r.length);
                if (0 === r.indexOf(t)) return decodeURIComponent(r.substring(t.length))
            }
            return null
        }, window.GOVUK.getCookieCategory = function(e) {
            return r[e]
        }, window.GOVUK.deleteCookie = function(e) {
            window.GOVUK.cookie(e, null), window.GOVUK.cookie(e) && (document.cookie = e + "=;expires=" + new Date + ";", document.cookie = e + "=;expires=" + new Date + ";domain=" + window.location.hostname + ";path=/")
        }, window.GOVUK.deleteUnconsentedCookies = function() {
            var e = window.GOVUK.getConsentCookie();
            for (var t in e)
                if (!e[t])
                    for (var n in r) r[n] === t && window.GOVUK.deleteCookie(n)
        }
    }(window),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("GOVUKFrontend.Button", t) : (e.GOVUKFrontend = e.GOVUKFrontend || {}, e.GOVUKFrontend.Button = t())
    }(this, function() {
        "use strict";

        function o() {
            for (var e = function(e) {
                    var r = {},
                        s = function(e, t) {
                            for (var n in e)
                                if (Object.prototype.hasOwnProperty.call(e, n)) {
                                    var o = e[n],
                                        i = t ? t + "." + n : n;
                                    "object" == typeof o ? s(o, i) : r[i] = o
                                }
                        };
                    return s(e), r
                }, t = {}, n = 0; n < arguments.length; n++) {
                var o = e(arguments[n]);
                for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i])
            }
            return t
        }

        function i(e) {
            if ("string" != typeof e) return e;
            var t = e.trim();
            return "true" === t || "false" !== t && (0 < t.length && isFinite(Number(t)) ? Number(t) : e)
        }

        function r(e) {
            var t = {};
            for (var n in e) t[n] = i(e[n]);
            return t
        }

        function e(e, t) {
            if (!(e instanceof HTMLElement)) return this;
            this.$module = e, this.debounceFormSubmitTimer = null;
            var n = {
                preventDoubleClick: !1
            };
            this.config = o(n, t || {}, r(e.dataset))
        }(function() {
            var a, c, u, l;
            "defineProperty" in Object && function() {
                try {
                    var e = {};
                    return Object.defineProperty(e, "test", {
                        value: 42
                    }), !0
                } catch (t) {
                    return !1
                }
            }() || (a = Object.defineProperty, c = Object.prototype.hasOwnProperty("__defineGetter__"), u = "Getters & setters cannot be defined on this javascript engine", l = "A property cannot both have accessors and be writable or have a value", Object.defineProperty = function d(e, t, n) {
                if (a && (e === window || e === document || e === Element.prototype || e instanceof Element)) return a(e, t, n);
                if (null === e || !(e instanceof Object || "object" == typeof e)) throw new TypeError("Object.defineProperty called on non-object");
                if (!(n instanceof Object)) throw new TypeError("Property description must be an object");
                var o = String(t),
                    i = "value" in n || "writable" in n,
                    r = "get" in n && typeof n.get,
                    s = "set" in n && typeof n.set;
                if (r) {
                    if ("function" !== r) throw new TypeError("Getter must be a function");
                    if (!c) throw new TypeError(u);
                    if (i) throw new TypeError(l);
                    Object.__defineGetter__.call(e, o, n.get)
                } else e[o] = n.value;
                if (s) {
                    if ("function" !== s) throw new TypeError("Setter must be a function");
                    if (!c) throw new TypeError(u);
                    if (i) throw new TypeError(l);
                    Object.__defineSetter__.call(e, o, n.set)
                }
                return "value" in n && (e[o] = n.value), e
            })
        }).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Document" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(), this.Document.prototype = document))
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Element" in this && "HTMLElement" in this || function() {
                    function e() {
                        return r-- || clearTimeout(t), !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (u(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype)
                    }
                    if (!window.Element || window.HTMLElement) {
                        window.Element = window.HTMLElement = new Function("return function Element() {}")();
                        var t, n = document.appendChild(document.createElement("body")),
                            o = n.appendChild(document.createElement("iframe")).contentWindow.document,
                            a = Element.prototype = o.appendChild(o.createElement("*")),
                            c = {},
                            u = function(e, t) {
                                var n, o, i, r = e.childNodes || [],
                                    s = -1;
                                if (1 === e.nodeType && e.constructor !== Element)
                                    for (n in e.constructor = Element, c) o = c[n], e[n] = o;
                                for (; i = t && r[++s];) u(i, t);
                                return e
                            },
                            l = document.getElementsByTagName("*"),
                            i = document.createElement,
                            r = 100;
                        a.attachEvent("onpropertychange", function(e) {
                            for (var t, n = e.propertyName, o = !c.hasOwnProperty(n), i = a[n], r = c[n], s = -1; t = l[++s];) 1 === t.nodeType && (o || t[n] === r) && (t[n] = i);
                            c[n] = i
                        }), a.constructor = Element, a.hasAttribute || (a.hasAttribute = function s(e) {
                            return null !== this.getAttribute(e)
                        }), e() || (document.onreadystatechange = e, t = setInterval(e, 25)), document.createElement = function d(e) {
                            var t = i(String(e).toLowerCase());
                            return u(t)
                        }, document.removeChild(n)
                    } else window.HTMLElement = window.Element
                }()
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                (function() {
                    if (!document.documentElement.dataset) return !1;
                    var e = document.createElement("div");
                    return e.setAttribute("data-a-b", "c"), e.dataset && "c" == e.dataset.aB
                })() || Object.defineProperty(Element.prototype, "dataset", {
                    get: function() {
                        for (var e = this, t = this.attributes, n = {}, o = 0; o < t.length; o++) {
                            var i = t[o];
                            if (i && i.name && /^data-\w[.\w-]*$/.test(i.name)) {
                                var r = i.name,
                                    s = i.value,
                                    a = r.substr(5).replace(/-./g, function(e) {
                                        return e.charAt(1).toUpperCase()
                                    });
                                "__defineGetter__" in Object.prototype && "__defineSetter__" in Object.prototype ? Object.defineProperty(n, a, {
                                    enumerable: !0,
                                    get: function() {
                                        return this.value
                                    }.bind({
                                        value: s || ""
                                    }),
                                    set: function c(e, t) {
                                        void 0 !== t ? this.setAttribute(e, t) : this.removeAttribute(e)
                                    }.bind(e, r)
                                }) : n[a] = s
                            }
                        }
                        return n
                    }
                })
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "trim" in String.prototype || (String.prototype.trim = function() {
                    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                })
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Window" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function(e) {
                    e.constructor ? e.Window = e.constructor : (e.Window = e.constructor = new Function("return function Window() {}")()).prototype = this
                }(this)
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function(u) {
                (function(e) {
                    if (!("Event" in e)) return !1;
                    if ("function" == typeof e.Event) return !0;
                    try {
                        return new Event("click"), !0
                    } catch (t) {
                        return !1
                    }
                })(this) || function() {
                    function l(e, t) {
                        for (var n = -1, o = e.length; ++n < o;)
                            if (n in e && e[n] === t) return n;
                        return -1
                    }
                    var i = {
                        click: 1,
                        dblclick: 1,
                        keyup: 1,
                        keypress: 1,
                        keydown: 1,
                        mousedown: 1,
                        mouseup: 1,
                        mousemove: 1,
                        mouseover: 1,
                        mouseenter: 1,
                        mouseleave: 1,
                        mouseout: 1,
                        storage: 1,
                        storagecommit: 1,
                        textinput: 1
                    };
                    if ("undefined" != typeof document && "undefined" != typeof window) {
                        var e = window.Event && window.Event.prototype || null;
                        window.Event = Window.prototype.Event = function r(e, t) {
                            if (!e) throw new Error("Not enough arguments");
                            var n;
                            if ("createEvent" in document) {
                                n = document.createEvent("Event");
                                var o = !(!t || t.bubbles === u) && t.bubbles,
                                    i = !(!t || t.cancelable === u) && t.cancelable;
                                return n.initEvent(e, o, i), n
                            }
                            return (n = document.createEventObject()).type = e, n.bubbles = !(!t || t.bubbles === u) && t.bubbles, n.cancelable = !(!t || t.cancelable === u) && t.cancelable, n
                        }, e && Object.defineProperty(window.Event, "prototype", {
                            configurable: !1,
                            enumerable: !1,
                            writable: !0,
                            value: e
                        }), "createEvent" in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(e, t) {
                            var u = this,
                                n = e,
                                o = t;
                            if (u === window && n in i) throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
                            u._events || (u._events = {}), u._events[n] || (u._events[n] = function(e) {
                                var t, n = u._events[e.type].list,
                                    o = n.slice(),
                                    i = -1,
                                    r = o.length;
                                for (e.preventDefault = function s() {
                                        !1 !== e.cancelable && (e.returnValue = !1)
                                    }, e.stopPropagation = function a() {
                                        e.cancelBubble = !0
                                    }, e.stopImmediatePropagation = function c() {
                                        e.cancelBubble = !0, e.cancelImmediate = !0
                                    }, e.currentTarget = u, e.relatedTarget = e.fromElement || null, e.target = e.target || e.srcElement || u, e.timeStamp = (new Date).getTime(), e.clientX && (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop); ++i < r && !e.cancelImmediate;) i in o && -1 !== l(n, t = o[i]) && "function" == typeof t && t.call(u, e)
                            }, u._events[n].list = [], u.attachEvent && u.attachEvent("on" + n, u._events[n])), u._events[n].list.push(o)
                        }, window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(e, t) {
                            var n, o = this,
                                i = e,
                                r = t;
                            o._events && o._events[i] && o._events[i].list && -1 !== (n = l(o._events[i].list, r)) && (o._events[i].list.splice(n, 1), o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]), delete o._events[i]))
                        }, window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(e) {
                            if (!arguments.length) throw new Error("Not enough arguments");
                            if (!e || "string" != typeof e.type) throw new Error("DOM Events Exception 0");
                            var t = this,
                                n = e.type;
                            try {
                                if (!e.bubbles) {
                                    e.cancelBubble = !0;
                                    var o = function(e) {
                                        e.cancelBubble = !0, (t || window).detachEvent("on" + n, o)
                                    };
                                    this.attachEvent("on" + n, o)
                                }
                                this.fireEvent("on" + n, e)
                            } catch (i) {
                                for (e.target = t;
                                    "_events" in (e.currentTarget = t) && "function" == typeof t._events[n] && t._events[n].call(t, e), "function" == typeof t["on" + n] && t["on" + n].call(t, e), (t = 9 === t.nodeType ? t.parentWindow : t.parentNode) && !e.cancelBubble;);
                            }
                            return !0
                        }, document.attachEvent("onreadystatechange", function() {
                            "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded", {
                                bubbles: !0
                            }))
                        }))
                    }
                }()
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "bind" in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
                    value: function _(t) {
                        var n, e = Array,
                            o = Object,
                            i = o.prototype,
                            r = e.prototype,
                            s = function s() {},
                            a = i.toString,
                            c = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
                            u = Function.prototype.toString,
                            l = function l(e) {
                                try {
                                    return u.call(e), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            d = "[object Function]",
                            p = "[object GeneratorFunction]";
                        n = function n(e) {
                            if ("function" != typeof e) return !1;
                            if (c) return l(e);
                            var t = a.call(e);
                            return t === d || t === p
                        };
                        var m = r.slice,
                            f = r.concat,
                            h = r.push,
                            y = Math.max,
                            v = this;
                        if (!n(v)) throw new TypeError("Function.prototype.bind called on incompatible " + v);
                        for (var w, b = m.call(arguments, 1), g = function() {
                                if (this instanceof w) {
                                    var e = v.apply(this, f.call(b, m.call(arguments)));
                                    return o(e) === e ? e : this
                                }
                                return v.apply(t, f.call(b, m.call(arguments)))
                            }, E = y(0, v.length - b.length), k = [], O = 0; O < E; O++) h.call(k, "$" + O);
                        return w = Function("binder", "return function (" + k.join(",") + "){ return binder.apply(this, arguments); }")(g), v.prototype && (s.prototype = v.prototype, w.prototype = new s, s.prototype = null), w
                    }
                })
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {});
        var n = 32,
            t = 1;
        return e.prototype.init = function() {
            this.$module && (this.$module.addEventListener("keydown", this.handleKeyDown), this.$module.addEventListener("click", this.debounce.bind(this)))
        }, e.prototype.handleKeyDown = function(e) {
            var t = e.target;
            e.keyCode === n && t instanceof HTMLElement && "button" === t.getAttribute("role") && (e.preventDefault(), t.click())
        }, e.prototype.debounce = function(e) {
            if (this.config.preventDoubleClick) return this.debounceFormSubmitTimer ? (e.preventDefault(), !1) : void(this.debounceFormSubmitTimer = setTimeout(function() {
                this.debounceFormSubmitTimer = null
            }.bind(this), 1e3 * t))
        }, e
    }), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, window.GOVUK.Modules.GovukButton = window.GOVUKFrontend.Button, window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
    function(e) {
        function t(e) {
            this.$module = e, this.$module.cookieBannerConfirmationMessage = this.$module.querySelector(".gem-c-cookie-banner__confirmation"), this.$module.cookieBannerConfirmationMessageText = this.$module.querySelector(".gem-c-cookie-banner__confirmation-message")
        }
        t.prototype.init = function() {
            this.$module.hideCookieMessage = this.hideCookieMessage.bind(this), this.$module.showCookieMessage = this.showCookieMessage.bind(this), this.$module.showConfirmationMessage = this.showConfirmationMessage.bind(this), this.$module.setCookieConsent = this.setCookieConsent.bind(this), this.$module.rejectCookieConsent = this.rejectCookieConsent.bind(this), this.setupCookieMessage(), window.GOVUK.useSingleConsentApi && (window.addEventListener("hide-cookie-banner", this.$module.hideCookieMessage), window.addEventListener("show-cookie-banner", this.$module.showCookieMessage), window.GOVUK.singleConsent.init())
        }, t.prototype.setupCookieMessage = function() {
            if (this.$hideLinks = this.$module.querySelectorAll("button[data-hide-cookie-banner]"), this.$hideLinks && this.$hideLinks.length)
                for (var e = 0; e < this.$hideLinks.length; e++) this.$hideLinks[e].addEventListener("click", this.$module.hideCookieMessage);
            this.$acceptCookiesButton = this.$module.querySelector("button[data-accept-cookies]"), this.$acceptCookiesButton && this.$acceptCookiesButton.addEventListener("click", this.$module.setCookieConsent), this.$rejectCookiesButton = this.$module.querySelector("button[data-reject-cookies]"), this.$rejectCookiesButton && this.$rejectCookiesButton.addEventListener("click", this.$module.rejectCookieConsent), window.GOVUK.useSingleConsentApi || this.showCookieMessage()
        }, t.prototype.showCookieMessage = function() {
            (window.removeEventListener("show-cookie-banner", this.$module.showCookieMessage), this.isInCookiesPage() || this.isInIframe()) || this.$module && "true" !== window.GOVUK.cookie("cookies_preferences_set") && (this.$module.removeAttribute("hidden"), window.GOVUK.cookie("cookies_policy") || window.GOVUK.useSingleConsentApi || window.GOVUK.setDefaultConsentCookie(), window.GOVUK.deleteUnconsentedCookies())
        }, t.prototype.hideCookieMessage = function(e) {
            window.removeEventListener("hide-cookie-banner", this.$module.hideCookieMessage), this.$module && (this.$module.hidden = !0, window.GOVUK.useSingleConsentApi || window.GOVUK.cookie("cookies_preferences_set", "true", {
                days: 365
            })), e.target && e.preventDefault()
        }, t.prototype.setCookieConsent = function() {
            "all" === this.$acceptCookiesButton.getAttribute("data-cookie-types") && (this.$module.querySelector(".gem-c-cookie-banner__confirmation-message--accepted").hidden = !1), window.GOVUK.useSingleConsentApi ? window.GOVUK.singleConsent.setPreferences("accept") : (window.GOVUK.approveAllCookieTypes(), window.GOVUK.cookie("cookies_preferences_set", "true", {
                days: 365
            })), this.$module.showConfirmationMessage(), this.$module.cookieBannerConfirmationMessage.focus(), window.GOVUK.analyticsInit && window.GOVUK.analyticsInit(), window.GOVUK.globalBarInit && window.GOVUK.globalBarInit.init(), window.GOVUK.useSingleConsentApi || window.GOVUK.triggerEvent(window, "cookie-consent")
        }, t.prototype.rejectCookieConsent = function() {
            this.$module.querySelector(".gem-c-cookie-banner__confirmation-message--rejected").hidden = !1, this.$module.showConfirmationMessage(), this.$module.cookieBannerConfirmationMessage.focus(), window.GOVUK.useSingleConsentApi ? window.GOVUK.singleConsent.setPreferences("reject") : (window.GOVUK.setDefaultConsentCookie(), window.GOVUK.cookie("cookies_preferences_set", "true", {
                days: 365
            }))
        }, t.prototype.showConfirmationMessage = function() {
            this.$cookieBannerHeader = this.$module.querySelector(".govuk-cookie-banner__heading"), this.$cookieBannerHeader.hidden = !0, this.$cookieBannerMainContent = this.$module.querySelector(".gem-c-cookie-banner__content"), this.$cookieBannerMainContent.hidden = !0, this.$cookieBannerConfirmationButtons = this.$module.querySelector(".js-confirmation-buttons"), this.$cookieBannerConfirmationButtons.hidden = !0, this.$cookieBannerHideButton = this.$module.querySelector(".js-hide-button"), this.$cookieBannerHideButton.hidden = !1
        }, t.prototype.isInCookiesPage = function() {
            return "/help/cookies" === window.location.pathname
        }, t.prototype.isInIframe = function() {
            return window.parent && window.location !== window.parent.location
        }, e.CookieBanner = t
    }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
    function(e) {
        function t(e) {
            this.$header = e, this.$navigation = e && e.querySelectorAll("[data-one-login-header-nav]"), this.$numberOfNavs = this.$navigation && this.$navigation.length
        }
        t.prototype.init = function() {
            if (this.$header || this.$numberOfNavs)
                for (var e = 0; e < this.$numberOfNavs; e++) {
                    var t = this.$navigation[e];
                    if (t.$menuButton = t.querySelector(".js-x-header-toggle"), t.$menu = t.$menuButton && t.querySelector("#" + t.$menuButton.getAttribute("aria-controls")), t.menuItems = t.$menu && t.$menu.querySelectorAll("li"), !t.$menuButton || !t.$menu || t.menuItems.length < 2) return;
                    t.classList.add("toggle-enabled"), t.$menuOpenClass = t.$menu && t.$menu.dataset.openClass, t.$menuButtonOpenClass = t.$menuButton && t.$menuButton.dataset.openClass, t.$menuButtonOpenLabel = t.$menuButton && t.$menuButton.dataset.labelForShow, t.$menuButtonCloseLabel = t.$menuButton && t.$menuButton.dataset.labelForHide, t.$menuButtonOpenText = t.$menuButton && t.$menuButton.dataset.textForShow, t.$menuButtonCloseText = t.$menuButton && t.$menuButton.dataset.textForHide, t.isOpen = !1, t.$menuButton.addEventListener("click", this.handleMenuButtonClick.bind(t))
                }
        }, t.prototype.handleMenuButtonClick = function() {
            this.isOpen = !this.isOpen, this.$menuOpenClass && this.$menu.classList.toggle(this.$menuOpenClass, this.isOpen), this.$menuButtonOpenClass && this.$menuButton.classList.toggle(this.$menuButtonOpenClass, this.isOpen), this.$menuButton.setAttribute("aria-expanded", this.isOpen), this.$menuButtonCloseLabel && this.$menuButtonOpenLabel && this.$menuButton.setAttribute("aria-label", this.isOpen ? this.$menuButtonCloseLabel : this.$menuButtonOpenLabel), this.$menuButtonCloseText && this.$menuButtonOpenText && (this.$menuButton.innerHTML = this.isOpen ? this.$menuButtonCloseText : this.$menuButtonOpenText)
        }, e.CrossServiceHeader = t
    }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
    function(e) {
        function t(e) {
            this.$module = e, this.somethingIsWrongForm = this.$module.querySelector("#something-is-wrong"), this.surveyForm = this.$module.querySelector("#page-is-not-useful"), this.prompt = this.$module.querySelector(".js-prompt"), this.forms = this.$module.querySelectorAll(".js-feedback-form"), this.toggleForms = this.$module.querySelectorAll(".js-toggle-form"), this.closeForms = this.$module.querySelectorAll(".js-close-form"), this.activeForm = !1, this.pageIsUsefulButton = this.$module.querySelector(".js-page-is-useful"), this.pageIsNotUsefulButton = this.$module.querySelector(".js-page-is-not-useful"), this.somethingIsWrongButton = this.$module.querySelector(".js-something-is-wrong"), this.promptQuestions = this.$module.querySelectorAll(".js-prompt-questions"), this.promptSuccessMessage = this.$module.querySelector(".js-prompt-success"), this.surveyWrapper = this.$module.querySelector("#survey-wrapper"), this.jshiddenClass = "js-hidden", this.whatDoingInput = this.$module.querySelector("[name=what_doing]"), this.whatWrongInput = this.$module.querySelector("[name=what_wrong]")
        }
        t.prototype.init = function() {
            this.setInitialAriaAttributes(), this.setHiddenValues(), this.prompt.hidden = !1;
            for (var e = 0; e < this.promptQuestions.length; e++) this.promptQuestions[e].hidden = !1;
            this.surveyForm.hidden = !0;
            for (var t = 0; t < this.toggleForms.length; t++) this.toggleForms[t].addEventListener("click", function(e) {
                e.preventDefault();
                var t = e.target.closest("button");
                this.toggleForm(t.getAttribute("aria-controls")), this.trackEvent(this.getTrackEventParams(t)), this.updateAriaAttributes(t)
            }.bind(this));
            for (var n = 0; n < this.closeForms.length; n++) this.closeForms[n].hidden = !1, this.closeForms[n].addEventListener("click", function(e) {
                e.preventDefault();
                var t = e.target,
                    n = t.getAttribute("aria-controls");
                this.toggleForm(n), this.trackEvent(this.getTrackEventParams(t)), this.setInitialAriaAttributes(), this.revealInitialPrompt();
                var o = ".js-" + n;
                this.$module.querySelector(o).focus()
            }.bind(this));
            if (this.pageIsUsefulButton.addEventListener("click", function(e) {
                    e.preventDefault(), this.trackEvent(this.getTrackEventParams(this.pageIsUsefulButton)), this.showFormSuccess(), this.revealInitialPrompt()
                }.bind(this)), this.pageIsNotUsefulButton.addEventListener("click", function() {
                    var e, t = "111111111.1111111111";
                    e = null === window.GOVUK.cookie("_ga") || "" === window.GOVUK.cookie("_ga") ? t : window.GOVUK.cookie("_ga").split(".").slice(-2).join("."), this.setHiddenValuesNotUsefulForm(e)
                }.bind(this)), this.somethingIsWrongButton.addEventListener("click", function() {
                    this.timerInterval = setInterval(function() {
                        this.timer = this.timer + 1, this.timerHoneyPot.setAttribute("value", this.timer)
                    }.bind(this), 1e3)
                }.bind(this)), "function" == typeof window.URLSearchParams)
                for (var o = 0; o < this.forms.length; o++) this.forms[o].addEventListener("submit", function(e) {
                    e.preventDefault();
                    var t = e.target,
                        n = new XMLHttpRequest,
                        o = t.getAttribute("action"),
                        i = new FormData(t);
                    i = new URLSearchParams(i).toString(), this.done = function() {
                        200 === n.status ? (this.trackEvent(this.getTrackEventParams(t)), this.showFormSuccess(n.message), this.revealInitialPrompt(), this.setInitialAriaAttributes(), this.activeForm.hidden = !0, clearInterval(this.timerInterval)) : (this.showError(n), this.enableSubmitFormButton(t))
                    }.bind(this), n.addEventListener("loadend", this.done), n.open("POST", o, !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), this.disableSubmitFormButton(t), n.send(i)
                }.bind(this))
        }, t.prototype.disableSubmitFormButton = function(e) {
            e.querySelector('[type="submit"]').setAttribute("disabled", !0)
        }, t.prototype.enableSubmitFormButton = function(e) {
            e.querySelector('[type="submit"]').removeAttribute("disabled")
        }, t.prototype.setInitialAriaAttributes = function() {
            this.pageIsNotUsefulButton.setAttribute("aria-expanded", !1), this.somethingIsWrongButton.setAttribute("aria-expanded", !1)
        }, t.prototype.setHiddenValues = function() {
            var e = document.createElement("input");
            e.setAttribute("type", "hidden"), e.setAttribute("name", "javascript_enabled"), e.setAttribute("value", !0), this.somethingIsWrongForm.appendChild(e);
            var t = document.createElement("input");
            t.setAttribute("type", "hidden"), t.setAttribute("name", "referrer"), t.setAttribute("value", document.referrer || "unknown"), this.somethingIsWrongForm.appendChild(t), this.somethingIsWrongForm.invalidInfoError = ["<h2>Sorry, we\u2019re unable to send your message as you haven\u2019t given us any information.</h2>", " <p>Please tell us what you were doing or what went wrong</p>"].join(""), this.timer = 0, this.timerHoneyPot = document.createElement("input"), this.timerHoneyPot.setAttribute("type", "hidden"), this.timerHoneyPot.setAttribute("name", "timer"), this.timerHoneyPot.setAttribute("value", this.timer), this.somethingIsWrongForm.appendChild(this.timerHoneyPot)
        }, t.prototype.setHiddenValuesNotUsefulForm = function(e) {
            var t = window.location.pathname.replace(/[^\s=?&]+(?:@|%40)[^\s=?&]+/, "[email]"),
                n = encodeURI(t);
            if (this.surveyForm.invalidInfoError = ["<h2>Sorry, we\u2019re unable to send your message as you haven\u2019t given us a valid email address.</h2>", " <p>Enter an email address in the correct format, like name@example.com</p>"].join(""), 0 === document.querySelectorAll('[name="email_survey_signup[ga_client_id]"]').length) {
                var o = document.createElement("input");
                o.setAttribute("type", "hidden"), o.setAttribute("name", "email_survey_signup[ga_client_id]"), o.setAttribute("value", e || "0"), this.surveyForm.appendChild(o)
            }
            if (0 === document.querySelectorAll(".gem-c-feedback__email-link#take-survey").length) {
                var i = document.createElement("a");
                i.setAttribute("href", "https://www.smartsurvey.co.uk/s/gov-uk-banner/?c=" + n + "&amp;gcl=" + e), i.setAttribute("class", "gem-c-feedback__email-link govuk-link"), i.setAttribute("id", "take-survey"), i.setAttribute("target", "_blank"), i.setAttribute("rel", "noopener noreferrer"), i.innerHTML = "Don\u2019t have an email address?", this.surveyWrapper.appendChild(i)
            }
        }, t.prototype.updateAriaAttributes = function(e) {
            e.setAttribute("aria-expanded", !0)
        }, t.prototype.toggleForm = function(e) {
            this.activeForm = this.$module.querySelector("#" + e), this.activeForm.hidden ? this.activeForm.hidden = !1 : this.activeForm.hidden = !0, this.prompt.hidden ? this.prompt.hidden = !1 : this.prompt.hidden = !0, this.activeForm.hidden ? (this.activeForm = !1, clearInterval(this.timerInterval)) : this.activeForm.querySelectorAll(".gem-c-textarea .govuk-textarea, .gem-c-input.govuk-input")[0].focus()
        }, t.prototype.getTrackEventParams = function(e) {
            return {
                category: e.getAttribute("data-track-category"),
                action: e.getAttribute("data-track-action")
            }
        }, t.prototype.trackEvent = function(e) {
            window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent(e.category, e.action)
        }, t.prototype.showError = function(e) {
            var t = ["<h2>Sorry, we\u2019re unable to receive your message right now.</h2>", " <p>If the problem persists, we have other ways for you to provide", ' feedback on the <a href="/contact/govuk">contact page</a>.</p>'].join("");
            e = "response" in e ? "object" == typeof e.response && null !== e.response ? "email survey sign up failure" === e.response.message ? t : e.response.message : t : 422 === e.status && this.activeForm.invalidInfoError || t;
            var n = this.activeForm.querySelector(".js-errors");
            n.innerHTML = e, n.hidden = !1, n.focus()
        }, t.prototype.showFormSuccess = function() {
            for (var e = 0; e < this.promptQuestions.length; e++) this.promptQuestions[e].hidden = !0;
            this.promptSuccessMessage.hidden = !1, this.promptSuccessMessage.focus()
        }, t.prototype.revealInitialPrompt = function() {
            this.prompt.hidden = !1, this.prompt.focus()
        }, e.Feedback = t
    }(window.GOVUK.Modules),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("GOVUKFrontend.Header", t) : (e.GOVUKFrontend = e.GOVUKFrontend || {}, e.GOVUKFrontend.Header = t())
    }(this, function() {
        "use strict";

        function e(e) {
            if (!(e instanceof HTMLElement)) return this;
            this.$module = e, this.$menuButton = e.querySelector(".govuk-js-header-toggle"), this.$menu = this.$menuButton && e.querySelector("#" + this.$menuButton.getAttribute("aria-controls")), this.menuIsOpen = !1, this.mql = null
        }
        return function() {
                "Window" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function(e) {
                    e.constructor ? e.Window = e.constructor : (e.Window = e.constructor = new Function("return function Window() {}")()).prototype = this
                }(this)
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Document" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(), this.Document.prototype = document))
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Element" in this && "HTMLElement" in this || function() {
                    function e() {
                        return r-- || clearTimeout(t), !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (u(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype)
                    }
                    if (!window.Element || window.HTMLElement) {
                        window.Element = window.HTMLElement = new Function("return function Element() {}")();
                        var t, n = document.appendChild(document.createElement("body")),
                            o = n.appendChild(document.createElement("iframe")).contentWindow.document,
                            a = Element.prototype = o.appendChild(o.createElement("*")),
                            c = {},
                            u = function(e, t) {
                                var n, o, i, r = e.childNodes || [],
                                    s = -1;
                                if (1 === e.nodeType && e.constructor !== Element)
                                    for (n in e.constructor = Element, c) o = c[n], e[n] = o;
                                for (; i = t && r[++s];) u(i, t);
                                return e
                            },
                            l = document.getElementsByTagName("*"),
                            i = document.createElement,
                            r = 100;
                        a.attachEvent("onpropertychange", function(e) {
                            for (var t, n = e.propertyName, o = !c.hasOwnProperty(n), i = a[n], r = c[n], s = -1; t = l[++s];) 1 === t.nodeType && (o || t[n] === r) && (t[n] = i);
                            c[n] = i
                        }), a.constructor = Element, a.hasAttribute || (a.hasAttribute = function s(e) {
                            return null !== this.getAttribute(e)
                        }), e() || (document.onreadystatechange = e, t = setInterval(e, 25)), document.createElement = function d(e) {
                            var t = i(String(e).toLowerCase());
                            return u(t)
                        }, document.removeChild(n)
                    } else window.HTMLElement = window.Element
                }()
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                var a, c, u, l;
                "defineProperty" in Object && function() {
                    try {
                        var e = {};
                        return Object.defineProperty(e, "test", {
                            value: 42
                        }), !0
                    } catch (t) {
                        return !1
                    }
                }() || (a = Object.defineProperty, c = Object.prototype.hasOwnProperty("__defineGetter__"), u = "Getters & setters cannot be defined on this javascript engine", l = "A property cannot both have accessors and be writable or have a value", Object.defineProperty = function d(e, t, n) {
                    if (a && (e === window || e === document || e === Element.prototype || e instanceof Element)) return a(e, t, n);
                    if (null === e || !(e instanceof Object || "object" == typeof e)) throw new TypeError("Object.defineProperty called on non-object");
                    if (!(n instanceof Object)) throw new TypeError("Property description must be an object");
                    var o = String(t),
                        i = "value" in n || "writable" in n,
                        r = "get" in n && typeof n.get,
                        s = "set" in n && typeof n.set;
                    if (r) {
                        if ("function" !== r) throw new TypeError("Getter must be a function");
                        if (!c) throw new TypeError(u);
                        if (i) throw new TypeError(l);
                        Object.__defineGetter__.call(e, o, n.get)
                    } else e[o] = n.value;
                    if (s) {
                        if ("function" !== s) throw new TypeError("Setter must be a function");
                        if (!c) throw new TypeError(u);
                        if (i) throw new TypeError(l);
                        Object.__defineSetter__.call(e, o, n.set)
                    }
                    return "value" in n && (e[o] = n.value), e
                })
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function(u) {
                (function(e) {
                    if (!("Event" in e)) return !1;
                    if ("function" == typeof e.Event) return !0;
                    try {
                        return new Event("click"), !0
                    } catch (t) {
                        return !1
                    }
                })(this) || function() {
                    function l(e, t) {
                        for (var n = -1, o = e.length; ++n < o;)
                            if (n in e && e[n] === t) return n;
                        return -1
                    }
                    var i = {
                        click: 1,
                        dblclick: 1,
                        keyup: 1,
                        keypress: 1,
                        keydown: 1,
                        mousedown: 1,
                        mouseup: 1,
                        mousemove: 1,
                        mouseover: 1,
                        mouseenter: 1,
                        mouseleave: 1,
                        mouseout: 1,
                        storage: 1,
                        storagecommit: 1,
                        textinput: 1
                    };
                    if ("undefined" != typeof document && "undefined" != typeof window) {
                        var e = window.Event && window.Event.prototype || null;
                        window.Event = Window.prototype.Event = function r(e, t) {
                            if (!e) throw new Error("Not enough arguments");
                            var n;
                            if ("createEvent" in document) {
                                n = document.createEvent("Event");
                                var o = !(!t || t.bubbles === u) && t.bubbles,
                                    i = !(!t || t.cancelable === u) && t.cancelable;
                                return n.initEvent(e, o, i), n
                            }
                            return (n = document.createEventObject()).type = e, n.bubbles = !(!t || t.bubbles === u) && t.bubbles, n.cancelable = !(!t || t.cancelable === u) && t.cancelable, n
                        }, e && Object.defineProperty(window.Event, "prototype", {
                            configurable: !1,
                            enumerable: !1,
                            writable: !0,
                            value: e
                        }), "createEvent" in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(e, t) {
                            var u = this,
                                n = e,
                                o = t;
                            if (u === window && n in i) throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
                            u._events || (u._events = {}), u._events[n] || (u._events[n] = function(e) {
                                var t, n = u._events[e.type].list,
                                    o = n.slice(),
                                    i = -1,
                                    r = o.length;
                                for (e.preventDefault = function s() {
                                        !1 !== e.cancelable && (e.returnValue = !1)
                                    }, e.stopPropagation = function a() {
                                        e.cancelBubble = !0
                                    }, e.stopImmediatePropagation = function c() {
                                        e.cancelBubble = !0, e.cancelImmediate = !0
                                    }, e.currentTarget = u, e.relatedTarget = e.fromElement || null, e.target = e.target || e.srcElement || u, e.timeStamp = (new Date).getTime(), e.clientX && (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop); ++i < r && !e.cancelImmediate;) i in o && -1 !== l(n, t = o[i]) && "function" == typeof t && t.call(u, e)
                            }, u._events[n].list = [], u.attachEvent && u.attachEvent("on" + n, u._events[n])), u._events[n].list.push(o)
                        }, window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(e, t) {
                            var n, o = this,
                                i = e,
                                r = t;
                            o._events && o._events[i] && o._events[i].list && -1 !== (n = l(o._events[i].list, r)) && (o._events[i].list.splice(n, 1), o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]), delete o._events[i]))
                        }, window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(e) {
                            if (!arguments.length) throw new Error("Not enough arguments");
                            if (!e || "string" != typeof e.type) throw new Error("DOM Events Exception 0");
                            var t = this,
                                n = e.type;
                            try {
                                if (!e.bubbles) {
                                    e.cancelBubble = !0;
                                    var o = function(e) {
                                        e.cancelBubble = !0, (t || window).detachEvent("on" + n, o)
                                    };
                                    this.attachEvent("on" + n, o)
                                }
                                this.fireEvent("on" + n, e)
                            } catch (i) {
                                for (e.target = t;
                                    "_events" in (e.currentTarget = t) && "function" == typeof t._events[n] && t._events[n].call(t, e), "function" == typeof t["on" + n] && t["on" + n].call(t, e), (t = 9 === t.nodeType ? t.parentWindow : t.parentNode) && !e.cancelBubble;);
                            }
                            return !0
                        }, document.attachEvent("onreadystatechange", function() {
                            "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded", {
                                bubbles: !0
                            }))
                        }))
                    }
                }()
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "bind" in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
                    value: function _(t) {
                        var n, e = Array,
                            o = Object,
                            i = o.prototype,
                            r = e.prototype,
                            s = function s() {},
                            a = i.toString,
                            c = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
                            u = Function.prototype.toString,
                            l = function l(e) {
                                try {
                                    return u.call(e), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            d = "[object Function]",
                            p = "[object GeneratorFunction]";
                        n = function n(e) {
                            if ("function" != typeof e) return !1;
                            if (c) return l(e);
                            var t = a.call(e);
                            return t === d || t === p
                        };
                        var m = r.slice,
                            f = r.concat,
                            h = r.push,
                            y = Math.max,
                            v = this;
                        if (!n(v)) throw new TypeError("Function.prototype.bind called on incompatible " + v);
                        for (var w, b = m.call(arguments, 1), g = function() {
                                if (this instanceof w) {
                                    var e = v.apply(this, f.call(b, m.call(arguments)));
                                    return o(e) === e ? e : this
                                }
                                return v.apply(t, f.call(b, m.call(arguments)))
                            }, E = y(0, v.length - b.length), k = [], O = 0; O < E; O++) h.call(k, "$" + O);
                        return w = Function("binder", "return function (" + k.join(",") + "){ return binder.apply(this, arguments); }")(g), v.prototype && (s.prototype = v.prototype, w.prototype = new s, s.prototype = null), w
                    }
                })
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), e.prototype.init = function() {
                this.$module && this.$menuButton && this.$menu && ("matchMedia" in window ? (this.mql = window.matchMedia("(min-width: 48.0625em)"), "addEventListener" in this.mql ? this.mql.addEventListener("change", this.syncState.bind(this)) : this.mql.addListener(this.syncState.bind(this)), this.syncState(), this.$menuButton.addEventListener("click", this.handleMenuButtonClick.bind(this))) : this.$menuButton.setAttribute("hidden", ""))
            }, e.prototype.syncState = function() {
                this.mql.matches ? (this.$menu.removeAttribute("hidden"), this.$menuButton.setAttribute("hidden", "")) : (this.$menuButton.removeAttribute("hidden"), this.$menuButton.setAttribute("aria-expanded", this.menuIsOpen.toString()), this.menuIsOpen ? this.$menu.removeAttribute("hidden") : this.$menu.setAttribute("hidden", ""))
            }, e.prototype.handleMenuButtonClick = function() {
                this.menuIsOpen = !this.menuIsOpen, this.syncState()
            }, e
    }), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, window.GOVUK.Modules.GovukHeader = window.GOVUKFrontend.Header,
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define("GOVUKFrontend", t) : t()
    }(0, function() {
        "use strict";
        (function() {
            var a, c, u, l;
            "defineProperty" in Object && function() {
                try {
                    var e = {};
                    return Object.defineProperty(e, "test", {
                        value: 42
                    }), !0
                } catch (t) {
                    return !1
                }
            }() || (a = Object.defineProperty, c = Object.prototype.hasOwnProperty("__defineGetter__"), u = "Getters & setters cannot be defined on this javascript engine", l = "A property cannot both have accessors and be writable or have a value", Object.defineProperty = function d(e, t, n) {
                if (a && (e === window || e === document || e === Element.prototype || e instanceof Element)) return a(e, t, n);
                if (null === e || !(e instanceof Object || "object" == typeof e)) throw new TypeError("Object.defineProperty called on non-object");
                if (!(n instanceof Object)) throw new TypeError("Property description must be an object");
                var o = String(t),
                    i = "value" in n || "writable" in n,
                    r = "get" in n && typeof n.get,
                    s = "set" in n && typeof n.set;
                if (r) {
                    if ("function" !== r) throw new TypeError("Getter must be a function");
                    if (!c) throw new TypeError(u);
                    if (i) throw new TypeError(l);
                    Object.__defineGetter__.call(e, o, n.get)
                } else e[o] = n.value;
                if (s) {
                    if ("function" !== s) throw new TypeError("Setter must be a function");
                    if (!c) throw new TypeError(u);
                    if (i) throw new TypeError(l);
                    Object.__defineSetter__.call(e, o, n.set)
                }
                return "value" in n && (e[o] = n.value), e
            })
        }).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function(p) {
                var e, t, n;
                "DOMTokenList" in this && (!("classList" in (e = document.createElement("x"))) || !e.classList.toggle("x", !1) && !e.className) || ("DOMTokenList" in (t = this) && t.DOMTokenList && (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg") || document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList) || (t.DOMTokenList = function() {
                    var i = !0,
                        n = function(e, t, n, o) {
                            Object.defineProperty ? Object.defineProperty(e, t, {
                                configurable: !1 === i || !!o,
                                get: n
                            }) : e.__defineGetter__(t, n)
                        };
                    try {
                        n({}, "support")
                    } catch (e) {
                        i = !1
                    }
                    return function(i, r) {
                        var s = this,
                            a = [],
                            c = {},
                            u = 0,
                            e = 0,
                            t = function(e) {
                                n(s, e, function() {
                                    return d(), a[e]
                                }, !1)
                            },
                            l = function() {
                                if (e <= u)
                                    for (; e < u; ++e) t(e)
                            },
                            d = function() {
                                var e, t, n = arguments,
                                    o = /\s+/;
                                if (n.length)
                                    for (t = 0; t < n.length; ++t)
                                        if (o.test(n[t])) throw (e = new SyntaxError('String "' + n[t] + '" contains an invalid character')).code = 5, e.name = "InvalidCharacterError", e;
                                for ("" === (a = "object" == typeof i[r] ? ("" + i[r].baseVal).replace(/^\s+|\s+$/g, "").split(o) : ("" + i[r]).replace(/^\s+|\s+$/g, "").split(o))[0] && (a = []), c = {}, t = 0; t < a.length; ++t) c[a[t]] = !0;
                                u = a.length, l()
                            };
                        return d(), n(s, "length", function() {
                            return d(), u
                        }), s.toLocaleString = s.toString = function() {
                            return d(), a.join(" ")
                        }, s.item = function(e) {
                            return d(), a[e]
                        }, s.contains = function(e) {
                            return d(), !!c[e]
                        }, s.add = function() {
                            d.apply(s, e = arguments);
                            for (var e, t, n = 0, o = e.length; n < o; ++n) t = e[n], c[t] || (a.push(t), c[t] = !0);
                            u !== a.length && (u = a.length >>> 0, "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "), l())
                        }, s.remove = function() {
                            d.apply(s, e = arguments);
                            for (var e, t = {}, n = 0, o = []; n < e.length; ++n) t[e[n]] = !0, delete c[e[n]];
                            for (n = 0; n < a.length; ++n) t[a[n]] || o.push(a[n]);
                            u = (a = o).length >>> 0, "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "), l()
                        }, s.toggle = function(e, t) {
                            return d.apply(s, [e]), p !== t ? t ? (s.add(e), !0) : (s.remove(e), !1) : c[e] ? (s.remove(e), !1) : (s.add(e), !0)
                        }, s
                    }
                }()), "classList" in (n = document.createElement("span")) && (n.classList.toggle("x", !1), n.classList.contains("x") && (n.classList.constructor.prototype.toggle = function i(e, t) {
                    var n = t;
                    if (n !== p) return this[(n = !!n) ? "add" : "remove"](e), n;
                    var o = !this.contains(e);
                    return this[o ? "add" : "remove"](e), o
                })), function() {
                    var e = document.createElement("span");
                    if ("classList" in e && (e.classList.add("a", "b"), !e.classList.contains("b"))) {
                        var o = e.classList.constructor.prototype.add;
                        e.classList.constructor.prototype.add = function() {
                            for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n])
                        }
                    }
                }(), function() {
                    var e = document.createElement("span");
                    if ("classList" in e && (e.classList.add("a"), e.classList.add("b"), e.classList.remove("a", "b"), e.classList.contains("b"))) {
                        var o = e.classList.constructor.prototype.remove;
                        e.classList.constructor.prototype.remove = function() {
                            for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n])
                        }
                    }
                }())
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Document" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(), this.Document.prototype = document))
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Element" in this && "HTMLElement" in this || function() {
                    function e() {
                        return r-- || clearTimeout(t), !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (u(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype)
                    }
                    if (!window.Element || window.HTMLElement) {
                        window.Element = window.HTMLElement = new Function("return function Element() {}")();
                        var t, n = document.appendChild(document.createElement("body")),
                            o = n.appendChild(document.createElement("iframe")).contentWindow.document,
                            a = Element.prototype = o.appendChild(o.createElement("*")),
                            c = {},
                            u = function(e, t) {
                                var n, o, i, r = e.childNodes || [],
                                    s = -1;
                                if (1 === e.nodeType && e.constructor !== Element)
                                    for (n in e.constructor = Element, c) o = c[n], e[n] = o;
                                for (; i = t && r[++s];) u(i, t);
                                return e
                            },
                            l = document.getElementsByTagName("*"),
                            i = document.createElement,
                            r = 100;
                        a.attachEvent("onpropertychange", function(e) {
                            for (var t, n = e.propertyName, o = !c.hasOwnProperty(n), i = a[n], r = c[n], s = -1; t = l[++s];) 1 === t.nodeType && (o || t[n] === r) && (t[n] = i);
                            c[n] = i
                        }), a.constructor = Element, a.hasAttribute || (a.hasAttribute = function s(e) {
                            return null !== this.getAttribute(e)
                        }), e() || (document.onreadystatechange = e, t = setInterval(e, 25)), document.createElement = function d(e) {
                            var t = i(String(e).toLowerCase());
                            return u(t)
                        }, document.removeChild(n)
                    } else window.HTMLElement = window.Element
                }()
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                var e;
                "document" in this && "classList" in document.documentElement && "Element" in this && "classList" in Element.prototype && ((e = document.createElement("span")).classList.add("a", "b"), e.classList.contains("b")) || function(e) {
                    var l = !0,
                        d = function(e, t, n, o) {
                            Object.defineProperty ? Object.defineProperty(e, t, {
                                configurable: !1 === l || !!o,
                                get: n
                            }) : e.__defineGetter__(t, n)
                        };
                    try {
                        d({}, "support")
                    } catch (t) {
                        l = !1
                    }
                    var p = function(e, c, u) {
                        d(e.prototype, c, function() {
                            var e, t = this,
                                n = "__defineGetter__DEFINE_PROPERTY" + c;
                            if (t[n]) return e;
                            if (!(t[n] = !0) === l) {
                                for (var o, i = p.mirror || document.createElement("div"), r = i.childNodes, s = r.length, a = 0; a < s; ++a)
                                    if (r[a]._R === t) {
                                        o = r[a];
                                        break
                                    } o || (o = i.appendChild(document.createElement("div"))), e = DOMTokenList.call(o, t, u)
                            } else e = new DOMTokenList(t, u);
                            return d(t, c, function() {
                                return e
                            }), delete t[n], e
                        }, !0)
                    };
                    p(e.Element, "classList", "className"), p(e.HTMLElement, "classList", "className"), p(e.HTMLLinkElement, "relList", "rel"), p(e.HTMLAnchorElement, "relList", "rel"), p(e.HTMLAreaElement, "relList", "rel")
                }(this)
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {})
    }), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
    function(e) {
        function t(e) {
            this.$module = e, this.$searchToggle = this.$module.querySelector("#super-search-menu-toggle"), this.$searchMenu = this.$module.querySelector("#super-search-menu"), this.$navToggle = this.$module.querySelector("#super-navigation-menu-toggle"), this.$navMenu = this.$module.querySelector("#super-navigation-menu"), this.$buttons = this.$module.querySelectorAll("button[aria-controls][data-toggle-mobile-group][data-toggle-desktop-group]"), this.hiddenButtons = this.$module.querySelectorAll("button[hidden]")
        }
        var o = {
                label: {
                    hide: "data-text-for-hide",
                    show: "data-text-for-show"
                }
            },
            n = function(e, t) {
                var n = e.getAttribute(o.label[t]);
                n && e.setAttribute("aria-label", n)
            },
            u = function(e, t) {
                e.setAttribute("aria-expanded", !1), e.classList.remove("gem-c-layout-super-navigation-header__open-button"), t.setAttribute("hidden", "hidden"), n(e, "show")
            },
            i = function(e, t) {
                e.setAttribute("aria-expanded", !0), e.classList.add("gem-c-layout-super-navigation-header__open-button"), t.removeAttribute("hidden"), n(e, "hide")
            },
            l = function(e, t) {
                var n = "true" === e.getAttribute("aria-expanded"),
                    o = e.getAttribute("data-tracking-key");
                n ? u(e, t) : i(e, t), window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && o && window.GOVUK.analytics.trackEvent("headerClicked", o + (n ? "Closed" : "Opened"), {
                    label: "none"
                })
            },
            d = function(e, t) {
                return e.tagName.toLowerCase() === t.toLowerCase() ? e : d(e.parentNode, t)
            },
            r = function(e, t) {
                if (null === e) return null;
                if (1 === e.nodeType && e.tagName.toLowerCase() === t.toLowerCase()) return e;
                var n = e.previousElementSibling || e.previousSibling;
                return r(n, t)
            };
        t.prototype.buttonHandler = function(e) {
            for (var t = d(e.target, "button"), n = this.$module.querySelector("#" + t.getAttribute("aria-controls")), o = "data-toggle-desktop-group", i = t.getAttribute(o), r = this.$module.querySelectorAll("[" + o + '="' + i + '"]'), s = 0; s < r.length; s++) {
                var a = r[s];
                if (a !== t) {
                    var c = this.$module.querySelector("#" + a.getAttribute("aria-controls"));
                    u(a, c)
                }
            }
            l(t, n)
        }, t.prototype.handleKeyDown = function(e) {
            var t = 9,
                n = 27,
                o = this.$navMenu.querySelectorAll("li a"),
                i = o[0],
                r = o[o.length - 1],
                s = this.$searchMenu.querySelectorAll("li a, input, button"),
                a = s[s.length - 1];
            if (e.keyCode === t)
                if (this.$navMenu.hasAttribute("hidden")) this.$searchMenu.hasAttribute("hidden") || document.activeElement === a && (e.shiftKey || u(this.$searchToggle, this.$searchMenu));
                else switch (document.activeElement) {
                    case this.$navToggle:
                        e.shiftKey || (e.preventDefault(), i.focus());
                        break;
                    case r:
                        e.shiftKey || (e.preventDefault(), this.$searchToggle.focus(), u(this.$navToggle, this.$navMenu));
                        break;
                    case i:
                        e.shiftKey && (e.preventDefault(), this.$navToggle.focus());
                        break;
                    case this.$searchToggle:
                        e.shiftKey && (e.preventDefault(), r.focus())
                } else e.keyCode === n && (this.$navMenu.hasAttribute("hidden") ? this.$searchMenu.hasAttribute("hidden") || (u(this.$searchToggle, this.$searchMenu), this.$searchToggle.focus()) : (u(this.$navToggle, this.$navMenu), this.$navToggle.focus()))
        }, t.prototype.init = function() {
            this.$module.addEventListener("keydown", this.handleKeyDown.bind(this));
            for (var e = 0; e < this.$buttons.length; e++) {
                this.$buttons[e].addEventListener("click", this.buttonHandler.bind(this), !0)
            }
            for (var t = 0; t < this.hiddenButtons.length; t++) {
                var n = this.hiddenButtons[t];
                n.removeAttribute("hidden");
                var o = r(n, "a");
                o && o.setAttribute("hidden", "hidden")
            }
            this.$module.querySelector(".gem-c-layout-super-navigation-header__search-item-link").setAttribute("hidden", "hidden"), u(this.$searchToggle, this.$searchMenu), this.$module.classList.add("js-module-initialised")
        }, e.SuperNavigationMegaMenu = t
    }(window.GOVUK.Modules),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("GOVUKFrontend.SkipLink", t) : (e.GOVUKFrontend = e.GOVUKFrontend || {}, e.GOVUKFrontend.SkipLink = t())
    }(this, function() {
        "use strict";

        function e(e) {
            if (!(e instanceof HTMLAnchorElement)) return this;
            this.$module = e, this.$linkedElement = null, this.linkedElementListener = !1
        }
        return function() {
                var a, c, u, l;
                "defineProperty" in Object && function() {
                    try {
                        var e = {};
                        return Object.defineProperty(e, "test", {
                            value: 42
                        }), !0
                    } catch (t) {
                        return !1
                    }
                }() || (a = Object.defineProperty, c = Object.prototype.hasOwnProperty("__defineGetter__"), u = "Getters & setters cannot be defined on this javascript engine", l = "A property cannot both have accessors and be writable or have a value", Object.defineProperty = function d(e, t, n) {
                    if (a && (e === window || e === document || e === Element.prototype || e instanceof Element)) return a(e, t, n);
                    if (null === e || !(e instanceof Object || "object" == typeof e)) throw new TypeError("Object.defineProperty called on non-object");
                    if (!(n instanceof Object)) throw new TypeError("Property description must be an object");
                    var o = String(t),
                        i = "value" in n || "writable" in n,
                        r = "get" in n && typeof n.get,
                        s = "set" in n && typeof n.set;
                    if (r) {
                        if ("function" !== r) throw new TypeError("Getter must be a function");
                        if (!c) throw new TypeError(u);
                        if (i) throw new TypeError(l);
                        Object.__defineGetter__.call(e, o, n.get)
                    } else e[o] = n.value;
                    if (s) {
                        if ("function" !== s) throw new TypeError("Setter must be a function");
                        if (!c) throw new TypeError(u);
                        if (i) throw new TypeError(l);
                        Object.__defineSetter__.call(e, o, n.set)
                    }
                    return "value" in n && (e[o] = n.value), e
                })
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function(p) {
                var e, t, n;
                "DOMTokenList" in this && (!("classList" in (e = document.createElement("x"))) || !e.classList.toggle("x", !1) && !e.className) || ("DOMTokenList" in (t = this) && t.DOMTokenList && (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg") || document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList) || (t.DOMTokenList = function() {
                    var i = !0,
                        n = function(e, t, n, o) {
                            Object.defineProperty ? Object.defineProperty(e, t, {
                                configurable: !1 === i || !!o,
                                get: n
                            }) : e.__defineGetter__(t, n)
                        };
                    try {
                        n({}, "support")
                    } catch (e) {
                        i = !1
                    }
                    return function(i, r) {
                        var s = this,
                            a = [],
                            c = {},
                            u = 0,
                            e = 0,
                            t = function(e) {
                                n(s, e, function() {
                                    return d(), a[e]
                                }, !1)
                            },
                            l = function() {
                                if (e <= u)
                                    for (; e < u; ++e) t(e)
                            },
                            d = function() {
                                var e, t, n = arguments,
                                    o = /\s+/;
                                if (n.length)
                                    for (t = 0; t < n.length; ++t)
                                        if (o.test(n[t])) throw (e = new SyntaxError('String "' + n[t] + '" contains an invalid character')).code = 5, e.name = "InvalidCharacterError", e;
                                for ("" === (a = "object" == typeof i[r] ? ("" + i[r].baseVal).replace(/^\s+|\s+$/g, "").split(o) : ("" + i[r]).replace(/^\s+|\s+$/g, "").split(o))[0] && (a = []), c = {}, t = 0; t < a.length; ++t) c[a[t]] = !0;
                                u = a.length, l()
                            };
                        return d(), n(s, "length", function() {
                            return d(), u
                        }), s.toLocaleString = s.toString = function() {
                            return d(), a.join(" ")
                        }, s.item = function(e) {
                            return d(), a[e]
                        }, s.contains = function(e) {
                            return d(), !!c[e]
                        }, s.add = function() {
                            d.apply(s, e = arguments);
                            for (var e, t, n = 0, o = e.length; n < o; ++n) t = e[n], c[t] || (a.push(t), c[t] = !0);
                            u !== a.length && (u = a.length >>> 0, "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "), l())
                        }, s.remove = function() {
                            d.apply(s, e = arguments);
                            for (var e, t = {}, n = 0, o = []; n < e.length; ++n) t[e[n]] = !0, delete c[e[n]];
                            for (n = 0; n < a.length; ++n) t[a[n]] || o.push(a[n]);
                            u = (a = o).length >>> 0, "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "), l()
                        }, s.toggle = function(e, t) {
                            return d.apply(s, [e]), p !== t ? t ? (s.add(e), !0) : (s.remove(e), !1) : c[e] ? (s.remove(e), !1) : (s.add(e), !0)
                        }, s
                    }
                }()), "classList" in (n = document.createElement("span")) && (n.classList.toggle("x", !1), n.classList.contains("x") && (n.classList.constructor.prototype.toggle = function i(e, t) {
                    var n = t;
                    if (n !== p) return this[(n = !!n) ? "add" : "remove"](e), n;
                    var o = !this.contains(e);
                    return this[o ? "add" : "remove"](e), o
                })), function() {
                    var e = document.createElement("span");
                    if ("classList" in e && (e.classList.add("a", "b"), !e.classList.contains("b"))) {
                        var o = e.classList.constructor.prototype.add;
                        e.classList.constructor.prototype.add = function() {
                            for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n])
                        }
                    }
                }(), function() {
                    var e = document.createElement("span");
                    if ("classList" in e && (e.classList.add("a"), e.classList.add("b"), e.classList.remove("a", "b"), e.classList.contains("b"))) {
                        var o = e.classList.constructor.prototype.remove;
                        e.classList.constructor.prototype.remove = function() {
                            for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n])
                        }
                    }
                }())
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Document" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(), this.Document.prototype = document))
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Element" in this && "HTMLElement" in this || function() {
                    function e() {
                        return r-- || clearTimeout(t), !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (u(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype)
                    }
                    if (!window.Element || window.HTMLElement) {
                        window.Element = window.HTMLElement = new Function("return function Element() {}")();
                        var t, n = document.appendChild(document.createElement("body")),
                            o = n.appendChild(document.createElement("iframe")).contentWindow.document,
                            a = Element.prototype = o.appendChild(o.createElement("*")),
                            c = {},
                            u = function(e, t) {
                                var n, o, i, r = e.childNodes || [],
                                    s = -1;
                                if (1 === e.nodeType && e.constructor !== Element)
                                    for (n in e.constructor = Element, c) o = c[n], e[n] = o;
                                for (; i = t && r[++s];) u(i, t);
                                return e
                            },
                            l = document.getElementsByTagName("*"),
                            i = document.createElement,
                            r = 100;
                        a.attachEvent("onpropertychange", function(e) {
                            for (var t, n = e.propertyName, o = !c.hasOwnProperty(n), i = a[n], r = c[n], s = -1; t = l[++s];) 1 === t.nodeType && (o || t[n] === r) && (t[n] = i);
                            c[n] = i
                        }), a.constructor = Element, a.hasAttribute || (a.hasAttribute = function s(e) {
                            return null !== this.getAttribute(e)
                        }), e() || (document.onreadystatechange = e, t = setInterval(e, 25)), document.createElement = function d(e) {
                            var t = i(String(e).toLowerCase());
                            return u(t)
                        }, document.removeChild(n)
                    } else window.HTMLElement = window.Element
                }()
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                var e;
                "document" in this && "classList" in document.documentElement && "Element" in this && "classList" in Element.prototype && ((e = document.createElement("span")).classList.add("a", "b"), e.classList.contains("b")) || function(e) {
                    var l = !0,
                        d = function(e, t, n, o) {
                            Object.defineProperty ? Object.defineProperty(e, t, {
                                configurable: !1 === l || !!o,
                                get: n
                            }) : e.__defineGetter__(t, n)
                        };
                    try {
                        d({}, "support")
                    } catch (t) {
                        l = !1
                    }
                    var p = function(e, c, u) {
                        d(e.prototype, c, function() {
                            var e, t = this,
                                n = "__defineGetter__DEFINE_PROPERTY" + c;
                            if (t[n]) return e;
                            if (!(t[n] = !0) === l) {
                                for (var o, i = p.mirror || document.createElement("div"), r = i.childNodes, s = r.length, a = 0; a < s; ++a)
                                    if (r[a]._R === t) {
                                        o = r[a];
                                        break
                                    } o || (o = i.appendChild(document.createElement("div"))), e = DOMTokenList.call(o, t, u)
                            } else e = new DOMTokenList(t, u);
                            return d(t, c, function() {
                                return e
                            }), delete t[n], e
                        }, !0)
                    };
                    p(e.Element, "classList", "className"), p(e.HTMLElement, "classList", "className"), p(e.HTMLLinkElement, "relList", "rel"), p(e.HTMLAnchorElement, "relList", "rel"), p(e.HTMLAreaElement, "relList", "rel")
                }(this)
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "Window" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function(e) {
                    e.constructor ? e.Window = e.constructor : (e.Window = e.constructor = new Function("return function Window() {}")()).prototype = this
                }(this)
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function(u) {
                (function(e) {
                    if (!("Event" in e)) return !1;
                    if ("function" == typeof e.Event) return !0;
                    try {
                        return new Event("click"), !0
                    } catch (t) {
                        return !1
                    }
                })(this) || function() {
                    function l(e, t) {
                        for (var n = -1, o = e.length; ++n < o;)
                            if (n in e && e[n] === t) return n;
                        return -1
                    }
                    var i = {
                        click: 1,
                        dblclick: 1,
                        keyup: 1,
                        keypress: 1,
                        keydown: 1,
                        mousedown: 1,
                        mouseup: 1,
                        mousemove: 1,
                        mouseover: 1,
                        mouseenter: 1,
                        mouseleave: 1,
                        mouseout: 1,
                        storage: 1,
                        storagecommit: 1,
                        textinput: 1
                    };
                    if ("undefined" != typeof document && "undefined" != typeof window) {
                        var e = window.Event && window.Event.prototype || null;
                        window.Event = Window.prototype.Event = function r(e, t) {
                            if (!e) throw new Error("Not enough arguments");
                            var n;
                            if ("createEvent" in document) {
                                n = document.createEvent("Event");
                                var o = !(!t || t.bubbles === u) && t.bubbles,
                                    i = !(!t || t.cancelable === u) && t.cancelable;
                                return n.initEvent(e, o, i), n
                            }
                            return (n = document.createEventObject()).type = e, n.bubbles = !(!t || t.bubbles === u) && t.bubbles, n.cancelable = !(!t || t.cancelable === u) && t.cancelable, n
                        }, e && Object.defineProperty(window.Event, "prototype", {
                            configurable: !1,
                            enumerable: !1,
                            writable: !0,
                            value: e
                        }), "createEvent" in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(e, t) {
                            var u = this,
                                n = e,
                                o = t;
                            if (u === window && n in i) throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
                            u._events || (u._events = {}), u._events[n] || (u._events[n] = function(e) {
                                var t, n = u._events[e.type].list,
                                    o = n.slice(),
                                    i = -1,
                                    r = o.length;
                                for (e.preventDefault = function s() {
                                        !1 !== e.cancelable && (e.returnValue = !1)
                                    }, e.stopPropagation = function a() {
                                        e.cancelBubble = !0
                                    }, e.stopImmediatePropagation = function c() {
                                        e.cancelBubble = !0, e.cancelImmediate = !0
                                    }, e.currentTarget = u, e.relatedTarget = e.fromElement || null, e.target = e.target || e.srcElement || u, e.timeStamp = (new Date).getTime(), e.clientX && (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop); ++i < r && !e.cancelImmediate;) i in o && -1 !== l(n, t = o[i]) && "function" == typeof t && t.call(u, e)
                            }, u._events[n].list = [], u.attachEvent && u.attachEvent("on" + n, u._events[n])), u._events[n].list.push(o)
                        }, window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(e, t) {
                            var n, o = this,
                                i = e,
                                r = t;
                            o._events && o._events[i] && o._events[i].list && -1 !== (n = l(o._events[i].list, r)) && (o._events[i].list.splice(n, 1), o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]), delete o._events[i]))
                        }, window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(e) {
                            if (!arguments.length) throw new Error("Not enough arguments");
                            if (!e || "string" != typeof e.type) throw new Error("DOM Events Exception 0");
                            var t = this,
                                n = e.type;
                            try {
                                if (!e.bubbles) {
                                    e.cancelBubble = !0;
                                    var o = function(e) {
                                        e.cancelBubble = !0, (t || window).detachEvent("on" + n, o)
                                    };
                                    this.attachEvent("on" + n, o)
                                }
                                this.fireEvent("on" + n, e)
                            } catch (i) {
                                for (e.target = t;
                                    "_events" in (e.currentTarget = t) && "function" == typeof t._events[n] && t._events[n].call(t, e), "function" == typeof t["on" + n] && t["on" + n].call(t, e), (t = 9 === t.nodeType ? t.parentWindow : t.parentNode) && !e.cancelBubble;);
                            }
                            return !0
                        }, document.attachEvent("onreadystatechange", function() {
                            "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded", {
                                bubbles: !0
                            }))
                        }))
                    }
                }()
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
            function() {
                "bind" in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
                    value: function _(t) {
                        var n, e = Array,
                            o = Object,
                            i = o.prototype,
                            r = e.prototype,
                            s = function s() {},
                            a = i.toString,
                            c = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
                            u = Function.prototype.toString,
                            l = function l(e) {
                                try {
                                    return u.call(e), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            d = "[object Function]",
                            p = "[object GeneratorFunction]";
                        n = function n(e) {
                            if ("function" != typeof e) return !1;
                            if (c) return l(e);
                            var t = a.call(e);
                            return t === d || t === p
                        };
                        var m = r.slice,
                            f = r.concat,
                            h = r.push,
                            y = Math.max,
                            v = this;
                        if (!n(v)) throw new TypeError("Function.prototype.bind called on incompatible " + v);
                        for (var w, b = m.call(arguments, 1), g = function() {
                                if (this instanceof w) {
                                    var e = v.apply(this, f.call(b, m.call(arguments)));
                                    return o(e) === e ? e : this
                                }
                                return v.apply(t, f.call(b, m.call(arguments)))
                            }, E = y(0, v.length - b.length), k = [], O = 0; O < E; O++) h.call(k, "$" + O);
                        return w = Function("binder", "return function (" + k.join(",") + "){ return binder.apply(this, arguments); }")(g), v.prototype && (s.prototype = v.prototype, w.prototype = new s, s.prototype = null), w
                    }
                })
            }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), e.prototype.init = function() {
                if (this.$module) {
                    var e = this.getLinkedElement();
                    e && (this.$linkedElement = e, this.$module.addEventListener("click", this.focusLinkedElement.bind(this)))
                }
            }, e.prototype.getLinkedElement = function() {
                var e = this.getFragmentFromUrl();
                return e ? document.getElementById(e) : null
            }, e.prototype.focusLinkedElement = function() {
                var e = this.$linkedElement;
                e.getAttribute("tabindex") || (e.setAttribute("tabindex", "-1"), e.classList.add("govuk-skip-link-focused-element"), this.linkedElementListener || (this.$linkedElement.addEventListener("blur", this.removeFocusProperties.bind(this)), this.linkedElementListener = !0)), e.focus()
            }, e.prototype.removeFocusProperties = function() {
                this.$linkedElement.removeAttribute("tabindex"), this.$linkedElement.classList.remove("govuk-skip-link-focused-element")
            }, e.prototype.getFragmentFromUrl = function() {
                if (this.$module.hash) return this.$module.hash.split("#").pop()
            }, e
    }), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, window.GOVUK.Modules.GovukSkipLink = window.GOVUKFrontend.SkipLink, window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {},
    function(e) {
        function t(e) {
            this.$module = e
        }
        t.prototype.init = function() {
            function n(e) {
                s(e.getAttribute("href"))
            }

            function o(e) {
                var t = parseCookie(GOVUK.getCookie(a)),
                    n = c;
                t && (n = t.version);
                var o = JSON.stringify({
                    count: 999,
                    version: n
                });
                GOVUK.setCookie(a, o, {
                    days: 84
                });
                var i = document.querySelector(".global-bar-additional");
                i && i.classList.remove("global-bar-additional--show");
                var r = document.querySelector(".global-bar__dismiss");
                r && r.classList.remove("global-bar__dismiss--show"), s("Manually dismissed"), e.preventDefault()
            }

            function e(e) {
                e += 1;
                var t = JSON.stringify({
                    count: e,
                    version: c
                });
                GOVUK.setCookie(a, t, {
                    days: 84
                }), 2 === e && s("Automatically dismissed")
            }

            function t() {
                var e = GOVUK.getCookie(a),
                    t = parseInt(parseCookie(e).count, 10);
                return isNaN(t) && (t = 0), t
            }

            function s(e) {
                GOVUK.analytics && "function" == typeof GOVUK.analytics.trackEvent && GOVUK.analytics.trackEvent("Global bar", e, {
                    nonInteraction: 1
                })
            }
            var a = "global_bar_seen",
                i = this.$module.getAttribute("data-global-bar-permanent");
            "false" === i && (i = !1);
            var r = GOVUK.getCookieCategory(a);
            if (GOVUK.getConsentCookie()[r]) {
                null !== GOVUK.getCookie(a) && parseCookie(GOVUK.getCookie(a)).count !== undefined || GOVUK.setCookie("global_bar_seen", JSON.stringify({
                    count: 0,
                    version: 0
                }), {
                    days: 84
                });
                var c = parseCookie(GOVUK.getCookie(a)).version,
                    u = t()
            }
            this.$module.addEventListener("click", function(e) {
                var t = e.target;
                t.classList.contains("dismiss") ? o(e) : t.classList.contains("js-call-to-action") && n(t)
            }), null === this.$module.offsetParent || i || e(u)
        }, e.GlobalBar = t
    }(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {};
var BANNER_VERSION = 8,
    GLOBAL_BAR_SEEN_COOKIE = "global_bar_seen",
    globalBarInit = {
        getBannerVersion: function() {
            return BANNER_VERSION
        },
        getLatestCookie: function() {
            return window.GOVUK.getCookie(GLOBAL_BAR_SEEN_COOKIE)
        },
        urlBlockList: function() {
            var e = ["^/coronavirus/.*$", "^/brexit(.cy)?$", "^/transition-check/.*$", "^/eubusiness(\\..*)?$", "^/account/.*$"],
                t = document.querySelector(".js-call-to-action");
            if (t) {
                var n = "^" + t.getAttribute("href") + "$";
                e.push(n)
            }
            return new RegExp(e.join("|")).test(window.location.pathname)
        },
        setBannerCookie: function() {
            var e, t = window.GOVUK.getCookieCategory(GLOBAL_BAR_SEEN_COOKIE),
                n = GOVUK.getConsentCookie();
            n && n[t] && (e = "/coronavirus" === window.location.pathname ? JSON.stringify({
                count: 999,
                version: globalBarInit.getBannerVersion()
            }) : JSON.stringify({
                count: 0,
                version: globalBarInit.getBannerVersion()
            }), window.GOVUK.setCookie(GLOBAL_BAR_SEEN_COOKIE, e, {
                days: 84
            }))
        },
        makeBannerVisible: function() {
            document.documentElement.className = document.documentElement.className.concat(" show-global-bar")
        },
        init: function() {
            if (globalBarInit.urlBlockList()) null === globalBarInit.getLatestCookie() ? globalBarInit.setBannerCookie() : parseCookie(globalBarInit.getLatestCookie()).version !== globalBarInit.getBannerVersion() && globalBarInit.setBannerCookie();
            else if (null === globalBarInit.getLatestCookie()) globalBarInit.setBannerCookie(), globalBarInit.makeBannerVisible();
            else {
                if (parseCookie(globalBarInit.getLatestCookie()).version !== globalBarInit.getBannerVersion() && globalBarInit.setBannerCookie(), 999 === parseCookie(globalBarInit.getLatestCookie()).count) {
                    var e = document.querySelector(".global-bar-additional");
                    e && e.classList.remove("global-bar-additional--show");
                    var t = document.querySelector(".global-bar__dismiss");
                    t && t.classList.remove("global-bar__dismiss--show")
                }
                globalBarInit.makeBannerVisible()
            }
        }
    };
window.GOVUK.globalBarInit = globalBarInit, window.GOVUK.globalBarInit.init(),
    function() {
        "use strict";
        window.GOVUK = window.GOVUK || {};
        var e = function(e, t) {
                return "<a " + (t = t ? 'class="' + t + '"' : "") + ' href="{{surveyUrl}}" id="take-survey" target="_blank" rel="noopener noreferrer">' + e + "</a>"
            },
            t = function(e) {
                return '<section id="user-satisfaction-survey" class="visible" aria-hidden="false">  <div class="survey-wrapper govuk-width-container" data-module="ga4-auto-tracker" data-ga4-auto=\'' + JSON.stringify({
                    event_data: {
                        event_name: "element_visible",
                        type: "survey banner"
                    }
                }) + '\'>    <a class="govuk-link survey-close-button" href="#user-survey-cancel" aria-labelledby="survey-title user-survey-cancel" id="user-survey-cancel" role="button" data-module="ga4-event-tracker" data-ga4-event=\'' + JSON.stringify({
                    event_name: "select_content",
                    type: "survey banner",
                    action: "closed",
                    section: "{{title}}"
                }) + '\'>Close</a>    <h2 class="survey-title" id="survey-title">{{title}}</h2><div data-module="ga4-link-tracker" data-ga4-track-links-only data-ga4-link=\'' + JSON.stringify({
                    event_name: "navigation",
                    type: "survey banner",
                    index: 1,
                    index_total: 1,
                    section: "{{title}}"
                }) + "'>" + e + "</div>  </div></section>"
            },
            o = t("<p>" + e("{{surveyCta}}", "govuk-link survey-primary-link") + ' <span class="postscript-cta">{{surveyCtaPostscript}}</span></p>'),
            i = t('<div id="email-survey-pre">  <a class="govuk-link survey-primary-link" href="#email-survey-form" id="email-survey-open" rel="noopener noreferrer" role="button" aria-expanded="false">    {{surveyCta}}  </a></div><form id="email-survey-form" action="/contact/govuk/email-survey-signup" method="post" class="js-hidden" aria-hidden="true" data-module="ga4-form-tracker" data-ga4-form=\'' + JSON.stringify({
                event_name: "form_submit",
                type: "survey banner",
                action: "submit",
                section: "{{title}}",
                text: "{{surveyFormCta}}",
                tool_name: "{{title}}"
            }) + '\'>  <div class="survey-inner-wrapper">    <div id="survey-form-description" class="survey-form-description">{{surveyFormDescription}}      <br> {{surveyFormCtaPostscript}}    </div>    <label class="survey-form-label" for="survey-email-address">      Email Address    </label>    <input name="email_survey_signup[survey_id]" type="hidden" value="{{surveyId}}">    <input name="email_survey_signup[survey_source]" type="hidden" value="{{surveySource}}">    <input name="email_survey_signup[ga_client_id]" type="hidden" value="{{gaClientId}}">    <input class="survey-form-input" name="email_survey_signup[email_address]" id="survey-email-address" type="text" aria-describedby="survey-form-description">    <button class="survey-form-button" type="submit">{{surveyFormCta}}</button>' + e("{{surveyFormNoEmailInvite}}") + '  </div></form><div id="email-survey-post-success" class="js-hidden" aria-hidden="true" tabindex="-1">  {{surveySuccess}}</div><div id="email-survey-post-failure" class="js-hidden" aria-hidden="true" tabindex="-1">  {{surveyFailure}}</div>'),
            n = 2,
            r = "(max-width: 800px)",
            l = {
                defaultSurvey: {
                    url: "https://www.smartsurvey.co.uk/s/gov_uk?c={{currentPath}}",
                    identifier: "user_satisfaction_survey",
                    frequency: 6,
                    surveyType: "email"
                },
                smallSurveys: [],
                init: function() {
                    if (l.canShowAnySurvey()) {
                        var e = l.getActiveSurvey(l.defaultSurvey, l.smallSurveys);
                        if (e !== undefined) {
                            var t = document.getElementById("global-bar");
                            t && (t.style.display = "none"), l.displaySurvey(e)
                        }
                    }
                },
                canShowAnySurvey: function() {
                    var e = document.getElementById("user-satisfaction-survey-container");
                    return !l.pathInBlocklist() && (!l.otherNotificationVisible() && (!l.userCompletedTransaction() && !!e))
                },
                processTemplate: function(e, t) {
                    for (var n in e) t = t.replace(new RegExp("{{" + n + "}}", "g"), e[n]);
                    return t
                },
                getUrlSurveyTemplate: function() {
                    return {
                        render: function(e) {
                            var t = {
                                    title: "Tell us what you think of GOV.UK",
                                    surveyCta: "Take the 3 minute survey",
                                    surveyCtaPostscript: "This will open a short survey on another website",
                                    surveyUrl: l.addParamsToURL(l.getSurveyUrl(e))
                                },
                                n = window.GOVUK.extendObject(t, e.templateArgs);
                            return l.processTemplate(n, o)
                        }
                    }
                },
                getEmailSurveyTemplate: function() {
                    return {
                        render: function(e) {
                            var t = {
                                    title: "Tell us what you think of GOV.UK",
                                    surveyCta: "Take a short survey to give us your feedback",
                                    surveyFormDescription: "We\u2019ll send you a link to a feedback form. It only takes 2 minutes to fill in.",
                                    surveyFormCta: "Send me the survey",
                                    surveyFormCtaPostscript: "Don\u2019t worry: we won\u2019t send you spam or share your email address with anyone.",
                                    surveyFormNoEmailInvite: "Don\u2019t have an email address?",
                                    surveySuccess: "Thanks, we\u2019ve sent you an email with a link to the survey.",
                                    surveyFailure: "Sorry, we\u2019re unable to send you an email right now. Please try again later.",
                                    surveyId: e.identifier,
                                    surveySource: l.currentPath(),
                                    surveyUrl: l.addParamsToURL(l.getSurveyUrl(e)),
                                    gaClientId: GOVUK.analytics.gaClientId
                                },
                                n = window.GOVUK.extendObject(t, e.templateArgs);
                            return l.processTemplate(n, i)
                        }
                    }
                },
                getActiveSurveys: function(e) {
                    return e.filter(function(e) {
                        return l.currentTime() >= e.startTime && l.currentTime() <= e.endTime && l.activeWhen(e)
                    })
                },
                getDisplayableSurveys: function(e) {
                    return e.filter(function(e) {
                        return l.isSurveyToBeDisplayed(e)
                    })
                },
                getActiveSurvey: function(e, t) {
                    var n = l.getActiveSurveys(t),
                        o = [e].concat(n),
                        i = l.getDisplayableSurveys(o);
                    return i.length < 2 ? i[0] : i[Math.floor(Math.random() * i.length)]
                },
                displaySurvey: function(e) {
                    var t = document.getElementById("user-satisfaction-survey-container");
                    if ("email" === e.surveyType) l.displayEmailSurvey(e, t);
                    else {
                        if ("url" !== e.surveyType && e.surveyType !== undefined) return;
                        l.displayURLSurvey(e, t)
                    }
                    l.incrementSurveySeenCounter(e), l.trackEvent(e.identifier, "banner_shown", "Banner has been shown")
                },
                displayURLSurvey: function(e, t) {
                    var n = l.getUrlSurveyTemplate();
                    t.innerHTML = n.render(e), window.GOVUK.modules.start(t), l.setURLSurveyEventHandlers(e)
                },
                displayEmailSurvey: function(e, t) {
                    var n = l.getEmailSurveyTemplate();
                    t.innerHTML = n.render(e), window.GOVUK.modules.start(t), l.setEmailSurveyEventHandlers(e)
                },
                addParamsToURL: function(e) {
                    var t = e.replace(/\{\{currentPath\}\}/g, l.currentPath());
                    return -1 !== e.indexOf("?c=") ? t + "&gcl=" + GOVUK.analytics.gaClientId : t + "?gcl=" + GOVUK.analytics.gaClientId
                },
                setEmailSurveyEventHandlers: function(s) {
                    var e = document.getElementById("email-survey-open"),
                        t = document.getElementById("user-survey-cancel"),
                        n = document.getElementById("email-survey-pre"),
                        a = document.getElementById("email-survey-form"),
                        c = document.getElementById("email-survey-post-success"),
                        u = document.getElementById("email-survey-post-failure"),
                        o = document.getElementById("survey-email-address"),
                        i = document.getElementById("take-survey");
                    i && i.addEventListener("click", function() {
                        l.setSurveyTakenCookie(s), l.hideSurvey(s), l.trackEvent(s.identifier, "no_email_link", "User taken survey via no email link")
                    }), e && e.addEventListener("click", function(e) {
                        e.preventDefault(), s.surveyExpanded = !0, l.trackEvent(s.identifier, "email_survey_open", "Email survey opened"), n.classList.add("js-hidden"), n.setAttribute("aria-hidden", "true"), a.classList.remove("js-hidden"), a.setAttribute("aria-hidden", "false"), o.focus(), e.stopPropagation()
                    }), t && t.addEventListener("click", function(e) {
                        l.setSurveyTakenCookie(s), l.hideSurvey(s), s.surveyExpanded ? l.trackEvent(s.identifier, "email_survey_cancel", "Email survey cancelled") : l.trackEvent(s.identifier, "banner_no_thanks", "No thanks clicked"), e.stopPropagation(), e.preventDefault()
                    }), a && a.addEventListener("submit", function(e) {
                        var t = function() {
                                a.classList.add("js-hidden"), a.setAttribute("aria-hidden", "true"), c.classList.remove("js-hidden"), c.setAttribute("aria-hidden", "false"), c.focus(), l.setSurveyTakenCookie(s), l.trackEvent(s.identifier, "email_survey_taken", "Email survey taken"), l.trackEvent(s.identifier, "banner_taken", "User taken survey")
                            },
                            n = function() {
                                a.classList.add("js-hidden"), a.setAttribute("aria-hidden", "true"), u.classList.remove("js-hidden"), u.setAttribute("aria-hidden", "false"), u.focus()
                            },
                            o = a.getAttribute("action");
                        /\.js$/.test(o) || (o += ".js");
                        var i = new XMLHttpRequest,
                            r = new FormData(a);
                        r = new URLSearchParams(r).toString(), i.open("POST", o, !0), i.onreadystatechange = function() {
                            4 === i.readyState && 200 === i.status ? (t(), l.attachGa4FormCompleteElement(a, !1)) : (n(), l.attachGa4FormCompleteElement(a, !0))
                        }, i.send(r), e.stopPropagation(), e.preventDefault()
                    })
                },
                attachGa4FormCompleteElement: function(e, t) {
                    var n = document.getElementById("survey-title").textContent.trim(),
                        o = t ? document.getElementById("email-survey-post-failure") : document.getElementById("email-survey-post-success");
                    o = o.textContent.trim();
                    var i = document.createElement("span");
                    i.setAttribute("data-module", "ga4-auto-tracker"), i.setAttribute("data-ga4-auto", JSON.stringify({
                        event_name: "form_complete",
                        action: "complete",
                        type: "survey banner",
                        text: o,
                        section: n,
                        tool_name: n
                    })), e.appendChild(i), window.GOVUK.modules.start(e)
                },
                setURLSurveyEventHandlers: function(t) {
                    var e = document.getElementById("user-survey-cancel"),
                        n = document.getElementById("take-survey");
                    e && e.addEventListener("click", function(e) {
                        l.setSurveyTakenCookie(t), l.hideSurvey(t), l.trackEvent(t.identifier, "banner_no_thanks", "No thanks clicked"), e.stopPropagation(), e.preventDefault()
                    }), n && n.addEventListener("click", function() {
                        l.setSurveyTakenCookie(t), l.hideSurvey(t), l.trackEvent(t.identifier, "banner_taken", "User taken survey")
                    })
                },
                isSurveyToBeDisplayed: function(e) {
                    return !(l.isBeingViewedOnMobile() && !l.surveyIsAllowedOnMobile(e)) && ("true" !== GOVUK.cookie(l.surveyTakenCookieName(e)) && (!l.surveyHasBeenSeenTooManyTimes(e) && l.randomNumberMatches(e.frequency)))
                },
                pathInBlocklist: function() {
                    return new RegExp("^/(?:" + /service-manual/.source + /|coronavirus/.source + /|account/.source + ")(?:/|$)").test(l.currentPath())
                },
                userCompletedTransaction: function() {
                    function e(e, t) {
                        return -1 < e.indexOf(t)
                    }
                    var t = l.currentPath();
                    if (e(t, "/done") || e(t, "/transaction-finished") || e(t, "/driving-transaction-finished")) return !0
                },
                trackEvent: function(e, t, n) {
                    window.GOVUK.analytics.trackEvent(e, t, {
                        label: n,
                        value: 1,
                        nonInteraction: !0
                    })
                },
                setSurveyTakenCookie: function(e) {
                    window.GOVUK.cookie(l.surveyTakenCookieName(e), !0, {
                        days: 90
                    })
                },
                incrementSurveySeenCounter: function(e) {
                    var t = l.surveySeenCookieName(e),
                        n = l.surveySeenCount(e) + 1,
                        o = l.seenTooManyTimesCooloff(e);
                    o ? window.GOVUK.cookie(t, n, {
                        days: o
                    }) : window.GOVUK.cookie(t, n, {
                        days: 730
                    })
                },
                seenTooManyTimesCooloff: function(e) {
                    return e.seenTooManyTimesCooloff ? a(e.seenTooManyTimesCooloff, undefined, 1) : undefined
                },
                hideSurvey: function() {
                    var e = document.getElementById("user-satisfaction-survey");
                    e.classList.remove("visible"), e.setAttribute("aria-hidden", "true")
                },
                randomNumberMatches: function(e) {
                    return 0 === Math.floor(Math.random() * e)
                },
                getSurveyUrl: function(e) {
                    return e.url instanceof Array ? e.url[Math.floor(Math.random() * e.url.length)] : e.url
                },
                otherNotificationVisible: function() {
                    function e(e) {
                        return null !== e.offsetParent
                    }
                    for (var t = [".emergency-banner", "#taxonomy-survey", "#global-bar"], n = 0, o = 0; o < t.length; o++) {
                        var i = document.querySelector(t[o]);
                        i && e(i) && n++
                    }
                    return 0 < n
                },
                surveyHasBeenSeenTooManyTimes: function(e) {
                    return l.surveySeenCount(e) >= l.surveySeenTooManyTimesLimit(e)
                },
                surveySeenTooManyTimesLimit: function(e) {
                    var t = e.seenTooManyTimesLimit;
                    return "unlimited" === String(t).toLowerCase() ? Infinity : a(t, n, 1)
                },
                surveySeenCount: function(e) {
                    return a(GOVUK.cookie(l.surveySeenCookieName(e)), 0, 0)
                },
                surveyTakenCookieName: function(e) {
                    return s("taken_" + e.identifier)
                },
                surveySeenCookieName: function(e) {
                    return s("survey_seen_" + e.identifier)
                },
                isBeingViewedOnMobile: function() {
                    return window.matchMedia(r).matches
                },
                surveyIsAllowedOnMobile: function(e) {
                    return e.hasOwnProperty("allowedOnMobile") && !0 === e.allowedOnMobile
                },
                pathMatch: function(e) {
                    function t(e) {
                        return /[\^$]/.test(e) ? "(?:" + e + ")" : "(?:/" + e + "(?:/|$))"
                    }
                    if (e === undefined) return !1;
                    for (var n = [], o = 0; o < e.length; o++) n.push(t(e[o]));
                    return (n = new RegExp(n.join("|"))).test(l.currentPath())
                },
                breadcrumbMatch: function(e) {
                    return e !== undefined && new RegExp(e.join("|"), "i").test(l.currentBreadcrumb())
                },
                sectionMatch: function(e) {
                    if (e === undefined) return !1;
                    var t = new RegExp(e.join("|"), "i");
                    return t.test(l.currentSection()) || t.test(l.currentThemes())
                },
                organisationMatch: function(e) {
                    return e !== undefined && new RegExp(e.join("|")).test(l.currentOrganisation())
                },
                tlsCookieMatch: function(e) {
                    var t = l.currentTlsVersion();
                    return e !== undefined && "" !== t && t < e[0]
                },
                activeWhen: function(e) {
                    if (e.hasOwnProperty("activeWhen")) {
                        if (e.activeWhen.hasOwnProperty("path") || e.activeWhen.hasOwnProperty("breadcrumb") || e.activeWhen.hasOwnProperty("section") || e.activeWhen.hasOwnProperty("organisation") || e.activeWhen.hasOwnProperty("tlsCookieVersionLimit")) {
                            var t = e.activeWhen.matchType || "include",
                                n = l.tlsCookieMatch(e.activeWhen.tlsCookieVersionLimit),
                                o = l.pathMatch(e.activeWhen.path),
                                i = l.breadcrumbMatch(e.activeWhen.breadcrumb),
                                r = l.sectionMatch(e.activeWhen.section),
                                s = l.organisationMatch(e.activeWhen.organisation),
                                a = n || o || i || r || s;
                            return "exclude" !== t ? a : !a
                        }
                        return !0
                    }
                    return !0
                },
                currentTime: function() {
                    return (new Date).getTime()
                },
                currentPath: function() {
                    return window.location.pathname
                },
                currentBreadcrumb: function() {
                    var e = document.querySelector(".gem-c-breadcrumbs");
                    return e ? e.textContent : ""
                },
                currentSection: function() {
                    var e = document.querySelector('meta[name="govuk:section"]');
                    return e ? e.getAttribute("content") : ""
                },
                currentThemes: function() {
                    var e = document.querySelector('meta[name="govuk:themes"]');
                    return e ? e.getAttribute("content") : ""
                },
                currentOrganisation: function() {
                    var e = document.querySelector('meta[name="govuk:analytics:organisations"]');
                    return e ? e.getAttribute("content") : ""
                },
                currentTlsVersion: function() {
                    var e = GOVUK.getCookie("TLSversion");
                    return null === e || "unknown" === e ? "" : parseFloat(e.replace("TLSv", "")) || ""
                }
            },
            s = function(e) {
                return "govuk_" + e.replace(/(_\w)/g, function(e) {
                    return e.charAt(1).toUpperCase()
                })
            },
            a = function(e, t, n) {
                var o = parseInt(e, 10);
                return isNaN(o) || o < n ? t : o
            };
        window.GOVUK.userSurveys = l, GOVUK.userSurveys && (GOVUK.analytics && GOVUK.analytics.gaClientId ? window.GOVUK.userSurveys.init() : window.addEventListener("gaClientSet", function() {
            window.GOVUK.userSurveys.init()
        }))
    }();