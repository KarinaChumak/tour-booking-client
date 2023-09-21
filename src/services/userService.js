import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_ADDRESS;
const imageStorageUrl = import.meta.env.VITE_SUPABASE_IMAGES_LINK;
import { PAGE_SIZE } from '../utils/constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export async function getUserByRole(role) {
  const response = await axios.get(
    `${apiUrl}/api/v1/users?role=${role}`,
    {
      headers: {
        Authorization: 'Bearer ' + cookies.get('jwt'),
      },
    }
  );

  return response.data.data;
}

export async function getAllUsers({ filter, sortBy, page }) {
  let queryStr = `${apiUrl}/api/v1/users?`;

  if (page) queryStr += `page=${page}&limit=${PAGE_SIZE}`;
  if (filter) queryStr += `&${filter.field}=${filter.value}`;
  if (sortBy) queryStr += `&sort=${sortBy}`;

  const response = await axios.get(queryStr, {
    headers: {
      Authorization: 'Bearer ' + cookies.get('jwt'),
    },
  });

  return response.data;
}

export async function deleteOneUser(id) {
  const response = await axios.delete(`${apiUrl}/api/v1/users/${id}`);

  return response;
}

export async function createOneUser(newUser) {
  // Create a user if doesn't exist
  const responseCreate = await axios.post(
    `${apiUrl}/api/v1/users`,
    {
      ...newUser,
      password: newUser.tmpPassword,
      passwordConfirm: newUser.tmpPassword,
    },
    {
      headers: {
        Authorization: 'Bearer ' + cookies.get('jwt'),
      },
    }
  );
  return responseCreate;
}

export async function editOneUser(newUser, id) {
  const responseUpdate = await axios.patch(
    `${apiUrl}/api/v1/users/${id}`,
    {
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      name: newUser.name,
    },
    {
      headers: {
        Authorization: 'Bearer ' + cookies.get('jwt'),
      },
    }
  );

  return responseUpdate;
}

export async function updateMe(newData) {
  const form = new FormData();

  if (
    newData.photo &&
    !newData.photo?.startsWith?.(imageStorageUrl)
  ) {
    form.append('photo', newData.photo);
  }

  if (newData.name) {
    form.append('name', newData.name);
  }

  const response = await axios.patch(
    `${apiUrl}/api/v1/users/updateMe`,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + cookies.get('jwt'),
      },
    }
  );

  return response;
}
