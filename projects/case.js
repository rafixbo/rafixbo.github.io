/* Case-study page animations — GSAP, with a no-JS / no-CDN fallback (content is visible by default). */
document.getElementById("year").textContent = new Date().getFullYear();
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".case-cover", { scale: 0.97, opacity: 0, y: 24, duration: 0.9, ease: "power3.out" });
  gsap.from(".case-head, .case-intro, .case-meta", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.15 });
  gsap.utils.toArray(".case section, .case-list li, .case-actions").forEach(function (el) {
    gsap.from(el, { y: 28, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  gsap.to("#progress", { width: "100%", ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 } });
}
