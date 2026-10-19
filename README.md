# Wraps Code by Okw Prosper

A personal portfolio built with Vue 3, TypeScript, Vite, and Tailwind CSS 4.

## Pages

- `/` — About landing page
- `/projects` — Projects and skills
- `/contact` — Contact information

Each page lives in `src/pages/`. Shared navigation, project cards, and the “Let's talk” chatbox live in `src/components/`.

## Local development

```sh
npm install
npm run dev
```

## Personalize

- WhatsApp (`2347074047411`) and email (`okwup910@gmail.com`) are configured in `src/config/contact.ts`. The chatbox opens WhatsApp with a visitor's message ready to send and offers email as an alternative.
- Update the About copy in `src/pages/AboutPage.vue` and project descriptions, statuses, and technologies in `src/pages/ProjectsPage.vue`.
- Replace `src/assets/my logo.png` to change the logo. `src/utils/logo.ts` clears light background pixels connected to the image edge while preserving enclosed light parts of the mark.
- Update the SEO description in `index.html` and the route descriptions in `src/App.vue` when the portfolio copy changes.

## Production build

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host. The host must serve `index.html` for direct requests to `/projects` and `/contact` so those page URLs work when refreshed.
