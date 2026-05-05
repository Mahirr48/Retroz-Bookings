import React from "react";
import {
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineEmail,
  MdArrowForward,
} from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white pt-28 pb-24 transition-colors duration-300 dark:bg-slate-950">

      {/* subtle background glow */}
      <div className="absolute top-[-120px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-100 opacity-40 blur-[120px] dark:bg-indigo-500/20"></div>

      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-32 relative z-10">

        <span className="text-[11px] tracking-[0.3em] text-slate-400 uppercase">
          Contact
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl font-serif font-medium text-slate-900 tracking-tight">
          Get in touch
        </h1>

        <p className="mt-5 text-slate-500 max-w-sm mx-auto text-[15px] leading-relaxed">
          We’re here to help with bookings, questions, or anything you need.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-10 relative z-10 -mt-20">

        {/* LEFT SIDE */}
        <div className="lg:col-span-5 space-y-5">

          {[{
            icon: <MdOutlineLocationOn />,
            title: "Headquarters",
            text: "125 Luxury Boulevard\nNew York, NY"
          },
          {
            icon: <MdOutlinePhone />,
            title: "Phone",
            text: "+1 (800) 555-Retroz"
          },
          {
            icon: <MdOutlineEmail />,
            title: "Email",
            text: "concierge@Retroz.com"
          }].map((item, i) => (

            <div
              key={i}
              className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20"
            >
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-xl text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-medium text-slate-900 text-base">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm whitespace-pre-line mt-1">
                    {item.text}
                  </p>
                </div>

              </div>
            </div>

          ))}
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="lg:col-span-7">

          <div className="rounded-2xl border border-slate-100 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">

            <h2 className="text-xl font-medium text-slate-900 mb-8">
              Send a message
            </h2>

            <form className="space-y-6">

              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder="First Name" className="input-premium" />
                <input type="text" placeholder="Last Name" className="input-premium" />
              </div>

              <input type="email" placeholder="Email Address" className="input-premium" />

              <textarea rows="5" placeholder="Your message..." className="input-premium resize-none" />

              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-all">
                Send Message <MdArrowForward />
              </button>

            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
