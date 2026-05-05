import React from 'react'

const Card = () => {
  return (
    <div>
      <div className="hero bg-base-300 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-20">
          {/* Right Image */}
          <figure className='overflow-hidden rounded-2xl'>
          <img
            src="https://preview.colorlib.com/theme/pato/images/our-story-01.jpg.webp"
            className="object-cover max-w-sm rounded-2xl shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
          />
            </figure>
          {/* Left Content */}
          <div className="max-w-md px-">
            <h3 className="text-4xl font-bold text-red-800 font-serif italic">
              Italian Restaurant!
            </h3>
            <h1 className="text-5xl font-bold font-serif py-4 mx-8">
              WELCOME
            </h1>
            <p className="py-6 font-mono">
              <i>
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi 
                exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
              </i>
            </p>
            <button className="hover:text-red-600 cursor-pointer text-2xl">
              Our Story →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
