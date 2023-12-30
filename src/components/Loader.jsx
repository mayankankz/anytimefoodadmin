import React from 'react'
import { Audio, ColorRing } from 'react-loader-spinner'
import './loader.css'
export const Loader = () => {
  return (
   <div className="loader">
   <ColorRing
   visible={true}
   height="80"
   width="80"
   ariaLabel="blocks-loading"
   wrapperStyle={{}}
   wrapperClass="blocks-wrapper"
   colors={['#D70040', '#f47e60', '#FF2400', '#50C878', '#E30B5C']}
 />
   </div>
  )
}
