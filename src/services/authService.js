import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const token = cookies.get('jwt');

const apiUrl = import.meta.env.VITE_API_ADDRESS;

export async function getCurrentUser() {
  // const jwt =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDk5ZTg2MjY2ZGQ2MmE0MzQ5MWVkNCIsImlhdCI6MTY5NTEyOTIyNSwiZXhwIjoxNzAyOTA1MjI1fQ.V59AsSgYNeyLnh-RjXDvQPbM3hPDVhYN_u20Ap9veNE';

  let response;
  if (token) {
    response = await axios.get(`${apiUrl}/api/v1/users/me`, {
      headers: {
        Authorization: 'Bearer ' + token,
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
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (response.data.status === 'success') {
    cookies.set('jwt', response.data.token, {
      path: '/',
    });
    return response;
  }

  return response;
}
