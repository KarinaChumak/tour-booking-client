export default function isAdminSubdomain() {
  const location = window.location.hostname.replace('www.', '');
  return location.split('.')[0] === 'admin';
}
