/* smooth.js — smoothness layer for rafixbo.github.io
   No dependencies. Degrades gracefully: if anything here fails,
   the site still works with native scrolling.
   1. Smooth anchor scrolling (with a reduced-motion escape hatch)
   2. Magnetic buttons — they lean toward the cursor, then spring back
   3. Tilt on project covers — a few degrees, never more
   4. Nav shadow on scroll
   5. Reveal-on-scroll fallback when GSAP / ScrollTrigger is absent
*/
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* 1. Smooth anchors ---------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  /* 2. Magnetic buttons --------------------------------------------------- */
  function magnetise(el, strength) {
    if (!finePointer || prefersReduced) return;
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var x = e.clientX - (r.left + r.width / 2);
      var y = e.clientY - (r.top + r.height / 2);
      el.style.transform = "translate(" + x * strength + "px," + y * strength + "px)";
    });
    el.addEventListener("mouseleave", function () {
      el.style.transition = "transform .45s cubic-bezier(.22,1,.36,1)";
      el.style.transform = "translate(0,0)";
      setTimeout(function () { el.style.transition = ""; }, 450);
    });
  }
  document.querySelectorAll(".btn.primary, .nav-cta").forEach(function (b) { magnetise(b, 0.18); });

  /* 3. Cover tilt ---------------------------------------------------------- */
  function tilt(card) {
    if (!finePointer || prefersReduced) return;
    var cover = card.querySelector(".cover");
    if (!cover) return;
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      cover.style.transform = "perspective(800px) rotateY(" + px * 4 + "deg) rotateX(" + -py * 4 + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      cover.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)";
      cover.style.transform = "";
      setTimeout(function () { cover.style.transition = ""; }, 500);
    });
  }
  /* Cards are rendered by script.js, so observe for them. */
  var grid = document.getElementById("projectGrid");
  if (grid) {
    var observer = new MutationObserver(function () {
      document.querySelectorAll(".project-card").forEach(function (c) {
        if (!c.dataset.tilt) { c.dataset.tilt = "1"; tilt(c); }
      });
    });
    observer.observe(grid, { childList: true });
  }

  /* 4. Nav shadow ---------------------------------------------------------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 5. Reveal fallback (only if GSAP is missing) --------------------------- */
  if (!window.gsap) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("anim-fade-up");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section, .project-card, .cap").forEach(function (el) { io.observe(el); });
  }

  /* 6. Progress bar fallback (GSAP owns it when present) ------------------- */
  if (!window.gsap) {
    var bar = document.getElementById("progress");
    window.addEventListener("scroll", function () {
      var h = document.documentElement;
      var p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar) bar.style.width = (p * 100).toFixed(1) + "%";
    }, { passive: true });
  }
})();
