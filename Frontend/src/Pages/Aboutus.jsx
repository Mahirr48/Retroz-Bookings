import React from "react";
import {
  MdOutlineDiamond,
  MdOutlineSpa,
  MdOutlineRestaurantMenu,
  MdCheckCircleOutline,
} from "react-icons/md";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#faf9f8] dark:bg-slate-900 transition-colors duration-300 font-body pb-20">
      
      {/* HERO */}
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542314831-c6a4d14d8379?q=80&w=2832&auto=format&fit=crop"
          alt="Luxury Hotel Lobby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-white/60 text-xs tracking-[0.2em] uppercase font-body">
            Our Heritage
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-white tracking-tight max-w-4xl leading-[1.1]">
            Redefining the Art of Luxury Hospitality.
          </h1>
        </div>
      </div>

      {/* STORY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-10">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-12 lg:p-16 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">
            
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-slate-900 dark:text-white mb-6">
                A Legacy of Excellence
              </h2>

              <div className="w-16 h-1 bg-indigo-600 mb-8"></div>

              <p className="text-base sm:text-lg font-body text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Since our inception, PATO has been synonymous with uncompromising luxury and meticulous attention to detail. We believe that true hospitality is not just about a place to stay, but a sanctuary where every moment is thoughtfully curated.
              </p>

              <p className="text-base sm:text-lg font-body text-slate-600 dark:text-slate-300 leading-relaxed">
                Our portfolio of world-class properties spans the globe's most breathtaking destinations. Whether it's an urban oasis or a secluded beachfront retreat, we promise an experience that transcends the ordinary, leaving you with memories that last a lifetime.
              </p>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c0d13c84?q=80&w=2940&auto=format&fit=crop"
                alt="Hotel details"
                className="rounded-2xl shadow-lg object-cover aspect-[4/3] w-full"
              />

              <div className="absolute -bottom-6 -left-6 bg-slate-900 dark:bg-indigo-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <p className="text-3xl font-display font-semibold tracking-tight mb-1">
                  25+
                </p>
                <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-indigo-200">
                  Years of Hospitality
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-widest font-body mb-4 block">
            The Pato Philosophy
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-slate-900 dark:text-white mb-6">
            Pillars of Our Promise
          </h2>

          <p className="text-base sm:text-lg font-body text-slate-500 dark:text-slate-400">
            Everything we do is guided by a steadfast commitment to delivering the extraordinary.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              icon: MdOutlineDiamond,
              title: "Unrivaled Elegance",
              desc: "Spaces crafted with bespoke furnishings and timeless architectural beauty.",
            },
            {
              icon: MdOutlineSpa,
              title: "Curated Wellness",
              desc: "Holistic spa experiences designed to rejuvenate your mind, body, and soul.",
            },
            {
              icon: MdOutlineRestaurantMenu,
              title: "Gastronomic Mastery",
              desc: "Michelin-inspired dining featuring globally sourced, seasonal ingredients.",
            },
            {
              icon: MdCheckCircleOutline,
              title: "Intuitive Service",
              desc: "Anticipatory hospitality that meets your needs before you even realize them.",
            },
          ].map((val, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                <val.icon className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="text-lg sm:text-xl font-display font-medium text-slate-900 dark:text-white mb-3">
                {val.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-body">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          
          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop"
            alt="Beautiful apartment"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-slate-900/80 dark:bg-slate-900/90" />

          <div className="relative z-10 px-6 py-16 sm:py-24 text-center flex flex-col items-center">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white mb-6 max-w-2xl leading-[1.2]">
              Ready to Experience the Extraordinary?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-xl font-body">
              Step into a world where every detail is tailored to perfection. Discover our collection of luxury properties today.
            </p>

            <Link
              to="/hotels"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 hover:bg-indigo-50 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 tracking-wide text-sm sm:text-base font-body"
            >
              Explore Properties
            </Link>

          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;