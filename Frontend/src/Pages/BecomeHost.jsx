import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const BecomeHost = () => {

  const navigate = useNavigate();

  // ✅ GET USER SAFELY
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  // ✅ STATES
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    hotelName: "",
    location: "",
  });

  // ✅ FETCH REQUEST (FIXED DEPENDENCY)
  useEffect(() => {
    if (!user?.email) return;

    const fetchRequest = async () => {
      try {
        const res = await API.get(`/admin-requests/my-request/${user.email}`);
        setRequest(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequest();
  }, [user?.email]); // ✅ FIXED

  // ✅ LOGIN CHECK
  if (!user) {
    return (
      <div className="min-h-screen pt-24 text-center text-slate-700 dark:bg-slate-950 dark:text-slate-200">
        <p>Please login first</p>
      </div>
    );
  }

  // ✅ AUTO REDIRECT IF ADMIN
  if (user.role === "admin") {
    navigate("/admin");
  }

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.hotelName || !form.location) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/admin-requests", form);

      setRequest(res.data); // 🔥 instantly update UI

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error submitting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pt-24 flex justify-center bg-[#faf9f8] transition-colors duration-300 dark:bg-slate-950">

      <div className="h-fit w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/60 transition-colors duration-300 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30">

        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">
          Become a Host
        </h2>

        {/* 🔥 STATUS UI */}
        {request ? (
          <div className="text-center mt-6 space-y-3">

            {request.status === "pending" && (
              <p className="text-yellow-600 font-medium">
                Your request is pending approval
              </p>
            )}

            {request.status === "approved" && (
              <>
                <p className="text-green-600 font-medium dark:text-green-400">
                  Approved! Please logout and login again.
                </p>

                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="mt-3 rounded bg-black px-4 py-2 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-50"
                >
                  Logout & Login Again
                </button>
              </>
            )}

            {request.status === "rejected" && (
              <p className="text-red-600 font-medium dark:text-red-400">
                Your request has been rejected
              </p>
            )}

          </div>
        ) : (
          // 🔥 FORM ONLY IF NO REQUEST
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <input
              value={form.name}
              className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-slate-950 dark:text-white"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              value={form.email}
              disabled
              className="w-full rounded-lg border border-slate-200 bg-gray-100 p-3 text-slate-500 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400"
            />

            <input
              value={form.hotelName}
              placeholder="Hotel Name"
              className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-slate-950 dark:text-white"
              onChange={(e) =>
                setForm({ ...form, hotelName: e.target.value })
              }
            />

            <input
              value={form.location}
              placeholder="Location"
              className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-slate-950 dark:text-white"
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-50"
            >
              {loading ? "Submitting..." : "Apply Now"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

export default BecomeHost;
