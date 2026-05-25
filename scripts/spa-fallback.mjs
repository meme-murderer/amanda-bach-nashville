// GitHub Pages doesn't know about client-side routes. Copy index.html
// to 404.html so any unknown URL serves the SPA shell, which then renders.
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve('dist/index.html');
const dst = resolve('dist/404.html');
copyFileSync(src, dst);
console.log(`✓ SPA fallback: copied ${src} → ${dst}`);
