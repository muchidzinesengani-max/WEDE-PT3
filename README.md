# Mabaso Electrical Services Website

## Project Title
WEDE5020 Portfolio of Evidence - Mabaso Electrical Services Website

## Student Information
- **Name:** MUTSHIDZI NESENGANI
- **Student Number:** ST10518407
- **Module:** WEDE5020 - Web Development
- **Institution:** The Independent Institute of Education (IIE)

## Project Overview
This repository contains the website project for **Mabaso Electrical Services**, a
family-owned electrical contracting business based in Polokwane, Limpopo. The site is
being developed in three parts as part of the WEDE5020 Portfolio of Evidence:

- **Part 1:** HTML structure, content, navigation, and file organisation.
- **Part 2:** CSS styling and responsive design.
- **Part 3:** JavaScript functionality and SEO optimisation.

The website aims to give Mabaso Electrical Services a professional online presence,
allowing prospective customers to learn about the business, browse services, and submit
quote requests online rather than relying solely on word-of-mouth and Facebook.

## Website Goals and Objectives
- Establish a professional, trustworthy online presence for the business.
- Clearly communicate the full range of electrical services offered.
- Make it easy for visitors to request a quote or contact the business directly.
- Improve local search visibility for terms such as "electrician Polokwane."

**Key Performance Indicators (KPIs):**
- Number of quote/enquiry form submissions per month.
- Reduction in average response time to customer enquiries.
- Growth in organic search visibility for local search terms.
- Click-through rate on WhatsApp/phone call-to-action buttons.

## Key Features and Functionality
- Responsive, mobile-first design suitable for customers searching urgently from a phone.
- Five linked pages: Home, About, Services, Enquiry (quote request form), and Contact.
- Quote request form capturing job type, preferred date, address, and job description.
- Contact page with two service-area locations shown on embedded maps.
- Consistent header navigation and footer across all pages.
- Part 3: interactive elements (FAQ accordion, tabs, service details modal, image gallery with
  lightbox, interactive Leaflet map), service search/filter/sort, validated forms with AJAX
  submission, and on-page SEO.

## Timeline and Milestones
| Milestone | Target |
|---|---|
| Proposal finalised, repository set up | Week 1 |
| Five HTML pages built and linked (Part 1) | Week 2-3 |
| CSS styling and responsive design (Part 2) | Week 4-5 |
| JavaScript functionality and SEO (Part 3) | Week 6-7 |
| Final testing, debugging, and submission | Week 8 |

## Part 1 Details (Complete)
Part 1 delivers the foundational HTML structure for all five pages, a clear file and
folder structure, and initial styling to support layout during development.

## Part 2 Details (Complete)
Part 2 delivers full CSS styling and a responsive design for the desktop, tablet, and
mobile experience:
- A consistent typographic scale and CSS custom properties for colour, spacing, and
  font sizing, applied across all five pages via the shared `style.css`.
- CSS Grid used for card, footer, and contact layouts; Flexbox used for the header,
  navigation, and hero content.
- Interactive states added using `:hover`, `:focus-visible`, and `:active` on buttons,
  cards, nav links, and form fields.
- A CSS-only (checkbox-driven) mobile navigation toggle, so the menu collapses behind a
  hamburger icon on small screens without requiring JavaScript.
- Two responsive breakpoints: tablet (`max-width: 900px`) and mobile
  (`max-width: 600px`), adjusting the typographic scale, section spacing, grid columns,
  and navigation layout at each stage.
- Responsive images: each content image has 400/800/1200px wide variants served via
  `srcset`/`sizes` so the browser picks the right file for the viewport, and the hero
  background image swaps to a smaller file at the tablet/mobile breakpoints.
- Screenshot evidence of the desktop, tablet, and mobile views should be added to this
  README as they are captured.

**File and folder structure:**
```
mabaso-electrical-website/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── faqs.json
├── images/
├── robots.txt
├── sitemap.xml
├── _headers
└── README.md
```

