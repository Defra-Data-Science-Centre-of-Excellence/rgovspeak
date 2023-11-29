
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
window.GOVUK.cookie = function(t, e, n) {
return void 0 !== e ? !1 === e || null === e ? window.GOVUK.setCookie(t, "", {
    days: -1
}) : (void 0 === n && (n = {
    days: 30
}),
window.GOVUK.setCookie(t, e, n)) : window.GOVUK.getCookie(t)
}
,
window.GOVUK.setDefaultConsentCookie = function() {
window.GOVUK.setConsentCookie(i)
}
,
window.GOVUK.approveAllCookieTypes = function() {
var t = {
    essential: !0,
    settings: !0,
    usage: !0,
    campaigns: !0
};
window.GOVUK.setCookie("cookies_policy", JSON.stringify(t), {
    days: 365
})
}
,
window.GOVUK.getConsentCookie = function() {
var t, e = window.GOVUK.cookie("cookies_policy");
if (!e)
    return null;
try {
    t = JSON.parse(e)
} catch (n) {
    return null
}
return "object" != typeof t && null !== t && (t = JSON.parse(t)),
t
}
,
window.GOVUK.setConsentCookie = function(t) {
var e = window.GOVUK.getConsentCookie();
for (var n in e || (e = JSON.parse(JSON.stringify(i))),
t)
    if (e[n] = t[n],
    !t[n])
        for (var o in r)
            r[o] === n && window.GOVUK.deleteCookie(o);
window.GOVUK.setCookie("cookies_policy", JSON.stringify(e), {
    days: 365
})
}
,
window.GOVUK.checkConsentCookieCategory = function(t, e) {
var n = window.GOVUK.getConsentCookie();
if (!n && r[t])
    return !0;
n = window.GOVUK.getConsentCookie();
try {
    return n[e]
} catch (o) {
    return console.error(o),
    !1
}
}
,
window.GOVUK.checkConsentCookie = function(t, e) {
if ("cookies_policy" === t || null === e || !1 === e)
    return !0;
if (t.match("^govuk_surveySeen") || t.match("^govuk_taken"))
    return window.GOVUK.checkConsentCookieCategory(t, "settings");
if (r[t]) {
    var n = r[t];
    return window.GOVUK.checkConsentCookieCategory(t, n)
}
return !1
}
,
window.GOVUK.setCookie = function(t, e, n) {
if (window.GOVUK.checkConsentCookie(t, e)) {
    void 0 === n && (n = {});
    var o = t + "=" + e + "; path=/";
    if (n.days) {
        var i = new Date;
        i.setTime(i.getTime() + 24 * n.days * 60 * 60 * 1e3),
        o = o + "; expires=" + i.toGMTString()
    }
    "https:" === document.location.protocol && (o += "; Secure"),
    document.cookie = o
}
}
,
window.GOVUK.getCookie = function(t) {
for (var e = t + "=", n = document.cookie.split(";"), o = 0, i = n.length; o < i; o++) {
    for (var r = n[o]; " " === r.charAt(0); )
        r = r.substring(1, r.length);
    if (0 === r.indexOf(e))
        return decodeURIComponent(r.substring(e.length))
}
return null
}
,
window.GOVUK.getCookieCategory = function(t) {
return r[t]
}
,
window.GOVUK.deleteCookie = function(t) {
window.GOVUK.cookie(t, null),
window.GOVUK.cookie(t) && (document.cookie = t + "=;expires=" + new Date + ";",
document.cookie = t + "=;expires=" + new Date + ";domain=" + window.location.hostname + ";path=/")
}
,
window.GOVUK.deleteUnconsentedCookies = function() {
var t = window.GOVUK.getConsentCookie();
for (var e in t)
    if (!t[e])
        for (var n in r)
            r[n] === e && window.GOVUK.deleteCookie(n)
}
}(window),
function(t) {
"use strict";
window.GOVUK = window.GOVUK || {},
window.GOVUK.getCurrentLocation = function() {
return t.location
}
}(window),
function() {
"use strict";
window.GOVUK = window.GOVUK || {},
window.GOVUK.extendObject = function(t) {
t = t || {};
for (var e = 1; e < arguments.length; e++)
    if (arguments[e])
        for (var n in arguments[e])
            Object.prototype.hasOwnProperty.call(arguments[e], n) && (t[n] = arguments[e][n]);
return t
}
}(window),
function(t, e) {
"object" == typeof exports && "undefined" != typeof module ? e() : "function" == typeof define && define.amd ? define("GOVUKFrontend", e) : e()
}(0, function() {
"use strict";
(function() {
var a, l, c, u;
"defineProperty"in Object && function() {
    try {
        var t = {};
        return Object.defineProperty(t, "test", {
            value: 42
        }),
        !0
    } catch (e) {
        return !1
    }
}() || (a = Object.defineProperty,
l = Object.prototype.hasOwnProperty("__defineGetter__"),
c = "Getters & setters cannot be defined on this javascript engine",
u = "A property cannot both have accessors and be writable or have a value",
Object.defineProperty = function d(t, e, n) {
    if (a && (t === window || t === document || t === Element.prototype || t instanceof Element))
        return a(t, e, n);
    if (null === t || !(t instanceof Object || "object" == typeof t))
        throw new TypeError("Object.defineProperty called on non-object");
    if (!(n instanceof Object))
        throw new TypeError("Property description must be an object");
    var o = String(e)
      , i = "value"in n || "writable"in n
      , r = "get"in n && typeof n.get
      , s = "set"in n && typeof n.set;
    if (r) {
        if ("function" !== r)
            throw new TypeError("Getter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineGetter__.call(t, o, n.get)
    } else
        t[o] = n.value;
    if (s) {
        if ("function" !== s)
            throw new TypeError("Setter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineSetter__.call(t, o, n.set)
    }
    return "value"in n && (t[o] = n.value),
    t
}
)
}
).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function(p) {
var t, e, n;
"DOMTokenList"in this && (!("classList"in (t = document.createElement("x"))) || !t.classList.toggle("x", !1) && !t.className) || ("DOMTokenList"in (e = this) && e.DOMTokenList && (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg") || document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList) || (e.DOMTokenList = function() {
    var i = !0
      , n = function(t, e, n, o) {
        Object.defineProperty ? Object.defineProperty(t, e, {
            configurable: !1 === i || !!o,
            get: n
        }) : t.__defineGetter__(e, n)
    };
    try {
        n({}, "support")
    } catch (t) {
        i = !1
    }
    return function(i, r) {
        var s = this
          , a = []
          , l = {}
          , c = 0
          , t = 0
          , e = function(t) {
            n(s, t, function() {
                return d(),
                a[t]
            }, !1)
        }
          , u = function() {
            if (t <= c)
                for (; t < c; ++t)
                    e(t)
        }
          , d = function() {
            var t, e, n = arguments, o = /\s+/;
            if (n.length)
                for (e = 0; e < n.length; ++e)
                    if (o.test(n[e]))
                        throw (t = new SyntaxError('String "' + n[e] + '" contains an invalid character')).code = 5,
                        t.name = "InvalidCharacterError",
                        t;
            for ("" === (a = "object" == typeof i[r] ? ("" + i[r].baseVal).replace(/^\s+|\s+$/g, "").split(o) : ("" + i[r]).replace(/^\s+|\s+$/g, "").split(o))[0] && (a = []),
            l = {},
            e = 0; e < a.length; ++e)
                l[a[e]] = !0;
            c = a.length,
            u()
        };
        return d(),
        n(s, "length", function() {
            return d(),
            c
        }),
        s.toLocaleString = s.toString = function() {
            return d(),
            a.join(" ")
        }
        ,
        s.item = function(t) {
            return d(),
            a[t]
        }
        ,
        s.contains = function(t) {
            return d(),
            !!l[t]
        }
        ,
        s.add = function() {
            d.apply(s, t = arguments);
            for (var t, e, n = 0, o = t.length; n < o; ++n)
                e = t[n],
                l[e] || (a.push(e),
                l[e] = !0);
            c !== a.length && (c = a.length >>> 0,
            "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "),
            u())
        }
        ,
        s.remove = function() {
            d.apply(s, t = arguments);
            for (var t, e = {}, n = 0, o = []; n < t.length; ++n)
                e[t[n]] = !0,
                delete l[t[n]];
            for (n = 0; n < a.length; ++n)
                e[a[n]] || o.push(a[n]);
            c = (a = o).length >>> 0,
            "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "),
            u()
        }
        ,
        s.toggle = function(t, e) {
            return d.apply(s, [t]),
            p !== e ? e ? (s.add(t),
            !0) : (s.remove(t),
            !1) : l[t] ? (s.remove(t),
            !1) : (s.add(t),
            !0)
        }
        ,
        s
    }
}()),
"classList"in (n = document.createElement("span")) && (n.classList.toggle("x", !1),
n.classList.contains("x") && (n.classList.constructor.prototype.toggle = function i(t, e) {
    var n = e;
    if (n !== p)
        return this[(n = !!n) ? "add" : "remove"](t),
        n;
    var o = !this.contains(t);
    return this[o ? "add" : "remove"](t),
    o
}
)),
function() {
    var t = document.createElement("span");
    if ("classList"in t && (t.classList.add("a", "b"),
    !t.classList.contains("b"))) {
        var o = t.classList.constructor.prototype.add;
        t.classList.constructor.prototype.add = function() {
            for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                o.call(this, t[n])
        }
    }
}(),
function() {
    var t = document.createElement("span");
    if ("classList"in t && (t.classList.add("a"),
    t.classList.add("b"),
    t.classList.remove("a", "b"),
    t.classList.contains("b"))) {
        var o = t.classList.constructor.prototype.remove;
        t.classList.constructor.prototype.remove = function() {
            for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                o.call(this, t[n])
        }
    }
}())
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Document"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(),
this.Document.prototype = document))
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Element"in this && "HTMLElement"in this || function() {
    function t() {
        return r-- || clearTimeout(e),
        !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (c(document, !0),
        e && document.body.prototype && clearTimeout(e),
        !!document.body.prototype)
    }
    if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();
        var e, n = document.appendChild(document.createElement("body")), o = n.appendChild(document.createElement("iframe")).contentWindow.document, a = Element.prototype = o.appendChild(o.createElement("*")), l = {}, c = function(t, e) {
            var n, o, i, r = t.childNodes || [], s = -1;
            if (1 === t.nodeType && t.constructor !== Element)
                for (n in t.constructor = Element,
                l)
                    o = l[n],
                    t[n] = o;
            for (; i = e && r[++s]; )
                c(i, e);
            return t
        }, u = document.getElementsByTagName("*"), i = document.createElement, r = 100;
        a.attachEvent("onpropertychange", function(t) {
            for (var e, n = t.propertyName, o = !l.hasOwnProperty(n), i = a[n], r = l[n], s = -1; e = u[++s]; )
                1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
            l[n] = i
        }),
        a.constructor = Element,
        a.hasAttribute || (a.hasAttribute = function s(t) {
            return null !== this.getAttribute(t)
        }
        ),
        t() || (document.onreadystatechange = t,
        e = setInterval(t, 25)),
        document.createElement = function d(t) {
            var e = i(String(t).toLowerCase());
            return c(e)
        }
        ,
        document.removeChild(n)
    } else
        window.HTMLElement = window.Element
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
var t;
"document"in this && "classList"in document.documentElement && "Element"in this && "classList"in Element.prototype && ((t = document.createElement("span")).classList.add("a", "b"),
t.classList.contains("b")) || function(t) {
    var u = !0
      , d = function(t, e, n, o) {
        Object.defineProperty ? Object.defineProperty(t, e, {
            configurable: !1 === u || !!o,
            get: n
        }) : t.__defineGetter__(e, n)
    };
    try {
        d({}, "support")
    } catch (e) {
        u = !1
    }
    var p = function(t, l, c) {
        d(t.prototype, l, function() {
            var t, e = this, n = "__defineGetter__DEFINE_PROPERTY" + l;
            if (e[n])
                return t;
            if (!(e[n] = !0) === u) {
                for (var o, i = p.mirror || document.createElement("div"), r = i.childNodes, s = r.length, a = 0; a < s; ++a)
                    if (r[a]._R === e) {
                        o = r[a];
                        break
                    }
                o || (o = i.appendChild(document.createElement("div"))),
                t = DOMTokenList.call(o, e, c)
            } else
                t = new DOMTokenList(e,c);
            return d(e, l, function() {
                return t
            }),
            delete e[n],
            t
        }, !0)
    };
    p(t.Element, "classList", "className"),
    p(t.HTMLElement, "classList", "className"),
    p(t.HTMLLinkElement, "relList", "rel"),
    p(t.HTMLAnchorElement, "relList", "rel"),
    p(t.HTMLAreaElement, "relList", "rel")
}(this)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {})
}),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t, e) {
for (var n in this.$table = t,
this.options = {
    outOf: 65,
    applyOnInit: !0,
    autoOutdent: !1,
    outdentAll: !1,
    chartVisibleText: "Change to table and accessible view",
    tableVisibleText: "Change to chart view",
    chartAlertText: "Chart visible",
    tableAlertText: "Table visible",
    toggleAfter: !1,
    returnReference: !1
},
e)
    this.options[n] = e[n]
}
e.prototype.init = function() {
(this.detectIEVersion(),
this.ENABLED = !(this.ie && this.ie < 8),
this.$graphContainer = document.createElement("div"),
this.$graphContainer.className = "mc-chart-container",
this.$graph = document.createElement("div"),
this.$graph.setAttribute("aria-hidden", "true"),
this.$graph.setAttribute("class", this.$table.className),
this.$graph.classList.add("mc-chart"),
this.chartId = this.getChartId(),
this.options.stacked = this.$table.classList.contains("mc-stacked"),
this.options.stacked) && (0 === this.$table.querySelectorAll("thead th").length && (this.ENABLED = !1));
this.options.negative = this.$table.classList.contains("mc-negative");
var t = 2 < this.$table.querySelectorAll("tbody tr")[0].querySelectorAll("th, td").length;
if (this.options.multiple = !this.options.stacked && (this.$table.classList.contains("mc-multiple") || t),
this.options.autoOutdent = this.options.autoOutdent || this.$table.classList.contains("mc-auto-outdent"),
this.options.outdentAll = this.options.outdentAll || this.$table.classList.contains("mc-outdented"),
this.options.multiple && this.$graph.classList.add("mc-multiple"),
this.options.hasCaption = !!this.$table.querySelectorAll("caption").length,
this.ENABLED && (this.apply(),
this.options.applyOnInit || this.toggleLink.click()),
this.options.returnReference)
    return this
}
,
e.prototype.detectIEVersion = function() {
this.ie = function() {
    for (var t, e = 3, n = document.createElement("div"), o = n.getElementsByTagName("i"); n.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->",
    e < 10 && o[0]; )
        ;
    return 4 < e ? e : t
}()
}
,
e.prototype.apply = function() {
if (this.ENABLED)
    try {
        this.constructChart(),
        this.addClassesToHeader(),
        this.applyWidths(),
        this.insert(),
        this.$table.classList.add("mc-hidden"),
        this.applyOutdent()
    } catch (t) {
        console.error("MagnaCharta error:", t)
    }
}
,
e.prototype.construct = {},
e.prototype.construct.thead = function() {
var t = document.createElement("div");
t.classList.add("mc-thead");
var e = document.createElement("div");
e.classList.add("mc-tr");
for (var n = "", o = this.$table.querySelectorAll("thead th"), i = 0; i < o.length; i++)
    n += '<div class="mc-th">',
    n += o[i].innerHTML,
    n += "</div>";
return e.innerHTML = n,
t.appendChild(e),
t
}
,
e.prototype.construct.tbody = function() {
var t = document.createElement("div");
t.classList.add("mc-tbody");
for (var e = this.$table.querySelectorAll("tbody tr"), n = 0; n < e.length; n++) {
    var o = document.createElement("div");
    o.classList.add("mc-tr");
    for (var i = "", r = e[n].querySelectorAll("th, td"), s = 0; s < r.length; s++)
        i += '<div class="mc-td">',
        i += r[s].innerHTML,
        i += "</div>";
    o.innerHTML = i,
    t.appendChild(o)
}
return t
}
,
e.prototype.construct.caption = function() {
return this.$table.querySelector("caption").cloneNode(!0)
}
,
e.prototype.construct.toggleLink = function(t) {
var e = document.createElement("button")
  , n = document.createElement("span")
  , o = document.createElement("span");
return n.classList.add("mc-toggle-text"),
n.innerHTML = t,
o.classList.add("govuk-visually-hidden", "mc-toggle-status"),
o.setAttribute("role", "alert"),
e.classList.add("govuk-body-s", "mc-toggle-button"),
e.appendChild(n),
e.appendChild(o),
e
}
,
e.prototype.addToggleClick = function(o, i, r, s) {
var a = this;
this.toggleLink.addEventListener("click", function(t) {
    t.preventDefault();
    var e = a.toggleLink.querySelector(".mc-toggle-text")
      , n = a.toggleLink.querySelector(".mc-toggle-status");
    a.$graphContainer.classList.toggle("mc-hidden"),
    a.$table.classList.toggle("mc-hidden"),
    e.innerHTML = e.innerHTML === i ? o : i,
    n.innerHTML = n.innerHTML === s ? r : s
})
}
,
e.prototype.constructChart = function() {
var t = this.construct.thead.call(this)
  , e = this.construct.tbody.call(this);
if (this.toggleLink = this.construct.toggleLink(this.options.chartVisibleText),
this.addToggleClick(this.options.chartVisibleText, this.options.tableVisibleText, this.options.chartAlertText, this.options.tableAlertText),
this.options.hasCaption) {
    var n = this.construct.caption.call(this);
    this.$graph.appendChild(n)
}
this.options.toggleAfter ? this.$table.insertAdjacentElement("afterend", this.toggleLink) : this.$table.insertAdjacentElement("beforebegin", this.toggleLink),
this.$graph.appendChild(t),
this.$graph.appendChild(e)
}
,
e.prototype.utils = {
isFloat: function(t) {
    return !isNaN(parseFloat(t))
},
stripValue: function(t) {
    return t.replace(/,|\xa3|%|[a-z]/gi, "")
},
returnMax: function(t) {
    for (var e = 0, n = 0; n < t.length; n++)
        t[n] > e && (e = t[n]);
    return e
},
isNegative: function(t) {
    return t < 0
}
},
e.prototype.addClassesToHeader = function() {
var t = this.$graph.querySelectorAll(".mc-th")
  , e = t.length;
this.options.stacked && (t[e - 1].classList.add("mc-stacked-header", "mc-header-total"),
e -= 1);
for (var n = 1; n < e; n++)
    t[n].classList.add("mc-key-header"),
    t[n].classList.contains("mc-stacked-header") || t[n].classList.add("mc-key-" + n)
}
,
e.prototype.calculateMaxWidth = function() {
for (var t = [], e = 0, n = this.$graph.querySelectorAll(".mc-tr"), o = 0; o < n.length; o++) {
    for (var i = n[o], r = i.querySelectorAll(".mc-td"), s = [], a = 1; a < r.length; a++)
        s.push(r[a]);
    var l = s.length;
    if (l) {
        this.options.stacked && (s[l - 1].classList.add("mc-stacked-total"),
        l -= 1);
        var c = i.querySelector(".mc-td");
        c && c.classList.add("mc-key-cell");
        for (var u = 0, d = 0; d < l; d++) {
            var p = s[d];
            p.classList.add("mc-bar-cell"),
            p.classList.add("mc-bar-" + (d + 1));
            var h = this.utils.stripValue(p.innerText);
            if (this.utils.isFloat(h)) {
                var f = parseFloat(h, 10)
                  , m = Math.abs(f);
                0 === f && p.classList.add("mc-bar-zero"),
                this.options.negative && (this.utils.isNegative(f) ? (p.classList.add("mc-bar-negative"),
                e < m && (e = m)) : p.classList.add("mc-bar-positive")),
                f = m,
                this.options.stacked ? u += f : (u = f,
                t.push(f))
            }
        }
    }
    this.options.stacked && t.push(u)
}
var w = {};
return w.max = parseFloat(this.utils.returnMax(t), 10),
w.single = parseFloat(this.options.outOf / w.max, 10),
this.options.negative && (w.marginLeft = parseFloat(e, 10) * w.single,
w.maxNegative = parseFloat(e, 10)),
w
}
,
e.prototype.applyWidths = function() {
this.dimensions = this.calculateMaxWidth();
for (var t = this.$graph.querySelectorAll(".mc-tr"), e = 0; e < t.length; e++)
    for (var n = t[e].querySelectorAll(".mc-bar-cell"), o = 0; o < n.length; o++) {
        var i = n[o]
          , r = parseFloat(this.utils.stripValue(i.innerText), 10)
          , s = r * this.dimensions.single
          , a = Math.abs(r)
          , l = Math.abs(s);
        if (this.options.negative)
            if (i.classList.contains("mc-bar-positive"))
                i.style.marginLeft = this.dimensions.marginLeft + "%";
            else if (a < this.dimensions.maxNegative) {
                var c = (this.dimensions.maxNegative - a) * this.dimensions.single;
                i.style.marginLeft = c + "%"
            }
        i.innerHTML = "<span>" + i.innerHTML + "</span>",
        i.style.width = l + "%"
    }
}
,
e.prototype.insert = function() {
var t = document.createElement("span")
  , e = "mc-chart-not-accessible-" + this.chartId;
t.innerHTML = "This content is not accessible - switch to table",
t.className = "mc-hidden",
t.id = e,
this.$graphContainer.setAttribute("aria-labelledby", e),
this.$graphContainer.appendChild(this.$graph),
this.$graphContainer.appendChild(t),
this.$table.insertAdjacentElement("afterend", this.$graphContainer)
}
,
e.prototype.applyOutdent = function() {
for (var t = this.$graph.querySelectorAll(".mc-bar-cell"), e = 0; e < t.length; e++) {
    var n = t[e]
      , o = parseFloat(this.utils.stripValue(n.innerText), 10)
      , i = n.querySelector("span")
      , r = n.querySelector("span").offsetWidth + 5
      , s = n.offsetWidth;
    this.options.stacked ? (s < r && 0 < o || o < 1) && n.classList.add("mc-value-overflow") : (0 === o && n.classList.add("mc-bar-outdented"),
    this.options.autoOutdent && s <= r || this.options.outdentAll ? (n.classList.add("mc-bar-outdented"),
    i.style.marginLeft = "100%",
    i.style.display = "inline-block") : n.classList.add("mc-bar-indented"))
}
}
,
e.prototype.getChartId = function() {
for (var t = document.querySelectorAll("table.js-barchart-table"), e = null, n = 0; n < t.length; n++)
    t[n] === this.$table && (e = n);
return e
}
,
t.MagnaCharta = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
function(s) {
"use strict";
var t = function(t) {
this.$element = t
};
t.prototype.init = function() {
for (var t = this.$element.querySelectorAll(".js-barchart-table"), e = [], n = 0; n < t.length; n++) {
    var o = t[n].className;
    -1 === o.indexOf("mc-chart") && -1 === o.indexOf("js-barchart-table-init") && e.push(t[n])
}
for (var i = 0; i < e.length; i++) {
    var r = e[i];
    new s.Modules.MagnaCharta(r,{
        toggleText: "Change between chart and table"
    }).init(),
    r.className = r.className + " js-barchart-table-init"
}
}
,
s.GovspeakBarchartEnhancement = t
}(window.GOVUK),
function() {
"use strict";
window.GOVUK = window.GOVUK || {};
var t = window.GOVUK || {}
, l = function(t, e) {
this.$element = t,
this.$classOverride = void 0 !== e ? e : "gem-c-govspeak__youtube-video"
};
l.prototype.init = function() {
if (!this.campaignCookiesAllowed())
    return this.startModule = this.startModule.bind(this),
    void window.addEventListener("cookie-consent", this.startModule);
this.startModule()
}
,
l.prototype.startModule = function() {
window.removeEventListener("cookie-consent", this.startModule);
var t = this.$element.querySelectorAll('a[href*="youtube.com"], a[href*="youtu.be"]');
0 < t.length && l.insertApiScript();
for (var e = 0; e < t.length; ++e) {
    var n = t[e]
      , o = n.getAttribute("href")
      , i = n.hasAttribute("data-youtube-player-analytics")
      , r = {
        link: n
    };
    if (i && (r.tracking = {
        hasTracking: i,
        category: n.getAttribute("data-youtube-player-analytics-category")
    }),
    0 <= o.indexOf("/live_stream")) {
        var s = l.parseLivestream(o);
        !this.hasDisabledEmbed(n) && s && (r.channel = s,
        this.setupVideo(r))
    } else {
        var a = l.parseVideoId(o);
        !this.hasDisabledEmbed(n) && a && (r.videoId = a,
        this.setupVideo(r))
    }
}
}
,
l.prototype.hasDisabledEmbed = function(t) {
return "off" === t.getAttribute("data-youtube-player")
}
,
l.prototype.setupVideo = function(t) {
var e = l.nextId()
  , n = t.link
  , o = t.videoId ? t.videoId : t.channel
  , i = n.parentNode
  , r = i.parentNode
  , s = document.createElement("div");
s.className += this.$classOverride,
s.innerHTML = '<span id="' + e + '" data-video-id="' + o + '"></span>',
t.title = n.textContent,
r.replaceChild(s, i),
this.insertVideo(e, t)
}
,
l.prototype.insertVideo = function(t, r) {
var e = ""
  , n = "";
r.channel ? (e = r.channel,
n = "live_stream") : n = r.videoId;
var o = function() {
    new window.YT.Player(t,{
        videoId: n,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
            enablejsapi: 1,
            origin: window.location.origin,
            rel: 0,
            disablekb: 1,
            modestbranding: 1,
            channel: e
        },
        events: {
            onReady: function(t) {
                var e = r.title;
                t.target.getIframe().title = e + " (video)",
                window.GOVUK.analyticsGa4.analyticsModules.VideoTracker && window.GOVUK.analyticsGa4.analyticsModules.VideoTracker.configureVideo(t)
            },
            onStateChange: function(t) {
                var e = t.data
                  , n = t.target
                  , o = {
                    "-1": "VideoUnstarted",
                    0: "VideoEnded",
                    1: "VideoPlaying",
                    2: "VideoPaused",
                    3: "VideoBuffering",
                    5: "VideoCued"
                };
                if (o[e] && r.tracking && r.tracking.hasTracking && window.GOVUK.analytics && window.GOVUK.analytics.trackEvent) {
                    var i = {
                        category: r.tracking.category,
                        action: o[e],
                        label: {
                            transport: "beacon",
                            label: n.getVideoData && n.getVideoData().title
                        }
                    };
                    window.GOVUK.analytics.trackEvent(i.category, i.action, i.label)
                }
                window.GOVUK.analyticsGa4.analyticsModules.VideoTracker && window.GOVUK.analyticsGa4.analyticsModules.VideoTracker.trackVideo(t, o[e])
            }
        }
    })
};
o = o.bind(this),
l.playerApiReady ? o.call() : l.queuedInserts.push(o)
}
,
l.prototype.campaignCookiesAllowed = function() {
var t = window.GOVUK.getConsentCookie();
return null === t || t.campaigns
}
,
l.nextId = function() {
return this.embedCount = this.embedCount || 0,
this.embedCount += 1,
"youtube-" + this.embedCount
}
,
l.insertApiScript = function() {
if (!this.apiScriptInserted) {
    var t = document.createElement("script");
    t.src = "https://www.youtube.com/player_api";
    var e = document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(t, e),
    this.apiScriptInserted = !0
}
}
,
l.parseLivestream = function(t) {
var e = t.match(/channel=([^&]*)/);
if (e)
    return e[1]
}
,
l.parseVideoId = function(t) {
var e;
if (-1 < t.indexOf("youtube.com")) {
    var n = {};
    if (1 === (e = t.split("?")).length)
        return;
    e = e[1].split("&");
    for (var o = 0; o < e.length; o++) {
        var i = e[o].split("=");
        n[i[0]] = i[1]
    }
    return n.v
}
if (-1 < t.indexOf("youtu.be"))
    return (e = t.split("/")).pop()
}
,
l.apiScriptInserted = !1,
l.playerApiReady = !1,
l.queuedInserts = [],
window.onYouTubePlayerAPIReady = function() {
l.playerApiReady = !0;
for (var t = 0; t < l.queuedInserts.length; t++)
    l.queuedInserts[t].call()
}
,
t.GovspeakYoutubeLinkEnhancement = l
}(),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t
}
e.prototype.init = function() {
this.$module.focus()
}
,
t.InitialFocus = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t
}
e.prototype.init = function() {
this.toggleTarget = this.$module.querySelector(".js-class-toggle"),
this.$module.addFocusClass = this.addFocusClass.bind(this),
this.$module.removeFocusClassFromEmptyInput = this.removeFocusClassFromEmptyInput.bind(this),
this.inputIsEmpty() || this.addFocusClass(),
this.toggleTarget.addEventListener("focus", this.$module.addFocusClass),
this.toggleTarget.addEventListener("blur", this.$module.removeFocusClassFromEmptyInput)
}
,
e.prototype.inputIsEmpty = function() {
return "" === this.toggleTarget.value
}
,
e.prototype.addFocusClass = function() {
this.toggleTarget.classList.add("focus")
}
,
e.prototype.removeFocusClassFromEmptyInput = function() {
this.inputIsEmpty() && this.toggleTarget.classList.remove("focus")
}
,
t.GemToggleInputClassOnFocus = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t
}
e.prototype.init = function() {
this.$module.toggleTrigger = this.$module.querySelector("[data-controls][data-expanded]"),
this.$module.toggleTrigger && (this.$module.toggleClass = this.$module.getAttribute("data-toggle-class") || "js-hidden",
this.$module.isTrackable = this.$module.toggleTrigger.hasAttribute("data-track-category") && this.$module.toggleTrigger.hasAttribute("data-track-action"),
this.$module.isTrackable && (this.$module.trackCategory = this.$module.toggleTrigger.getAttribute("data-track-category"),
this.$module.trackAction = this.$module.toggleTrigger.getAttribute("data-track-action")),
this.addAriaAttrs(),
this.toggleOnClick())
}
,
e.prototype.addAriaAttrs = function() {
this.$module.toggleTrigger.setAttribute("role", "button"),
this.$module.toggleTrigger.setAttribute("aria-controls", this.$module.toggleTrigger.getAttribute("data-controls")),
this.$module.toggleTrigger.setAttribute("aria-expanded", this.$module.toggleTrigger.getAttribute("data-expanded")),
this.$module.targets = this.getTargetElements();
for (var t = 0; t < this.$module.targets.length; t++)
    this.$module.targets[t].setAttribute("aria-live", "polite"),
    this.$module.targets[t].setAttribute("role", "region")
}
,
e.prototype.getTargetElements = function() {
var t = "#" + this.$module.toggleTrigger.getAttribute("aria-controls").split(" ").join(", #");
return this.$module.querySelectorAll(t)
}
,
e.prototype.toggleOnClick = function() {
var i = this;
this.$module.toggleTrigger.addEventListener("click", function(t) {
    if (t.preventDefault(),
    "true" === this.getAttribute("aria-expanded")) {
        this.setAttribute("aria-expanded", !1);
        for (var e = 0; e < i.$module.targets.length; e++)
            i.$module.targets[e].classList.add(i.$module.toggleClass)
    } else {
        this.setAttribute("aria-expanded", !0);
        for (var n = 0; n < i.$module.targets.length; n++)
            i.$module.targets[n].classList.remove(i.$module.toggleClass)
    }
    var o = this.getAttribute("data-toggled-text");
    "string" == typeof o && (this.setAttribute("data-toggled-text", this.innerText),
    this.innerText = o),
    window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && i.$module.isTrackable && i.track()
})
}
,
e.prototype.track = function() {
var t = {
    label: this.$module.toggleTrigger.getAttribute("data-toggled-text") || this.$module.toggleTrigger.innerText
};
window.GOVUK.analytics.trackEvent(this.$module.trackCategory, this.$module.trackAction, t)
}
,
t.GemToggle = e
}(window.GOVUK.Modules),
function() {
"use strict";
window.GOVUK = window.GOVUK || {},
window.GOVUK.triggerEvent = function(t, e, n) {
var o, i = n || {}, r = i.keyCode;
Object.prototype.hasOwnProperty.call(i, "bubbles") || (i.bubbles = !0),
Object.prototype.hasOwnProperty.call(i, "cancelable") || (i.cancelable = !0),
"function" == typeof window.CustomEvent ? o = new window.CustomEvent(e,i) : (o = document.createEvent("CustomEvent")).initCustomEvent(e, i.bubbles, i.cancelable, i.detail),
r && (o.keyCode = r),
t.dispatchEvent(o)
}
}(window),
function(t, e) {
"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("GOVUKFrontend.Accordion", e) : (t.GOVUKFrontend = t.GOVUKFrontend || {},
t.GOVUKFrontend.Accordion = e())
}(this, function() {
"use strict";
function i(t, e) {
if (window.NodeList.prototype.forEach)
    return t.forEach(e);
for (var n = 0; n < t.length; n++)
    e.call(window, t[n], n, t)
}
function r() {
for (var t = function(t) {
    var r = {}
      , s = function(t, e) {
        for (var n in t)
            if (Object.prototype.hasOwnProperty.call(t, n)) {
                var o = t[n]
                  , i = e ? e + "." + n : n;
                "object" == typeof o ? s(o, i) : r[i] = o
            }
    };
    return s(t),
    r
}, e = {}, n = 0; n < arguments.length; n++) {
    var o = t(arguments[n]);
    for (var i in o)
        Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
}
return e
}
function s(t, e) {
if (!t || "object" != typeof t)
    throw new Error('Provide a `configObject` of type "object".');
if (!e || "string" != typeof e)
    throw new Error('Provide a `namespace` of type "string" to filter the `configObject` by.');
var n = {};
for (var o in t) {
    var i = o.split(".");
    if (Object.prototype.hasOwnProperty.call(t, o) && i[0] === e)
        1 < i.length && i.shift(),
        n[i.join(".")] = t[o]
}
return n
}
function o(t) {
if ("string" != typeof t)
    return t;
var e = t.trim();
return "true" === e || "false" !== e && (0 < e.length && isFinite(Number(e)) ? Number(e) : t)
}
function a(t) {
var e = {};
for (var n in t)
    e[n] = o(t[n]);
return e
}
function l(t, e) {
this.translations = t || {},
this.locale = e && e.locale || document.documentElement.lang || "en"
}
function t(t, e) {
if (!(t instanceof HTMLElement))
    return this;
this.$module = t;
var n = {
    i18n: c,
    rememberExpanded: !0
};
this.config = r(n, e || {}, a(t.dataset)),
this.i18n = new l(s(this.config, "i18n")),
this.controlsClass = "govuk-accordion__controls",
this.showAllClass = "govuk-accordion__show-all",
this.showAllTextClass = "govuk-accordion__show-all-text",
this.sectionClass = "govuk-accordion__section",
this.sectionExpandedClass = "govuk-accordion__section--expanded",
this.sectionButtonClass = "govuk-accordion__section-button",
this.sectionHeaderClass = "govuk-accordion__section-header",
this.sectionHeadingClass = "govuk-accordion__section-heading",
this.sectionHeadingDividerClass = "govuk-accordion__section-heading-divider",
this.sectionHeadingTextClass = "govuk-accordion__section-heading-text",
this.sectionHeadingTextFocusClass = "govuk-accordion__section-heading-text-focus",
this.sectionShowHideToggleClass = "govuk-accordion__section-toggle",
this.sectionShowHideToggleFocusClass = "govuk-accordion__section-toggle-focus",
this.sectionShowHideTextClass = "govuk-accordion__section-toggle-text",
this.upChevronIconClass = "govuk-accordion-nav__chevron",
this.downChevronIconClass = "govuk-accordion-nav__chevron--down",
this.sectionSummaryClass = "govuk-accordion__section-summary",
this.sectionSummaryFocusClass = "govuk-accordion__section-summary-focus",
this.sectionContentClass = "govuk-accordion__section-content";
var o = this.$module.querySelectorAll("." + this.sectionClass);
if (!o.length)
    return this;
this.$sections = o,
this.browserSupportsSessionStorage = u.checkForSessionStorage(),
this.$showAllButton = null,
this.$showAllIcon = null,
this.$showAllText = null
}
(function() {
var a, l, c, u;
"defineProperty"in Object && function() {
    try {
        var t = {};
        return Object.defineProperty(t, "test", {
            value: 42
        }),
        !0
    } catch (e) {
        return !1
    }
}() || (a = Object.defineProperty,
l = Object.prototype.hasOwnProperty("__defineGetter__"),
c = "Getters & setters cannot be defined on this javascript engine",
u = "A property cannot both have accessors and be writable or have a value",
Object.defineProperty = function d(t, e, n) {
    if (a && (t === window || t === document || t === Element.prototype || t instanceof Element))
        return a(t, e, n);
    if (null === t || !(t instanceof Object || "object" == typeof t))
        throw new TypeError("Object.defineProperty called on non-object");
    if (!(n instanceof Object))
        throw new TypeError("Property description must be an object");
    var o = String(e)
      , i = "value"in n || "writable"in n
      , r = "get"in n && typeof n.get
      , s = "set"in n && typeof n.set;
    if (r) {
        if ("function" !== r)
            throw new TypeError("Getter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineGetter__.call(t, o, n.get)
    } else
        t[o] = n.value;
    if (s) {
        if ("function" !== s)
            throw new TypeError("Setter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineSetter__.call(t, o, n.set)
    }
    return "value"in n && (t[o] = n.value),
    t
}
)
}
).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Document"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(),
this.Document.prototype = document))
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Element"in this && "HTMLElement"in this || function() {
    function t() {
        return r-- || clearTimeout(e),
        !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (c(document, !0),
        e && document.body.prototype && clearTimeout(e),
        !!document.body.prototype)
    }
    if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();
        var e, n = document.appendChild(document.createElement("body")), o = n.appendChild(document.createElement("iframe")).contentWindow.document, a = Element.prototype = o.appendChild(o.createElement("*")), l = {}, c = function(t, e) {
            var n, o, i, r = t.childNodes || [], s = -1;
            if (1 === t.nodeType && t.constructor !== Element)
                for (n in t.constructor = Element,
                l)
                    o = l[n],
                    t[n] = o;
            for (; i = e && r[++s]; )
                c(i, e);
            return t
        }, u = document.getElementsByTagName("*"), i = document.createElement, r = 100;
        a.attachEvent("onpropertychange", function(t) {
            for (var e, n = t.propertyName, o = !l.hasOwnProperty(n), i = a[n], r = l[n], s = -1; e = u[++s]; )
                1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
            l[n] = i
        }),
        a.constructor = Element,
        a.hasAttribute || (a.hasAttribute = function s(t) {
            return null !== this.getAttribute(t)
        }
        ),
        t() || (document.onreadystatechange = t,
        e = setInterval(t, 25)),
        document.createElement = function d(t) {
            var e = i(String(t).toLowerCase());
            return c(e)
        }
        ,
        document.removeChild(n)
    } else
        window.HTMLElement = window.Element
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
(function() {
    if (!document.documentElement.dataset)
        return !1;
    var t = document.createElement("div");
    return t.setAttribute("data-a-b", "c"),
    t.dataset && "c" == t.dataset.aB
}
)() || Object.defineProperty(Element.prototype, "dataset", {
    get: function() {
        for (var t = this, e = this.attributes, n = {}, o = 0; o < e.length; o++) {
            var i = e[o];
            if (i && i.name && /^data-\w[.\w-]*$/.test(i.name)) {
                var r = i.name
                  , s = i.value
                  , a = r.substr(5).replace(/-./g, function(t) {
                    return t.charAt(1).toUpperCase()
                });
                "__defineGetter__"in Object.prototype && "__defineSetter__"in Object.prototype ? Object.defineProperty(n, a, {
                    enumerable: !0,
                    get: function() {
                        return this.value
                    }
                    .bind({
                        value: s || ""
                    }),
                    set: function l(t, e) {
                        void 0 !== e ? this.setAttribute(t, e) : this.removeAttribute(t)
                    }
                    .bind(t, r)
                }) : n[a] = s
            }
        }
        return n
    }
})
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"trim"in String.prototype || (String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
l.prototype.t = function(t, e) {
if (!t)
    throw new Error("i18n: lookup key missing");
e && "number" == typeof e.count && (t = t + "." + this.getPluralSuffix(t, e.count));
var n = this.translations[t];
if ("string" != typeof n)
    return t;
if (n.match(/%{(.\S+)}/)) {
    if (!e)
        throw new Error("i18n: cannot replace placeholders in string if no option data provided");
    return this.replacePlaceholders(n, e)
}
return n
}
,
l.prototype.replacePlaceholders = function(t, o) {
var i;
return this.hasIntlNumberFormatSupport() && (i = new Intl.NumberFormat(this.locale)),
t.replace(/%{(.\S+)}/g, function(t, e) {
    if (Object.prototype.hasOwnProperty.call(o, e)) {
        var n = o[e];
        return !1 === n || "number" != typeof n && "string" != typeof n ? "" : "number" == typeof n ? i ? i.format(n) : n.toString() : n
    }
    throw new Error("i18n: no data found to replace " + t + " placeholder in string")
})
}
,
l.prototype.hasIntlPluralRulesSupport = function() {
return Boolean(window.Intl && "PluralRules"in window.Intl && Intl.PluralRules.supportedLocalesOf(this.locale).length)
}
,
l.prototype.hasIntlNumberFormatSupport = function() {
return Boolean(window.Intl && "NumberFormat"in window.Intl && Intl.NumberFormat.supportedLocalesOf(this.locale).length)
}
,
l.prototype.getPluralSuffix = function(t, e) {
if (e = Number(e),
!isFinite(e))
    return "other";
var n;
if (t + "." + (n = this.hasIntlPluralRulesSupport() ? new Intl.PluralRules(this.locale).select(e) : this.selectPluralFormUsingFallbackRules(e))in this.translations)
    return n;
if (t + ".other"in this.translations)
    return console && "warn"in console && console.warn('i18n: Missing plural form ".' + n + '" for "' + this.locale + '" locale. Falling back to ".other".'),
    "other";
throw new Error('i18n: Plural form ".other" is required for "' + this.locale + '" locale')
}
,
l.prototype.selectPluralFormUsingFallbackRules = function(t) {
t = Math.abs(Math.floor(t));
var e = this.getPluralRulesForLocale();
return e ? l.pluralRules[e](t) : "other"
}
,
l.prototype.getPluralRulesForLocale = function() {
var t = this.locale
  , e = t.split("-")[0];
for (var n in l.pluralRulesMap)
    if (Object.prototype.hasOwnProperty.call(l.pluralRulesMap, n))
        for (var o = l.pluralRulesMap[n], i = 0; i < o.length; i++)
            if (o[i] === t || o[i] === e)
                return n
}
,
l.pluralRulesMap = {
arabic: ["ar"],
chinese: ["my", "zh", "id", "ja", "jv", "ko", "ms", "th", "vi"],
french: ["hy", "bn", "fr", "gu", "hi", "fa", "pa", "zu"],
german: ["af", "sq", "az", "eu", "bg", "ca", "da", "nl", "en", "et", "fi", "ka", "de", "el", "hu", "lb", "no", "so", "sw", "sv", "ta", "te", "tr", "ur"],
irish: ["ga"],
russian: ["ru", "uk"],
scottish: ["gd"],
spanish: ["pt-PT", "it", "es"],
welsh: ["cy"]
},
l.pluralRules = {
arabic: function(t) {
    return 0 === t ? "zero" : 1 === t ? "one" : 2 === t ? "two" : 3 <= t % 100 && t % 100 <= 10 ? "few" : 11 <= t % 100 && t % 100 <= 99 ? "many" : "other"
},
chinese: function() {
    return "other"
},
french: function(t) {
    return 0 === t || 1 === t ? "one" : "other"
},
german: function(t) {
    return 1 === t ? "one" : "other"
},
irish: function(t) {
    return 1 === t ? "one" : 2 === t ? "two" : 3 <= t && t <= 6 ? "few" : 7 <= t && t <= 10 ? "many" : "other"
},
russian: function(t) {
    var e = t % 100
      , n = e % 10;
    return 1 === n && 11 !== e ? "one" : 2 <= n && n <= 4 && !(12 <= e && e <= 14) ? "few" : 0 === n || 5 <= n && n <= 9 || 11 <= e && e <= 14 ? "many" : "other"
},
scottish: function(t) {
    return 1 === t || 11 === t ? "one" : 2 === t || 12 === t ? "two" : 3 <= t && t <= 10 || 13 <= t && t <= 19 ? "few" : "other"
},
spanish: function(t) {
    return 1 === t ? "one" : t % 1e6 == 0 && 0 !== t ? "many" : "other"
},
welsh: function(t) {
    return 0 === t ? "zero" : 1 === t ? "one" : 2 === t ? "two" : 3 === t ? "few" : 6 === t ? "many" : "other"
}
},
function(p) {
var t, e, n;
"DOMTokenList"in this && (!("classList"in (t = document.createElement("x"))) || !t.classList.toggle("x", !1) && !t.className) || ("DOMTokenList"in (e = this) && e.DOMTokenList && (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg") || document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList) || (e.DOMTokenList = function() {
    var i = !0
      , n = function(t, e, n, o) {
        Object.defineProperty ? Object.defineProperty(t, e, {
            configurable: !1 === i || !!o,
            get: n
        }) : t.__defineGetter__(e, n)
    };
    try {
        n({}, "support")
    } catch (t) {
        i = !1
    }
    return function(i, r) {
        var s = this
          , a = []
          , l = {}
          , c = 0
          , t = 0
          , e = function(t) {
            n(s, t, function() {
                return d(),
                a[t]
            }, !1)
        }
          , u = function() {
            if (t <= c)
                for (; t < c; ++t)
                    e(t)
        }
          , d = function() {
            var t, e, n = arguments, o = /\s+/;
            if (n.length)
                for (e = 0; e < n.length; ++e)
                    if (o.test(n[e]))
                        throw (t = new SyntaxError('String "' + n[e] + '" contains an invalid character')).code = 5,
                        t.name = "InvalidCharacterError",
                        t;
            for ("" === (a = "object" == typeof i[r] ? ("" + i[r].baseVal).replace(/^\s+|\s+$/g, "").split(o) : ("" + i[r]).replace(/^\s+|\s+$/g, "").split(o))[0] && (a = []),
            l = {},
            e = 0; e < a.length; ++e)
                l[a[e]] = !0;
            c = a.length,
            u()
        };
        return d(),
        n(s, "length", function() {
            return d(),
            c
        }),
        s.toLocaleString = s.toString = function() {
            return d(),
            a.join(" ")
        }
        ,
        s.item = function(t) {
            return d(),
            a[t]
        }
        ,
        s.contains = function(t) {
            return d(),
            !!l[t]
        }
        ,
        s.add = function() {
            d.apply(s, t = arguments);
            for (var t, e, n = 0, o = t.length; n < o; ++n)
                e = t[n],
                l[e] || (a.push(e),
                l[e] = !0);
            c !== a.length && (c = a.length >>> 0,
            "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "),
            u())
        }
        ,
        s.remove = function() {
            d.apply(s, t = arguments);
            for (var t, e = {}, n = 0, o = []; n < t.length; ++n)
                e[t[n]] = !0,
                delete l[t[n]];
            for (n = 0; n < a.length; ++n)
                e[a[n]] || o.push(a[n]);
            c = (a = o).length >>> 0,
            "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "),
            u()
        }
        ,
        s.toggle = function(t, e) {
            return d.apply(s, [t]),
            p !== e ? e ? (s.add(t),
            !0) : (s.remove(t),
            !1) : l[t] ? (s.remove(t),
            !1) : (s.add(t),
            !0)
        }
        ,
        s
    }
}()),
"classList"in (n = document.createElement("span")) && (n.classList.toggle("x", !1),
n.classList.contains("x") && (n.classList.constructor.prototype.toggle = function i(t, e) {
    var n = e;
    if (n !== p)
        return this[(n = !!n) ? "add" : "remove"](t),
        n;
    var o = !this.contains(t);
    return this[o ? "add" : "remove"](t),
    o
}
)),
function() {
    var t = document.createElement("span");
    if ("classList"in t && (t.classList.add("a", "b"),
    !t.classList.contains("b"))) {
        var o = t.classList.constructor.prototype.add;
        t.classList.constructor.prototype.add = function() {
            for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                o.call(this, t[n])
        }
    }
}(),
function() {
    var t = document.createElement("span");
    if ("classList"in t && (t.classList.add("a"),
    t.classList.add("b"),
    t.classList.remove("a", "b"),
    t.classList.contains("b"))) {
        var o = t.classList.constructor.prototype.remove;
        t.classList.constructor.prototype.remove = function() {
            for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                o.call(this, t[n])
        }
    }
}())
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
var t;
"document"in this && "classList"in document.documentElement && "Element"in this && "classList"in Element.prototype && ((t = document.createElement("span")).classList.add("a", "b"),
t.classList.contains("b")) || function(t) {
    var u = !0
      , d = function(t, e, n, o) {
        Object.defineProperty ? Object.defineProperty(t, e, {
            configurable: !1 === u || !!o,
            get: n
        }) : t.__defineGetter__(e, n)
    };
    try {
        d({}, "support")
    } catch (e) {
        u = !1
    }
    var p = function(t, l, c) {
        d(t.prototype, l, function() {
            var t, e = this, n = "__defineGetter__DEFINE_PROPERTY" + l;
            if (e[n])
                return t;
            if (!(e[n] = !0) === u) {
                for (var o, i = p.mirror || document.createElement("div"), r = i.childNodes, s = r.length, a = 0; a < s; ++a)
                    if (r[a]._R === e) {
                        o = r[a];
                        break
                    }
                o || (o = i.appendChild(document.createElement("div"))),
                t = DOMTokenList.call(o, e, c)
            } else
                t = new DOMTokenList(e,c);
            return d(e, l, function() {
                return t
            }),
            delete e[n],
            t
        }, !0)
    };
    p(t.Element, "classList", "className"),
    p(t.HTMLElement, "classList", "className"),
    p(t.HTMLLinkElement, "relList", "rel"),
    p(t.HTMLAnchorElement, "relList", "rel"),
    p(t.HTMLAreaElement, "relList", "rel")
}(this)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"document"in this && "matches"in document.documentElement || (Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function i(t) {
    for (var e = this, n = (e.document || e.ownerDocument).querySelectorAll(t), o = 0; n[o] && n[o] !== e; )
        ++o;
    return !!n[o]
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"document"in this && "closest"in document.documentElement || (Element.prototype.closest = function n(t) {
    for (var e = this; e; ) {
        if (e.matches(t))
            return e;
        e = "SVGElement"in window && e instanceof SVGElement ? e.parentNode : e.parentElement
    }
    return null
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Window"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function(t) {
    t.constructor ? t.Window = t.constructor : (t.Window = t.constructor = new Function("return function Window() {}")()).prototype = this
}(this)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function(c) {
(function(t) {
    if (!("Event"in t))
        return !1;
    if ("function" == typeof t.Event)
        return !0;
    try {
        return new Event("click"),
        !0
    } catch (e) {
        return !1
    }
}
)(this) || function() {
    function u(t, e) {
        for (var n = -1, o = t.length; ++n < o; )
            if (n in t && t[n] === e)
                return n;
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
        var t = window.Event && window.Event.prototype || null;
        window.Event = Window.prototype.Event = function r(t, e) {
            if (!t)
                throw new Error("Not enough arguments");
            var n;
            if ("createEvent"in document) {
                n = document.createEvent("Event");
                var o = !(!e || e.bubbles === c) && e.bubbles
                  , i = !(!e || e.cancelable === c) && e.cancelable;
                return n.initEvent(t, o, i),
                n
            }
            return (n = document.createEventObject()).type = t,
            n.bubbles = !(!e || e.bubbles === c) && e.bubbles,
            n.cancelable = !(!e || e.cancelable === c) && e.cancelable,
            n
        }
        ,
        t && Object.defineProperty(window.Event, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: t
        }),
        "createEvent"in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(t, e) {
            var c = this
              , n = t
              , o = e;
            if (c === window && n in i)
                throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
            c._events || (c._events = {}),
            c._events[n] || (c._events[n] = function(t) {
                var e, n = c._events[t.type].list, o = n.slice(), i = -1, r = o.length;
                for (t.preventDefault = function s() {
                    !1 !== t.cancelable && (t.returnValue = !1)
                }
                ,
                t.stopPropagation = function a() {
                    t.cancelBubble = !0
                }
                ,
                t.stopImmediatePropagation = function l() {
                    t.cancelBubble = !0,
                    t.cancelImmediate = !0
                }
                ,
                t.currentTarget = c,
                t.relatedTarget = t.fromElement || null,
                t.target = t.target || t.srcElement || c,
                t.timeStamp = (new Date).getTime(),
                t.clientX && (t.pageX = t.clientX + document.documentElement.scrollLeft,
                t.pageY = t.clientY + document.documentElement.scrollTop); ++i < r && !t.cancelImmediate; )
                    i in o && -1 !== u(n, e = o[i]) && "function" == typeof e && e.call(c, t)
            }
            ,
            c._events[n].list = [],
            c.attachEvent && c.attachEvent("on" + n, c._events[n])),
            c._events[n].list.push(o)
        }
        ,
        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(t, e) {
            var n, o = this, i = t, r = e;
            o._events && o._events[i] && o._events[i].list && -1 !== (n = u(o._events[i].list, r)) && (o._events[i].list.splice(n, 1),
            o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
            delete o._events[i]))
        }
        ,
        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function l(t) {
            if (!arguments.length)
                throw new Error("Not enough arguments");
            if (!t || "string" != typeof t.type)
                throw new Error("DOM Events Exception 0");
            var e = this
              , n = t.type;
            try {
                if (!t.bubbles) {
                    t.cancelBubble = !0;
                    var o = function(t) {
                        t.cancelBubble = !0,
                        (e || window).detachEvent("on" + n, o)
                    };
                    this.attachEvent("on" + n, o)
                }
                this.fireEvent("on" + n, t)
            } catch (i) {
                for (t.target = e; "_events"in (t.currentTarget = e) && "function" == typeof e._events[n] && e._events[n].call(e, t),
                "function" == typeof e["on" + n] && e["on" + n].call(e, t),
                (e = 9 === e.nodeType ? e.parentWindow : e.parentNode) && !t.cancelBubble; )
                    ;
            }
            return !0
        }
        ,
        document.attachEvent("onreadystatechange", function() {
            "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded",{
                bubbles: !0
            }))
        }))
    }
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"bind"in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
    value: function L(e) {
        var n, t = Array, o = Object, i = o.prototype, r = t.prototype, s = function s() {}, a = i.toString, l = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, c = Function.prototype.toString, u = function u(t) {
            try {
                return c.call(t),
                !0
            } catch (e) {
                return !1
            }
        }, d = "[object Function]", p = "[object GeneratorFunction]";
        n = function n(t) {
            if ("function" != typeof t)
                return !1;
            if (l)
                return u(t);
            var e = a.call(t);
            return e === d || e === p
        }
        ;
        var h = r.slice
          , f = r.concat
          , m = r.push
          , w = Math.max
          , g = this;
        if (!n(g))
            throw new TypeError("Function.prototype.bind called on incompatible " + g);
        for (var y, v = h.call(arguments, 1), b = function() {
            if (this instanceof y) {
                var t = g.apply(this, f.call(v, h.call(arguments)));
                return o(t) === t ? t : this
            }
            return g.apply(e, f.call(v, h.call(arguments)))
        }, E = w(0, g.length - v.length), S = [], k = 0; k < E; k++)
            m.call(S, "$" + k);
        return y = Function("binder", "return function (" + S.join(",") + "){ return binder.apply(this, arguments); }")(b),
        g.prototype && (s.prototype = g.prototype,
        y.prototype = new s,
        s.prototype = null),
        y
    }
})
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {});
var c = {
hideAllSections: "Hide all sections",
hideSection: "Hide",
hideSectionAriaLabel: "Hide this section",
showAllSections: "Show all sections",
showSection: "Show",
showSectionAriaLabel: "Show this section"
};
t.prototype.init = function() {
if (this.$module && this.$sections) {
    this.initControls(),
    this.initSectionHeaders();
    var t = this.checkIfAllSectionsOpen();
    this.updateShowAllButton(t)
}
}
,
t.prototype.initControls = function() {
this.$showAllButton = document.createElement("button"),
this.$showAllButton.setAttribute("type", "button"),
this.$showAllButton.setAttribute("class", this.showAllClass),
this.$showAllButton.setAttribute("aria-expanded", "false"),
this.$showAllIcon = document.createElement("span"),
this.$showAllIcon.classList.add(this.upChevronIconClass),
this.$showAllButton.appendChild(this.$showAllIcon);
var t = document.createElement("div");
t.setAttribute("class", this.controlsClass),
t.appendChild(this.$showAllButton),
this.$module.insertBefore(t, this.$module.firstChild),
this.$showAllText = document.createElement("span"),
this.$showAllText.classList.add(this.showAllTextClass),
this.$showAllButton.appendChild(this.$showAllText),
this.$showAllButton.addEventListener("click", this.onShowOrHideAllToggle.bind(this)),
"onbeforematch"in document && document.addEventListener("beforematch", this.onBeforeMatch.bind(this))
}
,
t.prototype.initSectionHeaders = function() {
var o = this;
i(this.$sections, function(t, e) {
    var n = t.querySelector("." + o.sectionHeaderClass);
    n && (o.constructHeaderMarkup(n, e),
    o.setExpanded(o.isExpanded(t), t),
    n.addEventListener("click", o.onSectionToggle.bind(o, t)),
    o.setInitialState(t))
})
}
,
t.prototype.constructHeaderMarkup = function(t, e) {
var n = t.querySelector("." + this.sectionButtonClass)
  , o = t.querySelector("." + this.sectionHeadingClass)
  , i = t.querySelector("." + this.sectionSummaryClass);
if (n && o) {
    var r = document.createElement("button");
    r.setAttribute("type", "button"),
    r.setAttribute("aria-controls", this.$module.id + "-content-" + (e + 1).toString());
    for (var s = 0; s < n.attributes.length; s++) {
        var a = n.attributes.item(s);
        "id" !== a.nodeName && r.setAttribute(a.nodeName, a.nodeValue)
    }
    var l = document.createElement("span");
    l.classList.add(this.sectionHeadingTextClass),
    l.id = n.id;
    var c = document.createElement("span");
    c.classList.add(this.sectionHeadingTextFocusClass),
    l.appendChild(c),
    c.innerHTML = n.innerHTML;
    var u = document.createElement("span");
    u.classList.add(this.sectionShowHideToggleClass),
    u.setAttribute("data-nosnippet", "");
    var d = document.createElement("span");
    d.classList.add(this.sectionShowHideToggleFocusClass),
    u.appendChild(d);
    var p = document.createElement("span")
      , h = document.createElement("span");
    if (h.classList.add(this.upChevronIconClass),
    d.appendChild(h),
    p.classList.add(this.sectionShowHideTextClass),
    d.appendChild(p),
    r.appendChild(l),
    r.appendChild(this.getButtonPunctuationEl()),
    i) {
        var f = document.createElement("span")
          , m = document.createElement("span");
        m.classList.add(this.sectionSummaryFocusClass),
        f.appendChild(m);
        for (var w = 0, g = i.attributes.length; w < g; ++w) {
            var y = i.attributes.item(w).nodeName
              , v = i.attributes.item(w).nodeValue;
            f.setAttribute(y, v)
        }
        m.innerHTML = i.innerHTML,
        i.parentNode.replaceChild(f, i),
        r.appendChild(f),
        r.appendChild(this.getButtonPunctuationEl())
    }
    r.appendChild(u),
    o.removeChild(n),
    o.appendChild(r)
}
}
,
t.prototype.onBeforeMatch = function(t) {
var e = t.target;
if (e instanceof Element) {
    var n = e.closest("." + this.sectionClass);
    n && this.setExpanded(!0, n)
}
}
,
t.prototype.onSectionToggle = function(t) {
var e = this.isExpanded(t);
this.setExpanded(!e, t),
this.storeState(t)
}
,
t.prototype.onShowOrHideAllToggle = function() {
var e = this
  , t = this.$sections
  , n = !this.checkIfAllSectionsOpen();
i(t, function(t) {
    e.setExpanded(n, t),
    e.storeState(t)
}),
e.updateShowAllButton(n)
}
,
t.prototype.setExpanded = function(t, e) {
var n = e.querySelector("." + this.upChevronIconClass)
  , o = e.querySelector("." + this.sectionShowHideTextClass)
  , i = e.querySelector("." + this.sectionButtonClass)
  , r = e.querySelector("." + this.sectionContentClass);
if (n && o instanceof HTMLElement && i && r) {
    var s = t ? this.i18n.t("hideSection") : this.i18n.t("showSection");
    o.innerText = s,
    i.setAttribute("aria-expanded", t.toString());
    var a = []
      , l = e.querySelector("." + this.sectionHeadingTextClass);
    l instanceof HTMLElement && a.push(l.innerText.trim());
    var c = e.querySelector("." + this.sectionSummaryClass);
    c instanceof HTMLElement && a.push(c.innerText.trim());
    var u = t ? this.i18n.t("hideSectionAriaLabel") : this.i18n.t("showSectionAriaLabel");
    a.push(u),
    i.setAttribute("aria-label", a.join(" , ")),
    t ? (r.removeAttribute("hidden"),
    e.classList.add(this.sectionExpandedClass),
    n.classList.remove(this.downChevronIconClass)) : (r.setAttribute("hidden", "until-found"),
    e.classList.remove(this.sectionExpandedClass),
    n.classList.add(this.downChevronIconClass));
    var d = this.checkIfAllSectionsOpen();
    this.updateShowAllButton(d)
}
}
,
t.prototype.isExpanded = function(t) {
return t.classList.contains(this.sectionExpandedClass)
}
,
t.prototype.checkIfAllSectionsOpen = function() {
return this.$sections.length === this.$module.querySelectorAll("." + this.sectionExpandedClass).length
}
,
t.prototype.updateShowAllButton = function(t) {
var e = t ? this.i18n.t("hideAllSections") : this.i18n.t("showAllSections");
this.$showAllButton.setAttribute("aria-expanded", t.toString()),
this.$showAllText.innerText = e,
t ? this.$showAllIcon.classList.remove(this.downChevronIconClass) : this.$showAllIcon.classList.add(this.downChevronIconClass)
}
;
var u = {
checkForSessionStorage: function() {
    var t, e = "this is the test string";
    try {
        return window.sessionStorage.setItem(e, e),
        t = window.sessionStorage.getItem(e) === e.toString(),
        window.sessionStorage.removeItem(e),
        t
    } catch (n) {
        return !1
    }
}
};
return t.prototype.storeState = function(t) {
if (this.browserSupportsSessionStorage && this.config.rememberExpanded) {
    var e = t.querySelector("." + this.sectionButtonClass);
    if (e) {
        var n = e.getAttribute("aria-controls")
          , o = e.getAttribute("aria-expanded");
        n && o && window.sessionStorage.setItem(n, o)
    }
}
}
,
t.prototype.setInitialState = function(t) {
if (this.browserSupportsSessionStorage && this.config.rememberExpanded) {
    var e = t.querySelector("." + this.sectionButtonClass);
    if (e) {
        var n = e.getAttribute("aria-controls")
          , o = n ? window.sessionStorage.getItem(n) : null;
        null !== o && this.setExpanded("true" === o, t)
    }
}
}
,
t.prototype.getButtonPunctuationEl = function() {
var t = document.createElement("span");
return t.classList.add("govuk-visually-hidden", this.sectionHeadingDividerClass),
t.innerHTML = ", ",
t
}
,
t
}),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
window.GOVUK.Modules.GovukAccordion = window.GOVUKFrontend.Accordion,
function(t) {
function e(t) {
this.$module = t,
this.sectionClass = "govuk-accordion__section",
this.sectionExpandedClass = "govuk-accordion__section--expanded",
this.sectionInnerContentClass = "govuk-accordion__section-content",
this.sectionHeader = ".govuk-accordion__section-header",
this.showAllControls = ".govuk-accordion__show-all",
this.sectionButton = ".govuk-accordion__section-button",
this.headingText = ".govuk-accordion__section-heading-text",
this.$module.actions = {},
this.$module.actions.locale = this.$module.getAttribute("data-locale")
}
e.prototype.init = function() {
this.$module.querySelector(this.showAllControls).classList.add("gem-c-accordion__show-all"),
"true" === this.$module.getAttribute("data-anchor-navigation") && (this.openByAnchorOnLoad(),
this.addEventListenersForAnchors()),
"true" === this.$module.getAttribute("data-track-show-all-clicks") && this.addAccordionOpenAllTracking(),
"true" === this.$module.getAttribute("data-track-sections") && this.addEventListenerSections();
var t, e = this.$module.getAttribute("data-show-all-attributes");
if (e)
    try {
        t = this.$module.querySelector(this.showAllControls);
        for (var n = JSON.parse(e), o = Object.keys(n), i = 0; i < o.length; i++)
            t.setAttribute("data-" + o[i], n[o[i]])
    } catch (a) {
        console.error("Could not read accordion data attributes error: " + a.message, window.location)
    }
var r = this.$module.getAttribute("data-module");
if (!!r && -1 !== r.indexOf("ga4-event-tracker")) {
    var s = {
        event_name: "select_content",
        type: "accordion",
        index_section: 0,
        index_section_count: this.$module.querySelectorAll(".govuk-accordion__section").length
    };
    (t = this.$module.querySelector(this.showAllControls)).setAttribute("data-ga4-event", JSON.stringify(s))
}
}
,
e.prototype.openByAnchorOnLoad = function() {
if (window.location.hash) {
    var t = window.location.hash.split("#")[1];
    this.openForAnchor(t)
}
}
,
e.prototype.addEventListenersForAnchors = function() {
nodeListForEach(this.$module.querySelectorAll(this.sectionInnerContentClass + ' a[href*="#"]'), function(t) {
    t.pathname === window.location.pathname && t.addEventListener("click", this.openForAnchor.bind(this, t.hash.split("#")[1]))
}
.bind(this))
}
,
e.prototype.openForAnchor = function(t) {
t = t.replace(":", "\\:");
var e = this.$module.querySelector("#" + t);
if (e) {
    var n = this.getContainingSection(e)
      , o = n.querySelector(this.sectionHeader)
      , i = this.getContainingSection(n)
      , r = o.parentElement;
    i && !r.classList.contains(this.sectionExpandedClass) && o.click()
}
}
,
e.prototype.getContainingSection = function(t) {
for (; !t.classList.contains(this.sectionClass); )
    t = t.parentElement;
return t
}
,
e.prototype.filterLocale = function(t) {
return this.$module.actions.locale && -1 !== this.$module.actions.locale.indexOf("{") ? JSON.parse(this.$module.actions.locale)[t] : this.$module.actions.locale ? this.$module.actions.locale : void 0
}
,
e.prototype.addAccordionOpenAllTracking = function() {
this.$module.querySelector(this.showAllControls).addEventListener("click", function(t) {
    var e = "true" === t.target.getAttribute("aria-expanded")
      , n = e ? "accordionOpened" : "accordionClosed"
      , o = {
        transport: "beacon",
        label: e ? "Show all sections" : "Hide all sections"
    }
      , i = t.target && t.target.getAttribute("data-track-options");
    if (i)
        for (var r in i = JSON.parse(i))
            o[r] = i[r];
    window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent("pageElementInteraction", n, o)
})
}
,
e.prototype.addEventListenerSections = function() {
nodeListForEach(this.$module.querySelectorAll(this.sectionButton), function(t) {
    t.addEventListener("click", this.addAccordionSectionTracking.bind(this, t))
}
.bind(this))
}
,
e.prototype.addAccordionSectionTracking = function(t) {
var e = "false" === t.getAttribute("aria-expanded") ? "accordionOpened" : "accordionClosed"
  , n = {
    transport: "beacon",
    label: t.querySelector(this.headingText).textContent
}
  , o = t.parentElement && t.parentElement.getAttribute("data-track-options");
if (o)
    for (var i in o = JSON.parse(o))
        n[i] = o[i];
window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent("pageElementInteraction", e, n)
}
,
t.GemAccordion = e
}(window.GOVUK.Modules),
function(t, e) {
"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("GOVUKFrontend.Details", e) : (t.GOVUKFrontend = t.GOVUKFrontend || {},
t.GOVUKFrontend.Details = e())
}(this, function() {
"use strict";
function o() {
var n = (new Date).getTime();
return "undefined" != typeof window.performance && "function" == typeof window.performance.now && (n += window.performance.now()),
"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    var e = (n + 16 * Math.random()) % 16 | 0;
    return n = Math.floor(n / 16),
    ("x" === t ? e : 3 & e | 8).toString(16)
})
}
function t(t) {
if (!(t instanceof HTMLElement))
    return this;
this.$module = t,
this.$summary = null,
this.$content = null
}
(function() {
"Window"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function(t) {
    t.constructor ? t.Window = t.constructor : (t.Window = t.constructor = new Function("return function Window() {}")()).prototype = this
}(this)
}
).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Document"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(),
this.Document.prototype = document))
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Element"in this && "HTMLElement"in this || function() {
    function t() {
        return r-- || clearTimeout(e),
        !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (c(document, !0),
        e && document.body.prototype && clearTimeout(e),
        !!document.body.prototype)
    }
    if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();
        var e, n = document.appendChild(document.createElement("body")), o = n.appendChild(document.createElement("iframe")).contentWindow.document, a = Element.prototype = o.appendChild(o.createElement("*")), l = {}, c = function(t, e) {
            var n, o, i, r = t.childNodes || [], s = -1;
            if (1 === t.nodeType && t.constructor !== Element)
                for (n in t.constructor = Element,
                l)
                    o = l[n],
                    t[n] = o;
            for (; i = e && r[++s]; )
                c(i, e);
            return t
        }, u = document.getElementsByTagName("*"), i = document.createElement, r = 100;
        a.attachEvent("onpropertychange", function(t) {
            for (var e, n = t.propertyName, o = !l.hasOwnProperty(n), i = a[n], r = l[n], s = -1; e = u[++s]; )
                1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
            l[n] = i
        }),
        a.constructor = Element,
        a.hasAttribute || (a.hasAttribute = function s(t) {
            return null !== this.getAttribute(t)
        }
        ),
        t() || (document.onreadystatechange = t,
        e = setInterval(t, 25)),
        document.createElement = function d(t) {
            var e = i(String(t).toLowerCase());
            return c(e)
        }
        ,
        document.removeChild(n)
    } else
        window.HTMLElement = window.Element
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
var a, l, c, u;
"defineProperty"in Object && function() {
    try {
        var t = {};
        return Object.defineProperty(t, "test", {
            value: 42
        }),
        !0
    } catch (e) {
        return !1
    }
}() || (a = Object.defineProperty,
l = Object.prototype.hasOwnProperty("__defineGetter__"),
c = "Getters & setters cannot be defined on this javascript engine",
u = "A property cannot both have accessors and be writable or have a value",
Object.defineProperty = function d(t, e, n) {
    if (a && (t === window || t === document || t === Element.prototype || t instanceof Element))
        return a(t, e, n);
    if (null === t || !(t instanceof Object || "object" == typeof t))
        throw new TypeError("Object.defineProperty called on non-object");
    if (!(n instanceof Object))
        throw new TypeError("Property description must be an object");
    var o = String(e)
      , i = "value"in n || "writable"in n
      , r = "get"in n && typeof n.get
      , s = "set"in n && typeof n.set;
    if (r) {
        if ("function" !== r)
            throw new TypeError("Getter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineGetter__.call(t, o, n.get)
    } else
        t[o] = n.value;
    if (s) {
        if ("function" !== s)
            throw new TypeError("Setter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineSetter__.call(t, o, n.set)
    }
    return "value"in n && (t[o] = n.value),
    t
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function(c) {
(function(t) {
    if (!("Event"in t))
        return !1;
    if ("function" == typeof t.Event)
        return !0;
    try {
        return new Event("click"),
        !0
    } catch (e) {
        return !1
    }
}
)(this) || function() {
    function u(t, e) {
        for (var n = -1, o = t.length; ++n < o; )
            if (n in t && t[n] === e)
                return n;
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
        var t = window.Event && window.Event.prototype || null;
        window.Event = Window.prototype.Event = function r(t, e) {
            if (!t)
                throw new Error("Not enough arguments");
            var n;
            if ("createEvent"in document) {
                n = document.createEvent("Event");
                var o = !(!e || e.bubbles === c) && e.bubbles
                  , i = !(!e || e.cancelable === c) && e.cancelable;
                return n.initEvent(t, o, i),
                n
            }
            return (n = document.createEventObject()).type = t,
            n.bubbles = !(!e || e.bubbles === c) && e.bubbles,
            n.cancelable = !(!e || e.cancelable === c) && e.cancelable,
            n
        }
        ,
        t && Object.defineProperty(window.Event, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: t
        }),
        "createEvent"in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(t, e) {
            var c = this
              , n = t
              , o = e;
            if (c === window && n in i)
                throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
            c._events || (c._events = {}),
            c._events[n] || (c._events[n] = function(t) {
                var e, n = c._events[t.type].list, o = n.slice(), i = -1, r = o.length;
                for (t.preventDefault = function s() {
                    !1 !== t.cancelable && (t.returnValue = !1)
                }
                ,
                t.stopPropagation = function a() {
                    t.cancelBubble = !0
                }
                ,
                t.stopImmediatePropagation = function l() {
                    t.cancelBubble = !0,
                    t.cancelImmediate = !0
                }
                ,
                t.currentTarget = c,
                t.relatedTarget = t.fromElement || null,
                t.target = t.target || t.srcElement || c,
                t.timeStamp = (new Date).getTime(),
                t.clientX && (t.pageX = t.clientX + document.documentElement.scrollLeft,
                t.pageY = t.clientY + document.documentElement.scrollTop); ++i < r && !t.cancelImmediate; )
                    i in o && -1 !== u(n, e = o[i]) && "function" == typeof e && e.call(c, t)
            }
            ,
            c._events[n].list = [],
            c.attachEvent && c.attachEvent("on" + n, c._events[n])),
            c._events[n].list.push(o)
        }
        ,
        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(t, e) {
            var n, o = this, i = t, r = e;
            o._events && o._events[i] && o._events[i].list && -1 !== (n = u(o._events[i].list, r)) && (o._events[i].list.splice(n, 1),
            o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
            delete o._events[i]))
        }
        ,
        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function l(t) {
            if (!arguments.length)
                throw new Error("Not enough arguments");
            if (!t || "string" != typeof t.type)
                throw new Error("DOM Events Exception 0");
            var e = this
              , n = t.type;
            try {
                if (!t.bubbles) {
                    t.cancelBubble = !0;
                    var o = function(t) {
                        t.cancelBubble = !0,
                        (e || window).detachEvent("on" + n, o)
                    };
                    this.attachEvent("on" + n, o)
                }
                this.fireEvent("on" + n, t)
            } catch (i) {
                for (t.target = e; "_events"in (t.currentTarget = e) && "function" == typeof e._events[n] && e._events[n].call(e, t),
                "function" == typeof e["on" + n] && e["on" + n].call(e, t),
                (e = 9 === e.nodeType ? e.parentWindow : e.parentNode) && !t.cancelBubble; )
                    ;
            }
            return !0
        }
        ,
        document.attachEvent("onreadystatechange", function() {
            "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded",{
                bubbles: !0
            }))
        }))
    }
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"bind"in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
    value: function L(e) {
        var n, t = Array, o = Object, i = o.prototype, r = t.prototype, s = function s() {}, a = i.toString, l = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, c = Function.prototype.toString, u = function u(t) {
            try {
                return c.call(t),
                !0
            } catch (e) {
                return !1
            }
        }, d = "[object Function]", p = "[object GeneratorFunction]";
        n = function n(t) {
            if ("function" != typeof t)
                return !1;
            if (l)
                return u(t);
            var e = a.call(t);
            return e === d || e === p
        }
        ;
        var h = r.slice
          , f = r.concat
          , m = r.push
          , w = Math.max
          , g = this;
        if (!n(g))
            throw new TypeError("Function.prototype.bind called on incompatible " + g);
        for (var y, v = h.call(arguments, 1), b = function() {
            if (this instanceof y) {
                var t = g.apply(this, f.call(v, h.call(arguments)));
                return o(t) === t ? t : this
            }
            return g.apply(e, f.call(v, h.call(arguments)))
        }, E = w(0, g.length - v.length), S = [], k = 0; k < E; k++)
            m.call(S, "$" + k);
        return y = Function("binder", "return function (" + S.join(",") + "){ return binder.apply(this, arguments); }")(b),
        g.prototype && (s.prototype = g.prototype,
        y.prototype = new s,
        s.prototype = null),
        y
    }
})
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {});
var i = 13
, r = 32;
return t.prototype.init = function() {
this.$module && ("HTMLDetailsElement"in window && this.$module instanceof HTMLDetailsElement || this.polyfillDetails())
}
,
t.prototype.polyfillDetails = function() {
var t = this.$module
  , e = this.$summary = t.getElementsByTagName("summary").item(0)
  , n = this.$content = t.getElementsByTagName("div").item(0);
e && n && (n.id || (n.id = "details-content-" + o()),
t.setAttribute("role", "group"),
e.setAttribute("role", "button"),
e.setAttribute("aria-controls", n.id),
e.tabIndex = 0,
this.$module.hasAttribute("open") ? e.setAttribute("aria-expanded", "true") : (e.setAttribute("aria-expanded", "false"),
n.style.display = "none"),
this.polyfillHandleInputs(this.polyfillSetAttributes.bind(this)))
}
,
t.prototype.polyfillSetAttributes = function() {
return this.$module.hasAttribute("open") ? (this.$module.removeAttribute("open"),
this.$summary.setAttribute("aria-expanded", "false"),
this.$content.style.display = "none") : (this.$module.setAttribute("open", "open"),
this.$summary.setAttribute("aria-expanded", "true"),
this.$content.style.display = ""),
!0
}
,
t.prototype.polyfillHandleInputs = function(n) {
this.$summary.addEventListener("keypress", function(t) {
    var e = t.target;
    t.keyCode !== i && t.keyCode !== r || e instanceof HTMLElement && "summary" === e.nodeName.toLowerCase() && (t.preventDefault(),
    e.click ? e.click() : n(t))
}),
this.$summary.addEventListener("keyup", function(t) {
    var e = t.target;
    t.keyCode === r && e instanceof HTMLElement && "summary" === e.nodeName.toLowerCase() && t.preventDefault()
}),
this.$summary.addEventListener("click", n)
}
,
t
}),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
window.GOVUK.Modules.GovukDetails = window.GOVUKFrontend.Details,
function(t) {
function e(t) {
this.$module = t,
this.$summary = this.$module.querySelector(".govuk-details__summary"),
this.customTrackLabel = this.$summary.getAttribute("data-track-label"),
this.detailsClick = this.$module.querySelector("[data-details-track-click]")
}
e.prototype.init = function() {
this.customTrackLabel ? new window.GOVUK.Modules.GemTrackClick(this.$summary).init() : this.detailsClick && this.detailsClick.addEventListener("click", function() {
    this.trackDefault(this.$summary)
}
.bind(this))
}
,
e.prototype.trackDefault = function(t) {
if (window.GOVUK.analytics && window.GOVUK.analytics.trackEvent) {
    var e = null == this.$module.getAttribute("open") ? "open" : "closed"
      , n = t.getAttribute("data-track-category")
      , o = t.getAttribute("data-track-action")
      , i = t.getAttribute("data-track-options");
    i && (i = JSON.parse(i)),
    "object" == typeof i && null !== i || (i = {}),
    i.label = e,
    o && n && window.GOVUK.analytics.trackEvent(n, o, i)
}
}
,
t.GemDetails = e
}(window.GOVUK.Modules),
function(t, e) {
"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("GOVUKFrontend.ErrorSummary", e) : (t.GOVUKFrontend = t.GOVUKFrontend || {},
t.GOVUKFrontend.ErrorSummary = e())
}(this, function() {
"use strict";
function o() {
for (var t = function(t) {
    var r = {}
      , s = function(t, e) {
        for (var n in t)
            if (Object.prototype.hasOwnProperty.call(t, n)) {
                var o = t[n]
                  , i = e ? e + "." + n : n;
                "object" == typeof o ? s(o, i) : r[i] = o
            }
    };
    return s(t),
    r
}, e = {}, n = 0; n < arguments.length; n++) {
    var o = t(arguments[n]);
    for (var i in o)
        Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i])
}
return e
}
function i(t) {
if ("string" != typeof t)
    return t;
var e = t.trim();
return "true" === e || "false" !== e && (0 < e.length && isFinite(Number(e)) ? Number(e) : t)
}
function r(t) {
var e = {};
for (var n in t)
    e[n] = i(t[n]);
return e
}
function t(t, e) {
if (!(t instanceof HTMLElement))
    return this;
this.$module = t;
var n = {
    disableAutoFocus: !1
};
this.config = o(n, e || {}, r(t.dataset))
}
return function() {
var a, l, c, u;
"defineProperty"in Object && function() {
    try {
        var t = {};
        return Object.defineProperty(t, "test", {
            value: 42
        }),
        !0
    } catch (e) {
        return !1
    }
}() || (a = Object.defineProperty,
l = Object.prototype.hasOwnProperty("__defineGetter__"),
c = "Getters & setters cannot be defined on this javascript engine",
u = "A property cannot both have accessors and be writable or have a value",
Object.defineProperty = function d(t, e, n) {
    if (a && (t === window || t === document || t === Element.prototype || t instanceof Element))
        return a(t, e, n);
    if (null === t || !(t instanceof Object || "object" == typeof t))
        throw new TypeError("Object.defineProperty called on non-object");
    if (!(n instanceof Object))
        throw new TypeError("Property description must be an object");
    var o = String(e)
      , i = "value"in n || "writable"in n
      , r = "get"in n && typeof n.get
      , s = "set"in n && typeof n.set;
    if (r) {
        if ("function" !== r)
            throw new TypeError("Getter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineGetter__.call(t, o, n.get)
    } else
        t[o] = n.value;
    if (s) {
        if ("function" !== s)
            throw new TypeError("Setter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineSetter__.call(t, o, n.set)
    }
    return "value"in n && (t[o] = n.value),
    t
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Document"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(),
this.Document.prototype = document))
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Element"in this && "HTMLElement"in this || function() {
    function t() {
        return r-- || clearTimeout(e),
        !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (c(document, !0),
        e && document.body.prototype && clearTimeout(e),
        !!document.body.prototype)
    }
    if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();
        var e, n = document.appendChild(document.createElement("body")), o = n.appendChild(document.createElement("iframe")).contentWindow.document, a = Element.prototype = o.appendChild(o.createElement("*")), l = {}, c = function(t, e) {
            var n, o, i, r = t.childNodes || [], s = -1;
            if (1 === t.nodeType && t.constructor !== Element)
                for (n in t.constructor = Element,
                l)
                    o = l[n],
                    t[n] = o;
            for (; i = e && r[++s]; )
                c(i, e);
            return t
        }, u = document.getElementsByTagName("*"), i = document.createElement, r = 100;
        a.attachEvent("onpropertychange", function(t) {
            for (var e, n = t.propertyName, o = !l.hasOwnProperty(n), i = a[n], r = l[n], s = -1; e = u[++s]; )
                1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
            l[n] = i
        }),
        a.constructor = Element,
        a.hasAttribute || (a.hasAttribute = function s(t) {
            return null !== this.getAttribute(t)
        }
        ),
        t() || (document.onreadystatechange = t,
        e = setInterval(t, 25)),
        document.createElement = function d(t) {
            var e = i(String(t).toLowerCase());
            return c(e)
        }
        ,
        document.removeChild(n)
    } else
        window.HTMLElement = window.Element
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
(function() {
    if (!document.documentElement.dataset)
        return !1;
    var t = document.createElement("div");
    return t.setAttribute("data-a-b", "c"),
    t.dataset && "c" == t.dataset.aB
}
)() || Object.defineProperty(Element.prototype, "dataset", {
    get: function() {
        for (var t = this, e = this.attributes, n = {}, o = 0; o < e.length; o++) {
            var i = e[o];
            if (i && i.name && /^data-\w[.\w-]*$/.test(i.name)) {
                var r = i.name
                  , s = i.value
                  , a = r.substr(5).replace(/-./g, function(t) {
                    return t.charAt(1).toUpperCase()
                });
                "__defineGetter__"in Object.prototype && "__defineSetter__"in Object.prototype ? Object.defineProperty(n, a, {
                    enumerable: !0,
                    get: function() {
                        return this.value
                    }
                    .bind({
                        value: s || ""
                    }),
                    set: function l(t, e) {
                        void 0 !== e ? this.setAttribute(t, e) : this.removeAttribute(t)
                    }
                    .bind(t, r)
                }) : n[a] = s
            }
        }
        return n
    }
})
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"trim"in String.prototype || (String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"document"in this && "matches"in document.documentElement || (Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function i(t) {
    for (var e = this, n = (e.document || e.ownerDocument).querySelectorAll(t), o = 0; n[o] && n[o] !== e; )
        ++o;
    return !!n[o]
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"document"in this && "closest"in document.documentElement || (Element.prototype.closest = function n(t) {
    for (var e = this; e; ) {
        if (e.matches(t))
            return e;
        e = "SVGElement"in window && e instanceof SVGElement ? e.parentNode : e.parentElement
    }
    return null
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Window"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function(t) {
    t.constructor ? t.Window = t.constructor : (t.Window = t.constructor = new Function("return function Window() {}")()).prototype = this
}(this)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function(c) {
(function(t) {
    if (!("Event"in t))
        return !1;
    if ("function" == typeof t.Event)
        return !0;
    try {
        return new Event("click"),
        !0
    } catch (e) {
        return !1
    }
}
)(this) || function() {
    function u(t, e) {
        for (var n = -1, o = t.length; ++n < o; )
            if (n in t && t[n] === e)
                return n;
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
        var t = window.Event && window.Event.prototype || null;
        window.Event = Window.prototype.Event = function r(t, e) {
            if (!t)
                throw new Error("Not enough arguments");
            var n;
            if ("createEvent"in document) {
                n = document.createEvent("Event");
                var o = !(!e || e.bubbles === c) && e.bubbles
                  , i = !(!e || e.cancelable === c) && e.cancelable;
                return n.initEvent(t, o, i),
                n
            }
            return (n = document.createEventObject()).type = t,
            n.bubbles = !(!e || e.bubbles === c) && e.bubbles,
            n.cancelable = !(!e || e.cancelable === c) && e.cancelable,
            n
        }
        ,
        t && Object.defineProperty(window.Event, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: t
        }),
        "createEvent"in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(t, e) {
            var c = this
              , n = t
              , o = e;
            if (c === window && n in i)
                throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
            c._events || (c._events = {}),
            c._events[n] || (c._events[n] = function(t) {
                var e, n = c._events[t.type].list, o = n.slice(), i = -1, r = o.length;
                for (t.preventDefault = function s() {
                    !1 !== t.cancelable && (t.returnValue = !1)
                }
                ,
                t.stopPropagation = function a() {
                    t.cancelBubble = !0
                }
                ,
                t.stopImmediatePropagation = function l() {
                    t.cancelBubble = !0,
                    t.cancelImmediate = !0
                }
                ,
                t.currentTarget = c,
                t.relatedTarget = t.fromElement || null,
                t.target = t.target || t.srcElement || c,
                t.timeStamp = (new Date).getTime(),
                t.clientX && (t.pageX = t.clientX + document.documentElement.scrollLeft,
                t.pageY = t.clientY + document.documentElement.scrollTop); ++i < r && !t.cancelImmediate; )
                    i in o && -1 !== u(n, e = o[i]) && "function" == typeof e && e.call(c, t)
            }
            ,
            c._events[n].list = [],
            c.attachEvent && c.attachEvent("on" + n, c._events[n])),
            c._events[n].list.push(o)
        }
        ,
        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(t, e) {
            var n, o = this, i = t, r = e;
            o._events && o._events[i] && o._events[i].list && -1 !== (n = u(o._events[i].list, r)) && (o._events[i].list.splice(n, 1),
            o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
            delete o._events[i]))
        }
        ,
        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function l(t) {
            if (!arguments.length)
                throw new Error("Not enough arguments");
            if (!t || "string" != typeof t.type)
                throw new Error("DOM Events Exception 0");
            var e = this
              , n = t.type;
            try {
                if (!t.bubbles) {
                    t.cancelBubble = !0;
                    var o = function(t) {
                        t.cancelBubble = !0,
                        (e || window).detachEvent("on" + n, o)
                    };
                    this.attachEvent("on" + n, o)
                }
                this.fireEvent("on" + n, t)
            } catch (i) {
                for (t.target = e; "_events"in (t.currentTarget = e) && "function" == typeof e._events[n] && e._events[n].call(e, t),
                "function" == typeof e["on" + n] && e["on" + n].call(e, t),
                (e = 9 === e.nodeType ? e.parentWindow : e.parentNode) && !t.cancelBubble; )
                    ;
            }
            return !0
        }
        ,
        document.attachEvent("onreadystatechange", function() {
            "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded",{
                bubbles: !0
            }))
        }))
    }
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"bind"in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
    value: function L(e) {
        var n, t = Array, o = Object, i = o.prototype, r = t.prototype, s = function s() {}, a = i.toString, l = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, c = Function.prototype.toString, u = function u(t) {
            try {
                return c.call(t),
                !0
            } catch (e) {
                return !1
            }
        }, d = "[object Function]", p = "[object GeneratorFunction]";
        n = function n(t) {
            if ("function" != typeof t)
                return !1;
            if (l)
                return u(t);
            var e = a.call(t);
            return e === d || e === p
        }
        ;
        var h = r.slice
          , f = r.concat
          , m = r.push
          , w = Math.max
          , g = this;
        if (!n(g))
            throw new TypeError("Function.prototype.bind called on incompatible " + g);
        for (var y, v = h.call(arguments, 1), b = function() {
            if (this instanceof y) {
                var t = g.apply(this, f.call(v, h.call(arguments)));
                return o(t) === t ? t : this
            }
            return g.apply(e, f.call(v, h.call(arguments)))
        }, E = w(0, g.length - v.length), S = [], k = 0; k < E; k++)
            m.call(S, "$" + k);
        return y = Function("binder", "return function (" + S.join(",") + "){ return binder.apply(this, arguments); }")(b),
        g.prototype && (s.prototype = g.prototype,
        y.prototype = new s,
        s.prototype = null),
        y
    }
})
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
t.prototype.init = function() {
if (this.$module) {
    var t = this.$module;
    this.setFocus(),
    t.addEventListener("click", this.handleClick.bind(this))
}
}
,
t.prototype.setFocus = function() {
var t = this.$module;
this.config.disableAutoFocus || (t.setAttribute("tabindex", "-1"),
t.addEventListener("blur", function() {
    t.removeAttribute("tabindex")
}),
t.focus())
}
,
t.prototype.handleClick = function(t) {
var e = t.target;
this.focusTarget(e) && t.preventDefault()
}
,
t.prototype.focusTarget = function(t) {
if (!(t instanceof HTMLAnchorElement))
    return !1;
var e = this.getFragmentFromUrl(t.href);
if (!e)
    return !1;
var n = document.getElementById(e);
if (!n)
    return !1;
var o = this.getAssociatedLegendOrLabel(n);
return !!o && (o.scrollIntoView(),
n.focus({
    preventScroll: !0
}),
!0)
}
,
t.prototype.getFragmentFromUrl = function(t) {
return -1 === t.indexOf("#") ? undefined : t.split("#").pop()
}
,
t.prototype.getAssociatedLegendOrLabel = function(t) {
var e = t.closest("fieldset");
if (e) {
    var n = e.getElementsByTagName("legend");
    if (n.length) {
        var o = n[0];
        if (t instanceof HTMLInputElement && ("checkbox" === t.type || "radio" === t.type))
            return o;
        var i = o.getBoundingClientRect().top
          , r = t.getBoundingClientRect();
        if (r.height && window.innerHeight)
            if (r.top + r.height - i < window.innerHeight / 2)
                return o
    }
}
return document.querySelector("label[for='" + t.getAttribute("id") + "']") || t.closest("label")
}
,
t
}),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
window.GOVUK.Modules.GovukErrorSummary = window.GOVUKFrontend.ErrorSummary,
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t
}
e.prototype.init = function() {
-1 === this.$module.className.indexOf("disable-youtube") && this.embedYoutube(),
this.createBarcharts()
}
,
e.prototype.embedYoutube = function() {
new window.GOVUK.GovspeakYoutubeLinkEnhancement(this.$module).init()
}
,
e.prototype.createBarcharts = function() {
new window.GOVUK.GovspeakBarchartEnhancement(this.$module).init()
}
,
t.Govspeak = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t
}
e.prototype.init = function() {
var t = this.$module.querySelector(".js-see-all-updates-link");
if (t) {
    var e = document.querySelector(t.getAttribute("href"));
    e && t.addEventListener("click", function() {
        var t = e.querySelector("[aria-expanded]");
        t && "true" !== t.getAttribute("aria-expanded") && t.click()
    })
}
}
,
t.Metadata = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t
}
e.prototype.init = function() {
this.$module.addEventListener("click", function() {
    window.print()
})
}
,
t.PrintLink = e
}(window.GOVUK.Modules),
function(t, e) {
"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("GOVUKFrontend.Radios", e) : (t.GOVUKFrontend = t.GOVUKFrontend || {},
t.GOVUKFrontend.Radios = e())
}(this, function() {
"use strict";
function s(t, e) {
if (window.NodeList.prototype.forEach)
    return t.forEach(e);
for (var n = 0; n < t.length; n++)
    e.call(window, t[n], n, t)
}
function t(t) {
if (!(t instanceof HTMLElement))
    return this;
var e = t.querySelectorAll('input[type="radio"]');
if (!e.length)
    return this;
this.$module = t,
this.$inputs = e
}
return function() {
var a, l, c, u;
"defineProperty"in Object && function() {
    try {
        var t = {};
        return Object.defineProperty(t, "test", {
            value: 42
        }),
        !0
    } catch (e) {
        return !1
    }
}() || (a = Object.defineProperty,
l = Object.prototype.hasOwnProperty("__defineGetter__"),
c = "Getters & setters cannot be defined on this javascript engine",
u = "A property cannot both have accessors and be writable or have a value",
Object.defineProperty = function d(t, e, n) {
    if (a && (t === window || t === document || t === Element.prototype || t instanceof Element))
        return a(t, e, n);
    if (null === t || !(t instanceof Object || "object" == typeof t))
        throw new TypeError("Object.defineProperty called on non-object");
    if (!(n instanceof Object))
        throw new TypeError("Property description must be an object");
    var o = String(e)
      , i = "value"in n || "writable"in n
      , r = "get"in n && typeof n.get
      , s = "set"in n && typeof n.set;
    if (r) {
        if ("function" !== r)
            throw new TypeError("Getter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineGetter__.call(t, o, n.get)
    } else
        t[o] = n.value;
    if (s) {
        if ("function" !== s)
            throw new TypeError("Setter must be a function");
        if (!l)
            throw new TypeError(c);
        if (i)
            throw new TypeError(u);
        Object.__defineSetter__.call(t, o, n.set)
    }
    return "value"in n && (t[o] = n.value),
    t
}
)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function(p) {
var t, e, n;
"DOMTokenList"in this && (!("classList"in (t = document.createElement("x"))) || !t.classList.toggle("x", !1) && !t.className) || ("DOMTokenList"in (e = this) && e.DOMTokenList && (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg") || document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList) || (e.DOMTokenList = function() {
    var i = !0
      , n = function(t, e, n, o) {
        Object.defineProperty ? Object.defineProperty(t, e, {
            configurable: !1 === i || !!o,
            get: n
        }) : t.__defineGetter__(e, n)
    };
    try {
        n({}, "support")
    } catch (t) {
        i = !1
    }
    return function(i, r) {
        var s = this
          , a = []
          , l = {}
          , c = 0
          , t = 0
          , e = function(t) {
            n(s, t, function() {
                return d(),
                a[t]
            }, !1)
        }
          , u = function() {
            if (t <= c)
                for (; t < c; ++t)
                    e(t)
        }
          , d = function() {
            var t, e, n = arguments, o = /\s+/;
            if (n.length)
                for (e = 0; e < n.length; ++e)
                    if (o.test(n[e]))
                        throw (t = new SyntaxError('String "' + n[e] + '" contains an invalid character')).code = 5,
                        t.name = "InvalidCharacterError",
                        t;
            for ("" === (a = "object" == typeof i[r] ? ("" + i[r].baseVal).replace(/^\s+|\s+$/g, "").split(o) : ("" + i[r]).replace(/^\s+|\s+$/g, "").split(o))[0] && (a = []),
            l = {},
            e = 0; e < a.length; ++e)
                l[a[e]] = !0;
            c = a.length,
            u()
        };
        return d(),
        n(s, "length", function() {
            return d(),
            c
        }),
        s.toLocaleString = s.toString = function() {
            return d(),
            a.join(" ")
        }
        ,
        s.item = function(t) {
            return d(),
            a[t]
        }
        ,
        s.contains = function(t) {
            return d(),
            !!l[t]
        }
        ,
        s.add = function() {
            d.apply(s, t = arguments);
            for (var t, e, n = 0, o = t.length; n < o; ++n)
                e = t[n],
                l[e] || (a.push(e),
                l[e] = !0);
            c !== a.length && (c = a.length >>> 0,
            "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "),
            u())
        }
        ,
        s.remove = function() {
            d.apply(s, t = arguments);
            for (var t, e = {}, n = 0, o = []; n < t.length; ++n)
                e[t[n]] = !0,
                delete l[t[n]];
            for (n = 0; n < a.length; ++n)
                e[a[n]] || o.push(a[n]);
            c = (a = o).length >>> 0,
            "object" == typeof i[r] ? i[r].baseVal = a.join(" ") : i[r] = a.join(" "),
            u()
        }
        ,
        s.toggle = function(t, e) {
            return d.apply(s, [t]),
            p !== e ? e ? (s.add(t),
            !0) : (s.remove(t),
            !1) : l[t] ? (s.remove(t),
            !1) : (s.add(t),
            !0)
        }
        ,
        s
    }
}()),
"classList"in (n = document.createElement("span")) && (n.classList.toggle("x", !1),
n.classList.contains("x") && (n.classList.constructor.prototype.toggle = function i(t, e) {
    var n = e;
    if (n !== p)
        return this[(n = !!n) ? "add" : "remove"](t),
        n;
    var o = !this.contains(t);
    return this[o ? "add" : "remove"](t),
    o
}
)),
function() {
    var t = document.createElement("span");
    if ("classList"in t && (t.classList.add("a", "b"),
    !t.classList.contains("b"))) {
        var o = t.classList.constructor.prototype.add;
        t.classList.constructor.prototype.add = function() {
            for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                o.call(this, t[n])
        }
    }
}(),
function() {
    var t = document.createElement("span");
    if ("classList"in t && (t.classList.add("a"),
    t.classList.add("b"),
    t.classList.remove("a", "b"),
    t.classList.contains("b"))) {
        var o = t.classList.constructor.prototype.remove;
        t.classList.constructor.prototype.remove = function() {
            for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                o.call(this, t[n])
        }
    }
}())
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Document"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(),
this.Document.prototype = document))
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Element"in this && "HTMLElement"in this || function() {
    function t() {
        return r-- || clearTimeout(e),
        !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (c(document, !0),
        e && document.body.prototype && clearTimeout(e),
        !!document.body.prototype)
    }
    if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();
        var e, n = document.appendChild(document.createElement("body")), o = n.appendChild(document.createElement("iframe")).contentWindow.document, a = Element.prototype = o.appendChild(o.createElement("*")), l = {}, c = function(t, e) {
            var n, o, i, r = t.childNodes || [], s = -1;
            if (1 === t.nodeType && t.constructor !== Element)
                for (n in t.constructor = Element,
                l)
                    o = l[n],
                    t[n] = o;
            for (; i = e && r[++s]; )
                c(i, e);
            return t
        }, u = document.getElementsByTagName("*"), i = document.createElement, r = 100;
        a.attachEvent("onpropertychange", function(t) {
            for (var e, n = t.propertyName, o = !l.hasOwnProperty(n), i = a[n], r = l[n], s = -1; e = u[++s]; )
                1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
            l[n] = i
        }),
        a.constructor = Element,
        a.hasAttribute || (a.hasAttribute = function s(t) {
            return null !== this.getAttribute(t)
        }
        ),
        t() || (document.onreadystatechange = t,
        e = setInterval(t, 25)),
        document.createElement = function d(t) {
            var e = i(String(t).toLowerCase());
            return c(e)
        }
        ,
        document.removeChild(n)
    } else
        window.HTMLElement = window.Element
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
var t;
"document"in this && "classList"in document.documentElement && "Element"in this && "classList"in Element.prototype && ((t = document.createElement("span")).classList.add("a", "b"),
t.classList.contains("b")) || function(t) {
    var u = !0
      , d = function(t, e, n, o) {
        Object.defineProperty ? Object.defineProperty(t, e, {
            configurable: !1 === u || !!o,
            get: n
        }) : t.__defineGetter__(e, n)
    };
    try {
        d({}, "support")
    } catch (e) {
        u = !1
    }
    var p = function(t, l, c) {
        d(t.prototype, l, function() {
            var t, e = this, n = "__defineGetter__DEFINE_PROPERTY" + l;
            if (e[n])
                return t;
            if (!(e[n] = !0) === u) {
                for (var o, i = p.mirror || document.createElement("div"), r = i.childNodes, s = r.length, a = 0; a < s; ++a)
                    if (r[a]._R === e) {
                        o = r[a];
                        break
                    }
                o || (o = i.appendChild(document.createElement("div"))),
                t = DOMTokenList.call(o, e, c)
            } else
                t = new DOMTokenList(e,c);
            return d(e, l, function() {
                return t
            }),
            delete e[n],
            t
        }, !0)
    };
    p(t.Element, "classList", "className"),
    p(t.HTMLElement, "classList", "className"),
    p(t.HTMLLinkElement, "relList", "rel"),
    p(t.HTMLAnchorElement, "relList", "rel"),
    p(t.HTMLAreaElement, "relList", "rel")
}(this)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"Window"in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function(t) {
    t.constructor ? t.Window = t.constructor : (t.Window = t.constructor = new Function("return function Window() {}")()).prototype = this
}(this)
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function(c) {
(function(t) {
    if (!("Event"in t))
        return !1;
    if ("function" == typeof t.Event)
        return !0;
    try {
        return new Event("click"),
        !0
    } catch (e) {
        return !1
    }
}
)(this) || function() {
    function u(t, e) {
        for (var n = -1, o = t.length; ++n < o; )
            if (n in t && t[n] === e)
                return n;
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
        var t = window.Event && window.Event.prototype || null;
        window.Event = Window.prototype.Event = function r(t, e) {
            if (!t)
                throw new Error("Not enough arguments");
            var n;
            if ("createEvent"in document) {
                n = document.createEvent("Event");
                var o = !(!e || e.bubbles === c) && e.bubbles
                  , i = !(!e || e.cancelable === c) && e.cancelable;
                return n.initEvent(t, o, i),
                n
            }
            return (n = document.createEventObject()).type = t,
            n.bubbles = !(!e || e.bubbles === c) && e.bubbles,
            n.cancelable = !(!e || e.cancelable === c) && e.cancelable,
            n
        }
        ,
        t && Object.defineProperty(window.Event, "prototype", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: t
        }),
        "createEvent"in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(t, e) {
            var c = this
              , n = t
              , o = e;
            if (c === window && n in i)
                throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
            c._events || (c._events = {}),
            c._events[n] || (c._events[n] = function(t) {
                var e, n = c._events[t.type].list, o = n.slice(), i = -1, r = o.length;
                for (t.preventDefault = function s() {
                    !1 !== t.cancelable && (t.returnValue = !1)
                }
                ,
                t.stopPropagation = function a() {
                    t.cancelBubble = !0
                }
                ,
                t.stopImmediatePropagation = function l() {
                    t.cancelBubble = !0,
                    t.cancelImmediate = !0
                }
                ,
                t.currentTarget = c,
                t.relatedTarget = t.fromElement || null,
                t.target = t.target || t.srcElement || c,
                t.timeStamp = (new Date).getTime(),
                t.clientX && (t.pageX = t.clientX + document.documentElement.scrollLeft,
                t.pageY = t.clientY + document.documentElement.scrollTop); ++i < r && !t.cancelImmediate; )
                    i in o && -1 !== u(n, e = o[i]) && "function" == typeof e && e.call(c, t)
            }
            ,
            c._events[n].list = [],
            c.attachEvent && c.attachEvent("on" + n, c._events[n])),
            c._events[n].list.push(o)
        }
        ,
        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(t, e) {
            var n, o = this, i = t, r = e;
            o._events && o._events[i] && o._events[i].list && -1 !== (n = u(o._events[i].list, r)) && (o._events[i].list.splice(n, 1),
            o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
            delete o._events[i]))
        }
        ,
        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function l(t) {
            if (!arguments.length)
                throw new Error("Not enough arguments");
            if (!t || "string" != typeof t.type)
                throw new Error("DOM Events Exception 0");
            var e = this
              , n = t.type;
            try {
                if (!t.bubbles) {
                    t.cancelBubble = !0;
                    var o = function(t) {
                        t.cancelBubble = !0,
                        (e || window).detachEvent("on" + n, o)
                    };
                    this.attachEvent("on" + n, o)
                }
                this.fireEvent("on" + n, t)
            } catch (i) {
                for (t.target = e; "_events"in (t.currentTarget = e) && "function" == typeof e._events[n] && e._events[n].call(e, t),
                "function" == typeof e["on" + n] && e["on" + n].call(e, t),
                (e = 9 === e.nodeType ? e.parentWindow : e.parentNode) && !t.cancelBubble; )
                    ;
            }
            return !0
        }
        ,
        document.attachEvent("onreadystatechange", function() {
            "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded",{
                bubbles: !0
            }))
        }))
    }
}()
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
function() {
"bind"in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
    value: function L(e) {
        var n, t = Array, o = Object, i = o.prototype, r = t.prototype, s = function s() {}, a = i.toString, l = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, c = Function.prototype.toString, u = function u(t) {
            try {
                return c.call(t),
                !0
            } catch (e) {
                return !1
            }
        }, d = "[object Function]", p = "[object GeneratorFunction]";
        n = function n(t) {
            if ("function" != typeof t)
                return !1;
            if (l)
                return u(t);
            var e = a.call(t);
            return e === d || e === p
        }
        ;
        var h = r.slice
          , f = r.concat
          , m = r.push
          , w = Math.max
          , g = this;
        if (!n(g))
            throw new TypeError("Function.prototype.bind called on incompatible " + g);
        for (var y, v = h.call(arguments, 1), b = function() {
            if (this instanceof y) {
                var t = g.apply(this, f.call(v, h.call(arguments)));
                return o(t) === t ? t : this
            }
            return g.apply(e, f.call(v, h.call(arguments)))
        }, E = w(0, g.length - v.length), S = [], k = 0; k < E; k++)
            m.call(S, "$" + k);
        return y = Function("binder", "return function (" + S.join(",") + "){ return binder.apply(this, arguments); }")(b),
        g.prototype && (s.prototype = g.prototype,
        y.prototype = new s,
        s.prototype = null),
        y
    }
})
}
.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}),
t.prototype.init = function() {
if (this.$module && this.$inputs) {
    var t = this.$module;
    s(this.$inputs, function(t) {
        var e = t.getAttribute("data-aria-controls");
        e && document.getElementById(e) && (t.setAttribute("aria-controls", e),
        t.removeAttribute("data-aria-controls"))
    }),
    window.addEventListener("onpageshow"in window ? "pageshow" : "DOMContentLoaded", this.syncAllConditionalReveals.bind(this)),
    this.syncAllConditionalReveals(),
    t.addEventListener("click", this.handleClick.bind(this))
}
}
,
t.prototype.syncAllConditionalReveals = function() {
s(this.$inputs, this.syncConditionalRevealWithInputState.bind(this))
}
,
t.prototype.syncConditionalRevealWithInputState = function(t) {
var e = t.getAttribute("aria-controls");
if (e) {
    var n = document.getElementById(e);
    if (n && n.classList.contains("govuk-radios__conditional")) {
        var o = t.checked;
        t.setAttribute("aria-expanded", o.toString()),
        n.classList.toggle("govuk-radios__conditional--hidden", !o)
    }
}
}
,
t.prototype.handleClick = function(t) {
var n = this
  , e = t.target;
if (e instanceof HTMLInputElement && "radio" === e.type) {
    var o = document.querySelectorAll('input[type="radio"][aria-controls]')
      , i = e.form
      , r = e.name;
    s(o, function(t) {
        var e = t.form === i;
        t.name === r && e && n.syncConditionalRevealWithInputState(t)
    })
}
}
,
t
}),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
window.GOVUK.Modules.GovukRadios = window.GOVUKFrontend.Radios,
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t,
this.basePath = this.$module.querySelector('input[name="base_path"]').value,
this.buttonLocation = this.$module.getAttribute("data-button-location"),
this.buttonVisibleClass = "gem-c-single-page-notification-button--visible",
this.personalisationEndpoint = "/api/personalisation/check-email-subscription?base_path=" + this.basePath,
this.buttonLocation && (this.personalisationEndpoint += "&button_location=" + this.buttonLocation)
}
e.prototype.init = function() {
var s = new XMLHttpRequest;
s.open("GET", this.personalisationEndpoint, !0),
s.timeout = 1e4,
s.ontimeout = function() {
    this.makeVisible(this.$module)
}
.bind(this),
s.onreadystatechange = function() {
    if (4 === s.readyState) {
        if (200 === s.status) {
            var t = s.responseText;
            if (t && this.responseIsJSON(t)) {
                var e = JSON.parse(t).active
                  , n = this.$module.getAttribute("data-button-text-subscribe")
                  , o = this.$module.getAttribute("data-button-text-unsubscribe")
                  , i = n && o
                  , r = this.$module.getAttribute("data-button-location") ? "-" + this.$module.getAttribute("data-button-location") : "";
                !0 === e ? (this.$module.setAttribute("data-track-action", "Unsubscribe-button" + r),
                i && (this.$module.querySelector(".gem-c-single-page-notication-button__text").textContent = o)) : (this.$module.setAttribute("data-track-action", "Subscribe-button" + r),
                i && (this.$module.querySelector(".gem-c-single-page-notication-button__text").textContent = n))
            }
        }
        this.makeVisible(this.$module)
    }
}
.bind(this),
s.send()
}
,
e.prototype.responseIsJSON = function(t) {
try {
    JSON.parse(t)
} catch (e) {
    return !1
}
return !0
}
,
e.prototype.makeVisible = function(t) {
t.classList.add(this.buttonVisibleClass)
}
,
t.SinglePageNotificationButton = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t,
this.$module.actions = {},
this.$module.rememberShownStep = !1,
this.$module.stepNavSize = !1,
this.$module.sessionStoreLink = "govuk-step-nav-active-link",
this.$module.activeLinkClass = "gem-c-step-nav__list-item--active",
this.$module.activeStepClass = "gem-c-step-nav__step--active",
this.$module.activeLinkHref = "#content",
this.$module.uniqueId = !1
}
e.prototype.init = function() {
this.$module.classList.add("gem-c-step-nav--active"),
this.$module.classList.remove("js-hidden"),
this.$module.stepNavSize = this.$module.classList.contains("gem-c-step-nav--large") ? "Big" : "Small",
this.$module.rememberShownStep = !!this.$module.hasAttribute("data-remember") && "Big" === this.$module.stepNavSize,
this.$module.steps = this.$module.querySelectorAll(".js-step"),
this.$module.stepHeaders = this.$module.querySelectorAll(".js-toggle-panel"),
this.$module.totalSteps = this.$module.querySelectorAll(".js-panel").length,
this.$module.totalLinks = this.$module.querySelectorAll(".gem-c-step-nav__link").length,
this.$module.showOrHideAllButton = !1,
this.$module.uniqueId = this.$module.getAttribute("data-id") || !1,
this.$module.dataModule = this.$module.getAttribute("data-module"),
this.$module.isGa4Enabled = !!this.$module.dataModule && -1 !== this.$module.dataModule.indexOf("ga4-event-tracker"),
this.$module.uniqueId && (this.$module.sessionStoreLink = this.$module.sessionStoreLink + "_" + this.$module.uniqueId);
var t = new this.StepNavTracker(this.$module.uniqueId,this.$module.totalSteps,this.$module.totalLinks);
this.getTextForInsertedElements(),
this.addButtonstoSteps(),
this.addShowHideAllButton(),
this.addShowHideToggle(),
this.addAriaControlsAttrForShowHideAllButton(),
this.ensureOnlyOneActiveLink(),
this.showPreviouslyOpenedSteps(),
this.bindToggleForSteps(t),
this.bindToggleShowHideAllButton(t),
this.bindComponentLinkClicks(t)
}
,
e.prototype.getTextForInsertedElements = function() {
this.$module.actions.showText = this.$module.getAttribute("data-show-text"),
this.$module.actions.hideText = this.$module.getAttribute("data-hide-text"),
this.$module.actions.showAllText = this.$module.getAttribute("data-show-all-text"),
this.$module.actions.hideAllText = this.$module.getAttribute("data-hide-all-text")
}
,
e.prototype.addShowHideAllButton = function() {
var t = document.createElement("div")
  , e = this.$module.querySelectorAll(".gem-c-step-nav__steps")[0];
if (t.className = "gem-c-step-nav__controls govuk-!-display-none-print",
t.innerHTML = '<button aria-expanded="false" class="gem-c-step-nav__button gem-c-step-nav__button--controls js-step-controls-button"><span class="gem-c-step-nav__chevron gem-c-step-nav__chevron--down js-step-controls-button-icon"></span><span class="gem-c-step-nav__button-text gem-c-step-nav__button-text--all js-step-controls-button-text">' + this.$module.actions.showAllText + "</span></button>",
this.$module.insertBefore(t, e),
this.$module.showOrHideAllButton = this.$module.querySelectorAll(".js-step-controls-button")[0],
this.$module.isGa4Enabled) {
    var n = {
        event_name: "select_content",
        type: "step by step",
        index_section: 0,
        index_section_count: this.$module.totalSteps
    };
    this.$module.showOrHideAllButton.setAttribute("data-ga4-event", JSON.stringify(n))
}
}
,
e.prototype.addShowHideToggle = function() {
for (var t = 0; t < this.$module.stepHeaders.length; t++) {
    var e = this.$module.stepHeaders[t];
    if (!e.querySelectorAll(".js-toggle-link").length) {
        var n = document.createElement("span")
          , o = document.createElement("span")
          , i = document.createElement("span")
          , r = document.createElement("span")
          , s = document.createElement("span");
        n.className = "gem-c-step-nav__toggle-link js-toggle-link govuk-!-display-none-print",
        o.className = "gem-c-step-nav__button-text js-toggle-link-text",
        i.className = "gem-c-step-nav__chevron js-toggle-link-icon",
        r.className = "gem-c-step-nav__toggle-link-focus",
        s.className = "govuk-visually-hidden",
        n.appendChild(r),
        r.appendChild(i),
        r.appendChild(o),
        s.innerHTML = " this section",
        n.appendChild(s),
        e.querySelectorAll(".js-step-title-button")[0].appendChild(n)
    }
}
}
,
e.prototype.headerIsOpen = function(t) {
return void 0 !== t.parentNode.getAttribute("show")
}
,
e.prototype.addAriaControlsAttrForShowHideAllButton = function() {
var t = this.$module.querySelectorAll(".js-panel")[0].getAttribute("id");
this.$module.showOrHideAllButton.setAttribute("aria-controls", t)
}
,
e.prototype.setAllStepsShownState = function(t) {
for (var e = [], n = 0; n < this.$module.steps.length; n++) {
    new this.StepView(this.$module.steps[n],this.$module).setIsShown(t),
    t && e.push(this.$module.steps[n].getAttribute("id"))
}
t ? this.saveToSessionStorage(this.$module.uniqueId, JSON.stringify(e)) : this.removeFromSessionStorage(this.$module.uniqueId)
}
,
e.prototype.showPreviouslyOpenedSteps = function() {
for (var t = this.loadFromSessionStorage(this.$module.uniqueId) || [], e = 0; e < this.$module.steps.length; e++) {
    var n = this.$module.steps[e]
      , o = n.getAttribute("id")
      , i = new this.StepView(n,this.$module)
      , r = n.hasAttribute("data-show");
    this.$module.rememberShownStep && -1 < t.indexOf(o) || r && "undefined" !== r ? i.setIsShown(!0) : i.setIsShown(!1)
}
0 < t.length && (this.$module.showOrHideAllButton.setAttribute("aria-expanded", !0),
this.setShowHideAllText())
}
,
e.prototype.addButtonstoSteps = function() {
for (var t = 0; t < this.$module.steps.length; t++) {
    var e = this.$module.steps[t]
      , n = e.querySelectorAll(".js-step-title")[0]
      , o = e.querySelectorAll(".js-panel")[0].getAttribute("id")
      , i = n.textContent || n.innerText;
    if (n.outerHTML = '<span class="js-step-title"><button class="gem-c-step-nav__button gem-c-step-nav__button--title js-step-title-button" aria-expanded="false" aria-controls="' + o + '"><span class="gem-c-step-nav____title-text-focus"><span class="gem-c-step-nav__title-text js-step-title-text">' + i + '</span><span class="govuk-visually-hidden gem-c-step-nav__section-heading-divider">, </span></span></button></span>',
    this.$module.isGa4Enabled) {
        var r = {
            event_name: "select_content",
            type: "step by step",
            text: i.trim(),
            index_section: t + 1,
            index_section_count: this.$module.totalSteps,
            index_total: e.querySelectorAll("a").length
        };
        e.querySelector(".js-step-title-button").setAttribute("data-ga4-event", JSON.stringify(r))
    }
}
}
,
e.prototype.bindToggleForSteps = function(o) {
for (var i = this, t = this.$module.querySelectorAll(".js-toggle-panel"), e = 0; e < t.length; e++)
    t[e].addEventListener("click", function(t) {
        var e = new i.StepView(this.parentNode,i.$module);
        e.toggle();
        var n = this.parentNode.hasAttribute("data-optional");
        new i.StepToggleClick(t,e,o,n,i.$module.stepNavSize).trackClick(),
        i.setShowHideAllText(),
        i.rememberStepState(this.parentNode)
    })
}
,
e.prototype.rememberStepState = function(t) {
if (this.$module.rememberShownStep) {
    var e = JSON.parse(this.loadFromSessionStorage(this.$module.uniqueId)) || []
      , n = t.getAttribute("id");
    if (t.classList.contains("step-is-shown"))
        e.push(n);
    else {
        var o = e.indexOf(n);
        -1 < o && e.splice(o, 1)
    }
    this.saveToSessionStorage(this.$module.uniqueId, JSON.stringify(e))
}
}
,
e.prototype.bindComponentLinkClicks = function(n) {
for (var t = this.$module.querySelectorAll(".js-link"), o = this, e = 0; e < t.length; e++)
    t[e].addEventListener("click", function(t) {
        var e = this.getAttribute("data-position");
        new o.ComponentLinkClick(t,n,e,o.$module.stepNavSize).trackClick(),
        "external" !== this.getAttribute("rel") && o.saveToSessionStorage(o.$module.sessionStoreLink, e),
        this.getAttribute("href") === o.$module.activeLinkHref && (o.setOnlyThisLinkActive(this),
        o.setActiveStepClass())
    })
}
,
e.prototype.saveToSessionStorage = function(t, e) {
window.sessionStorage.setItem(t, e)
}
,
e.prototype.loadFromSessionStorage = function(t) {
return window.sessionStorage.getItem(t)
}
,
e.prototype.removeFromSessionStorage = function(t) {
window.sessionStorage.removeItem(t)
}
,
e.prototype.setOnlyThisLinkActive = function(t) {
for (var e = this.$module.querySelectorAll("." + this.$module.activeLinkClass), n = 0; n < e.length; n++)
    e[n].classList.remove(this.$module.activeLinkClass);
t.parentNode.classList.add(this.$module.activeLinkClass)
}
,
e.prototype.ensureOnlyOneActiveLink = function() {
var t = this.$module.querySelectorAll(".js-list-item." + this.$module.activeLinkClass);
if (!(t.length <= 1)) {
    var e = this.loadFromSessionStorage(this.$module.sessionStoreLink)
      , n = this.$module.querySelectorAll("." + this.$module.activeLinkClass)[0].firstChild.getAttribute("data-position")
      , o = e || n
      , i = this.$module.querySelectorAll('[data-position="' + o + '"]')[0];
    i ? i.parentNode.classList.contains(this.$module.activeLinkClass) || (o = i) : o = n,
    this.removeActiveStateFromAllButCurrent(t, o),
    this.setActiveStepClass()
}
}
,
e.prototype.removeActiveStateFromAllButCurrent = function(t, e) {
for (var n = 0; n < t.length; n++) {
    var o = t[n];
    if (o.querySelectorAll(".js-link")[0].getAttribute("data-position").toString() !== e.toString()) {
        o.classList.remove(this.$module.activeLinkClass);
        var i = o.querySelectorAll(".visuallyhidden");
        i.length && i[0].parentNode.removeChild(i[0])
    }
}
}
,
e.prototype.setActiveStepClass = function() {
for (var t = this.$module.querySelectorAll("." + this.$module.activeStepClass), e = 0; e < t.length; e++)
    t[e].classList.remove(this.$module.activeStepClass),
    t[e].removeAttribute("data-show");
var n = this.$module.querySelectorAll("." + this.$module.activeLinkClass)[0];
if (n) {
    var o = n.closest(".gem-c-step-nav__step");
    o.classList.add(this.$module.activeStepClass),
    o.setAttribute("data-show", "")
}
}
,
e.prototype.bindToggleShowHideAllButton = function(e) {
var n = this;
this.$module.showOrHideAllButton.addEventListener("click", function() {
    var t = (this.textContent || this.innerText) === n.$module.actions.showAllText;
    return e.trackClick("pageElementInteraction", t ? "stepNavAllShown" : "stepNavAllHidden", {
        label: (t ? n.$module.actions.showAllText : n.$module.actions.hideAllText) + ": " + n.$module.stepNavSize
    }),
    n.setAllStepsShownState(t),
    n.$module.showOrHideAllButton.setAttribute("aria-expanded", t),
    n.setShowHideAllText(),
    !1
})
}
,
e.prototype.setShowHideAllText = function() {
var t = this.$module.querySelectorAll(".step-is-shown").length
  , e = this.$module.showOrHideAllButton.querySelector(".js-step-controls-button-icon")
  , n = this.$module.showOrHideAllButton.querySelector(".js-step-controls-button-text");
t === this.$module.totalSteps ? (n.innerHTML = this.$module.actions.hideAllText,
e.classList.remove("gem-c-step-nav__chevron--down")) : (n.innerHTML = this.$module.actions.showAllText,
e.classList.add("gem-c-step-nav__chevron--down"))
}
,
e.prototype.StepView = function(t, e) {
this.stepElement = t,
this.stepContent = this.stepElement.querySelectorAll(".js-panel")[0],
this.titleButton = this.stepElement.querySelectorAll(".js-step-title-button")[0];
var n = this.stepElement.querySelectorAll(".js-step-title-text")[0];
this.title = n.textContent || n.innerText,
this.title = this.title.replace(/^\s+|\s+$/g, ""),
this.showText = e.actions.showText,
this.hideText = e.actions.hideText,
this.upChevronSvg = e.upChevronSvg,
this.downChevronSvg = e.downChevronSvg,
this.show = function() {
    this.setIsShown(!0)
}
,
this.hide = function() {
    this.setIsShown(!1)
}
,
this.toggle = function() {
    this.setIsShown(this.isHidden())
}
,
this.setIsShown = function(t) {
    var e = this.stepElement.querySelectorAll(".js-toggle-link")[0]
      , n = e.querySelector(".js-toggle-link-text")
      , o = e.querySelector(".js-toggle-link-icon");
    t ? (this.stepElement.classList.add("step-is-shown"),
    this.stepContent.classList.remove("js-hidden"),
    n.innerHTML = this.hideText,
    o.classList.remove("gem-c-step-nav__chevron--down")) : (this.stepElement.classList.remove("step-is-shown"),
    this.stepContent.classList.add("js-hidden"),
    n.innerHTML = this.showText,
    o.classList.add("gem-c-step-nav__chevron--down")),
    this.titleButton.setAttribute("aria-expanded", t)
}
,
this.isShown = function() {
    return this.stepElement.classList.contains("step-is-shown")
}
,
this.isHidden = function() {
    return !this.isShown()
}
,
this.numberOfContentItems = function() {
    return this.stepContent.querySelectorAll(".js-link").length
}
}
,
e.prototype.StepToggleClick = function(t, e, n, o, i) {
this.target = t.target,
this.stepIsOptional = o,
this.stepNavSize = i,
this.trackClick = function() {
    var t = {
        label: this.trackingLabel(),
        dimension28: e.numberOfContentItems().toString()
    };
    n.trackClick("pageElementInteraction", this.trackingAction(), t)
}
,
this.trackingLabel = function() {
    return this.target.closest(".js-step").querySelectorAll(".js-toggle-panel")[0].getAttribute("data-position") + " - " + e.title + " - " + this.locateClickElement() + ": " + this.stepNavSize + this.isOptional()
}
,
this.stepIndex = function() {
    return this.$module.steps.index(e.element) + 1
}
,
this.trackingAction = function() {
    return e.isHidden() ? "stepNavHidden" : "stepNavShown"
}
,
this.locateClickElement = function() {
    return this.clickedOnIcon() ? this.iconType() + " click" : this.clickedOnHeading() ? "Heading click" : "Elsewhere click"
}
,
this.clickedOnIcon = function() {
    return this.target.classList.contains("js-toggle-link")
}
,
this.clickedOnHeading = function() {
    return this.target.classList.contains("js-step-title-text")
}
,
this.iconType = function() {
    return e.isHidden() ? "Minus" : "Plus"
}
,
this.isOptional = function() {
    return this.stepIsOptional ? " ; optional" : ""
}
}
,
e.prototype.ComponentLinkClick = function(t, n, o, e) {
this.size = e,
this.target = t.target,
this.trackClick = function() {
    var t = {
        label: this.target.getAttribute("href") + " : " + this.size
    }
      , e = this.target.closest(".gem-c-step-nav__list").getAttribute("data-length");
    e && (t.dimension28 = e),
    n.trackClick("stepNavLinkClicked", o, t)
}
}
,
e.prototype.StepNavTracker = function(t, e, n) {
this.totalSteps = e,
this.totalLinks = n,
this.uniqueId = t,
this.trackClick = function(t, e, n) {
    window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && ((n = n || {}).dimension26 = n.dimension26 || this.totalSteps.toString(),
    n.dimension27 = n.dimension27 || this.totalLinks.toString(),
    n.dimension96 = n.dimension96 || this.uniqueId,
    window.GOVUK.analytics.trackEvent(t, e, n))
}
}
,
t.Gemstepnav = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.module = t,
this.anchors = this.module.querySelectorAll("a"),
this.childNodes = this.module.childNodes,
this.hiddenElementContainer = this.createHiddenElementContainer(),
this.shownElements = [],
this.hiddenElements = [],
this.showLink = document.createElement("a")
}
e.prototype.init = function() {
this.anchors.length <= 2 && this.module.textContent.length <= 100 || (this.sortChildNodes(),
this.hiddenElements.length && (this.hideElements(),
this.createShowLink(),
this.module.setAttribute("aria-live", "polite")))
}
,
e.prototype.sortChildNodes = function() {
var e = 0;
this.childNodes.forEach(function(t) {
    1 <= e ? this.hiddenElements.push(t) : this.shownElements.push(t),
    "a" === t.nodeName.toLowerCase() && (e += 1)
}, this)
}
,
e.prototype.createShowLink = function() {
var t = this.hiddenElementContainer.children.length
  , e = '<span class="plus">+</span> ' + t + " other" + (1 < t ? "s" : "");
this.showLink.classList.add("show-other-content", "govuk-link"),
this.showLink.innerHTML = e,
this.showLink.href = "#",
this.showLink.addEventListener("click", this.showHiddenLinks.bind(this)),
this.hiddenElementContainer.parentNode.insertBefore(this.showLink, this.hiddenElementContainer)
}
,
e.prototype.hideElements = function() {
this.module.append(this.hiddenElementContainer),
this.hiddenElements.forEach(function(t) {
    this.hiddenElementContainer.appendChild(t)
}, this),
this.hiddenElementContainer.style.display = "none"
}
,
e.prototype.createHiddenElementContainer = function() {
var t = document.createElement("span");
return t.classList.add("other-content"),
t
}
,
e.prototype.showHiddenLinks = function(t) {
t.preventDefault(),
this.hiddenElementContainer.style.display = "",
this.showLink.remove(),
this.hiddenElementContainer.focus()
}
,
t.HideOtherLinks = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t,
this._hasResized = !0,
this._hasScrolled = !0,
this._interval = 50,
this.anchorIDs = []
}
e.prototype.init = function() {
window.addEventListener("resize", function() {
    this._hasResized = !0
}
.bind(this)),
window.addEventListener("scroll", function() {
    this._hasScrolled = !0
}
.bind(this)),
setInterval(this.checkResize.bind(this), this._interval),
setInterval(this.checkScroll.bind(this), this._interval),
this.anchors = this.$module.querySelectorAll(".js-page-contents a"),
this.getAnchors(),
this.checkResize(),
this.checkScroll()
}
,
e.prototype.checkResize = function() {
this._hasResized && (this._hasResized = !1,
this._hasScrolled = !0)
}
,
e.prototype.checkScroll = function() {
this._hasScrolled && (this._hasScrolled = !1,
this.getWindowDimensions().width <= 768 ? this.removeActiveItem() : this.updateActiveNavItem())
}
,
e.prototype.getWindowDimensions = function() {
return {
    height: window.innerHeight,
    width: window.innerWidth
}
}
,
e.prototype.getAnchors = function() {
for (var t = 0; t < this.anchors.length; t++) {
    var e = this.anchors[t].getAttribute("href");
    this.anchorIDs.push(e)
}
}
,
e.prototype.updateActiveNavItem = function() {
for (var t = this.getWindowPositions(), e = this.getFooterPosition(), n = 0; n < this.anchors.length; n++) {
    var o = this.anchorIDs[n]
      , i = this.anchorIDs[n + 1]
      , r = document.getElementById(o.substring(1))
      , s = i ? document.getElementById(i.substring(1)) : null
      , a = this.getHeadingPosition(r);
    if (!a)
        return;
    if (a -= 53,
    i)
        var l = this.getNextHeadingPosition(s);
    var c = this.getDistanceBetweenHeadings(a, l);
    (c ? a <= t && t < a + c : a <= t && t < e) && this.setActiveItem(o)
}
}
,
e.prototype.getFooterPosition = function() {
var t = document.querySelector(".govuk-footer");
if (t)
    return this.getElementPosition(t)
}
,
e.prototype.getHeadingPosition = function(t) {
return this.getElementPosition(t)
}
,
e.prototype.getNextHeadingPosition = function(t) {
return this.getHeadingPosition(t)
}
,
e.prototype.getElementPosition = function(t) {
if (t) {
    var e = t.getBoundingClientRect();
    return {
        top: e.top + window.scrollY,
        left: e.left + window.scrollX
    }.top
}
}
,
e.prototype.getDistanceBetweenHeadings = function(t, e) {
return e - t
}
,
e.prototype.setActiveItem = function(t) {
for (var e = 0; e < this.anchors.length; e++) {
    this.anchors[e].getAttribute("href") === t ? this.anchors[e].classList.add("active") : this.anchors[e].classList.remove("active")
}
}
,
e.prototype.removeActiveItem = function() {
for (var t = 0; t < this.anchors.length; t++)
    this.anchors[t].classList.remove("active")
}
,
e.prototype.getWindowPositions = function() {
var t = document.documentElement;
return (window.pageYOffset || t.scrollTop) - (t.clientTop || 0)
}
,
t.HighlightActiveSectionHeading = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.$module = t
}
e.prototype.init = function() {
var o = this.$module;
window.ga && window.ga(function(t) {
    var e = t.get("clientId")
      , n = o.getAttribute("action");
    o.setAttribute("action", n + "?_ga=" + e)
})
}
,
t.SetGaClientIdOnForm = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.wrapper = t,
this.stickyElement = this.wrapper.querySelector("[data-sticky-element]"),
this.hasResized = !0,
this.hasScrolled = !0,
this.interval = 50,
this.windowVerticalPosition = 1,
this.startPosition = 0,
this.stopPosition = 0
}
e.prototype.init = function() {
this.stickyElement && (window.onresize = this.onResize.bind(this),
window.onscroll = this.onScroll.bind(this),
setInterval(this.checkResize.bind(this), this.interval),
setInterval(this.checkScroll.bind(this), this.interval),
this.checkResize(),
this.checkScroll(),
this.stickyElement.classList.add("sticky-element--enabled"))
}
,
e.prototype.getWindowDimensions = function() {
return {
    height: window.innerHeight,
    width: window.innerWidth
}
}
,
e.prototype.getWindowPositions = function() {
return {
    scrollTop: window.scrollY
}
}
,
e.prototype.onResize = function() {
this.hasResized = !0
}
,
e.prototype.onScroll = function() {
this.hasScrolled = !0
}
,
e.prototype.checkResize = function() {
if (this.hasResized) {
    this.hasResized = !1,
    this.hasScrolled = !0;
    var t = this.getWindowDimensions()
      , e = this.wrapper.offsetHeight || parseFloat(this.wrapper.style.height.replace("px", ""));
    this.startPosition = this.wrapper.offsetTop,
    this.stopPosition = this.wrapper.offsetTop + e - t.height
}
}
,
e.prototype.checkScroll = function() {
this.hasScrolled && (this.hasScrolled = !1,
this.windowVerticalPosition = this.getWindowPositions().scrollTop,
this.updateVisibility(),
this.updatePosition())
}
,
e.prototype.updateVisibility = function() {
this.startPosition < this.windowVerticalPosition ? this.show() : this.hide()
}
,
e.prototype.updatePosition = function() {
this.stopPosition < this.windowVerticalPosition ? this.stickToParent() : this.stickToWindow()
}
,
e.prototype.stickToWindow = function() {
this.stickyElement.classList.add("sticky-element--stuck-to-window")
}
,
e.prototype.stickToParent = function() {
this.stickyElement.classList.remove("sticky-element--stuck-to-window")
}
,
e.prototype.show = function() {
this.stickyElement.classList.remove("sticky-element--hidden")
}
,
e.prototype.hide = function() {
this.stickyElement.classList.add("sticky-element--hidden")
}
,
t.StickyElementContainer = e
}(window.GOVUK.Modules),
window.GOVUK = window.GOVUK || {},
window.GOVUK.Modules = window.GOVUK.Modules || {},
function(t) {
function e(t) {
this.element = t
}
e.prototype.init = function() {
this.track(this.element),
this.crossDomainTrackingEnabled(this.element) && this.addCrossDomainTracking(this.element)
}
,
e.prototype.track = function() {
this.element.addEventListener("submit", function(t) {
    var e = {
        transport: "beacon"
    }
      , n = t.target
      , o = n.querySelector("input:checked")
      , i = this.eventTrackingValue(o);
    GOVUK.analytics.trackEvent("Radio button chosen", i, e),
    this.crossDomainTrackingEnabled(n) && this.trackCrossDomainEvent(n, i, e)
}
.bind(this))
}
,
e.prototype.eventTrackingValue = function(t) {
return null == t ? "submitted-without-choosing" : t.value
}
,
e.prototype.addCrossDomainTracking = function(t) {
var e = t.getAttribute("data-tracking-code")
  , n = t.getAttribute("data-tracking-domain")
  , o = t.getAttribute("data-tracking-name");
GOVUK.analytics.addLinkedTrackerDomain(e, o, n)
}
,
e.prototype.trackCrossDomainEvent = function(t, e, n) {
var o = t.getAttribute("data-tracking-name");
o && (n.trackerName = o),
GOVUK.analytics.trackEvent("Radio button chosen", e, n)
}
,
e.prototype.crossDomainTrackingEnabled = function(t) {
return t.getAttribute("data-tracking-code") && t.getAttribute("data-tracking-domain") && t.getAttribute("data-tracking-name")
}
,
t.TrackRadioGroup = e
}(window.GOVUK.Modules);
