import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { getAssetUrl } from "../services/config";
import { 
  MdLocationOn, 
  MdStar, 
  MdCheckCircle,
  MdOutlinePolicy,
  MdPool,
  MdSpa,
  MdRestaurant,
  MdLocalBar,
  MdFitnessCenter,
  MdWifi,
  MdRoomService,
  MdAcUnit
} from "react-icons/md";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/hotels/${id}`)
      .then((res) => setHotel(res.data))
      .catch(console.log);
  }, [id]);

  if (!hotel) return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f8] dark:bg-slate-900 transition-colors duration-300">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-t-slate-800 dark:border-t-slate-300 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase text-sm">Preparing your experience...</p>
      </div>
    </div>
  );

  // Helper to map amenity string to an icon
  const getAmenityIcon = (amenityStr) => {
    const lower = amenityStr.toLowerCase();
    if (lower.includes("pool")) return <MdPool className="h-6 w-6" />;
    if (lower.includes("spa") || lower.includes("massage")) return <MdSpa className="h-6 w-6" />;
    if (lower.includes("dining") || lower.includes("restaurant") || lower.includes("food")) return <MdRestaurant className="h-6 w-6" />;
    if (lower.includes("bar") || lower.includes("lounge")) return <MdLocalBar className="h-6 w-6" />;
    if (lower.includes("gym") || lower.includes("fitness")) return <MdFitnessCenter className="h-6 w-6" />;
    if (lower.includes("wifi") || lower.includes("internet")) return <MdWifi className="h-6 w-6" />;
    if (lower.includes("room service")) return <MdRoomService className="h-6 w-6" />;
    if (lower.includes("ac") || lower.includes("air condition")) return <MdAcUnit className="h-6 w-6" />;
    return <MdCheckCircle className="h-6 w-6" />; // Default
  };

  return (
    <div className="bg-[#faf9f8] dark:bg-slate-900 min-h-screen font-sans selection:bg-slate-800 dark:selection:bg-slate-100 selection:text-white dark:selection:text-slate-900 pb-20 transition-colors duration-300">

      {/* 🔥 LUXURY HERO SECTION */}
      <div className="relative h-[60vh] sm:h-[75vh] w-full overflow-hidden">
        <img
          src={getAssetUrl(hotel.image)}
          className="w-full h-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-[1.5s] ease-out"
          alt={hotel.name}
        />
        
        {/* Sophisticated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />

        {/* Text content floating at bottom */}
        <div className="absolute bottom-0 w-full pb-12 sm:pb-16 pt-24 sm:pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto left-0 right-0">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left text-white max-w-3xl">
            <div className="flex items-center space-x-1 mb-3 sm:mb-4">
              {[...Array(5)].map((_, i) => (
                <MdStar key={i} className="text-yellow-400 h-4 w-4 sm:h-5 sm:w-5" />
              ))}
              <span className="text-white/80 text-xs sm:text-sm ml-2 tracking-widest uppercase font-semibold">Five Star Luxury</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-3 sm:mb-4 drop-shadow-lg font-serif">
              {hotel.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 flex items-center justify-center sm:justify-start font-medium tracking-wide">
              <MdLocationOn className="mr-1 sm:mr-2 h-5 w-5 sm:h-6 sm:w-6 opacity-80" />
              {hotel.location}
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - OVERLAPPING THE HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-12 sm:-mt-16 z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* LEFT COLUMN: DETAILS */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none p-5 sm:p-10 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          
          {/* ELEGANT TABS */}
          <div className="flex gap-6 sm:gap-8 border-b border-slate-200 dark:border-slate-700 overflow-x-auto custom-scrollbar pb-1 mb-6 sm:mb-8">
            {[
              { id: "overview", label: "The Experience" }, 
              { id: "amenities", label: "Amenities" }, 
              { id: "policies", label: "Policies" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 sm:pb-4 text-xs sm:text-sm tracking-widest uppercase font-semibold whitespace-nowrap transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {tab.label}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-slate-900 dark:bg-white transform origin-left transition-transform duration-300 ${
                  activeTab === tab.id ? "scale-x-100" : "scale-x-0"
                }`}></span>
              </button>
            ))}
          </div>

          {/* OVERVIEW CONTENT */}
          <div className={`transition-opacity duration-500 ${activeTab === "overview" ? "opacity-100 block" : "hidden"}`}>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">About the Property</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-8 sm:mb-10 font-light">
              {hotel.description ||
                "Immerse yourself in refined luxury where curated comfort meets world-class hospitality. Our spaces are designed with timeless elegance to provide a sanctuary of peace, ensuring every moment of your stay is nothing short of extraordinary."}
            </p>

            <h4 className="text-base sm:text-lg font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4 sm:mb-6 border-l-4 border-slate-900 dark:border-white pl-3">Signature Highlights</h4>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { title: "Beachfront Access", desc: "Private sands exclusively for our guests." },
                { title: "Private Dining", desc: "Curated culinary experiences under the stars." },
                { title: "Infinity Pool", desc: "Seamless horizons merging water and sky." },
                { title: "Luxury Suites", desc: "Expansive spaces with panoramic views." },
              ].map((item, i) => (
                <div key={i} className="group p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors duration-300 cursor-default">
                  <p className="font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors text-base sm:text-lg mb-1 sm:mb-2">{item.title}</p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-300 dark:group-hover:text-slate-200 transition-colors leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AMENITIES CONTENT */}
          <div className={`transition-opacity duration-500 ${activeTab === "amenities" ? "opacity-100 block" : "hidden"}`}>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">World-Class Facilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {hotel.amenities && hotel.amenities.length > 0 ? (
                hotel.amenities.map((a, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 sm:p-6 text-center rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md transition-all duration-300 group">
                    <div className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors mb-2 sm:mb-3">
                      {getAmenityIcon(a)}
                    </div>
                    <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{a}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 dark:text-slate-400 col-span-full">Standard luxury amenities are included.</p>
              )}
            </div>
          </div>

          {/* POLICIES CONTENT */}
          <div className={`transition-opacity duration-500 ${activeTab === "policies" ? "opacity-100 block" : "hidden"}`}>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Hotel Policies</h3>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-5 sm:p-8 space-y-6">
              
              <div className="flex items-start">
                <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm mr-3 sm:mr-4 mt-1">
                  <MdOutlinePolicy className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Check-in & Check-out</p>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">Check-in from 2:00 PM. Check-out until 11:00 AM.</p>
                </div>
              </div>

              <div className="h-px w-full bg-slate-200 dark:bg-slate-600"></div>

              <div className="flex items-start">
                <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm mr-3 sm:mr-4 mt-1">
                  <MdOutlinePolicy className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">Cancellation & Prepayment</p>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">Cancellation and prepayment policies vary according to accommodation type.</p>
                </div>
              </div>

              <div className="h-px w-full bg-slate-200 dark:bg-slate-600"></div>

              <div className="flex items-start">
                <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm mr-3 sm:mr-4 mt-1">
                  <MdOutlinePolicy className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700 dark:text-slate-300" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white mb-1">House Rules</p>
                  <ul className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm space-y-1 mt-2 list-disc list-inside">
                    <li>Strictly no smoking inside the premises.</li>
                    <li>Pets are not allowed.</li>
                    <li>Quiet hours are between 10:00 PM and 7:00 AM.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: BOOKING CARD */}
        <div className="lg:col-span-4 sticky top-20 sm:top-28 z-20 pb-8 lg:pb-0">
          
          {/* Glassmorphism Booking Widget */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl shadow-slate-300/50 dark:shadow-none bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl relative overflow-hidden group">
            
            {/* Subtle decorative glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none"></div>
            
<p className="text-slate-400 text-xs font-medium mb-2">
  Price per night
</p>            <div className="flex items-end mb-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                ₹{hotel.price?.toLocaleString('en-IN')}
              </h2>
              <span className="text-slate-500 dark:text-slate-400 ml-2 mb-1 font-medium">/ night</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 pb-3 border-b border-slate-200 dark:border-slate-600 border-dashed">
                <span>Accommodation</span>
                <span className="font-medium text-slate-900 dark:text-white">1 Room</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 pb-3 border-b border-slate-200 dark:border-slate-600 border-dashed">
                <span>Taxes & Fees</span>
                <span className="font-medium text-slate-900 dark:text-white">Included</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!user) return navigate("/login");
                navigate(`/booking/${hotel._id}`);
              }}
              className="w-full relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-slate-900 dark:bg-indigo-600 rounded-xl hover:bg-slate-800 dark:hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-indigo-800/50 active:scale-95 overflow-hidden group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center">
                Reserve Your Stay
              </span>
            </button>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center flex items-center justify-center">
              <MdCheckCircle className="mr-1 h-4 w-4 text-green-500" />
              No payment required until arrival
            </p>

          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1; 
        }
      `}} />
    </div>
  );
};

export default HotelDetails;
