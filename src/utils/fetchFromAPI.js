import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiKey = import.meta.env.VITE_RAPID_API_KEY;
const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};
