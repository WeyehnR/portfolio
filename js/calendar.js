import {CAL_CONFIG} from './config.js'

export function initCalendar() {
    const calendarContainer = document.querySelector(CAL_CONFIG.elementSelector);
    const scheduleBtn = document.getElementById('schedule-btn');

    if (!calendarContainer || !scheduleBtn) return;

    // Set the cal link dynamically from config
    scheduleBtn.setAttribute('data-cal-link', CAL_CONFIG.calLink);

    // Official Cal.com initialization pattern
    (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                d.head.appendChild(d.createElement("script")).src = A;
                cal.loaded = true;
            }
            if (ar[0] === L) {
                const api = function () { p(api, arguments); };
                const namespace = ar[1];
                api.q = api.q || [];
                typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
                return;
            }
            p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", {origin: "https://cal.com"});

    // Use popup modal instead of inline
    Cal("ui", {
        styles: {
            branding: {
                brandColor: "#10b981"
            }
        },
        hideEventTypeDetails: false
    });
}