import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_ADDRESS;
const imageStorageUrl = import.meta.env.VITE_SUPABASE_IMAGES_LINK;
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export async function getTours() {
  const response = await axios.get(`${apiUrl}/api/v1/tours`);

  return response.data.data;
}

export async function getOneTour(slug) {
  const response = await axios.get(
    `${apiUrl}/api/v1/tours/tour/${slug}`
  );

  return response.data.data.tour;
}

export async function deleteOneTour(id) {
  const response = await axios.delete(`${apiUrl}/api/v1/tours/${id}`);

  return response;
}

export async function createOneTour(newTour) {
  // Create a tour if doesn't exist
  const responseCreate = await axios.post(
    `${apiUrl}/api/v1/tours`,
    {
      ...newTour,
      imageCover: newTour.imageCover.name,
      images: [],
    },
    {
      headers: {
        Authorization: 'Bearer ' + cookies.get('jwt'),
      },
    }
  );
  if (responseCreate.status !== 201) return responseCreate;

  const idToUpdate = responseCreate.data.data.id;

  const responseImageUpdate = await uploadTourImages(
    newTour.imageCover,
    newTour.images,
    idToUpdate
  );

  return responseImageUpdate;
}

export async function editOneTour(newTour, id) {
  // Upload all the images via patch request
  if (newTour.imageCover?.length > 0 || newTour.images?.length > 0) {
    const responseImageUpdate = await uploadTourImages(
      newTour.imageCover,
      newTour.images,
      id
    );

    return responseImageUpdate;
  }

  const responseUpdate = await axios.patch(
    `${apiUrl}/api/v1/tours/${id}`,
    {
      startLocation: newTour.startLocation,
      description: newTour.description,
      difficulty: newTour.difficulty,
      duration: newTour.duration,
      maxGroupSize: newTour.maxGroupSize,
      name: newTour.name,
      price: newTour.price,
      program: newTour.program,
      startDates: newTour.startDates,
      summary: newTour.summary,
      guides: newTour.guides,
      published: newTour.published || false,
    },
    {
      headers: {
        Authorization: 'Bearer ' + cookies.get('jwt'),
      },
    }
  );

  return responseUpdate;
}

async function uploadTourImages(imageCover, images, id) {
  const form = new FormData();

  // Upload all the images via patch request
  if (imageCover && !imageCover?.startsWith?.(imageStorageUrl))
    form.append('imageCover', imageCover);

  if (images) {
    for (let i = 0; i < images.length; i++) {
      if (!images[i]?.startsWith?.(imageStorageUrl))
        form.append('images', images[i]);
    }
  }

  if (form.get('imageCover') || form.get('images')) {
    const responseImageUpdate = await axios.patch(
      `${apiUrl}/api/v1/tours/${id}`,
      form,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + cookies.get('jwt'),
        },
      }
    );
  }
}
