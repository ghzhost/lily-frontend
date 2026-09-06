import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Brand colors from src/app/globals.css
const accentColor = '#0f766e'; // --color-accent
const surfaceColor = '#f7f7f5'; // --color-surface
const inkColor = '#0f172a'; // --color-ink

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <rect width="64" height="64" rx="14" fill="${inkColor}"/>
  <path d="M20 18h8v20h12v8H20V18z" fill="${surfaceColor}"/>
  <circle cx="44" cy="22" r="4" fill="${accentColor}"/>
</svg>`;

const publicDir = path.join(process.cwd(), 'public');
const iconsDir = path.join(publicDir, 'icons');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

// Write canonical SVGs
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), svgIcon);
fs.writeFileSync(path.join(iconsDir, 'lily-icon.svg'), svgIcon);
fs.writeFileSync(path.join(iconsDir, 'lily-maskable-icon.svg'), svgIcon);
console.log('Created public/ SVGs and public/icons/ SVGs');

const pngTargets = [
  { dest: path.join(publicDir, 'apple-icon.png'), size: 180 },
  { dest: path.join(publicDir, 'icon-192.png'), size: 192 },
  { dest: path.join(publicDir, 'icon-512.png'), size: 512 },
  { dest: path.join(iconsDir, 'icon-192.png'), size: 192 },
  { dest: path.join(iconsDir, 'icon-512.png'), size: 512 },
];

async function generatePNGs() {
  const svgBuffer = Buffer.from(svgIcon);

  for (const { dest, size } of pngTargets) {
    await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(dest);
    console.log(`Created ${path.relative(process.cwd(), dest)} (${size}x${size})`);
  }
}

generatePNGs().catch(console.error);