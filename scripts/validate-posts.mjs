import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'src/content/posts';
const categories = new Set(['Novinky', 'Tipy do výuky', 'Ze zákulisí']);
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.md')) files.push(path);
  }
}
await walk(root);
const errors = [];
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) { errors.push(file + ': chybí YAML frontmatter'); continue; }
  const fields = new Map();
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([A-Za-z][\w-]*):\s*(.*?)\s*$/);
    if (item) {
      if (fields.has(item[1])) errors.push(file + ': duplicitní pole ' + item[1]);
      fields.set(item[1], item[2].replace(/^["']|["']$/g, ''));
    }
  }
  for (const key of ['title', 'date', 'category', 'description']) {
    if (!fields.get(key)?.trim()) errors.push(file + ': chybí povinné pole ' + key);
  }
  const date = fields.get('date');
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date)) {
    errors.push(file + ': neplatné date, použijte YYYY-MM-DD');
  }
  const category = fields.get('category');
  if (category && !categories.has(category)) errors.push(file + ': neznámá rubrika ' + category);
  if (fields.has('pubDate')) errors.push(file + ': pubDate není podporováno; použijte date');
}
if (errors.length) {
  console.error('Kontrola článků selhala:\n' + errors.map(x => ' - ' + x).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Kontrola článků OK (' + files.length + ' souborů).');
}
