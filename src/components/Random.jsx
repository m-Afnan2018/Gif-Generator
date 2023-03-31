import React from 'react'
import useGif from '../hooks/useGif';

const Random = () => {

  const {gif, loader, generate} = useGif();

  function generateHandler(){
    generate();
  }
  
  return (
    <div className='random-section section'>
        <div className='title'>a random gif</div>
        {loader ? (<div className='spinner'></div>) : (<img src={gif} alt='GIF'></img>)}
        <div className='generate-button' onClick={generateHandler}>generate</div>
    </div>
  )
}

export default Random