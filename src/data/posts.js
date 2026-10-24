// Pomocná funkce pro české zobrazení data v článcích.
export const formatDate = (value) => {
  const date = value instanceof Date ? value : new Date(String(value).slice(0, 10) + 'T12:00:00Z');
  return new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  }).format(date);
};
