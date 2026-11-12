/* Rafi portfolio — v2
   Data comes from projects.json. If fetch fails (file://), FALLBACK_PROJECTS is used.
   Featured = first project. Grid = the rest. Filters match the tag field. */
const FALLBACK_PROJECTS = [
  {title:"Shikho Premium",tag:"Online Learning Platform",description:"Full premium learning platform — Flutter student app with secure HLS video, NestJS + PostgreSQL backend, Next.js admin, Bunny.net Stream, wallet and manual bKash / Nagad payments.",tech:["Flutter","NestJS","PostgreSQL","Next.js","Bunny.net"],year:"2026",link:"https://shikho-premium-backend.vercel.app/api/v1/health",linkLabel:"Backend API",status:"In production",slug:"shikho-premium"},
  {title:"KOLPOCRAFT",tag:"Client Project · E-commerce · Practical Khata Shop",description:"Client project — SSC / HSC handwritten practical khata shop, now live. Login-gated ordering, admin-approved reviews, categories and a smooth mobile-first storefront.",tech:["Node.js","SQLite","Vercel","alwaysdata"],year:"2026",link:"http://bestpractical.alwaysdata.net/",linkLabel:"Visit live shop",status:"Live",slug:"kolpocraft"},
  {title:"Online Exam Platform",tag:"EdTech · SSC / HSC",description:"Bangla-first exam platform — exam-by-code, 1 mark per correct, no negative marking, admin question bank with JSON import.",tech:["TypeScript","Next.js","Prisma"],year:"2026",link:"",linkLabel:"",status:"In production",slug:"exam-platform"},
  {title:"Course LMS Platform",tag:"EdTech · Courses",description:"SSC / HSC lectures, exams and notes plus paid video courses with payments and certificates.",tech:["Next.js","TypeScript","Flutter"],year:"2026",link:"",linkLabel:"",status:"In production",slug:"course-lms"},
  {title:"Telegram Stream Bot",tag:"Bot · Automation",description:"Lecture downloader bot posting streams into forum topics in a premium style, with RAM auto-clean so it never crashes on overload.",tech:["Python","Pyrogram","Flask"],year:"2026",link:"",linkLabel:"",status:"Live",slug:"stream-bot"},
  {title:"Watermark Remover Bot",tag:"Bot · Video Tools",description:"Removes video watermarks with ffmpeg delogo, setup wizard, per-position controls and a RAM guard.",tech:["Python","Telethon","FFmpeg"],year:"2026",link:"",linkLabel:"",status:"Built",slug:"watermark-bot"}
];

const COVERS = ["cover-blue","cover-violet","cover-emerald","cover-amber","cover-rose","cover-slate"];
let projects = [...FALLBACK_PROJECTS];
let activeFilter = "all";

function initials(title){
  return title.split(/[\s&]+/).filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();
}
function coverClass(p, i){ return COVERS[i % COVERS.length]; }
function caseLink(p){ return p.slug ? `projects/${p.slug}.html` : "#work"; }

async function loadProjects(){
  try{
    const res = await fetch("projects.json", {cache:"no-store"});
    if(res.ok){ const data = await res.json(); if(Array.isArray(data) && data.length) projects = data; }
  }catch(e){ /* offline / file:// — fallback above */ }
  renderAll();
}

function featuredHTML(p, i){
  const link = p.link ? `<a class="featured-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || "Visit ↗"}</a>` : "";
  return `<div class="featured-card">
    <div class="cover ${coverClass(p,i)} featured-cover">
      <span class="mono">${initials(p.title)}</span>
      <div class="cover-ui"><div class="bar"></div><div class="bar short"></div><div class="row"><span class="chip"></span><span class="chip ghost"></span><span class="chip ghost"></span></div></div>
    </div>
    <div class="featured-body">
      <span class="tag">Featured · ${p.tag || ""}</span>
      <h3>${p.title}</h3><p>${p.description}</p>
      <div class="tech">${(p.tech||[]).map(t=>`<span>${t}</span>`).join("")}</div>
      <div style="display:flex;gap:22px;align-items:center;flex-wrap:wrap">
        <a class="featured-link" href="${caseLink(p)}">Read the case study →</a>${link}
      </div>
    </div>
  </div>`;
}

