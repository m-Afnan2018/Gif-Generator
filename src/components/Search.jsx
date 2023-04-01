import React from 'react'
import { useState } from 'react';
import useGif from '../hooks/useGif';

const Search = () => {
  const [search, setSearch] = useState('Cute Cats');

  const {generate, loader, gif, downloadHandler, shareHandler, shareSupport} = useGif(search);
  
  function generateHandler(){
    generate();
  }

  function inputHandler(event){
    setSearch(event.target.value);
  }

  return (
    <div className='search-section section'>
        <div className='title'>random {search} gif</div>
        {loader ? (<div className='spinner'></div>) : (<img src={gif} alt='GIF' loading='lazy'></img>)}
        <div className='download-share'>
          <div className={loader ? "button disable" : "button"} onClick={downloadHandler}>download</div>
          {
            shareSupport ? 
            <div className={loader ? "button disable" : "button"} onClick={shareHandler}>share</div> :
            <div></div> 
          }
        </div>   
        <input type="text" onChange={inputHandler}  onKeyDown={(btn) => {btn.key==='Enter' && generateHandler()}} placeholder='Search for gifs...'></input>
        <div className='generate-button' onClick={generateHandler}>generate</div>
    </div>
  )
}

export default Search