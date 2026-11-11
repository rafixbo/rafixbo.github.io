#!/usr/bin/env python3
"""Generate the 6 project case-study pages in projects/.
Run: python3 build_case_pages.py
Each page is a full, real case study — problem, what was built,
stack, hard parts, and outcome — sharing ../style.css + case.css.
"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "projects")
os.makedirs(OUT, exist_ok=True)

CASES = {
"shikho-premium": dict(
    title="Shikho Premium", tag="Online Learning Platform", year="2026", status="In production",
    cover="cover-blue", mono="SP",
    intro="A full premium learning platform for Bangladesh — a Flutter student app, a NestJS + PostgreSQL backend, a Next.js admin panel, and Bunny.net video, with wallet and manual bKash / Nagad payments.",
    problem="Students in Bangladesh buy courses from Facebook pages and Telegram groups, then watch them in unprotected players. Creators lose their videos to downloads within hours, and there is no clean way to sell, manage students, or take bKash / Nagad payments in one place.",
    built="""<li><strong>Flutter student app</strong> — home, My Learning, lecture progress, and native HLS playback with Bunny signed URLs.</li>
<li><strong>Secure playback</strong> — FLAG_SECURE, no download UI, no MP4 link, short-lived signed HLS only, and a moving watermark showing the student's email running side-to-side across the video.</li>
<li><strong>NestJS + PostgreSQL backend</strong> — 115 endpoints: auth, courses, lectures, wallet, payment requests, uploads, admin students and app settings.</li>
<li><strong>Next.js admin</strong> — add courses and lectures, paste a Bunny link per video (with optional Referer / Origin), auto-capture video duration, manage students, wallet and payments.</li>
<li><strong>Payments</strong> — wallet balance plus manual bKash / Nagad with QR, approved by admin — the way Bangladeshi students actually pay.</li>""",
    stack=["Flutter","NestJS","PostgreSQL","Next.js","Bunny.net","Prisma","Vercel"],
    hard="The hardest part was video security without breaking playback. Bunny has no per-video Origin / Referer — only library-level token auth — so the design had to use signed HLS, short expiry, and a moving email watermark instead. The release build also fought AGP 9: two abandoned plugins had no namespace and one used jcenter(), so one was vendored and patched and the other was removed entirely, with FLAG_SECURE moved into MainActivity.",
    outcome="Backend typechecks clean, Vercel production deploy is live at shikho-premium-backend.vercel.app, the release APK is signed with its own keystore, and the admin can publish a course by pasting a Bunny link — no Bunny API keys needed.",
    link="https://shikho-premium-backend.vercel.app/api/v1/health", link_label="Backend API",
),
"kolpocraft": dict(
    title="KOLPOCRAFT", tag="E-commerce · Practical Khata Shop", year="2026", status="Live",
    cover="cover-emerald", mono="KO",
    intro="An SSC / HSC handwritten practical khata shop — login-gated ordering, admin-approved reviews, categories, search, and a smooth mobile-first storefront. Live on Vercel, with alwaysdata as the persistent host.",
    problem="Students need practical khatas for SSC and HSC, but ordering them online was messy: guest orders with no accountability, reviews nobody moderated, and a storefront that felt cheap on a phone.",
    built="""<li><strong>Login-gated ordering</strong> — no order without an account; guests are redirected to login with a Bangla message, and the server rejects unauthenticated orders too.</li>
<li><strong>Admin control</strong> — products, prices, categories, reviews (Pending until admin publishes), FAQ, hero and payments, all from the admin panel.</li>
<li><strong>Categories as pills only</strong> — no category cards; admin-added categories appear in the pill row above the grid.</li>
<li><strong>Mobile-first</strong> — full-width search row on phones with a 16px input so iOS Safari never auto-zooms, iOS-style fade transitions, and a clickable whole product card.</li>
<li><strong>Loves that survive</strong> — saved in the database and in localStorage, healed from the browser copy after a Vercel /tmp reset, and moved to the account at login without double-counting.</li>""",
    stack=["Node.js","SQLite","Vercel","alwaysdata"],
    hard="Two hosts, two truths. Vercel is fast but /tmp is ephemeral, so orders and admin changes can vanish there; alwaysdata is persistent but only 256 MB of RAM, so npm install gets OOM-killed. The fix was a zip that ships pre-installed trimmed node_modules — no install step at all — and a 192 MB heap cap that keeps the shop under the limit.",
    outcome="Live at kolpocraft-nine.vercel.app, homepage rendering the SSC bundle at ৳1500, with COD ৳60 in Dhaka / ৳120 outside / free over ৳500, and a persistent database on alwaysdata.",
    link="https://kolpocraft-nine.vercel.app", link_label="Visit live shop",
),
"exam-platform": dict(
    title="Online Exam Platform", tag="EdTech · SSC / HSC", year="2026", status="In production",
    cover="cover-violet", mono="OE",
    intro="A Bangla-first exam platform for Bangladeshi students — exam-by-code, 1 mark per correct answer, no negative marking, an admin question bank with JSON import, and a smooth soft UI built to match Progga.",
    problem="SSC / HSC students practise from scattered PDFs and coaching sheets, with no timed, exam-like experience in Bangla — and teachers have no simple way to set a paper and hand it to one student.",
    built="""<li><strong>Exam by code</strong> — admin imports a named paper as JSON, assigns it to a student, and the student joins by code. Randomised questions, one attempt, a persisted wall-clock end time, and resume.</li>
