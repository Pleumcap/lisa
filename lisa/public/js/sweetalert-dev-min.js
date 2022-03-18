(function (b, a, d) {
    (function c(f, k, h) {
        function g(q, n) {
            if (!k[q]) {
                if (!f[q]) {
                    var m = typeof require == "function" && require;
                    if (!n && m) {
                        return m(q, !0)
                    }
                    if (e) {
                        return e(q, !0)
                    }
                    var p = new Error("Cannot find module '" + q + "'");
                    throw p.code = "MODULE_NOT_FOUND", p
                }
                var i = k[q] = {
                    exports: {}
                };
                f[q][0].call(i.exports, function (l) {
                    var o = f[q][1][l];
                    return g(o ? o : l)
                }, i, i.exports, c, f, k, h)
            }
            return k[q].exports
        }
        var e = typeof require == "function" && require;
        for (var j = 0; j < h.length; j++) {
            g(h[j])
        }
        return g
    })({
        1: [function (i, e, s) {
            var r = function (w) {
                return w && w.__esModule ? w : {
                    "default": w
                }
            };
            Object.defineProperty(s, "__esModule", {
                value: true
            });
            var m = i("./modules/handle-dom");
            var n = i("./modules/utils");
            var l = i("./modules/handle-swal-dom");
            var t = i("./modules/handle-click");
            var f = i("./modules/handle-key");
            var k = r(f);
            var g = i("./modules/default-params");
            var v = r(g);
            var j = i("./modules/set-params");
            var p = r(j);
            var u;
            var q;
            var h, o;
            s["default"] = h = o = function () {
                var E = arguments[0];
                m.addClass(a.body, "stop-scrolling");
                l.resetInput();

                function A(J) {
                    var I = E;
                    return I[J] === d ? v["default"][J] : I[J]
                }
                if (E === d) {
                    n.logStr("SweetAlert expects at least 1 attribute!");
                    return false
                }
                var z = n.extend({}, v["default"]);
                switch (typeof E) {
                    case "string":
                        z.title = E;
                        z.text = arguments[1] || "";
                        z.type = arguments[2] || "";
                        break;
                    case "object":
                        if (E.title === d) {
                            n.logStr('Missing "title" argument!');
                            return false
                        }
                        z.title = E.title;
                        for (var D in v["default"]) {
                            z[D] = A(D)
                        }
                        z.confirmButtonText = z.showCancelButton ? "Confirm" : v["default"].confirmButtonText;
                        z.confirmButtonText = A("confirmButtonText");
                        z.doneFunction = arguments[1] || null;
                        break;
                    default:
                        n.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof E);
                        return false
                }
                p["default"](z);
                l.fixVerticalPosition();
                l.openModal(arguments[1]);
                var G = l.getModal();
                var w = G.querySelectorAll("button");
                var H = ["onclick", "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onfocus"];
                var C = function C(I) {
                    return t.handleButton(I, z, G)
                };
                for (var y = 0; y < w.length; y++) {
                    for (var F = 0; F < H.length; F++) {
                        var x = H[F];
                        w[y][x] = C
                    }
                }
                l.getOverlay().onclick = C;
                u = b.onkeydown;
                var B = function B(I) {
                    return k["default"](I, z, G)
                };
                b.onkeydown = B;
                b.onfocus = function () {
                    setTimeout(function () {
                        if (q !== d) {
                            q.focus();
                            q = d
                        }
                    }, 0)
                };
                o.enableButtons()
            };
            h.setDefaults = o.setDefaults = function (w) {
                if (!w) {
                    throw new Error("userParams is required")
                }
                if (typeof w !== "object") {
                    throw new Error("userParams has to be a object")
                }
                n.extend(v["default"], w)
            };
            h.close = o.close = function () {
                var z = l.getModal();
                m.fadeOut(l.getOverlay(), 5);
                m.fadeOut(z, 5);
                m.removeClass(z, "showSweetAlert");
                m.addClass(z, "hideSweetAlert");
                m.removeClass(z, "visible");
                var w = z.querySelector(".sa-icon.sa-success");
                m.removeClass(w, "animate");
                m.removeClass(w.querySelector(".sa-tip"), "animateSuccessTip");
                m.removeClass(w.querySelector(".sa-long"), "animateSuccessLong");
                var x = z.querySelector(".sa-icon.sa-error");
                m.removeClass(x, "animateErrorIcon");
                m.removeClass(x.querySelector(".sa-x-mark"), "animateXMark");
                var y = z.querySelector(".sa-icon.sa-warning");
                m.removeClass(y, "pulseWarning");
                m.removeClass(y.querySelector(".sa-body"), "pulseWarningIns");
                m.removeClass(y.querySelector(".sa-dot"), "pulseWarningIns");
                setTimeout(function () {
                    var A = z.getAttribute("data-custom-class");
                    m.removeClass(z, A)
                }, 300);
                m.removeClass(a.body, "stop-scrolling");
                b.onkeydown = u;
                if (b.previousActiveElement) {
                    b.previousActiveElement.focus()
                }
                q = d;
                clearTimeout(z.timeout);
                return true
            };
            h.showInputError = o.showInputError = function (x) {
                var z = l.getModal();
                var w = z.querySelector(".sa-input-error");
                m.addClass(w, "show");
                var y = z.querySelector(".sa-error-container");
                m.addClass(y, "show");
                y.querySelector("p").innerHTML = x;
                setTimeout(function () {
                    h.enableButtons()
                }, 1);
                z.querySelector("input").focus()
            };
            h.resetInputError = o.resetInputError = function (z) {
                if (z && z.keyCode === 13) {
                    return false
                }
                var x = l.getModal();
                var w = x.querySelector(".sa-input-error");
                m.removeClass(w, "show");
                var y = x.querySelector(".sa-error-container");
                m.removeClass(y, "show")
            };
            h.disableButtons = o.disableButtons = function (z) {
                var y = l.getModal();
                var x = y.querySelector("button.confirm");
                var w = y.querySelector("button.cancel");
                x.disabled = true;
                w.disabled = true
            };
            h.enableButtons = o.enableButtons = function (z) {
                var y = l.getModal();
                var x = y.querySelector("button.confirm");
                var w = y.querySelector("button.cancel");
                x.disabled = false;
                w.disabled = false
            };
            if (typeof b !== "undefined") {
                b.sweetAlert = b.swal = h
            } else {
                n.logStr("SweetAlert is a frontend module!")
            }
            e.exports = s["default"]
        }, {
            "./modules/default-params": 2,
            "./modules/handle-click": 3,
            "./modules/handle-dom": 4,
            "./modules/handle-key": 5,
            "./modules/handle-swal-dom": 6,
            "./modules/set-params": 8,
            "./modules/utils": 9
        }],
        2: [function (f, g, e) {
            Object.defineProperty(e, "__esModule", {
                value: true
            });
            var h = {
                title: "",
                text: "",
                type: null,
                allowOutsideClick: false,
                showConfirmButton: true,
                showCancelButton: false,
                closeOnConfirm: true,
                closeOnCancel: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#8CD4F5",
                cancelButtonText: "Cancel",
                imageUrl: null,
                imageSize: null,
                timer: null,
                customClass: "",
                html: false,
                animation: true,
                allowEscapeKey: true,
                inputType: "text",
                inputPlaceholder: "",
                inputValue: "",
                showLoaderOnConfirm: false
            };
            e["default"] = h;
            g.exports = e["default"]
        }, {}],
        3: [function (h, e, j) {
            Object.defineProperty(j, "__esModule", {
                value: true
            });
            var f = h("./utils");
            var k = h("./handle-swal-dom");
            var m = h("./handle-dom");
            var g = function g(o, t, C) {
                var x = o || b.event;
                var y = x.target || x.srcElement;
                var z = y.className.indexOf("confirm") !== -1;
                var D = y.className.indexOf("sweet-overlay") !== -1;
                var p = m.hasClass(C, "visible");
                var v = t.doneFunction && C.getAttribute("data-has-done-function") === "true";
                var s, w, A;
                if (z && t.confirmButtonColor) {
                    s = t.confirmButtonColor;
                    w = f.colorLuminance(s, -0.04);
                    A = f.colorLuminance(s, -0.14)
                }

                function r(E) {
                    if (z && t.confirmButtonColor) {
                        y.style.backgroundColor = E
                    }
                }
                switch (x.type) {
                    case "mouseover":
                        r(w);
                        break;
                    case "mouseout":
                        r(s);
                        break;
                    case "mousedown":
                        r(A);
                        break;
                    case "mouseup":
                        r(w);
                        break;
                    case "focus":
                        var B = C.querySelector("button.confirm");
                        var u = C.querySelector("button.cancel");
                        if (z) {
                            u.style.boxShadow = "none"
                        } else {
                            B.style.boxShadow = "none"
                        }
                        break;
                    case "click":
                        var n = C === y;
                        var q = m.isDescendant(C, y);
                        if (!n && !q && p && !t.allowOutsideClick) {
                            break
                        }
                        if (z && v && p) {
                            i(C, t)
                        } else {
                            if (v && p || D) {
                                l(C, t)
                            } else {
                                if (m.isDescendant(C, y) && y.tagName === "BUTTON") {
                                    sweetAlert.close()
                                }
                            }
                        }
                        break
                }
            };
            var i = function i(o, p) {
                var n = true;
                if (m.hasClass(o, "show-input")) {
                    n = o.querySelector("input").value;
                    if (!n) {
                        n = ""
                    }
                }
                p.doneFunction(n);
                if (p.closeOnConfirm) {
                    sweetAlert.close()
                }
                if (p.showLoaderOnConfirm) {
                    sweetAlert.disableButtons()
                }
            };
            var l = function l(p, q) {
                var n = String(q.doneFunction).replace(/\s/g, "");
                var o = n.substring(0, 9) === "function(" && n.substring(9, 10) !== ")";
                if (o) {
                    q.doneFunction(false)
                }
                if (q.closeOnCancel) {
                    sweetAlert.close()
                }
            };
            j["default"] = {
                handleButton: g,
                handleConfirm: i,
                handleCancel: l
            };
            e.exports = j["default"]
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6,
            "./utils": 9
        }],
        4: [function (h, f, i) {
            Object.defineProperty(i, "__esModule", {
                value: true
            });
            var k = function k(w, v) {
                return new RegExp(" " + v + " ").test(" " + w.className + " ")
            };
            var p = function p(w, v) {
                if (!k(w, v)) {
                    w.className += " " + v
                }
            };
            var t = function t(w, v) {
                var x = " " + w.className.replace(/[\t\r\n]/g, " ") + " ";
                if (k(w, v)) {
                    while (x.indexOf(" " + v + " ") >= 0) {
                        x = x.replace(" " + v + " ", " ")
                    }
                    w.className = x.replace(/^\s+|\s+$/g, "")
                }
            };
            var j = function j(v) {
                var w = a.createElement("div");
                w.appendChild(a.createTextNode(v));
                return w.innerHTML
            };
            var o = function o(v) {
                v.style.opacity = "";
                v.style.display = "block"
            };
            var s = function s(v) {
                if (v && !v.length) {
                    return o(v)
                }
                for (var w = 0; w < v.length; ++w) {
                    o(v[w])
                }
            };
            var g = function g(v) {
                v.style.opacity = "";
                v.style.display = "none"
            };
            var m = function m(v) {
                if (v && !v.length) {
                    return g(v)
                }
                for (var w = 0; w < v.length; ++w) {
                    g(v[w])
                }
            };
            var q = function q(v, x) {
                var w = x.parentNode;
                while (w !== null) {
                    if (w === v) {
                        return true
                    }
                    w = w.parentNode
                }
                return false
            };
            var u = function u(w) {
                w.style.left = "-9999px";
                w.style.display = "block";
                var v = w.clientHeight,
                    x;
                if (typeof getComputedStyle !== "undefined") {
                    x = parseInt(getComputedStyle(w).getPropertyValue("padding-top"), 10)
                } else {
                    x = parseInt(w.currentStyle.padding)
                }
                w.style.left = "";
                w.style.display = "none";
                return "-" + parseInt((v + x) / 2) + "px"
            };
            var n = function n(y, v) {
                if (+y.style.opacity < 1) {
                    v = v || 16;
                    y.style.opacity = 0;
                    y.style.display = "block";
                    var x = +new Date();
                    var w = (function (z) {
                        function A() {
                            return z.apply(this, arguments)
                        }
                        A.toString = function () {
                            return z.toString()
                        };
                        return A
                    })(function () {
                        y.style.opacity = +y.style.opacity + (new Date() - x) / 100;
                        x = +new Date();
                        if (+y.style.opacity < 1) {
                            setTimeout(w, v)
                        }
                    });
                    w()
                }
                y.style.display = "block"
            };
            var l = function l(y, v) {
                v = v || 16;
                y.style.opacity = 1;
                var x = +new Date();
                var w = (function (z) {
                    function A() {
                        return z.apply(this, arguments)
                    }
                    A.toString = function () {
                        return z.toString()
                    };
                    return A
                })(function () {
                    y.style.opacity = +y.style.opacity - (new Date() - x) / 100;
                    x = +new Date();
                    if (+y.style.opacity > 0) {
                        setTimeout(w, v)
                    } else {
                        y.style.display = "none"
                    }
                });
                w()
            };
            var r = function r(x) {
                if (typeof MouseEvent === "function") {
                    var w = new MouseEvent("click", {
                        view: b,
                        bubbles: false,
                        cancelable: true
                    });
                    x.dispatchEvent(w)
                } else {
                    if (a.createEvent) {
                        var v = a.createEvent("MouseEvents");
                        v.initEvent("click", false, false);
                        x.dispatchEvent(v)
                    } else {
                        if (a.createEventObject) {
                            x.fireEvent("onclick")
                        } else {
                            if (typeof x.onclick === "function") {
                                x.onclick()
                            }
                        }
                    }
                }
            };
            var e = function e(v) {
                if (typeof v.stopPropagation === "function") {
                    v.stopPropagation();
                    v.preventDefault()
                } else {
                    if (b.event && b.event.hasOwnProperty("cancelBubble")) {
                        b.event.cancelBubble = true
                    }
                }
            };
            i.hasClass = k;
            i.addClass = p;
            i.removeClass = t;
            i.escapeHtml = j;
            i._show = o;
            i.show = s;
            i._hide = g;
            i.hide = m;
            i.isDescendant = q;
            i.getTopMargin = u;
            i.fadeIn = n;
            i.fadeOut = l;
            i.fireClick = r;
            i.stopEventPropagation = e
        }, {}],
        5: [function (g, i, e) {
            Object.defineProperty(e, "__esModule", {
                value: true
            });
            var h = g("./handle-dom");
            var j = g("./handle-swal-dom");
            var f = function f(k, o, t) {
                var s = k || b.event;
                var u = s.keyCode || s.which;
                var l = t.querySelector("button.confirm");
                var p = t.querySelector("button.cancel");
                var m = t.querySelectorAll("button[tabindex]");
                if ([9, 13, 32, 27].indexOf(u) === -1) {
                    return
                }
                var r = s.target || s.srcElement;
                var n = -1;
                for (var q = 0; q < m.length; q++) {
                    if (r === m[q]) {
                        n = q;
                        break
                    }
                }
                if (u === 9) {
                    if (n === -1) {
                        r = l
                    } else {
                        if (n === m.length - 1) {
                            r = m[0]
                        } else {
                            r = m[n + 1]
                        }
                    }
                    h.stopEventPropagation(s);
                    r.focus();
                    if (o.confirmButtonColor) {
                        j.setFocusStyle(r, o.confirmButtonColor)
                    }
                } else {
                    if (u === 13) {
                        if (r.tagName === "INPUT") {
                            r = l;
                            l.focus()
                        }
                        if (n === -1) {
                            r = l
                        } else {
                            r = d
                        }
                    } else {
                        if (u === 27 && o.allowEscapeKey === true) {
                            r = p;
                            h.fireClick(r, s)
                        } else {
                            r = d
                        }
                    }
                }
            };
            e["default"] = f;
            i.exports = e["default"]
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6
        }],
        6: [function (p, h, w) {
            var v = function (z) {
                return z && z.__esModule ? z : {
                    "default": z
                }
            };
            Object.defineProperty(w, "__esModule", {
                value: true
            });
            var g = p("./utils");
            var x = p("./handle-dom");
            var j = p("./default-params");
            var y = v(j);
            var t = p("./injected-html");
            var q = v(t);
            var k = ".sweet-alert";
            var f = ".sweet-overlay";
            var m = function m() {
                var z = a.createElement("div");
                z.innerHTML = q["default"];
                while (z.firstChild) {
                    a.body.appendChild(z.firstChild)
                }
            };
            var n = (function (A) {
                function z() {
                    return A.apply(this, arguments)
                }
                z.toString = function () {
                    return A.toString()
                };
                return z
            })(function () {
                var z = a.querySelector(k);
                if (!z) {
                    m();
                    z = n()
                }
                return z
            });
            var u = function u() {
                var z = n();
                if (z) {
                    return z.querySelector("input")
                }
            };
            var e = function e() {
                return a.querySelector(f)
            };
            var r = function r(B, A) {
                var z = g.hexToRgb(A);
                B.style.boxShadow = "0 0 2px rgba(" + z + ", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"
            };
            var o = function o(D) {
                var z = n();
                x.fadeIn(e(), 10);
                x.show(z);
                x.addClass(z, "showSweetAlert");
                x.removeClass(z, "hideSweetAlert");
                b.previousActiveElement = a.activeElement;
                var A = z.querySelector("button.confirm");
                A.focus();
                setTimeout(function () {
                    x.addClass(z, "visible")
                }, 500);
                var C = z.getAttribute("data-timer");
                if (C !== "null" && C !== "") {
                    var B = D;
                    z.timeout = setTimeout(function () {
                        var E = (B || null) && z.getAttribute("data-has-done-function") === "true";
                        if (E) {
                            B(null)
                        } else {
                            sweetAlert.close()
                        }
                    }, C)
                }
            };
            var i = function i() {
                var z = n();
                var A = u();
                x.removeClass(z, "show-input");
                A.value = y["default"].inputValue;
                A.setAttribute("type", y["default"].inputType);
                A.setAttribute("placeholder", y["default"].inputPlaceholder);
                l()
            };
            var l = function l(C) {
                if (C && C.keyCode === 13) {
                    return false
                }
                var A = n();
                var z = A.querySelector(".sa-input-error");
                x.removeClass(z, "show");
                var B = A.querySelector(".sa-error-container");
                x.removeClass(B, "show")
            };
            var s = function s() {
                var z = n();
                z.style.marginTop = x.getTopMargin(n())
            };
            w.sweetAlertInitialize = m;
            w.getModal = n;
            w.getOverlay = e;
            w.getInput = u;
            w.setFocusStyle = r;
            w.openModal = o;
            w.resetInput = i;
            w.resetInputError = l;
            w.fixVerticalPosition = s
        }, {
            "./default-params": 2,
            "./handle-dom": 4,
            "./injected-html": 7,
            "./utils": 9
        }],
        7: [function (g, h, f) {
            Object.defineProperty(f, "__esModule", {
                value: true
            });
            var e = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';
            f["default"] = e;
            h.exports = f["default"]
        }, {}],
        8: [function (g, j, e) {
            Object.defineProperty(e, "__esModule", {
                value: true
            });
            var f = g("./utils");
            var k = g("./handle-swal-dom");
            var i = g("./handle-dom");
            var l = ["error", "warning", "info", "success", "input", "prompt"];
            var h = function h(o) {
                var x = k.getModal();
                var t = x.querySelector("h2");
                var u = x.querySelector("p");
                var p = x.querySelector("button.cancel");
                var A = x.querySelector("button.confirm");
                t.innerHTML = o.html ? o.title : i.escapeHtml(o.title).split("\n").join("<br>");
                u.innerHTML = o.html ? o.text : i.escapeHtml(o.text || "").split("\n").join("<br>");
                if (o.text) {
                    i.show(u)
                }
                if (o.customClass) {
                    i.addClass(x, o.customClass);
                    x.setAttribute("data-custom-class", o.customClass)
                } else {
                    var z = x.getAttribute("data-custom-class");
                    i.removeClass(x, z);
                    x.setAttribute("data-custom-class", "")
                }
                i.hide(x.querySelectorAll(".sa-icon"));
                if (o.type && !f.isIE8()) {
                    var w = (function () {
                        var D = false;
                        for (var C = 0; C < l.length; C++) {
                            if (o.type === l[C]) {
                                D = true;
                                break
                            }
                        }
                        if (!D) {
                            logStr("Unknown alert type: " + o.type);
                            return {
                                v: false
                            }
                        }
                        var E = ["success", "error", "warning", "info"];
                        var B = d;
                        if (E.indexOf(o.type) !== -1) {
                            B = x.querySelector(".sa-icon.sa-" + o.type);
                            i.show(B)
                        }
                        var F = k.getInput();
                        switch (o.type) {
                            case "success":
                                i.addClass(B, "animate");
                                i.addClass(B.querySelector(".sa-tip"), "animateSuccessTip");
                                i.addClass(B.querySelector(".sa-long"), "animateSuccessLong");
                                break;
                            case "error":
                                i.addClass(B, "animateErrorIcon");
                                i.addClass(B.querySelector(".sa-x-mark"), "animateXMark");
                                break;
                            case "warning":
                                i.addClass(B, "pulseWarning");
                                i.addClass(B.querySelector(".sa-body"), "pulseWarningIns");
                                i.addClass(B.querySelector(".sa-dot"), "pulseWarningIns");
                                break;
                            case "input":
                            case "prompt":
                                F.setAttribute("type", o.inputType);
                                F.value = o.inputValue;
                                F.setAttribute("placeholder", o.inputPlaceholder);
                                i.addClass(x, "show-input");
                                setTimeout(function () {
                                    F.focus();
                                    F.addEventListener("keyup", swal.resetInputError)
                                }, 400);
                                break
                        }
                    })();
                    if (typeof w === "object") {
                        return w.v
                    }
                }
                if (o.imageUrl) {
                    var y = x.querySelector(".sa-icon.sa-custom");
                    y.style.backgroundImage = "url(" + o.imageUrl + ")";
                    i.show(y);
                    var v = 80;
                    var q = 80;
                    if (o.imageSize) {
                        var m = o.imageSize.toString().split("x");
                        var s = m[0];
                        var r = m[1];
                        if (!s || !r) {
                            logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + o.imageSize)
                        } else {
                            v = s;
                            q = r
                        }
                    }
                    y.setAttribute("style", y.getAttribute("style") + "width:" + v + "px; height:" + q + "px")
                }
                x.setAttribute("data-has-cancel-button", o.showCancelButton);
                if (o.showCancelButton) {
                    p.style.display = "inline-block"
                } else {
                    i.hide(p)
                }
                x.setAttribute("data-has-confirm-button", o.showConfirmButton);
                if (o.showConfirmButton) {
                    A.style.display = "inline-block"
                } else {
                    i.hide(A)
                }
                if (o.cancelButtonText) {
                    p.innerHTML = i.escapeHtml(o.cancelButtonText)
                }
                if (o.confirmButtonText) {
                    A.innerHTML = i.escapeHtml(o.confirmButtonText)
                }
                if (o.confirmButtonColor) {
                    A.style.backgroundColor = o.confirmButtonColor;
                    A.style.borderLeftColor = o.confirmLoadingButtonColor;
                    A.style.borderRightColor = o.confirmLoadingButtonColor;
                    k.setFocusStyle(A, o.confirmButtonColor)
                }
                x.setAttribute("data-allow-outside-click", o.allowOutsideClick);
                var n = o.doneFunction ? true : false;
                x.setAttribute("data-has-done-function", n);
                if (!o.animation) {
                    x.setAttribute("data-animation", "none")
                } else {
                    if (typeof o.animation === "string") {
                        x.setAttribute("data-animation", o.animation)
                    } else {
                        x.setAttribute("data-animation", "pop")
                    }
                }
                x.setAttribute("data-timer", o.timer)
            };
            e["default"] = h;
            j.exports = e["default"]
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6,
            "./utils": 9
        }],
        9: [function (h, j, f) {
            Object.defineProperty(f, "__esModule", {
                value: true
            });
            var l = function l(n, m) {
                for (var o in m) {
                    if (m.hasOwnProperty(o)) {
                        n[o] = m[o]
                    }
                }
                return n
            };
            var e = function e(n) {
                var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);
                return m ? parseInt(m[1], 16) + ", " + parseInt(m[2], 16) + ", " + parseInt(m[3], 16) : null
            };
            var k = function k() {
                return b.attachEvent && !b.addEventListener
            };
            var g = function g(m) {
                if (b.console) {
                    b.console.log("SweetAlert: " + m)
                }
            };
            var i = function i(p, m) {
                p = String(p).replace(/[^0-9a-f]/gi, "");
                if (p.length < 6) {
                    p = p[0] + p[0] + p[1] + p[1] + p[2] + p[2]
                }
                m = m || 0;
                var n = "#";
                var q;
                var o;
                for (o = 0; o < 3; o++) {
                    q = parseInt(p.substr(o * 2, 2), 16);
                    q = Math.round(Math.min(Math.max(0, q + q * m), 255)).toString(16);
                    n += ("00" + q).substr(q.length)
                }
                return n
            };
            f.extend = l;
            f.hexToRgb = e;
            f.isIE8 = k;
            f.logStr = g;
            f.colorLuminance = i
        }, {}]
    }, {}, [1]);
    if (typeof define === "function" && define.amd) {
        define(function () {
            return sweetAlert
        })
    } else {
        if (typeof module !== "undefined" && module.exports) {
            module.exports = sweetAlert
        }
    }
})(window, document);