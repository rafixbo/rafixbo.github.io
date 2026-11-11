const FALLBACK_PROJECTS = [
  {title:"Shikho Premium",tag:"Online Learning Platform",description:"Full premium learning platform — Flutter student app with secure HLS video, NestJS + PostgreSQL backend, Next.js admin, Bunny.net Stream, wallet and manual bKash / Nagad payments.",tech:["Flutter","NestJS","PostgreSQL","Next.js","Bunny.net"],year:"2026",link:"https://shikho-premium-backend.vercel.app/api/v1/health",linkLabel:"Backend API",status:"In production"},
  {title:"KOLPOCRAFT",tag:"E-commerce · Practical Khata Shop",description:"SSC / HSC handwritten practical khata shop — login-gated ordering, admin-approved reviews, categories and a smooth mobile-first storefront.",tech:["Node.js","SQLite","Vercel"],year:"2026",link:"https://kolpocraft-nine.vercel.app",linkLabel:"Visit live shop",status:"Live"},
  {title:"Online Exam Platform",tag:"EdTech · SSC / HSC",description:"Bangla-first exam platform — exam-by-code, 1 mark per correct, no negative marking, admin question bank with JSON import.",tech:["TypeScript","Next.js","Prisma"],year:"2026",link:"",linkLabel:"",status:"In production"},
  {title:"Course LMS Platform",tag:"EdTech · Courses",description:"SSC / HSC lectures, exams and notes plus paid video courses with payments and certificates.",tech:["Next.js","TypeScript","Flutter"],year:"2026",link:"",linkLabel:"",status:"In production"},
  {title:"Telegram Stream Bot",tag:"Bot · Automation",description:"Lecture downloader bot posting streams into forum topics in a premium style, with RAM auto-clean so it never crashes on overload.",tech:["Python","Pyrogram","Flask"],year:"2026",link:"",linkLabel:"",status:"Live"},
  {title:"Watermark Remover Bot",tag:"Bot · Video Tools",description:"Removes video watermarks with ffmpeg delogo, setup wizard, per-position controls and a RAM guard.",tech:["Python","Telethon","FFmpeg"],year:"2026",link:"",linkLabel:"",status:"Built"}
];

const SKILLS = [
  ["TypeScript","Frontend + backend"],["Next.js","Web apps"],["Flutter","Android apps"],
  ["Node.js","APIs & shops"],["Python","Bots & automation"],["Prisma","Databases"],
  ["PostgreSQL","Backend"],["Telegram Bot API","Bots"],["Vercel","Hosting"],["Git & GitHub","Workflow"]
];

let projects = [...FALLBACK_PROJECTS];
let activeFilter = "all";

async function loadProjects(){
  try{
    const res = await fetch("projects.json", {cache:"no-store"});
    if(res.ok){ const data = await res.json(); if(Array.isArray(data) && data.length) projects = data; }
  }catch(e){ /* file:// or offline — fallback data above is used */ }
  renderProjects();
}

function cardHTML(p){
  const link = p.link ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || "Visit ↗"}</a>` : `<span class="project-link" style="opacity:.45">No public link</span>`;
  return `<article class="project-card">
    <div class="project-top"><span class="project-tag">${p.tag || ""}</span><span class="status">${p.status || "Live"}</span></div>
    <h3>${p.title}</h3><p>${p.description}</p>
    <div class="tech">${(p.tech||[]).map(t=>`<span>${t}</span>`).join("")}</div>
    <div class="project-foot"><span class="year">${p.year || ""}</span>${link}</div>
  </article>`;
}

function renderProjects(){
  const grid = document.getElementById("projectGrid");
  const list = projects.filter(p => activeFilter==="all" || (p.tag||"").includes(activeFilter));
  grid.innerHTML = list.map(cardHTML).join("");
  document.getElementById("emptyMsg").classList.toggle("hidden", list.length>0);
  if(window.gsap) gsap.fromTo(".project-card",{y:24,opacity:0},{y:0,opacity:1,duration:.5,stagger:.07,overwrite:true});
}

document.getElementById("skillsGrid").innerHTML = SKILLS.map(([s,d])=>`<span class="skill">${s}<small>${d}</small></span>`).join("");
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active"); activeFilter = btn.dataset.filter; renderProjects();
  });
});

/* Add-project modal — adds live, and lets Rafi download the updated projects.json to commit */
const modal = document.getElementById("modal");
const openModal = ()=>modal.classList.remove("hidden");
const closeModal = ()=>modal.classList.add("hidden");
document.getElementById("addProjectBtn").addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e=>{ if(e.target===modal) closeModal(); });

document.getElementById("projectForm").addEventListener("submit", e=>{
  e.preventDefault();
  const f = new FormData(e.target);
  const p = {
    title: f.get("title").trim(),
    tag: f.get("tag").trim(),
    description: f.get("description").trim(),
    tech: (f.get("tech")||"").split(",").map(s=>s.trim()).filter(Boolean),
    year: (f.get("year")||"2026").trim(),
    link: (f.get("link")||"").trim(),
    linkLabel: (f.get("linkLabel")||"Visit ↗").trim(),
    status: (f.get("status")||"Live").trim()
  };
  projects.unshift(p);
  activeFilter = "all";
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active", b.dataset.filter==="all"));
  renderProjects(); closeModal(); e.target.reset();
  document.getElementById("downloadBtn").classList.remove("hidden");
  document.getElementById("projects").scrollIntoView({behavior:"smooth"});
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
  document.querySelector(".nav nav").classList.toggle("open");
});
document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click", ()=>document.querySelector(".nav nav").classList.remove("open")));

/* GSAP animations */
loadProjects();
if(window.gsap){
  gsap.registerPlugin(ScrollTrigger);
  gsap.timeline({defaults:{ease:"power3.out"}})
    .from(".hero-name .line",{y:70,opacity:0,duration:.9,stagger:.12})
    .from(".hero-eyebrow, .hero-role, .hero-sub, .hero-actions, .hero-stats, .hero-avatar",{y:26,opacity:0,duration:.7,stagger:.08},"-=.4");
  document.querySelectorAll(".reveal").forEach(el=>{
    gsap.to(el,{opacity:1,y:0,duration:.8,ease:"power3.out",
      scrollTrigger:{trigger:el,start:"top 88%"}});
  });
  gsap.to(".hero-glow",{y:60,scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
  gsap.to("#progress",{width:"100%",ease:"none",scrollTrigger:{trigger:document.body,start:"top top",end:"bottom bottom",scrub:.3}});
  document.querySelectorAll("[data-count]").forEach(el=>{
    const target = +el.dataset.count;
    gsap.to({v:0},{v:target,duration:1.4,ease:"power2.out",
      scrollTrigger:{trigger:el,start:"top 90%"},
      onUpdate:function(){ el.textContent = Math.round(this.targets()[0].v); }});
  });
  /* Custom cursor */
  const cursor = document.getElementById("cursor");
  window.addEventListener("mousemove", e=>gsap.to(cursor,{x:e.clientX,y:e.clientY,duration:.25}));
} else {
  document.querySelectorAll(".reveal").forEach(el=>el.style.opacity=1);
}
