// services/api.js

const BASE_URL = 'https://api.npoint.io/4829d4ab0e96bfab50e7';

export const getFlightData = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};
