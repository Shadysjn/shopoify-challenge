import axios from "axios";

//gets all of the events of which there are pictures for a specific day
export const requestNewData = (count) => {
  const url = `https://api.nasa.gov/planetary/apod?count=${count}&api_key=`;
  console.log(`${url}${process.env.API_KEY}`);
  return axios.get(`${url}${process.env.API_KEY}`);
};
