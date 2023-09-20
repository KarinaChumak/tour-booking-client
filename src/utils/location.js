import getGeocoding from '../services/geocodingService';

export async function getFormatedLocation(startLocation) {
  const { data: geocodedData } = await getGeocoding(
    startLocation.place_id
  );

  const { formatted_address, geometry } = geocodedData.result;

  const locationFormatted = {
    ...startLocation,
    type: 'Point',
    coordinates: [geometry.location.lng, geometry.location.lat],
    address: formatted_address,
  };

  return locationFormatted;
}

export async function getFormattedProgram(program) {
  const formattedProgram = [];

  for (const day of program) {
    let formattedLocations = [];
    for (const location of day.locations) {
      const formattedLocation = await getFormatedLocation(location);
      formattedLocations.push(formattedLocation);
    }

    formattedProgram.push({ ...day, locations: formattedLocations });
  }

  return formattedProgram;
}