function cardHTML(p, i){
  const link = p.link ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || "Visit ↗"}</a>` : `<span class="project-link" style="opacity:.45">No public link</span>`;
  return `<article class="project-card">
    <a class="cover ${coverClass(p,i)}" href="${caseLink(p)}" aria-label="${p.title} case study">
      <span class="mono">${initials(p.title)}</span>
      <span class="cover-tag">${p.tag || ""}</span>
    </a>
    <div class="project-body">
      <div class="project-top"><span class="status">${p.status || "Live"}</span><span class="year">${p.year || ""}</span></div>
      <h3><a href="${caseLink(p)}">${p.title}</a></h3>
      <p>${p.description}</p>
      <div class="tech">${(p.tech||[]).map(t=>`<span>${t}</span>`).join("")}</div>
      <div class="project-foot"><a class="project-link" href="${caseLink(p)}">Case study →</a>${link}</div>
    </div>
  </article>`;
}

function matches(p){
  if(activeFilter === "all") return true;
  return (p.tag || "").includes(activeFilter);
}

function renderAll(){
  const featuredEl = document.getElementById("featured");
  const grid = document.getElementById("projectGrid");
  const featured = projects[0];
  const rest = projects.slice(1).filter(matches);
  if(featured && matches(featured)){
    featuredEl.innerHTML = featuredHTML(featured, 0);
    featuredEl.classList.remove("hidden");
  } else {
    featuredEl.innerHTML = ""; featuredEl.classList.add("hidden");
  }
  grid.innerHTML = rest.map((p, idx) => cardHTML(p, idx + 1)).join("");
  document.getElementById("emptyMsg").classList.toggle("hidden", rest.length > 0 || (featured && matches(featured)));
  if(window.gsap){
    gsap.fromTo(".project-card, .featured-card", {y:28, opacity:0}, {y:0, opacity:1, duration:.65, stagger:.07, overwrite:true, ease:"power3.out"});
  }
}

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".filter[data-filter]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".filter[data-filter]").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderAll();
  });
});

/* Add-project modal */
const modal = document.getElementById("modal");
const openModal = ()=>modal.classList.remove("hidden");
const closeModal = ()=>modal.classList.add("hidden");
document.getElementById("addProjectBtn").addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e=>{ if(e.target===modal) closeModal(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeModal(); });

document.getElementById("projectForm").addEventListener("submit", e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const title = (f.get("title")||"").trim();
  const p = {
    title,
    tag: (f.get("tag")||"").trim(),
    description: (f.get("description")||"").trim(),
    tech: String(f.get("tech")||"").split(",").map(s=>s.trim()).filter(Boolean),
    year: String(f.get("year")||"2026").trim(),
    link: String(f.get("link")||"").trim(),
    linkLabel: String(f.get("linkLabel")||"Visit ↗").trim(),
    status: String(f.get("status")||"Live").trim(),
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "new-project"
  };
  projects.unshift(p);
  activeFilter = "all";
  document.querySelectorAll(".filter[data-filter]").forEach(b=>b.classList.toggle("active", b.dataset.filter==="all"));
  renderAll(); closeModal(); e.target.reset();
  document.getElementById("downloadBtn").classList.remove("hidden");
  document.getElementById("work").scrollIntoView({behavior:"smooth"});
  alert("Added! To keep it live on GitHub, click 'Download updated projects.json' in the form, replace projects.json in the repo, and push.");
});

document.getElementById("downloadBtn").addEventListener("click", ()=>{
  const blob = new Blob([JSON.stringify(projects, null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "projects.json"; a.click();
  URL.revokeObjectURL(a.href);
});

/* Mobile menu */
document.getElementById("menuBtn").addEventListener("click", ()=>{
  document.getElementById("mainNav").classList.toggle("open");
});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click", ()=>document.getElementById("mainNav").classList.remove("open")));

/* Smooth scroll + GSAP */
loadProjects();
if(window.gsap){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero h1 .h-line", {yPercent:110, duration:.9, stagger:.12, ease:"power3.out"});
  gsap.from(".hero-kicker, .hero-sub, .hero-actions, .hero-meta, .hero-card", {y:26, opacity:0, duration:.8, stagger:.09, ease:"power3.out", delay:.15});
  gsap.utils.toArray(".section, .featured, .project-card").forEach(el=>{
    gsap.from(el, {y:36, opacity:0, duration:.85, ease:"power3.out",
      scrollTrigger:{trigger:el, start:"top 88%"}});
  });
  gsap.to("#progress", {width:"100%", ease:"none",
    scrollTrigger:{trigger:document.body, start:"top top", end:"bottom bottom", scrub:.3}});
  const nav = document.getElementById("nav");
  ScrollTrigger.create({start:80, onUpdate:self=>{ nav.style.boxShadow = self.scroll() > 80 ? "0 14px 40px rgba(10,12,20,.12)" : "0 10px 30px rgba(10,12,20,.07)"; }});
}