<li><strong>Fair scoring</strong> — 1 point per correct answer, no negative marking, with result, review and history.</li>
<li><strong>Admin question bank</strong> — JSON import (including a 1,167-question Higher Math bank), papers, and student management.</li>
<li><strong>Smooth and soft UI</strong> — low-opacity shadows, rounded cards, gentle transitions, 60fps feel, no harsh UI — rebuilt screen by screen to match the reference videos.</li>""",
    stack=["TypeScript","Next.js","Prisma"],
    hard="The UI was corrected repeatedly until it felt right — a clean soft home, Glass / One UI styling in light blue-violet, organised margins, soft navigation, a separate Subjects tab, no gradients, and a working search bar. The MCQ rule also flipped three times before settling on select-once-lock, without showing it as locked.",
    outcome="A working web app (v4) with exam-by-code live, an admin panel that matches the app, and a free platform students can actually use for SSC / HSC preparation.",
    link="", link_label="",
),
"course-lms": dict(
    title="Course LMS Platform", tag="EdTech · Courses", year="2026", status="In production",
    cover="cover-amber", mono="CL",
    intro="A course LMS combining SSC / HSC lectures, exams and notes with a general paid course-selling platform — video courses, payments and certificates, with a solid professional UI.",
    problem="Lecture videos, exams and notes live in different places, and selling a paid course means stitching together a player, a payment link and a certificate by hand.",
    built="""<li><strong>SSC / HSC track</strong> — lectures, exams and notes in one place, organised by subject and chapter.</li>
<li><strong>Paid courses</strong> — video courses with enrolment, payments and certificates.</li>
<li><strong>Professional UI</strong> — solid and clean, deliberately not kids-like; the first prototype was rejected on those grounds and rebuilt.</li>
<li><strong>Stepping stone to Shikho Premium</strong> — the lessons from this LMS became the full production platform: Flutter app, NestJS backend and Bunny.net video.</li>""",
    stack=["Next.js","TypeScript","Flutter"],
    hard="Balancing two audiences in one product — school students who need free lectures and exam practice, and paying learners who expect a polished course experience — without making either side feel like an afterthought.",
    outcome="A working LMS that became the blueprint for Shikho Premium, the production learning platform.",
    link="", link_label="",
),
"stream-bot": dict(
    title="Telegram Stream Bot", tag="Bot · Automation", year="2026", status="Live",
    cover="cover-rose", mono="SB",
    intro="A Telegram lecture downloader bot that posts streams into forum topics in a premium decorated style, with RAM auto-clean so it never crashes on overload.",
    problem="Lectures arrive as links and files scattered across chats. Teachers need them organised into forum topics, posted beautifully, and delivered without the bot dying halfway through a batch.",
    built="""<li><strong>Topic-batch uploads</strong> — a .txt uploader posts lectures into forum topics, with a Pyrogram + Flask web admin.</li>
<li><strong>Premium decoration</strong> — every post in a premium layout, every line in glossy animated emojis, with per-line custom emoji IDs from the owner's Premium set.</li>
<li><strong>RAM auto-clean</strong> — gc plus orphan temp cleanup, a 60-second watchdog, a pre-download check that skips a lecture when free RAM stays below 256 MB after cleaning, and a /ramclean command.</li>
<li><strong>Survives overload</strong> — thresholds use free MB (warn 512, critical 256), not percent, because percent misleads across VM sizes.</li>""",
    stack=["Python","Pyrogram","Flask"],
    hard="MTProto connection timeouts made the bot flap while the web admin still answered 200 — the fix, the watchdog, and the RAM guard were all about making a long-running bot behave on a small, temporary host. Google Cloud Shell sessions end after about an hour of inactivity, so the durable fix is a real VM with systemd.",
    outcome="A bot that posts lectures into topics in premium style, cleans up after itself, and keeps going instead of crashing on overload.",
    link="", link_label="",
),
"watermark-bot": dict(
    title="Watermark Remover Bot", tag="Bot · Video Tools", year="2026", status="Built",
    cover="cover-slate", mono="WB",
    intro="A Telegram bot that removes video watermarks with ffmpeg delogo, a setup wizard, per-position controls and a RAM guard — built for lecture videos.",
    problem="Lecture videos carry a channel watermark in the corner. Students want a clean copy, but re-encoding by hand is slow, and auto-detection keeps picking the wrong corner — once, the teacher's face.",
    built="""<li><strong>Precise delogo</strong> — a fixed top-left box (256×39 at 10,7), medium strength, crf 20, after the auto-detector wrongly picked top-right.</li>
