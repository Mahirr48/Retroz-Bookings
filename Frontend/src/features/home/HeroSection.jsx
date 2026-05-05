import { useState, useEffect } from "react";
import {
  MdLocationOn,
  MdCalendarToday,
  MdPersonOutline,
  MdSearch,
  MdStar,
} from "react-icons/md";
   import { useMotionValue, useTransform, motion, AnimatePresence } from "framer-motion";




const HeroSection = () => {
  const x = useMotionValue(0);
const y = useMotionValue(0);

const rotateX = useTransform(y, [-100, 100], [5, -5]);
const rotateY = useTransform(x, [-100, 100], [-5, 5]);


const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  x.set(e.clientX - rect.left - rect.width / 2);
  y.set(e.clientY - rect.top - rect.height / 2);
};
  const [isLoaded, setIsLoaded] = useState(false);

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};
const images = [
  "/hotelimg.webp",
  "/hotelimg2.webp",
  "/hotelimg3.webp",
  "/hotelimg4.webp",
];
const SLIDESHOW_INTERVAL_MS = 5 * 1000;
const [index, setIndex] = useState(0);

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1], // smooth cubic-bezier
    },
  },
};
useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, SLIDESHOW_INTERVAL_MS);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    setIsLoaded(true);





    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">

      {/* BACKGROUND WITH PARALLAX */}
     <motion.div
  onMouseMove={handleMouseMove}
  style={{ rotateX, rotateY }}
  className={`absolute inset-0 transition-transform duration-[20s] ease-out ${
    isLoaded ? "scale-110" : "scale-100"
  }`}
>
        <AnimatePresence mode="wait">
  <motion.img
    key={images[index]}
    src={images[index]}
    className="absolute inset-0 w-full h-full object-cover"
    
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    
    transition={{ duration: 1.2, ease: "easeInOut" }}
  />
</AnimatePresence>

        {/* PREMIUM OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-indigo-900/20 mix-blend-overlay" />
      </motion.div>

      {/* CONTENT */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-10 shadow-xl">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <MdStar key={i} className="text-amber-400 h-4 w-4" />
            ))}
          </div>
          <span className="text-white text-xs text-xs text-white/60">
            Elite Stays Worldwide
          </span>
        </div>

 <motion.div
  variants={container}
  initial="hidden"
  animate="show"
  className="text-center"
>
  <motion.h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight mb-6 tracking-tight">

    <motion.span variants={item} className="block">
      Find your next stay
    </motion.span>

    <motion.span
      variants={item}
      className="block text-white/60"
    >
      made simple
    </motion.span>

  </motion.h1>

  <motion.p
    variants={item}
    className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
  >
    Book unique places to stay, from luxury hotels to hidden gems around the world.
  </motion.p>
</motion.div>

        {/* SEARCH BOX */}
<div className="w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-2">

  {/* LOCATION */}
  <div className="group flex-1 rounded-2xl flex items-center px-4 py-3 
  bg-white/90 hover:bg-white 
  dark:bg-slate-800/80 dark:hover:bg-slate-800
  border border-transparent dark:border-slate-700
  transition-all duration-200 
  focus-within:ring-2 focus-within:ring-indigo-500">

  <MdLocationOn className="text-indigo-600 h-5 w-5 mr-3 transition-transform duration-200 group-hover:scale-110" />

  <input
    placeholder="Where to?"
    className="w-full outline-none font-medium bg-transparent 
      text-slate-800 dark:text-white 
      placeholder:text-slate-400 dark:placeholder:text-slate-500"
  />
</div>

  {/* DATES */}
  {/* DATES */}
<div className="hidden md:flex group flex-1 rounded-2xl items-center px-4 py-3 cursor-pointer 
  bg-white/90 hover:bg-white 
  dark:bg-slate-800/80 dark:hover:bg-slate-800
  border border-transparent dark:border-slate-700
  transition-all duration-200">

  <MdCalendarToday className="text-indigo-600 dark:text-indigo-400 h-5 w-5 mr-3 group-hover:scale-110 transition" />

  <div className="flex flex-col">
    <span className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
      Dates
    </span>
    <span className="text-slate-700 dark:text-white text-sm font-medium">
      Add dates
    </span>
  </div>
</div>


{/* GUESTS */}
<div className="hidden lg:flex group flex-1 rounded-2xl items-center px-4 py-3 cursor-pointer 
  bg-white/90 hover:bg-white 
  dark:bg-slate-800/80 dark:hover:bg-slate-800
  border border-transparent dark:border-slate-700
  transition-all duration-200">

  <MdPersonOutline className="text-indigo-600 dark:text-indigo-400 h-5 w-5 mr-3 group-hover:scale-110 transition" />

  <div className="flex flex-col">
    <span className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
      Guests
    </span>
    <span className="text-slate-700 dark:text-white text-sm font-medium">
      Add guests
    </span>
  </div>
</div>

  {/* BUTTON */}
  <button className="relative overflow-hidden bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-8 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center group">

    {/* subtle shine (faster + cleaner) */}
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-500"></span>

    <MdSearch className="h-5 w-5 mr-2 z-10 transition-transform group-hover:scale-110" />
    <span className="z-10">Search</span>
  </button>

</div>
      </div>

      {/* SCROLL */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest animate-pulse">
        Scroll Down ↓
      </div>
    </section>
  );
};

export default HeroSection;
