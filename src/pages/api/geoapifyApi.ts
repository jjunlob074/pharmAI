const apiKey = import.meta.env.GEOAPIFY_API_KEY;

export async function fetchCities(query) {
  const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&type=city&limit=5&apiKey=${apiKey}`);
  if (response.ok) {
    const data = await response.json();
    console.log('Cities data:', data); // Log the cities data
    return data.features;
  } else {
    console.error('Error fetching cities:', response.statusText);
  }
}

export async function fetchPharmacies(lat, lon) {
  const response = await fetch(`https://api.geoapify.com/v2/places?categories=healthcare.pharmacy&filter=circle:${lon},${lat},5000&limit=10&apiKey=${apiKey}`);
  if (response.ok) {
    const data = await response.json();
    console.log('Pharmacies data:', JSON.stringify(data, null, 2)); // Log the pharmacies data in a detailed format
    return data.features;
  } else {
    console.error('Error fetching pharmacies:', response.statusText);
  }
}
