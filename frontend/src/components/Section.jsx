import React from 'react'

const Section = ({children}) => {
  return (
    <section className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      {children}
   </section>
  )
}

export default Section
