import { useEffect, useState } from 'react'
import axios from 'axios';

const key = process.env.REACT_APP_GIF_API_KEY;
const URL = process.env.REACT_APP_URL;
const random_URL = `${URL}?api_key=${key}`;
// const search_URL = `${URL}?api_key=${key}&tag=${search}`;

const useGif = (tag) => {
  const [gif, setGif] = useState(null);
  const [loader, setLoader] = useState(false);

  async function generate(){
    setLoader(true);
    const url = tag ? random_URL : `${random_URL}&tag=${tag}`;
    const {data} = await axios.get(url);
    let gifUrl = data.data.images.downsized_large.url;
    setGif(gifUrl);
    setLoader(false);
  }

  useEffect(() => {
    generate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {loader, gif, generate};
}

export default useGif;