import React from "react";

const NewBlog = () => {
  return (
    <div className="mt-20 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-2xl font-bold font-serif mb-2 text-red-600">
        <i>Latest News!</i>
      </h1>
      <h1 className="text-6xl mb-10 text-shadow-black font-bold font-mono">THE BLOG</h1>

      {/* Cards Wrapper */}
      <div className="flex justify-center gap-6 flex-wrap">
        {/* Card 1 */}
        <div className="card bg-base-100 w-[23rem] shadow-sm hover:shadow-lg transition-shadow duration-500">
          <figure className="overflow-hidden">
            <img
              src="https://preview.colorlib.com/theme/pato/images/blog-01.jpg.webp"
              alt="Restaurant"
              className="h-[250px] w-full object-cover transform transition duration-700 ease-in-out hover:scale-105 cursor-pointer"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-mono font-light">
              Best Places for Wine
            </h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-start">
              <button className="hover:text-red-700 cursor-pointer transition-colors duration-300 text-xl ">
                Continue Reading  →
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-100 w-[23rem] shadow-sm hover:shadow-lg transition-shadow duration-500">
          <figure className="overflow-hidden">
            <img
              src="https://preview.colorlib.com/theme/pato/images/blog-02.jpg.webp"
              alt="Food"
              className="h-[250px] w-full object-cover transform transition duration-700 ease-in-out hover:scale-105 cursor-pointer"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-mono font-light">
              Eggs and Cheese
            </h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions">
              <button className="hover:text-red-700 cursor-pointer transition-colors duration-300 text-xl">
                Continue Reading  →
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 w-[23rem] shadow-sm hover:shadow-lg transition-shadow duration-500">
          <figure className="overflow-hidden">
            <img
              src="https://preview.colorlib.com/theme/pato/images/blog-03.jpg.webp"
              alt="Wine"
              className="h-[250px] w-full object-cover transform transition duration-700 ease-in-out hover:scale-105 cursor-pointer"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-mono font-light">
             Style the Wedding Party
            </h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions">
              <button className="hover:text-red-700 cursor-pointer transition-colors duration-300 text-xl items-start">
               Continue Reading  →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
