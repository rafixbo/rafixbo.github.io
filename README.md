# Nohin Tafsir Rafi — Portfolio

Personal portfolio site for **Nohin Tafsir Rafi** (@rafixbo), Dhaka, Bangladesh.
Light, premium, editorial design — soft shadows, generous whitespace, Sora +
Inter typography, GSAP scroll animations, and a smoothness layer that degrades
gracefully when JavaScript or GSAP is unavailable.
Hosted on GitHub Pages at **https://rafixbo.github.io/**

## What is in this repo

| File | What it does |
|---|---|
| `index.html` | Homepage — hero, work, about, capabilities, journey, contact |
| `style.css` | The whole design system (light theme, cards, covers, modal, form) |
| `css/animations.css` | Motion system — keyframes, hover motion, reduced-motion support |
| `script.js` | Renders projects from `projects.json`, featured project, filters, add-project form, GSAP |
| `js/smooth.js` | Smooth anchors, magnetic buttons, cover tilt, nav shadow, reveal fallback |
| `js/contact.js` | Contact form validation, message compose, copy-to-clipboard |
| `projects.json` | **The only file you need to edit to add a project** |
| `projects/*.html` | A full case study for every project (problem, build, hard part, outcome) |
| `projects/case.css`, `projects/case.js` | Case-study layout + animations |
| `build_case_pages.py` | Generator for the case-study pages — edit the data, re-run it |
| `now.html` | What Rafi is working on now (November 2026 snapshot — update it when work changes) |
| `404.html`, `sitemap.xml`, `.nojekyll` | GitHub Pages plumbing |

## How to add a new project

**Easiest — on the site itself:**
1. Open the site, click **+ Add project**
2. Fill the form — it appears on the page right away
3. Click **Download updated projects.json**
4. Replace `projects.json` in this repo with the downloaded file and push — done, it's live.

**Or edit the file directly:**
Open `projects.json` and add an object at the top of the list:

```json
{
  "title": "My New App",
  "tag": "EdTech · SSC / HSC",
  "description": "What it does, and who it is for.",
  "tech": ["Next.js", "TypeScript"],
  "year": "2026",
  "link": "https://example.com",
  "linkLabel": "Visit live site",
  "status": "Live",
  "slug": "my-new-app"
}
```

Leave `"link"` empty (`""`) if there is no public link yet — the card will show
"No public link". The `slug` is the case-study page name: `projects/<slug>.html`.
To add a case study too, add the project to `build_case_pages.py` and run it:

```bash
python3 build_case_pages.py
```

Filter buttons match the `tag` field: a tag containing `EdTech`, `Bot` or
`E-commerce` shows under that filter; anything else shows under **All work**.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Do not open `index.html` directly with `file://` — `projects.json` is fetched
over HTTP, so the page falls back to its built-in project list instead.

## Deploy (GitHub Pages)

Repo name must be exactly **`rafixbo.github.io`** (the username + `.github.io`).
Push to `main`, then in GitHub: **Settings → Pages → Deploy from a branch →
main / (root)**. The site goes live at https://rafixbo.github.io/ within a
minute or two. HTTPS is enforced.

## Design notes — why it looks the way it does

- **Light, not dark.** The first version was a dark gradient template and it
  looked cheap. This one is light grey-blue with white cards, soft shadows
  and one blue accent — the same language Rafi asked for on his exam app:
  smooth, soft, professional, no harsh UI.
- **Real project covers, not text cards.** Every project gets a coloured cover
  with its monogram and a small UI mock, so the work grid reads like work,
  not a list.
- **Motion is transform / opacity only.** GSAP + ScrollTrigger for reveals,
  a custom smoothness layer for anchors, magnetic buttons and tilt, and a
  full `prefers-reduced-motion` fallback. Smooth means 60fps, not more
  animation.
- **No fake stats, no fake testimonials.** The numbers on the page are real
  (6 projects, GitHub since 2021). Email and phone are deliberately not on
  the public site.