## Part 3 Details (Complete)
Part 3 adds JavaScript functionality, form validation, SEO and deployment. All JavaScript is
in `js/script.js` (vanilla JavaScript, no framework needed).

**Interactive elements**
- **Accordion:** FAQ on `services.html`. Questions load from `data/faqs.json` with `fetch()`
  (with a built-in backup list if the file cannot load).
- **Tabs:** "How We Work" on `about.html` (keyboard accessible with the arrow keys).
- **Modal:** "View details" button on each service card opens a dialog with a "Request a Quote"
  link that pre-selects the service on `enquiry.html`.
- **Gallery with lightbox:** "Our Work in Pictures" on `index.html` (click, arrow keys, Esc).
- **Interactive map:** Leaflet + OpenStreetMap on `contact.html` with two markers and
  "Show on map" buttons for each location (replaces the Part 2 Google Maps iframes).
- **Animations and transitions:** CSS fade-in on scroll (IntersectionObserver), accordion slide,
  gallery zoom, modal/tab fade, back-to-top button. Reduced-motion users get no animation.
- **DOM manipulation:** back-to-top button, modal, lightbox, error messages, result boxes, share
  links and footer year are all created or updated with JavaScript.

**Dynamic content**
- Search box, category filter buttons and A-Z / Z-A sort on the services page.
- FAQ content loaded from JSON.

**Forms**
- `enquiry.html` (quote request): validates name, South African phone number, email, service,
  date (not in the past), address and job details. After validation the site shows an
  estimated cost range and availability for the chosen service and date.
- `contact.html` (general message): validates name, email, message type and message.
- Both forms show an error message under each invalid field, use `aria-invalid` and
  `role="alert"` for screen readers, and send the data with AJAX (`fetch`) so the page does not
  reload. The compiled email can also be sent to `info@mabasoelectrical.co.za` using the
  "Send this as an email" button (mailto link built in `script.js`).
- To receive real submissions, create a free form at formspree.io and paste its URL into
  `CONFIG.formEndpoint` at the top of `js/script.js`.

**SEO**
- *Keyword research:* target keywords are "electrician Polokwane", "COC certificate Polokwane",
  "electrical repairs Limpopo", "DB board upgrade" and "solar-ready installation". They are used in
  page titles, the H1 on each page, meta descriptions and body text.
- *Title tags and meta descriptions:* unique for each page.
- *Header tags:* one H1 per page, then H2 and H3 in order.
- *Image optimisation:* descriptive file names, descriptive alt text, `width`/`height` set,
  responsive `srcset` and lazy loading.
- *URL structure:* short, descriptive file names (`services.html`, `enquiry.html`).
- *Internal linking:* links between Home, About, Services, Enquiry and Contact in the body text
  as well as the menu and footer.
- *Mobile-friendliness:* responsive layout from Part 2, viewport tag on every page.
- *Technical:* canonical links, Open Graph and Twitter tags, JSON-LD `Electrician` structured data
  on the home page, `robots.txt` and `sitemap.xml`.
- *Off-page plan (done outside the code):* create and verify a Google Business Profile for
  Polokwane; list the business in local directories; ask happy customers for Google reviews;
  link to the website from the business Facebook page; share new work on Facebook and WhatsApp
  (share links are in the footer). Backlinks must be earned over time, so none are claimed here.
- *Local SEO:* "Polokwane", "Bendor" and "Limpopo" appear in titles, headings and structured data.

**Page speed and security**
- `script.js` is loaded with `defer`; images use `srcset`, lazy loading and `width`/`height`
  to avoid layout shift; images are cached for a year through `_headers`.
- `_headers` (for Netlify) adds a Content Security Policy, `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`.
- User input is cleaned with `cleanText()`, text is inserted with `textContent` (not `innerHTML`),
  and external links use `rel="noopener noreferrer"`.

**Deployment**
- Hosted on Netlify (free plan) from the GitHub repository. Live site: <ADD YOUR NETLIFY URL HERE>

