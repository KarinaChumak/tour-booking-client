import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_ADDRESS;

export async function getTours() {
  const response = await axios.get(`${apiUrl}/api/v1/tours`);

  return response.data.data.documents;
}

export async function getOneTour(slug) {
  const response = await axios.get(
    `${apiUrl}/api/v1/tours/tour/${slug}`
  );
  console.log(response);

  return response.data.data.tour;
}

export async function deleteOneTour(id) {
  const response = await axios.delete(`${apiUrl}/api/v1/tours/${id}`);
  console.log(response);

  return response;
}

export async function createOneTour(newTour) {
  console.log(newTour);
  const responseCreate = await axios.post(`${apiUrl}/api/v1/tours`, {
    ...newTour,
    imageCover: newTour.imageCover.name,
    startDates: [newTour.startDate],
  });
  console.log(responseCreate);

  if (responseCreate.status !== 201) return responseCreate;
  else if (newTour.imageCover) {
    const newTourId = responseCreate.data.data.tour.id;

    const form = new FormData();
    form.append('imageCover', newTour.imageCover);

    const responseUpdate = await axios.patch(
      `${apiUrl}/api/v1/tours/${newTourId}`,
      form,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return responseUpdate;
  }
}
