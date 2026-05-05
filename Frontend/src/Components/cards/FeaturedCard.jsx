// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import HotelCard from "../cards/HotelCard";

// const FeaturedHotels = () => {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     API.get("/hotels")
//       .then((res) => {
//         setHotels(res.data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <section className="bg-[#f7f7f7] py-16 px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex items-end justify-between mb-12">

//           <div>
//             <p className="text-sm text-gray-500 mb-1">
//               Featured
//             </p>

//             <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
//               Places worth staying
//             </h2>
//           </div>

//           <button className="text-sm text-gray-600 hover:text-black transition">
//             View all →
//           </button>

//         </div>

//         {/* CONTENT */}
//         {loading ? (
//           <div className="py-20 flex justify-center">
//             <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
//           </div>
//         ) : hotels.length === 0 ? (
//           <div className="py-20 text-center text-gray-500 text-sm">
//             No hotels available right now.
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {hotels.map((hotel) => (
//               <HotelCard key={hotel._id} hotel={hotel} />
//             ))}
//           </div>oi,m 
//         )}

//       </div>
//     </section>
//   );
// };

// export default FeaturedHotels;