// Publish dates are interpreted in the Europe/Prague time zone.
export function isPublished(post, now = new Date()) {
  const date = String(post.data.date).slice(0, 10);
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(now);
  return date <= today;
}
