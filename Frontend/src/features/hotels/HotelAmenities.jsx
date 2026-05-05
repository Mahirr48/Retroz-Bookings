import React from 'react'

const Menu = () => {
  return (
    <div className='mt-20 mx-10'>
      {/* Section Titles */}
      <h1 className='text-center text-4xl text-red-600 font-sans font-light'>
        <i>Discover</i>
      </h1>
      <h1 className='text-center text-6xl text-black font-mono font-light mb-10'>
        OUR MENU
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-4 gap-6">

        {/* Card 1 - Big (Lunch) */}
        <div className="relative col-span-2 row-span-2 group rounded-2xl overflow-hidden">
          <img
            src="https://preview.colorlib.com/theme/pato/images/our-menu-01.jpg.webp"
            alt="Lunch"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
            <button className="btn text-2xl font-mono font-light bg-white/80">
              LUNCH
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group rounded-2xl overflow-hidden">
          <img
            src="https://preview.colorlib.com/theme/pato/images/our-menu-05.jpg.webp"
            alt="Dinner"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
            <button className="btn text-2xl font-mono font-light bg-white/80">
              DINNER
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative group rounded-2xl overflow-hidden">
          <img
            src="https://preview.colorlib.com/theme/pato/images/our-menu-08.jpg.webp"
            alt="Drink"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
            <button className="btn text-2xl font-mono font-light bg-white/80">
              DRINK
            </button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative group rounded-2xl overflow-hidden">
          <img
            src="https://preview.colorlib.com/theme/pato/images/our-menu-10.jpg.webp"
            alt="Starters"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
            <button className="btn text-2xl font-mono font-light bg-white/80">
              STARTERS
            </button>
          </div>
        </div>

        {/* Card 5 - Wide (like Happy Hour in screenshot) */}
        <div className="relative col-span-2 group rounded-2xl overflow-hidden">
          <img
            src="https://preview.colorlib.com/theme/pato/images/our-menu-11.jpg.webp"
            alt="Happy Hour"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
            <button className="btn text-2xl font-mono font-light bg-white/80">
              HAPPY HOUR
            </button>
          </div>
        </div>

        {/* Card 6 - Dessert */}
        <div className="relative col-span-2 group rounded-2xl overflow-hidden">
          <img
            src="https://preview.colorlib.com/theme/pato/images/our-menu-12.jpg.webp"
            alt="Dessert"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
            <button className="btn text-2xl font-mono font-light bg-white/80">
              DESSERT
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Menu
