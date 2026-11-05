/* ═══════════════════════════════════════════════════════════
   MASCOTS — draggable pixel friends that also wander on their own
   Pointer Events + transform, zero dependencies.
   Any element with [data-mascot] becomes draggable.
   ═══════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    var EDGE = 8; // padding from the page edges
    var WANDER_MIN = 5000; // ms between idle moves
    var WANDER_MAX = 11000;
    var COOLDOWN = 9000; // pause after the user drags her
    var GLIDE = 2600; // must match the .is-gliding transition

    var reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    function random(min, max) {
        return min + Math.random() * (max - min);
    }

    document.querySelectorAll("[data-mascot]").forEach(function (el) {
        var x = 0;
        var y = 0;
        var dragging = false;
        var grabX = 0;
        var grabY = 0;
        var timer = null;
        var glideTimer = null;
        var quietUntil = 0;

        function maxX() {
            return Math.max(
                EDGE,
                document.documentElement.scrollWidth - el.offsetWidth - EDGE,
            );
        }

        function maxY() {
            return Math.max(
                EDGE,
                document.documentElement.scrollHeight - el.offsetHeight - EDGE,
            );
        }

        function place(nextX, nextY, glide) {
            x = Math.min(Math.max(nextX, EDGE), maxX());
            y = Math.min(Math.max(nextY, EDGE), maxY());

            el.classList.toggle("is-gliding", Boolean(glide));
            el.style.transform = "translate3d(" + x + "px," + y + "px,0)";

            window.clearTimeout(glideTimer);
            if (glide) {
                glideTimer = window.setTimeout(function () {
                    el.classList.remove("is-gliding");
                }, GLIDE);
            }
        }

        /* random spot inside the area the user is looking at right now */
        function wanderSpot() {
            var left = window.scrollX + EDGE;
            var top = window.scrollY + EDGE;
            var right =
                window.scrollX + window.innerWidth - el.offsetWidth - EDGE;
            var bottom =
                window.scrollY + window.innerHeight - el.offsetHeight - EDGE;

            return {
                x: random(left, Math.max(left, right)),
                y: random(top, Math.max(top, bottom)),
            };
        }

        function scheduleWander() {
            window.clearTimeout(timer);
            if (reducedMotion) return;

            timer = window.setTimeout(function () {
                if (dragging || Date.now() < quietUntil) {
                    scheduleWander();
                    return;
                }
                var spot = wanderSpot();
                place(spot.x, spot.y, true);
                scheduleWander();
            }, random(WANDER_MIN, WANDER_MAX));
        }

        el.addEventListener("pointerdown", function (event) {
            if (event.button !== undefined && event.button > 0) return;

            // freeze the glide at its visual position before grabbing
            var rect = el.getBoundingClientRect();
            x = rect.left + window.scrollX;
            y = rect.top + window.scrollY;
            window.clearTimeout(glideTimer);
            el.classList.remove("is-gliding");
            el.style.transform = "translate3d(" + x + "px," + y + "px,0)";

            dragging = true;
            el.setPointerCapture(event.pointerId);
            el.classList.add("is-dragging");
            document.body.classList.add("is-dragging-mascot");
            grabX = event.clientX + window.scrollX - x;
            grabY = event.clientY + window.scrollY - y;
            window.clearTimeout(timer);
            event.preventDefault();
        });

        el.addEventListener("pointermove", function (event) {
            if (!dragging) return;
            place(
                event.clientX + window.scrollX - grabX,
                event.clientY + window.scrollY - grabY,
                false,
            );
        });

        function stopDragging(event) {
            if (!dragging) return;
            dragging = false;
            el.classList.remove("is-dragging");
            document.body.classList.remove("is-dragging-mascot");
            if (el.hasPointerCapture(event.pointerId)) {
                el.releasePointerCapture(event.pointerId);
            }
            quietUntil = Date.now() + COOLDOWN;
            scheduleWander();
        }

        el.addEventListener("pointerup", stopDragging);
        el.addEventListener("pointercancel", stopDragging);

        window.addEventListener("resize", function () {
            place(x, y, false);
        });

        // start somewhere random on every page load
        var start = wanderSpot();
        place(start.x, start.y, false);
        el.style.visibility = "visible";
        scheduleWander();
    });
})();
