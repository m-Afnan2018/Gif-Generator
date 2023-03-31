import React from 'react'
import { useState } from 'react';
import useGif from '../hooks/useGif';

const Search = () => {
  const [search, setSearch] = useState('Cute Cats');

  const {generate, loader, gif} = useGif(search);
  
  function generateHandler(){
    generate();
  }

  function inputHandler(event){
    setSearch(event.target.value);
  }

  return (
    <div className='search-section section'>
        <div className='title'>random {search} gif</div>
        {loader ? (<div className='spinner'></div>) : (<img src={gif} alt='GIF'></img>)}        
        <input type="text" onChange={inputHandler}  onKeyDown={(btn) => {btn.key==='Enter' && generateHandler()}}></input>
        <div className='generate-button' onClick={generateHandler}>generate</div>
    </div>
  )
}

export default Search