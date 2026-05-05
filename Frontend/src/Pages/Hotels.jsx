import { useEffect, useState } from "react";
import API from "../services/api";
import HotelCard from "../Components/cards/HotelCard";
import { MdSearch, MdFilterList, MdMap } from "react-icons/md";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get("/hotels/public")
      .then((res) => {
        setHotels(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f8] dark:bg-slate-900 transition-colors duration-300 font-body pt-24 pb-20">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-700 pb-8">

          <div>
            <span className="text-indigo-600 dark:text-indigo-400 text-xs tracking-[0.25em] uppercase font-body block mb-3">
              Discover the World
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Our Properties
            </h1>
          </div>

          <p className="text-slate-500 dark:text-slate-400 max-w-md mt-4 md:mt-0 text-base font-body leading-relaxed md:text-right">
            Curated elegance and uncompromising comfort in the world's most sought-after destinations.
          </p>

        </div>

        {/* SEARCH */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between">

          {/* Input */}
          <div className="w-full sm:w-96 relative group">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-body text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full sm:w-auto">

            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all">
              <MdFilterList className="h-5 w-5" />
              Filters
            </button>

            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 dark:bg-indigo-600 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-all">
              <MdMap className="h-5 w-5" />
              Map View
            </button>

          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-2 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-white rounded-full animate-spin mb-6"></div>
            <p className="text-slate-500 dark:text-slate-400 text-xs tracking-[0.2em] uppercase font-body">
              Loading properties
            </p>
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <MdSearch className="h-8 w-8 text-slate-400" />
            </div>

            <h3 className="text-xl font-display font-medium text-slate-900 dark:text-white mb-2">
              No Properties Found
            </h3>

            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-body">
              We couldn't find any properties matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Hotels;