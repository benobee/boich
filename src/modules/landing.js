import $ from "jquery";

/* This module is used to contorl the behaviour of
the first initial full page branding screen. It is triggered
once per session and only on the home where the code lives in the 
home page collection header injection. */

//basic session storage module 
const Session = {
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        const item = sessionStorage.getItem(key);

        return JSON.parse(item);
    }
};

const Landing = {
    init() {
        this.sessionState();
        this.cacheDOM();

        if (this.isFirstSession) {
            this.branding.classList.add("active");
            this.body.classList.add("branding-landing-screen");
            this.animations();
            this.detect();
            this.events();
        } else {
            this.body.classList.add("has-visited");
        }
    },
    cacheDOM() {
        this.body = document.querySelector("body");
        this.button = this.body.querySelector(".landing-screen .button");
        this.branding = this.body.querySelector(".landing-screen");
    },
    animations() {
        this.branding.classList.add("SMIL");
    },
    detect() {
        // Internet Explorer 6-11
        const isIE = /*@cc_on!@*/ false || !!document.documentMode;

        // Edge 20+
        const isEdge = !isIE && !!window.StyleMedia;

        if (!(isIE || isEdge)) {
            this.branding.classList.add("compatible");
        } else {
            this.branding.classList.add("incompatible");
        }
    },
    sessionState() {
        this.isFirstSession = false;

        const state = Session.get("first-session-visite");

        if (state === null) {
            this.isFirstSession = true;
        }
    },
    events() {
        $(this.button).on("click", () => {
            this.branding.classList.add("transition-out");
            this.body.classList.add("has-visited");

            setTimeout(() => {
                this.body.classList.remove("branding-landing-screen");
                this.branding.classList.remove("active");
            }, 1500);

            Session.set("first-session-visite", false);
        });
    }
};

export default Landing;