<li><strong>Owner controls</strong> — /setpos TOP_LEFT / TOP_RIGHT / BOTTOM_LEFT / BOTTOM_RIGHT, owner-only, no restart needed.</li>
<li><strong>Setup wizard and Bangla guide</strong> — so anyone can run it, not just the developer.</li>
<li><strong>RAM guard</strong> — warn at 512 MB free, critical at 256 MB, clean first, then skip if still low; /ramclean plus a 60-second watchdog.</li>""",
    stack=["Python","Telethon","FFmpeg"],
    hard="A full 540-second test came out clean: 1280×720, 137 MB down to 108 MB, watermark gone. The remaining limits are honest ones — Telethon MTProto is blocked from this VM, so the bot runs on Windows / VPS, and the 108 MB output stays local because the Bot API caps uploads at 50 MB.",
    outcome="A clean 540s re-encode, a measured watermark box, and a bot that knows exactly where the watermark is — and where it isn't.",
    link="", link_label="",
),
}

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — Nohin Tafsir Rafi</title>
<meta name="description" content="{intro}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../style.css">
<link rel="stylesheet" href="case.css">
</head>
<body>
<div class="progress" id="progress"></div>
<header class="nav">
  <a class="logo" href="../index.html">Nohin Tafsir Rafi</a>
  <nav><a href="../index.html#work">Work</a><a href="../index.html#about">About</a><a href="../index.html#contact">Contact</a></nav>
  <a class="nav-cta" href="../index.html#contact">Contact →</a>
</header>
<main class="case">
  <p class="case-back"><a href="../index.html#work">← All work</a></p>
  <div class="cover {cover} case-cover"><span class="mono">{mono}</span><span class="cover-tag">{tag}</span></div>
  <div class="case-head">
    <div><p class="kicker">Case study · {year}</p><h1>{title}</h1></div>
    <span class="status">{status}</span>
  </div>
  <p class="case-intro">{intro}</p>
  <div class="case-meta">
    <div><strong>Year</strong><span>{year}</span></div>
    <div><strong>Status</strong><span>{status}</span></div>
    <div><strong>Stack</strong><span>{stack}</span></div>
  </div>
  <section><h2>The problem</h2><p>{problem}</p></section>
  <section><h2>What was built</h2><ul class="case-list">{built}</ul></section>
  <section><h2>The hard part</h2><p>{hard}</p></section>
  <section><h2>Outcome</h2><p>{outcome}</p></section>
  <div class="case-actions">
    {link_html}
    <a class="btn outline" href="../index.html#work">← Back to all work</a>
  </div>
  <nav class="case-next">{next_html}</nav>
</main>
<footer><p class="foot-big">Nohin Tafsir Rafi</p><p>© <span id="year"></span> · Dhaka, Bangladesh · Built with GSAP, hosted on GitHub Pages</p></footer>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="case.js"></script>
</body>
</html>
"""

order = list(CASES.keys())
for idx, slug in enumerate(order):
    c = CASES[slug]
    nxt = order[(idx + 1) % len(order)]
    link_html = f'<a class="btn primary" href="{c["link"]}" target="_blank" rel="noopener">{c["link_label"]} ↗</a>' if c["link"] else ""
    next_html = f'<a href="{nxt}.html">Next project: <strong>{CASES[nxt]["title"]} →</strong></a>'
    html = TEMPLATE.format(
        title=c["title"], tag=c["tag"], year=c["year"], status=c["status"],
        cover=c["cover"], mono=c["mono"], intro=c["intro"], problem=c["problem"],
        built=c["built"], hard=c["hard"], outcome=c["outcome"],
        stack=", ".join(c["stack"]), link_html=link_html, next_html=next_html)
    with open(os.path.join(OUT, slug + ".html"), "w") as f:
        f.write(html)
    print("wrote", slug + ".html", len(html), "chars")
print("done", len(order), "case pages")
