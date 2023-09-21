import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_ADDRESS;
const imageStorageUrl = import.meta.env.VITE_SUPABASE_IMAGES_LINK;
import { PAGE_SIZE } from '../utils/constants';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export async function getBookings({ filter, sortBy, page }) {
  let queryStr = `${apiUrl}/api/v1/booking?`;

  if (page) queryStr += `page=${page}&limit=${PAGE_SIZE}`;
  if (filter) queryStr += `&${filter.field}=${filter.value}`;
  if (sortBy) queryStr += `&sort=${sortBy}`;

  const response = await axios.get(queryStr);

  return response.data;
}

export async function getBooking({ bookingId }) {
  const response = await axios.get(
    `${apiUrl}/api/v1/booking/${bookingId}`
  );

  return response.data;
}

export async function deleteOneBooking(bookingId) {
  const response = await axios.delete(
    `${apiUrl}/api/v1/booking/${bookingId}`
  );

  return response;
}

export async function getBookingsAfterDate(date) {
  let queryStr = `${apiUrl}/api/v1/booking?createdAt[gt]=${date}`;

  const response = await axios.get(queryStr);

  return response.data.data;
}
