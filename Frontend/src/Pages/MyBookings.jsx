import { useEffect, useState } from "react";
import API from "../services/api";
import { getAssetUrl } from "../services/config";
import { MdDateRange, MdLocationOn, MdLuggage, MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ FIX: get token properly
  // const user = JSON.parse(localStorage.getItem("user"));
  // const token = user?.token;

  useEffect(() => {
    // ❗ if no token, don't even try
    // if (!token) {
    //   console.log("No token found");
    //   setIsLoading(false);
    //   return;
    // }

    API.get("/bookings")
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // ✅ dependency added

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(1, Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans pt-24 pb-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}
        <div className="mb-12 text-center md:text-left border-b border-slate-200 pb-8 dark:border-white/10">
         <span className="text-indigo-600 text-sm font-semibold tracking-wide uppercase mb-2 block">
  Bookings
</span>

<h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-sans tracking-tight">
  Your stays
</h1>

<p className="text-slate-500 mt-3 text-base max-w-xl">
  View your upcoming and past reservations.
</p>
        </div>

        {/* BOOKINGS LIST */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
            <p className="text-slate-500 font-medium tracking-widest uppercase text-sm">Retrieving your reservations...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-indigo-500/15">
              <MdLuggage className="h-10 w-10 text-indigo-300" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2 font-serif">
  No bookings yet
</h3>

<p className="text-slate-500 max-w-md mx-auto mb-6">
  You haven’t booked any stays. Start exploring places.
</p>
            <Link
              to="/hotels"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-300 bg-slate-900 rounded-xl hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1"
            >
              Explore Properties <MdArrowForward className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => {
              const nights = calculateNights(b.checkIn, b.checkOut);
              const isUpcoming = new Date(b.checkIn) >= new Date();

              return (
                <div
                  key={b._id}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20"
                >

                  {/* Hotel Image Thumbnail */}
                  <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden bg-slate-100 flex-shrink-0 dark:bg-slate-800">
                    {b.hotelId?.image ? (
                      <img
                        src={getAssetUrl(b.hotelId.image)}
                        alt={b.hotelId?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <MdLuggage className="h-12 w-12 text-slate-300" />
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-sm backdrop-blur-md ${isUpcoming
                        ? "bg-green-500/90 text-white border border-green-400/50"
                        : "bg-slate-900/80 text-white border border-slate-700/50"
                        }`}>
                        {isUpcoming ? "Upcoming stay" : "Completed stay"}
                      </span>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">{b.hotelId?.name || "Hotel Name"}</h3>
                        <span className="text-sm font-bold text-slate-400 hidden sm:block">ID: {b._id.slice(-6).toUpperCase()}</span>
                      </div>

                      <p className="text-slate-500 flex items-center mb-6 font-medium">
                        <MdLocationOn className="h-5 w-5 mr-1.5 text-indigo-400" />
                        {b.hotelId?.location || "Location not specified"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-white/10">

                      <div>
                        <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1 flex items-center">
                          <MdDateRange className="mr-1 h-3 w-3" /> Check-in
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-white">{formatDate(b.checkIn)}</p>
                      </div>

                      <div>
                        <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1 flex items-center">
                          <MdDateRange className="mr-1 h-3 w-3" /> Check-out
                        </span>
                        <p className="font-semibold text-slate-900 dark:text-white">{formatDate(b.checkOut)}</p>
                      </div>

                      <div className="col-span-2 md:col-span-1 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0 dark:border-white/10">
                        <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1 text-right w-full">Total stay cost</span>
                        <p className="text-xl font-bold text-slate-900 font-serif whitespace-nowrap dark:text-white">
                          {b.hotelId?.price ? `₹${(b.hotelId.price * nights).toLocaleString('en-IN')}` : "TBD"}
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;
