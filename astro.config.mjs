// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static teacher. The pages she will submit live in public/study as plain HTML.
export default defineConfig({
  // The dock sits on the bottom edge. The dev toolbar would cover it on her phone.
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
