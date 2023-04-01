import { useEffect, useState } from 'react'
import axios from 'axios';

const key = process.env.REACT_APP_GIF_API_KEY;
const URL = process.env.REACT_APP_URL;
const random_URL = `${URL}?api_key=${key}`;

const useGif = (tag) => {
  const [gif, setGif] = useState(null);
  const [loader, setLoader] = useState(false);
  const [shareSupport, setShareSupport] = useState(true);

  async function generate(){
    setLoader(true);
    const url = tag ? `${random_URL}&tag=${tag}` : random_URL;
    const {data} = await axios.get(url);
    if(data?.data?.images){
      const gifUrl = data?.data?.images.downsized_large.url;
      setGif(gifUrl);
    }
    else{
      setGif('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGU5ODAzMGI4NWU5NDM1MGNmMWU2YjA5NDVmNzc5NDA4MzcwMWMxNyZjdD1n/C21GGDOpKT6Z4VuXyn/giphy.gif')
    }
    setLoader(false);
  }

  useEffect(() => {
    generate();
    checkShareSupport();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  async function downloadHandler(){
    const rawImage = await fetch(gif);
    const blobImage = await rawImage.blob();

    const aElement = document.createElement('a');
    aElement.setAttribute('download', `${tag}`);
    const href = window.URL.createObjectURL(blobImage);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    window.URL.revokeObjectURL(href);
  }

  async function checkShareSupport(){
    if(navigator.canShare && navigator.canShare()){
      setShareSupport(true);
    }
    else{
      setShareSupport(false);
    }
  }
  
  async function shareHandler(){
    const rawImage = await fetch(gif);
    const blobImage = await rawImage.blob();
    
    const file = new File( [blobImage], 
      `${tag}.gif`, 
      {
        type: blobImage.type,
        lastModified: new Date().getTime()
      }
    )

    const shareData = {
      title: "GIF-Gen",
      files: [file],
      text: "Download Intresting gifs from afnan-gif-generator.netlify.app", 
      url: 'afnan-gif-generator.netlify.app',
    }

    try{
      if(navigator.canShare(shareData)){
        await navigator.share(shareData);
      }
      else{
        console.log('Not Supported by the Browser');
      }
    }
    catch(err){
      console.log("Error nhi hai,, Permission nhi mili...");
    }
  }

  async function copyHandler(){
    if (navigator.clipboard?.write) {
      try {
        const rawImage = await fetch(gif);
        const blobImage = await rawImage.blob();
        const copyFile = new ClipboardItem({ [blobImage.type] : blobImage});

        // await navigator.clipboard.write([copyFile]);
      } catch(e) {
        console.error('Error while copying code', e);
      }
    }
  }

  return {loader, gif, generate, downloadHandler, shareHandler, shareSupport, copyHandler};
}

export default useGif;