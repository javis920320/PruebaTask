import React from 'react'

const Container = ({children}) => {
  return (
    <div className="w-full sm:w-1/5 md:w-1/5 lg:w-1/5 xl:w-3/5 bg-blue-950 p-4 rounded mx-auto mt-16 h-[89%] overflow-y-scroll">
    {children}
</div>
  )
}

export default Container               
