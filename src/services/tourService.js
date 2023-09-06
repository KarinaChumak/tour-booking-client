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
  console.log(newTour.imageCover.type);
  const responseCreate = await axios.post(`${apiUrl}/api/v1/tours`, {
    ...newTour,
    imageCover: newTour.imageCover.name,
    startDates: [newTour.startDate],
    startLocation: {
      description: 'NYC, USA',
      type: 'Point',
      coordinates: [-73.985141, 40.75894],
      address: 'Manhattan, NY 10036, USA',
    },
  });

  if (responseCreate.status !== 201) return responseCreate;
  else {
    const newTourId = responseCreate.data.data.tour.id;

    const form = new FormData();

    for (const key in newTour) {
      if (key === 'field') {
        form.append(key, newTour[key][1]);
      } else {
        form.append(key, newTour[key]);
      }
    }

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
