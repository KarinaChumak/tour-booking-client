import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_ADDRESS;

export async function getUserByRole(role) {
  const response = await axios.get(
    `${apiUrl}/api/v1/users?role=${role}`
  );

  return response.data.data.documents;
}
