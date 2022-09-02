// import axios from "axios";

// const BASE_URL = "https://youtube-v31.p.rapidapi.com";
// const options = {
//   url: BASE_URL,
//   params: {
//     //   relatedToVideoId: '7ghhRHRP6t4',
//     part: "id,snippet",
//     type: "video",
//     maxResults: "50",
//   },
//   headers: {
//     "X-RapidAPI-Key": process.env.REACT_APP_X_RAPIDAPI_KEY,
//     "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
//   },
// };

// export const fetchAPI = async (url) => {
//   const { data } = await axios.get(`${BASE_URL}/${url}`, options);
//   return data;
// };

//   export const fetchAPI = async (searchTerm) => {
//     options.params.q = searchTerm;
//     const response = await axios(options);
//     return response.data.items;
//   }
import axios from 'axios';
const BASE_URL = 'https://youtube-v31.p.rapidapi.comvbv';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.REACT_APP_RAPID_API_KEY,
    // 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  let { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};