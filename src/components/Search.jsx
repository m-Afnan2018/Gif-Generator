import React from 'react'
import { useState, useEffect } from 'react';
import { API_KEY, URL } from '../apis'
import axios from 'axios';
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
        {loader ? (<div className='spinner'></div>) : (<img src={gif}></img>)}        
        <input type="text" onChange={inputHandler}  onKeyDown={(btn) => {btn.key==='Enter' && generateHandler()}}></input>
        <div className='generate-button' onClick={generateHandler}>generate</div>
    </div>
  )
}

export default Search