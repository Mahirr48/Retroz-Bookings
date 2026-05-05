import React, { useEffect, useState } from "react";

const UpcomingEvents = () => {
  // Initial time (1 day 5 hours 30 min 45 sec)
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 5,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => { 
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <div>
      <div className="carousel w-full mt-26 relative">
        {/* First carousel item */}
        <div id="item1" className="carousel-item w-full relative">
          <img
            src="https://preview.colorlib.com/theme/pato/images/bg-event-01.jpg.webp"
            className="w-full"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="card card-side bg-base-100 shadow-lg w-[700px] text-red-600">
              <figure>
                <img
                  src="https://preview.colorlib.com/theme/pato/images/event-02.jpg.webp"
                  alt="Movie"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-medium text-purple-700">WINES DURING SPECIFIC NIGHTS</h2>
                 <p className="italic text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae consectetur et magni enim nesciunt porro.</p>   
                {/* Countdown timer */}
                <div className="flex gap-5 mt-6">
                  <div>
                    <span className="countdown font-mono text-4xl">
                      <span style={{ "--value": timeLeft.days }}>
                        {timeLeft.days}
                      </span>
                    </span>
                    days
                  </div>
                  <div>
                    <span className="countdown font-mono text-4xl">
                      <span style={{ "--value": timeLeft.hours }}>
                        {timeLeft.hours}
                      </span>
                    </span>
                    hours
                  </div>
                  <div>
                    <span className="countdown font-mono text-4xl">
                      <span style={{ "--value": timeLeft.minutes }}>
                        {timeLeft.minutes} 
                      </span>
                    </span>
                     
                    min
                  </div>
                  <div>
                    <span className="countdown font-mono text-4xl">
                      <span style={{ "--value": timeLeft.seconds }}>
                        {timeLeft.seconds}
                      </span>
                    </span>
                    sec 
                  </div>
                </div>

                <div className="card-actions justify-center text-blue-800 mt-6">
                  <button className="hover:cursor-pointer hover:text-pink-400 transition duration-300">VIEW DETAILS →</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second carousel item */}
        <div id="item2" className="carousel-item w-full">
          <img
            src="https://preview.colorlib.com/theme/pato/images/bg-event-02.jpg.webp"
            className="w-full"
          />
        </div>

        {/* Third carousel item */}
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://preview.colorlib.com/theme/pato/images/bg-event-04.jpg.webp"
            className="w-full"
          />
        </div>
      </div>

      {/* Carousel controls */}
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
      </div>
    </div>
  );
};

export default UpcomingEvents;
