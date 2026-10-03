# _PG.Dev

A premium, dark, developer-focused technology education website built with **Flask (Python)**, Jinja templates, plain CSS and vanilla JavaScript.

> Status: homepage complete. Other pages (courses, dashboard, playground, etc.) are planned.
> All data (stats, progress, assistant replies) is **demo/placeholder** content.

## Features

- Sticky blurred navbar with mobile drawer
- Hero with animated typing terminal
- Stats, featured courses with animated progress bars
- Learning-path roadmap
- Interactive quiz (select, submit, feedback, score, next)
- Code problem preview (simulated run)
- Projects, resource hub with search and difficulty filter
- PG Assistant floating chat panel (canned demo replies)
- About, community and final call-to-action sections
- Responsive layout, keyboard focus styles, `prefers-reduced-motion` support

## Requirements

- Python 3.9+
- Flask 3.0+

## Getting started

```bash
# 1. (optional) create a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 2. install dependencies
pip install -r requirements.txt

# 3. run the app
python app.py
```

Open http://127.0.0.1:5000 in your browser.

## Project structure

```
pgdev/
├── app.py                  # Flask routes + demo data
├── requirements.txt
├── templates/
│   ├── base.html           # Navbar, footer, assistant panel
│   └── index.html          # Homepage sections
└── static/
    ├── css/style.css       # Design system and responsive styles
    └── js/main.js          # Terminal, reveal, quiz, filter, assistant
```

## Customizing

| Task | Where |
|------|-------|
| Change courses, projects, resources, stats | Lists at the top of `app.py` |
| Replace placeholder stats with real values | `STATS` in `app.py` |
| Use your real logo | Replace the `.logo` markup in `templates/base.html` with an `<img>` |
| Change colors | CSS variables in `:root` at the top of `style.css` |
| Edit quiz questions | `Q` array in `static/js/main.js` |
| Edit assistant replies | `R` object in `static/js/main.js` |

## Design system

- **Colors:** background `#050505`, surfaces `#0d0d0d` to `#151515`, text `#fff` / `#d9d9d9` / `#8a8a8a`, silver accents `#cfcfcf` and `#9fa4aa`, borders `rgba(255,255,255,.10)`
- **Fonts:** Manrope (headings and body), JetBrains Mono (labels and code), loaded from Google Fonts

## Roadmap

- [ ] Courses page and course details
- [ ] Learning dashboard
- [ ] Full code playground with a real execution backend
- [ ] Practice and quiz interface
- [ ] Projects and resources pages
- [ ] About page
- [ ] Login / signup with authentication
- [ ] Real AI assistant backend
- [ ] Database for courses and user progress

## License

Add your license here.

© 2026 _PG.Dev
