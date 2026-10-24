// Dates in article frontmatter may be parsed as Date objects by YAML/Astro.
const pragueDate = (value) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(value);
  const get = (type) => parts.find(part => part.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
};

export function isPublished(post, now = new Date()) {
  const value = post.data.date;
  const date = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value).slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= pragueDate(now);
}
