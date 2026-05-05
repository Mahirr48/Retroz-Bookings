import { useEffect, useState } from "react";
import API from "../../services/api";
import HotelCard from "../../Components/cards/HotelCard";

const FeaturedHotels = () => {
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
    <section className="bg-[#f7f7f7] px-6 py-20 transition-colors duration-300 dark:bg-slate-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Featured
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Stays you'll actually like
            </h2>
          </div>

          <button className="text-sm font-semibold text-gray-600 transition hover:text-black dark:text-slate-300 dark:hover:text-white">
            View all →
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black dark:border-slate-700 dark:border-t-white" />
          </div>
        ) : hotels.length === 0 ? (
          <div className="rounded-3xl border border-slate-100 bg-white py-20 text-center text-sm text-gray-500 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-400">
            No properties available right now.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedHotels;
