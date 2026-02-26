# MALCOLM&CO. — Specialty Coffee Website

A cinematic, editorial-style specialty coffee website with rich animations and a luxury aesthetic. Built as a single-file HTML/CSS/JS site, optimised for GitHub Pages hosting.

---

## ✦ Preview

> Dark-mode editorial design with gold accents, steam particle animations, text scramble effects, magnetic buttons, and scroll-triggered reveals.

---

## Features

### Design & Aesthetic
- **Cinematic dark theme** — deep blacks and warm golds inspired by specialty coffee culture
- **Editorial typography** — Bebas Neue for display, Playfair Display for elegance, Space Mono for body text
- **Grain overlay** — animated film-grain texture for depth and texture
- **Asymmetric layout** — grid-breaking composition that avoids generic coffee shop templates

### Animations & Interactions
- **Custom cursor** — gold dot + lagging ring with magnetic hover states
- **Loading screen** — animated progress bar intro before content reveals
- **Steam particle system** — canvas-based floating steam particles in the hero
- **Text scramble effect** — hero eyebrow cycles through phrases with a glitch-decode animation
- **Glitch hover** — headline glitches on hover
- **Scroll-triggered reveals** — fade-up, slide-left, slide-right, and scale-in on scroll
- **Counting animation** — numbers count up when section enters the viewport
- **Origin bar animation** — flavour profile bars animate on scroll
- **Marquee ticker** — continuously scrolling text strip (pauses on hover)
- **Magnetic buttons** — CTA buttons subtly follow the cursor
- **Parallax hero** — hero text layers move at different rates on scroll
- **Progress bar** — reading progress indicator at the top of the page

### Sections
1. **Hero** — Full-viewport cinematic intro with animated rings and steam
2. **Marquee** — Scrolling brand descriptor strip
3. **Our Story** — Founding narrative with illustrated coffee cup
4. **Counter Strip** — Animated statistics (cups served, origins, reviews, years)
5. **Philosophy** — Three-pillar brand values (Source → Roast → Serve)
6. **Menu / Products** — Three product cards (Americano, Cappuccino, Mocha)
7. **Bean Origins** — World map with pulsing origin markers and animated flavour bars
8. **Testimonial** — Full-width editorial quote
9. **Visit** — Opening hours, contact info, map link
10. **Footer** — Navigation, social links, credits

---

## File Structure

```
/
├── index.html       ← Complete site (HTML + CSS + JS, self-contained)
└── README.md
```

All styles and scripts are embedded in `index.html`. No build step, no dependencies, no external frameworks. Works straight from GitHub Pages.

> **Note on images:** The original site referenced local images (`Pictures/...`). This redesign replaces them with inline SVG illustrations and CSS-based visuals that render identically on all devices without requiring image files. If you wish to reintroduce photography, replace the SVG placeholders with `<img>` tags pointing to images in a `/Pictures` folder.

---

## Deployment to GitHub Pages

1. Create a new GitHub repository (e.g. `malcolm-co`)
2. Upload `index.html` (and `README.md`) to the repository root
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch`
5. Choose `main` branch and `/ (root)` folder
6. Click **Save** — your site will be live at `https://yourusername.github.io/malcolm-co`

---

## Customisation

### Colours
Edit the CSS variables at the top of the `<style>` block:
```css
:root {
  --gold: #c9a84c;        /* Primary accent */
  --gold-light: #e8c97a;  /* Lighter gold */
  --cream: #f2ead8;       /* Light text */
  --dark: #0a0806;        /* Background */
}
```

### Prices
Update in the product cards section:
```html
<div class="product-price">R45</div>
```

### Contact Details
Update in the `#visit` section and the footer.

### Adding Products
Duplicate a `.product-card` block and update the name, ingredients, price, and SVG icon.

### Fonts
Fonts are loaded from Google Fonts. To change them, update the `<link>` tag in `<head>` and the font-family references in CSS.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome/Safari | ✅ Responsive |

Custom cursor is hidden on touch devices automatically.

---

## Performance Notes

- Zero JavaScript dependencies — all vanilla JS
- Single HTTP request for the page itself
- Google Fonts loaded with `display=swap` for no render blocking
- Canvas steam effect uses `requestAnimationFrame` — auto-pauses when tab is hidden
- Intersection Observer used for all scroll animations (no scroll event polling)

---

## Credits

- **Design & Development** — [Malcolm Mukorera](https://linkedin.com/in/malcolm-mukorera-115430261)
- **Fonts** — Google Fonts (Bebas Neue, Playfair Display, Space Mono)
- **Concept** — Malcolm&Co. Specialty Coffee, Kloof, Durban

---

*© 2024 Malcolm&Co. All rights reserved.*
