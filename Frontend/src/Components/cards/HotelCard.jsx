import { useNavigate } from "react-router-dom";
import { MdLocationOn, MdStar, MdArrowForward } from "react-icons/md";
import { getAssetUrl } from "../../services/config";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group w-full bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-500 cursor-pointer flex flex-col h-full border border-slate-100 dark:border-slate-700"
      onClick={() => navigate(`/hotels/${hotel._id}`)}
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
       <img
  src={getAssetUrl(hotel.image)}
  alt={hotel.name}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>
        
        {/* Subtle gradient overlay to ensure badge visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Premium Badge */}
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <MdStar className="text-yellow-400 h-3 w-3" />
          Exceptional
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        
        <div className="flex justify-between items-start mb-2">
<h3 className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">            {hotel.name}
          </h3>
          <div className="flex items-center bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded-lg transition-colors duration-300">
            <MdStar className="text-yellow-400 h-3 w-3 mr-1" />
<span className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight"></span>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center mb-6 font-medium transition-colors duration-300">
          <MdLocationOn className="h-4 w-4 mr-1 text-slate-400 dark:text-slate-500" />
          <span className="truncate">{hotel.location}</span>
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-end transition-colors duration-300">
          
          <div>
            <span className="block text-xs text-slate-400 dark:text-slate-500 font-medium text-slate-400 dark:text-slate-500 mb-1">Starting from</span>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-san transition-colors duration-300">
                ₹{hotel.price?.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 ml-1 font-medium transition-colors duration-300">/ night</span>
            </div>
          </div>

          <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
            <MdArrowForward className="text-slate-400 dark:text-slate-300 group-hover:text-white transition-colors duration-300" />
          </div>

        </div>

      </div>

    </div>
  );
};

export default HotelCard;
