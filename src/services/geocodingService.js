import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_ADDRESS;

export default async function getGeocoding(placeId) {
  const response = await axios.get(
    `${apiUrl}/api/v1/geocoding/details/${placeId}`
  );

  return response.data;
}
