import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const apiUrl = import.meta.env.VITE_API_ADDRESS;

export async function getCurrentUser() {
  let response;
  if (cookies?.get('jwt')) {
    response = await axios.get(`${apiUrl}/api/v1/users/me`, {
      headers: {
        Authorization: 'Bearer ' + cookies.get('jwt'),
      },
    });

    return response?.data?.data;
  }
  return null;
}

export async function login({ email, password }) {
  const response = await axios.post(`${apiUrl}/api/v1/users/login`, {
    email,
    password,
  });

  if (response.data.status === 'success') {
    cookies.set('jwt', response.data.token, {
      path: '/',
    });
    return response;
  }
}

export async function logout({ email, password }) {
  const response = await axios.get(`${apiUrl}/api/v1/users/logout`);

  if (response.data.status === 'success') {
    cookies.set('jwt', null, {
      path: '/',
    });
    return response;
  }
  return response;
}

export async function updatePassword(data) {
  const response = await axios.patch(
    `${apiUrl}/api/v1/users/updatePassword`,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + cookies.get('jwt'),
      },
    }
  );

  if (response.data.status === 'success') {
    cookies.set('jwt', response.data.cookies.get('jwt'), {
      path: '/',
    });
    return response;
  }

  return response;
}
