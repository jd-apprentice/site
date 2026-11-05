(function () {
  'use strict';

  /* ── Inject Effect Styles ──
     Inline CSS for visitor counter + page entry animation.
  */
  var styleEl = document.createElement('style');
  styleEl.textContent =
    '.counter-digit {' +
    '  display: inline-block;' +
    '  min-width: 1em;' +
    '  text-align: center;' +
    '  font-family: "Courier New", Courier, monospace;' +
    '  font-weight: bold;' +
    '  background: rgba(0,0,0,0.35);' +
    '  padding: 2px 5px;' +
    '  margin: 0 1px;' +
    '  border-radius: 3px;' +
    '  color: #ffd700;' +
    '  text-shadow: 0 0 6px rgba(255,215,0,0.5);' +
    '}' +
    'body:not(.page-entered) {' +
    '  opacity: 0;' +
    '  transform: translateY(15px);' +
    '}' +
    'body.page-entered {' +
    '  opacity: 1;' +
    '  transform: translateY(0);' +
    '  transition: opacity 0.6s ease-out, transform 0.6s ease-out;' +
    '}';
  document.head.appendChild(styleEl);

  /* ── Live Clock ──
     Updates [data-clock] every second with HH:MM:SS.
  */
  var clockEl = document.querySelector('[data-clock]');
  if (clockEl) {
    function tick() {
      clockEl.textContent = new Date().toTimeString().slice(0, 8);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── Visitor Counter ──
     localStorage-based counter, 6-digit odometer display.
  */
  var counterEl = document.querySelector('[data-visitor-counter]');
  if (counterEl) {
    var count = localStorage.getItem('visitorCount');
    if (count !== null) {
      count = parseInt(count, 10) + 1;
    } else {
      count = 4000 + (Math.random() * 5001 | 0);
    }
    localStorage.setItem('visitorCount', count);

    counterEl.innerHTML = String(count).padStart(6, '0').split('')
      .map(function (d) { return '<span class="counter-digit">' + d + '</span>'; })
      .join('');
  }

  /* ── Page Entry Animation ──
     Fade-in + slide-up on load via CSS transition.
  */
  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('page-entered');
    /* Drop the transform once the fade-in is done: a transformed <body>
       becomes the containing block for position:fixed children, which makes
       the starfield and the mascots scroll with the page. */
    window.setTimeout(function () {
      document.body.style.transform = 'none';
    }, 700);
  });

})();
