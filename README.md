# Nohin Tafsir Rafi — Portfolio

Personal portfolio site for **Nohin Tafsir Rafi** (@rafixbo), Dhaka, Bangladesh.
Built with plain HTML + CSS + JavaScript and **GSAP** (animations + ScrollTrigger).
Hosted on GitHub Pages at **https://rafixbo.github.io/**

## How to add a new project

**Easiest — on the site itself:**
1. Open the site, click **＋ Add project**
2. Fill the form — it appears on the page right away
3. Click **⬇ Download updated projects.json**
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
  "status": "Live"
}
```

Leave `"link"` empty (`""`) if there is no public link yet — the card will show "No public link".

Filter buttons match the `tag` field: a tag containing `EdTech`, `Bot` or `E-commerce` shows under that filter; anything else shows under **All**.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)

Repo name must be exactly **`rafixbo.github.io`** (the username + `.github.io`).
Push to `main`, then in GitHub: **Settings → Pages → Deploy from a branch → main / (root)**.
The site goes live at https://rafixbo.github.io/ within a minute or two.

## Files

- `index.html` — page structure
- `style.css` — design
- `script.js` — renders projects from `projects.json`, GSAP animations, add-project form
- `projects.json` — **the only file you need to edit to add a project**
