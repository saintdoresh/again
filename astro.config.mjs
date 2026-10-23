// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static teacher. The pages to submit live in public/study as plain HTML.
export default defineConfig({
  // The dock sits on the bottom edge. The dev toolbar would cover it on a phone.
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
