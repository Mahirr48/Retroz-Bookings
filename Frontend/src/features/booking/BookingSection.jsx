import { useState, useEffect } from "react";
import API from "../../services/api";
import { getAssetUrl } from "../../services/config";
import { useParams, useNavigate } from "react-router-dom";
import { MdLocationOn, MdDateRange, MdCheckCircle, MdSecurity, MdArrowBack } from "react-icons/md";

const BookingSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [dates, setDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [loading, setLoading] = useState(false);
  const [nights, setNights] = useState(0);

  // Fetch hotel details to display summary
  useEffect(() => {
    API.get(`/hotels/${id}`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.log("Failed to fetch hotel", err));
  }, [id]);

  // Calculate nights
  useEffect(() => {
    if (dates.checkIn && dates.checkOut) {
      const start = new Date(dates.checkIn);
      const end = new Date(dates.checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Ensure checkOut is after checkIn
      if (end > start) {
        setNights(diffDays);
      } else {
        setNights(0);
      }
    } else {
      setNights(0);
    }
  }, [dates]);

  const handleBooking = async () => {
    if (!dates.checkIn || !dates.checkOut) {
      alert("Please select your check-in and check-out dates.");
      return;
    }

    if (nights <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    try {
      setLoading(true);

      await API.post("/bookings", {
        hotelId: id,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
      });

      // Show success state and redirect
      alert("Reservation Confirmed! Welcome to unparalleled luxury.");
      navigate("/my-bookings");
      
    } catch (err) {
      console.log(err);
      alert("Reservation failed. Please try again or contact support.");
    } finally {
      setLoading(false);
    }
  };

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f8] transition-colors duration-300 dark:bg-slate-950">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium tracking-widest uppercase text-sm">Preparing booking details...</p>
        </div>
      </div>
    );
  }

  const basePrice = hotel.price * nights;
  const taxes = Math.round(basePrice * 0.18); // 18% tax example
  const total = basePrice + taxes;

  // Get today's date in YYYY-MM-DD for min date constraints
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#faf9f8] font-sans pt-24 pb-20 transition-colors duration-300 dark:bg-slate-950">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(`/hotels/${id}`)}
          className="flex items-center text-slate-500 hover:text-indigo-600 font-medium transition-colors mb-8"
        >
          <MdArrowBack className="mr-2 h-5 w-5" /> Back to property
        </button>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 from-accent-content tracking-tight mb-2">
          Secure Your Reservation
        </h1>
        <p className="text-slate-500 mb-10">Review your details and finalize your stay at {hotel.name}.</p>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* LEFT: BOOKING FORM */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Dates Card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
              <h2 className="text-xl font-bold text-slate-900 mb-6 font-serif flex items-center">
                <MdDateRange className="mr-2 text-indigo-600" /> Select Dates
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Check-In</label>
                  <input
                    type="date"
                    min={today}
                    value={dates.checkIn}
                    className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3.5 font-medium text-slate-700 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-900"
                    onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Check-Out</label>
                  <input
                    type="date"
                    min={dates.checkIn || today}
                    value={dates.checkOut}
                    className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3.5 font-medium text-slate-700 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-900"
                    onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Guest Details (Visual Only) */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
              <h2 className="text-xl font-bold text-slate-900 mb-6 font-serif flex items-center">
                <MdSecurity className="mr-2 text-indigo-600" /> Primary Guest
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3.5 font-medium text-slate-700 transition-all focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-3.5 font-medium text-slate-700 transition-all focus:border-indigo-500 focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 flex items-center">
                <MdCheckCircle className="mr-1 text-green-500" />
                Your details are securely encrypted and protected.
              </p>
            </div>

          </div>

          {/* RIGHT: SUMMARY CARD */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-slate-900/50 sticky top-28 overflow-hidden relative group">
              
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl group-hover:bg-indigo-500/30 transition-colors duration-700 pointer-events-none"></div>

              {/* Property Snapshot */}
              <div className="flex gap-4 mb-8 pb-8 border-b border-white/10">
                <img 
                  src={getAssetUrl(hotel.image)}
                  alt={hotel.name}
                  className="w-24 h-24 object-cover rounded-2xl shadow-lg border border-white/10"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-indigo-300 text-[10px] uppercase tracking-widest font-bold mb-1">Luxury Property</span>
                  <h3 className="font-bold font-serif text-xl line-clamp-1">{hotel.name}</h3>
                  <p className="text-slate-400 text-sm flex items-center mt-1">
                    <MdLocationOn className="mr-1 h-4 w-4" />
                    <span className="truncate">{hotel.location}</span>
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <h4 className="text-lg font-bold mb-6 font-serif">Price Breakdown</h4>
              
              {nights > 0 ? (
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-300 text-sm">
                    <span>₹{hotel.price.toLocaleString('en-IN')} × {nights} nights</span>
                    <span className="font-medium text-white">₹{basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 text-sm">
                    <span>Taxes and fees</span>
                    <span className="font-medium text-white">₹{taxes.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="text-white font-bold">Total (INR)</span>
                    <span className="text-3xl font-bold font-serif">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/10 border-dashed text-center">
                  <p className="text-slate-400 text-sm">Select dates to view pricing details.</p>
                </div>
              )}

              {/* Confirm Button */}
              <button
                onClick={handleBooking}
                disabled={loading || nights <= 0}
                className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-xl flex items-center justify-center ${
                  loading || nights <= 0 
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5" 
                    : "bg-white text-slate-900 hover:bg-indigo-50 hover:-translate-y-1 hover:shadow-indigo-500/20 active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin mr-3"></div>
                    Processing...
                  </>
                ) : (
                  "Confirm Reservation"
                )}
              </button>
              
              {nights > 0 && (
                <p className="text-xs text-slate-400 mt-5 text-center px-4 leading-relaxed">
                  By confirming this reservation, you agree to the property's house rules and cancellation policy.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BookingSection;
