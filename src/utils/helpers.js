export const formatDate = (date) =>
  new Date(date).toLocaleString('en-us', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

export const isValidEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
