import React from 'react'
import './Loader.css'

function Loading() {
  return (
    <div className='Loader-Parent'>
      <div className="child">
     <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  )
}

export default Loading