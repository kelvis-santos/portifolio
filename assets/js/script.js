!function(p, u, d) {
    "use strict";
    function t() {
        p(d).trigger("joinchat:starting");
        var t, o, e = 1e3 * joinchat_obj.settings.button_delay, n = 1e3 * joinchat_obj.settings.message_delay, i = !!joinchat_obj.settings.message_hash, a = !!joinchat_obj.$(".joinchat__box").length, s = parseInt(joinchat_obj.store.getItem("joinchat_views") || 1) >= joinchat_obj.settings.message_views, h = -1 !== (joinchat_obj.store.getItem("joinchat_hashes") || "").split(",").filter(Boolean).indexOf(joinchat_obj.settings.message_hash || "none");
        function c() {
            clearTimeout(o),
            joinchat_obj.chatbox_show()
        }
        function j() {
            joinchat_obj.save_hash(),
            joinchat_obj.chatbox_hide()
        }
        var _, r, b, l = "joinchat--show";
        function g() {
            var t = (d.activeElement.type || "").toLowerCase();
            0 <= ["date", "datetime", "email", "month", "number", "password", "search", "tel", "text", "textarea", "time", "url", "week"].indexOf(t) ? joinchat_obj.chatbox ? (joinchat_obj.chatbox_hide(),
            setTimeout(function() {
                joinchat_obj.$div.removeClass("joinchat--show")
            }, 400)) : joinchat_obj.$div.removeClass("joinchat--show") : joinchat_obj.$div.addClass("joinchat--show")
        }
        h || i && n && !joinchat_obj.settings.message_badge && s || (l += " joinchat--tooltip"),
        setTimeout(function() {
            joinchat_obj.$div.addClass(l)
        }, e),
        i && !h && n && (joinchat_obj.settings.message_badge ? o = setTimeout(function() {
            joinchat_obj.$(".joinchat__badge").addClass("joinchat__badge--in")
        }, e + n) : s && (o = setTimeout(c, e + n))),
        a && !joinchat_obj.is_mobile && joinchat_obj.$(".joinchat__button").on("mouseenter", function() {
            t = setTimeout(c, 1500)
        }).on("mouseleave", function() {
            clearTimeout(t)
        }),
        joinchat_obj.$(".joinchat__button").on("click", function() {
            a && !joinchat_obj.chatbox ? c() : (j(),
            joinchat_obj.open_whatsapp())
        }),
        joinchat_obj.$(".joinchat__close").on("click", j),
        joinchat_obj.$(".joinchat__box__scroll").on("mousewheel DOMMouseScroll", function(t) {
            t.preventDefault();
            t = t.originalEvent.wheelDelta || -t.originalEvent.detail;
            this.scrollTop += 30 * (t < 0 ? 1 : -1)
        }),
        joinchat_obj.is_mobile && (p(d).on("focus blur", "input, textarea", function(t) {
            p(t.target).closest(joinchat_obj.$div).length || (clearTimeout(_),
            _ = setTimeout(g, 200))
        }),
        p(u).on("resize", function() {
            clearTimeout(r),
            r = setTimeout(function() {
                joinchat_obj.$div[0].style.setProperty("--vh", window.innerHeight + "px")
            }, 200)
        }).trigger("resize")),
        p(d).on("click", '.joinchat_open, .joinchat_app, a[href="#joinchat"], a[href="#whatsapp"]', function(t) {
            t.preventDefault(),
            !a || p(this).is('.joinchat_app, a[href="#whatsapp"]') ? joinchat_obj.open_whatsapp() : c()
        }),
        p(d).on("click", ".joinchat_close", function(t) {
            t.preventDefault(),
            joinchat_obj.chatbox_hide()
        }),
        a && "IntersectionObserver"in u && (0 < (n = p(".joinchat_show, .joinchat_force_show")).length && (b = new IntersectionObserver(function(t) {
            p.each(t, function() {
                if (0 < this.intersectionRatio && (!h || p(this.target).hasClass("joinchat_force_show")))
                    return c(),
                    b.disconnect(),
                    !1
            })
        }
        ),
        n.each(function() {
            b.observe(this)
        }))),
        a && joinchat_obj.$div.css("--peak", "url(#joinchat__message__peak)"),
        p(d).trigger("joinchat:start")
    }
    u.joinchat_obj = u.joinchat_obj || {},
    joinchat_obj = p.extend({
        $div: null,
        settings: null,
        store: null,
        chatbox: !1,
        is_mobile: !1
    }, joinchat_obj),
    joinchat_obj.$ = function(t) {
        return p(t || this.$div, this.$div)
    }
    ,
    joinchat_obj.send_event = function(o, e) {
        o = o || "",
        e = e || "click";
        var n, t = u[this.settings.ga_tracker] || u.ga || u.__gaTracker, i = u[this.settings.data_layer] || u.dataLayer;
        "function" == typeof t && "function" == typeof t.getAll && (t("set", "transport", "beacon"),
        t.getAll().forEach(function(t) {
            t.send("event", "JoinChat", e, o)
        })),
        "function" == typeof gtag && "object" == typeof i && (n = !1,
        i.forEach(function(t) {
            "config" == t[0] && "G-" == t[1].substring(0, 2) && (n = t[1])
        }),
        n && gtag("event", e, {
            event_category: "JoinChat",
            event_label: o,
            send_to: n,
            transport_type: "beacon"
        })),
        "object" == typeof i && i.push({
            event: "JoinChat",
            eventAction: e,
            eventLabel: o
        }),
        "function" == typeof fbq && fbq("trackCustom", "JoinChat", {
            eventAction: e,
            eventLabel: o
        })
    }
    ,
    joinchat_obj.whatsapp_link = function(t, o, e) {
        return ((e = void 0 !== e ? e : this.settings.whatsapp_web && !this.is_mobile) ? "https://web.whatsapp.com/send" : "https://api.whatsapp.com/send") + "?phone=" + encodeURIComponent(t) + "&text=" + encodeURIComponent(o || "")
    }
    ,
    joinchat_obj.chatbox_show = function() {
        this.chatbox || (this.chatbox = !0,
        this.$div.addClass("joinchat--chatbox"),
        this.settings.message_badge && this.$(".joinchat__badge").hasClass("joinchat__badge--in") && this.$(".joinchat__badge").toggleClass("joinchat__badge--in joinchat__badge--out"),
        p(d).trigger("joinchat:show"))
    }
    ,
    joinchat_obj.chatbox_hide = function() {
        this.chatbox && (this.chatbox = !1,
        this.$div.removeClass("joinchat--chatbox joinchat--tooltip"),
        this.settings.message_badge && this.$(".joinchat__badge").removeClass("joinchat__badge--out"),
        p(d).trigger("joinchat:hide"))
    }
    ,
    joinchat_obj.save_hash = function() {
        var t = this.settings.message_hash || "none"
          , o = (this.store.getItem("joinchat_hashes") || "").split(",").filter(Boolean);
        -1 === o.indexOf(t) && (o.push(t),
        this.store.setItem("joinchat_hashes", o.join(",")))
    }
    ,
    joinchat_obj.open_whatsapp = function(t, o) {
        t = {
            link: this.whatsapp_link(t || this.settings.telephone, o || this.settings.message_send)
        },
        o = new RegExp("^https?://(wa.me|(api|web|chat).whatsapp.com|" + location.hostname.replace(".", ".") + ")/.*","i");
        p(d).trigger("joinchat:open", [t, this.settings]),
        o.test(t.link) ? (this.send_event(t.link),
        u.open(t.link, "joinchat", "noopener")) : console.error("Join.chat: the link doesn't seem safe, it must point to the current domain or whatsapp.com")
    }
    ;
    var o, e = (o = function() {
        if (joinchat_obj.$div = p(".joinchat"),
        joinchat_obj.$div.length) {
            joinchat_obj.settings = joinchat_obj.$div.data("settings"),
            joinchat_obj.is_mobile = !!navigator.userAgent.match(/Android|iPhone|BlackBerry|IEMobile|Opera Mini/i);
            try {
                localStorage.setItem("test", 1),
                localStorage.removeItem("test"),
                joinchat_obj.store = localStorage
            } catch (t) {
                joinchat_obj.store = {
                    _data: {},
                    setItem: function(t, o) {
                        this._data[t] = String(o)
                    },
                    getItem: function(t) {
                        return this._data.hasOwnProperty(t) ? this._data[t] : null
                    }
                }
            }
            if ("object" != typeof joinchat_obj.settings)
                try {
                    joinchat_obj.settings = JSON.parse(joinchat_obj.$div.attr("data-settings"))
                } catch (t) {
                    joinchat_obj.settings = void 0,
                    console.error("Join.chat: can't get settings")
                }
            joinchat_obj.settings && joinchat_obj.settings.telephone && (joinchat_obj.is_mobile || !joinchat_obj.settings.mobile_only ? t() : p(d).on("click", '.joinchat_open, .joinchat_app, a[href="#joinchat"], a[href="#whatsapp"]', function(t) {
                t.preventDefault(),
                joinchat_obj.open_whatsapp()
            })),
            joinchat_obj.store.setItem("joinchat_views", parseInt(joinchat_obj.store.getItem("joinchat_views") || 0) + 1)
        }
    }
    ,
    function() {
        o && o.apply(this, arguments),
        o = null
    }
    );
    p(e),
    p(u).on("load", e),
    d.addEventListener("DOMContentLoaded", e)
}(jQuery, window, document);