## Sitemap
```
Home (index.html)
├── About (about.html)
├── Services (services.html)
├── Get a Quote (enquiry.html)
└── Contact (contact.html)
```
All five pages are linked via a consistent navigation menu in the header, and the footer
repeats quick links on every page.

## Changelog
- **[Date] - v0.1 (Part 1):** Initial repository setup, file/folder structure created.
- **[Date] - v0.2 (Part 1):** Built and linked all five HTML pages (index, about,
  services, enquiry, contact) with semantic structure (header, nav, main sections,
  footer).
- **[Date] - v0.3 (Part 1):** Added base CSS (style.css) to support layout during
  development and a placeholder script.js for future JavaScript work.
- **[Date] - v0.4 (Part 1):** Added README.md documentation, sitemap, and references.
- **[Date] - v1.0 (Part 2):** Rebuilt `style.css` with CSS custom properties for a
  consistent typographic scale, colour palette, and spacing system.
- **[Date] - v1.1 (Part 2):** Added a CSS-only mobile navigation toggle (checkbox +
  label pattern) and matching markup to all five HTML pages.
- **[Date] - v1.2 (Part 2):** Added `:hover`, `:focus-visible`, and `:active`
  pseudo-class styling to buttons, cards, nav links, footer links, and form fields for
  clearer interactivity and accessibility.
- **[Date] - v1.3 (Part 2):** Introduced two responsive breakpoints (tablet at 900px,
  mobile at 600px) covering typographic scale, section padding, grid column counts, and
  the collapsing navigation menu.
- **[Date] - v1.4 (Part 2):** Generated 400px/800px/1200px wide versions of every
  content image and added `srcset`/`sizes`/`loading="lazy"` to all `<img>` tags so
  browsers download an appropriately sized file instead of the full-resolution
  original. Also swapped the hero background image to a smaller variant at the tablet
  and mobile breakpoints using CSS media queries.
- **[1 November 2026] - v2.0 (Part 3, Part 2 clean-up):** Removed leftover Part 1/Part 2 placeholder code
  and text: the temporary inline `<script>` blocks and "real submission handling is added in
  Part 3" messages in `enquiry.html` and `contact.html`, and the "[Your Full Name]" / "Part 1"
  header in `script.js` (now has the correct name and Part 3 description). All page behaviour is now
  in the one shared `js/script.js` file and linked with `defer` on every page.
- **[1 November 2026] - v2.1 (Part 3):** Added a search box, category filter buttons and A-Z / Z-A sort to
  `services.html`, with a live status message for screen readers.
- **[1 November 2026] - v2.2 (Part 3):** Added a FAQ accordion to `services.html` (loaded from
  `data/faqs.json`), a tabs section ("How We Work") to `about.html`, and a "View details" modal
  on each service card that links to the quote form with the service pre-selected.
- **[1 November 2026] - v2.3 (Part 3):** Added a "Our Work in Pictures" gallery with a lightbox to
  `index.html` (click, arrow keys, Esc to close).
- **[1 November 2026] - v2.4 (Part 3):** Replaced the two Google Maps iframes on `contact.html` with one
  interactive Leaflet/OpenStreetMap map with two markers and "Show on map" buttons.
- **[1 November 2026] - v2.5 (Part 3):** Added CSS animations and transitions (scroll fade-in, accordion
  slide, gallery zoom, modal and tab fade, back-to-top button) in `style.css`, with a
  `prefers-reduced-motion` rule.
- **[1 November 2026] - v2.6 (Part 3):** Added JavaScript validation to `enquiry.html` and `contact.html`
  (name, SA phone number, email, date, address, message length), inline error messages, and
  HTML5 attributes (`required`, `minlength`, `maxlength`, `pattern`, `autocomplete`).
