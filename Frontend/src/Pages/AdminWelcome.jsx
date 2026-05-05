import { useNavigate } from "react-router-dom";
import { MdCelebration, MdArrowForward } from "react-icons/md";

const AdminWelcome = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.removeItem("justBecameAdmin");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 font-sans transition-colors duration-300 dark:bg-slate-950">

      <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-indigo-100 text-center max-w-lg w-full border border-slate-100 relative overflow-hidden dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30">
        
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>

        <div className="relative">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner dark:bg-indigo-500/15">
            <MdCelebration className="text-indigo-600 text-5xl" />
          </div>

          <h1 className="text-4xl font-extrabold mb-4 text-slate-900 tracking-tight dark:text-white">
            Congratulations!
          </h1>

          <p className="text-slate-600 mb-8 text-lg leading-relaxed dark:text-slate-300">
            Your host application has been approved.<br/>
            You are now an admin and can start managing your properties.
          </p>

          <button
            onClick={handleContinue}
            className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-200 active:scale-[0.98]"
          >
            Go to Dashboard <MdArrowForward className="ml-2 text-xl" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminWelcome;
