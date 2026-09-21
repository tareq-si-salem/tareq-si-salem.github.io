# Tareq Si Salem — academic website

A static, responsive academic portfolio for GitHub Pages. The Midnight Lab design uses navy surfaces, lavender accents, a subtle grid, and an optional light appearance. No build step or package installation is required.

## Preview locally

Open `index.html` directly, or serve this directory:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Then open http://localhost:8765. A server is required for the optional visitor-map data fetch. Navigation and the publication search work without a server.

## Edit content

- `index.html`: biography, selected publications, news, students, and Tafsut spotlight.
- `publications.html`: complete archive, with client-side search by title, author, venue, or year.
- `talks.html`: talks, tutorials, slides, and recordings.
- `teaching.html`: teaching history.
- `software.html`: models, repositories, and datasets.
- `cv.html`: academic background and a CV request link. The original repository did not contain its referenced CV PDF.
- `assets/style.css`: shared layout, colors, responsive breakpoints, and print styles.
- `assets/theme.js`: applies an explicit saved appearance before rendering; dark is the default.
- `assets/site.js`: theme control, mobile navigation, publication search, and copyright year.

The navigation and footer are static HTML, so update all six pages when changing shared links. Keep exactly one `h1` per page and use relative URLs for local assets. Publications must use `.pub-card`; archive category headings must use `.publication-heading` for filtering.

The existing analytics, visitor map, and visitor-statistics workflow remain in place. They are optional external enhancements: the main content, navigation, and local files do not depend on them. The site does not introduce new tracking.

## Validation performed

- All six pages: HTML nesting, one primary heading, and local asset/document links.
- Desktop, 320px mobile, and 768px tablet layouts: no horizontal overflow.
- Publication search: year query, empty result, and clear/reset.
- Mobile menu: open, close, and Escape; theme persists between pages.
- Dark and light appearance visually reviewed.

`design-options.html` is the local six-direction comparison created during design exploration; it is not part of the production site.
