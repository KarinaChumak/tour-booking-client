export const formatDate = (date) =>
  new Date(date).toLocaleString('en-us', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
