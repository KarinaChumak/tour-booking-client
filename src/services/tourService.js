import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_ADDRESS;

export async function getTours() {
  const response = await axios.get(`${apiUrl}/api/v1/tours`);

  return response.data.data.documents;
}

export async function getOneTour(slug) {
  const response = await axios.get(`${apiUrl}/api/v1/tours/${slug}`);
  console.log(response);

  return response.data.data.tour;
}
