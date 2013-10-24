(function() {
    var s, n, t, k, b, u, c, f, l, m, p, q, r;
    String.prototype.endsWith = function(a) {
        return -1 !== this.indexOf(a, this.length - a.length);
    };
    Function.prototype.property = function(a, d) {
        return Object.defineProperty(this.prototype, a, d);
    };
    k = [];
    b = -1;
    c = [];
    m = l = 10;
    u = /[^\d.-]/g;
    t = Titanium.Platform.displayCaps.dpi / 160;
    f = function(a, d) {
        var e, c;
        c = a + "";
        e = parseFloat(c.replace(u, ""));
        return c.endsWith("dp") ? e * t : c.endsWith("%") ? d * (e / 100) : e;
    };
    s = function() {
        return function(a, d) {
            this.representsContainer = a;
            this.dragContainer = d;
        };
    }();
    n = function() {
        function a(a, c, b) {
            this.view = a;
            this.container = c;
            this.allowedToDrag = null != b ? b : function() {
                return !0;
            };
        }
        a.prototype.canEscapeContainer = !0;
        a.prototype.direction = "xy";
        a.prototype.cachedPosition = {
            x: 0,
            y: 0
        };
        a.prototype.cachePosition = function() {
            this.cachedPosition.x = this.x;
            return this.cachedPosition.y = this.y;
        };
        a.property("x", {
            get: function() {
                return f(this.view.rect.x, f(this.container.rect.width));
            },
            set: function(a) {
                return null != this.view.left ? this.view.left = a : null != this.view.right ? this.view.right = f(this.container.rect.width - f(this.view.width)) - a : this.view.left = a;
            }
        });
        a.property("y", {
            get: function() {
                return f(this.view.rect.y, f(this.container.rect.height));
            },
            set: function(a) {
                return null != this.view.top ? this.view.top = a : null != this.view.bottom ? this.view.bottom = f(this.container.rect.height - f(this.view.height)) - a : this.view.top = a;
            }
        });
        a.property("w", {
            get: function() {
                return f(this.view.rect.width, f(this.container.rect.width));
            }
        });
        a.property("h", {
            get: function() {
                return f(this.view.rect.height, f(this.container.rect.height));
            }
        });
        return a;
    }();
    r = function(a) {
        var d, e, h, f, g;
        for (f = g = c.length - 1; g >= 0; f = g += -1) if (h = c[f], d = a.x, e = a.y, 
        l = d, m = e, d = d > h.x && h.x + h.w > d, e = e > h.y && h.y + h.h > e, d && e) {
            l = a.x;
            m = a.y;
            h.cachePosition();
            b = parseInt(f);
            c[b].view.fireEvent("touchstart", {
                x: a.x,
                y: a.y,
                source: c[b].view
            });
            break;
        }
    };
    p = function(a) {
        b > -1 && (c[b].view.fireEvent("touchend", {
            x: a.x,
            y: a.y,
            source: c[b].view
        }), b = -1);
    };
    q = function(a) {
        var d, e;
        e = d = null;
        if (b > -1 && (-1 !== c[b].direction.indexOf("x") && (d = c[b].cachedPosition.x + a.x - l), 
        -1 !== c[b].direction.indexOf("y") && (e = c[b].cachedPosition.y + a.y - m), c[b].allowedToDrag.call(c[b].view, {
            left: d,
            top: e
        }) && (c[b].canEscapeContainer || (0 > d && (d = c[b].x), 0 > e && (e = c[b].y), 
        d + c[b].w > f(c[b].container.rect.width) && (d = c[b].x), e + c[b].h > f(c[b].container.rect.height) && (e = c[b].y)), 
        c[b].view.fireEvent("touchmove", {
            x: a.x,
            y: a.y,
            source: c[b].view
        }), c[b].view.fireEvent("dragmove", {
            x: a.x,
            y: a.y,
            source: c[b].view
        }), null !== d && (c[b].x = d), null !== e))) return c[b].y = e;
    };
    exports.attach = function(a) {
        var d, e, b, f, g, l;
        e = "xy";
        null != a.direction && (e = a.direction.toLowerCase());
        d = null;
        g = 0;
        for (l = k.length; l > g; g++) b = k[g], b.representsContainer === a.container && (d = b);
        null === d && (b = null != a.dragContainer ? a.dragContainer : Ti.UI.createView({
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 9999
        }), d = new s(a.container, b), k.push(d), a.container.add(b), b.addEventListener("touchend", p), 
        b.addEventListener("touchstart", r), b.addEventListener("touchmove", q));
        d = !1;
        for (f in c) if (f.view === a.view) {
            d = !0;
            break;
        }
        if (!d) return b = null != a.allowedToDrag ? new n(a.view, a.container, a.allowedToDrag) : new n(a.view, a.container), 
        null != a.canEscapeContainer && (b.canEscapeContainer = a.canEscapeContainer), b.direction = e, 
        c.push(b);
    };
    exports.preventDefault = function(a) {
        if (c[b].view === a) return b = -1;
    };
    exports.detach = function(a) {
        var d, e;
        for (e = 0; c.length > e; ) {
            d = c[e];
            if (d.view === a) {
                c.splice(e, 1);
                break;
            }
            e++;
        }
        if (0 === c.length) {
            a = 0;
            for (e = k.length; e > a; a++) d = k[a], d = d.dragContainer, d.removeEventListener("touchstart", r), 
            d.removeEventListener("touchend", p), d.removeEventListener("touchmove", q), container.remove(d);
            b = -1;
            return k = [];
        }
    };
    return exports.detachAll = function() {
        var a, b, e, f;
        e = 0;
        a = c.slice(0);
        for (f = []; a.length > e; ) b = a[e], exports.detach(b.view), f.push(e++);
        return f;
    };
})();