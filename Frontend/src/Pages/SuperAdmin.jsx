import { useEffect, useState } from "react";
import API from "../services/api";
import { MdCheckCircle, MdCancel, MdAdminPanelSettings, MdHotel, MdEmail } from "react-icons/md";

const SuperAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "super_admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-slate-950">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-red-100 dark:border-red-500/20 dark:bg-slate-900">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500">Super Admin privileges are required to view this page.</p>
        </div>
      </div>
    );
  }

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/admin-requests");
      // 🔥 only show pending
      const pending = res.data.filter((r) => r.status === "pending");
      setRequests(pending);
    } catch (err) {
      console.log("Failed to fetch requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
              <MdAdminPanelSettings className="mr-3 text-indigo-600 h-10 w-10" />
              Super Admin Control Panel
            </h2>
            <p className="mt-2 text-sm text-slate-500 ml-13">
              Manage incoming requests to become hotel admins.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30">
          <div className="px-6 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 dark:border-white/10 dark:bg-slate-800/60">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Pending Admin Requests
            </h3>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
              {requests.length} pending
            </span>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-slate-800">
                  <MdCheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1 dark:text-white">All caught up!</h3>
                <p className="text-slate-500">There are no pending admin requests at this time.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {requests.map((r) => (
                  <div key={r._id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between dark:border-white/10 dark:bg-slate-950">
                    
                    <div className="mb-6">
                      <div className="flex items-start mb-4">
                        <div className="bg-indigo-50 p-2.5 rounded-lg mr-4 dark:bg-indigo-500/15">
                          <MdEmail className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{r.email}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Applicant Email</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-emerald-50 p-2.5 rounded-lg mr-4 dark:bg-emerald-500/15">
                          <MdHotel className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{r.hotelName}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Proposed Property</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-white/10">
                      <button
                        onClick={async () => {
                          try {
                            const res = await API.post(`/admin-requests/approve/${r._id}`);
                            await fetchRequests();
                          } catch (err) {
                            console.log("ERROR:", err.response?.data || err.message);
                            alert(err.response?.data?.message || "Approve failed");
                          }
                        }}
                        className="flex-1 inline-flex justify-center items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
                      >
                        <MdCheckCircle className="mr-1.5 h-5 w-5" /> Approve
                      </button>
                      
                      <button
                        onClick={async () => {
                          try {
                            await API.post(`/admin-requests/reject/${r._id}`);
                            await fetchRequests();
                          } catch (err) {
                            console.log(err.response?.data);
                            alert("Reject failed");
                          }
                        }}
                        className="flex-1 inline-flex justify-center items-center bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20 dark:focus:ring-offset-slate-950"
                      >
                        <MdCancel className="mr-1.5 h-5 w-5" /> Reject
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdmin;
