# Kenneth Johannes Phan — Portfolio

Static portfolio website (HTML + Bootstrap 5 + vanilla JS) for **GitHub Pages**.

- **Bilingual:** Indonesian (default) / English switcher, choice remembered per visitor
- **Contact form:** sends email through [EmailJS](https://www.emailjs.com) — no server needed
- **No build step:** plain files, libraries load from CDNs

> 👉 **Start with [SETUP.md](SETUP.md)** for the full, step-by-step deployment guide.

## Structure

```
.
├── index.html            # the whole page (4 sections)
├── .nojekyll             # tells GitHub Pages to serve files as-is
├── SETUP.md              # detailed setup instructions
└── assets/
    ├── css/style.css     # "blueprint / schema" design
    ├── img/profile.jpg
    └── js/
        ├── config.js     # EmailJS Public Key / Service ID / Template ID  ← edit this
        ├── i18n.js       # ID + EN text and the language switcher        ← edit text here
        └── script.js     # animations, nav, contact form
```

## Run locally

```bash
python3 -m http.server 8000      # then open http://localhost:8000
```

## Editing content

Every translatable element in `index.html` has a `data-i18n="some.key"` attribute.
To change text, edit that key in **both** the `id` and `en` objects in `assets/js/i18n.js`,
and update the Indonesian text written inside the HTML tag (it is the fallback shown to
search engines and visitors without JavaScript).

English is applied by JavaScript, so search engines index the Indonesian default.
Open the site in English directly with `?lang=en` (e.g. `https://<you>.github.io/<repo>/?lang=en`).

## Security notes

This repo intentionally contains **no secrets**. The three EmailJS values in `config.js` are
public by design. Never commit an EmailJS *Private Key*, an email password, or an app password.
