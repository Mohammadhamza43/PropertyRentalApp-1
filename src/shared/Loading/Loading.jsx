import React from 'react'
import './Loader.css'
import loader from '../../assets/media/loader/loader.gif'

function Loading() {
  return (
    <div className='loader_parent'>
        <div className='loader_child'>
        <img src={loader} alt="" />
        </div>
    </div>
  )
}

export default Loading