- **[1 November 2026] - v2.7 (Part 3):** Added AJAX (`fetch`) form submission, a cost and availability
  response on the quote form, and a "Send this as an email" button that builds an email to
  info@mabasoelectrical.co.za. Added a "Type of Message" field to the contact form.
- **[1 November 2026] - v2.8 (Part 3):** SEO updates: keyword-based H1 headings, keywords meta tags,
  canonical links, Open Graph and Twitter tags, JSON-LD structured data, `width`/`height` on
  images, internal links in body text, `robots.txt` and `sitemap.xml`.
- **[1 November 2026] - v2.9 (Part 3):** Added `_headers` with security headers and caching rules, footer
  and footer share links (Facebook, WhatsApp, X).

## References
Referencing style: Harvard (adapted for The IIE), as required by the WEDE5020 module
guide.

- Afrihost, 2026. *Web hosting plans*. [online] Available at: <https://www.afrihost.com>
  [Accessed 9 August 2026].
- DOMAINS.CO.ZA, 2026. *.co.za domain registration*. [online] Available at:
  <https://www.domains.co.za> [Accessed 9 August 2026].
- Electrical Contractors' Association of South Africa (ECASA), 2026. *Certificate of
  Compliance requirements*. [online] Available at: <https://www.eca.co.za> [Accessed 9
  August 2026].
- Mozilla Developer Network (MDN), 2026. *HTML: HyperText Markup Language*. [online]
  Available at: <https://developer.mozilla.org/en-US/docs/Web/HTML> [Accessed 9 August
  2026].
- Google, 2026. *Google Maps embed without an API key*. [online] Available at:
  <https://www.google.com/maps> [Accessed 9 August 2026].
- Agafonkin, V., 2026. *Leaflet: an open-source JavaScript library for mobile-friendly interactive maps*. [online] Available at: <https://leafletjs.com> [Accessed 1 November 2026].
- Google, 2026. *Google Search Central: SEO Starter Guide*. [online] Available at:
  <https://developers.google.com/search/docs/fundamentals/seo-starter-guide> [Accessed 1 November 2026].
- Mozilla Developer Network (MDN), 2026. *Using the Fetch API*. [online] Available at:
  <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch> [Accessed 1 November 2026].
- Mozilla Developer Network (MDN), 2026. *Client-side form validation*. [online] Available at:
  <https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation> [Accessed 1 November 2026].
- Mozilla Developer Network (MDN), 2026. *Content Security Policy (CSP)*. [online] Available at:
  <https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP> [Accessed 1 November 2026].
- OpenStreetMap contributors, 2026. *OpenStreetMap*. [online] Available at: <https://www.openstreetmap.org> [Accessed 1 November 2026].
- Sitemaps.org, 2026. *Sitemaps XML format*. [online] Available at: <https://www.sitemaps.org/protocol.html> [Accessed 1 November 2026].
- Netlify, 2026. *Custom headers*. [online] Available at: <https://docs.netlify.com/manage/routing/headers/> [Accessed 1 November 2026].
- Formspree, 2026. *Formspree documentation*. [online] Available at: <https://help.formspree.io> [Accessed 1 November 2026].

## Image Sources

The website images were added to the `images` folder for the project. Sources used for the visual content include:

- ProLane – Electrical installation image: https://www.prolane.io/AK.jpeg
- OM Power Services – Electrical technician image: https://om-airconditioning-electrical.com/images/electrical-tec.jpg
- Electric Company of Omaha – Electrical wiring image: https://www.ecomaha.com/wp-content/uploads/2017/11/electrician-wires-worker-wiring-electrical-man.jpg
- Certiweb – Electrical testing image: https://www.certiweb.be/wp-content/uploads/2021/10/hoeveel-kost-een-elektriciteitskeuring.jpg
- OKRA Solar – Solar installation image: https://cdn.prod.website-files.com/64107caa41980be9eb3047ba/6818e4c0268cdb79d7eca649_south-africa-solar.jpg

Image sources should be reviewed against their current licence/usage terms before any commercial publication of the website.
