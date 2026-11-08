import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const base = 'dist/clanky';
const origin = 'https://blog.zivatabule.cz';
const errors = [];
let checked = 0;
const dirs = await readdir(base, { withFileTypes: true });
for (const entry of dirs) {
  if (!entry.isDirectory()) continue;
  const html = await readFile(join(base, entry.name, 'index.html'), 'utf8');
  const tags = [...html.matchAll(/<meta\s+[^>]*>/gi)].map(m => m[0]);
  const property = (tag, key) => tag.match(new RegExp('\\b' + key + '=["\\x27]([^"\\x27]+)["\\x27]', 'i'))?.[1];
  const images = tags.filter(tag => property(tag, 'property') === 'og:image').map(tag => property(tag, 'content'));
  const socialFiles = ['jpg', 'webp', 'png'].map(ext => join('public/images/social', entry.name + '.' + ext));
  const existing = [];
  for (const path of socialFiles) { try { if ((await stat(path)).isFile()) existing.push(path); } catch {} }
  if (existing.length > 0) {
    checked++;
    const expected = origin + '/images/social/' + entry.name + '.' + existing[0].split('.').pop();
    if (images.length !== 1 || images[0] !== expected) errors.push(entry.name + ': og:image má být ' + expected + ', nalezeno ' + JSON.stringify(images));
    const twitter = tags.filter(tag => property(tag, 'name') === 'twitter:image').map(tag => property(tag, 'content'));
    if (twitter.length !== 1 || twitter[0] !== expected) errors.push(entry.name + ': nesprávné twitter:image');
  }
}
if (!checked) errors.push('Nebyl nalezen žádný článek s ilustračním obrázkem; test nic neověřil.');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('OG metadata v sestaveném HTML ověřena pro ' + checked + ' článků.');
