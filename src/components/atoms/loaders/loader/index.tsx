import React from 'react'

export const Loader = () => {
  return (
    <div className="absolute h-full w-full bg-white flex">
      <div className="m-auto flex items-center">
        <div className="animate-bounce animation-delay-0">
          <div className="w-0 h-0 m-2 border-l-8 border-l-transparent border-b-8 border-b-primary-400 border-r-8 border-r-transparent"></div>
        </div>
        <div className="animate-bounce animation-delay-200">
          <div className="w-3 h-3 m-2 bg-secondary-400"></div>
        </div>
        <div className="animate-bounce animation-delay-400">
          <div className="w-3 h-3 m-2 bg-tertiary-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
