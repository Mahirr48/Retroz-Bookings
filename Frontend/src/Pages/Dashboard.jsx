import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyBookings from "./MyBookings";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } 
    else if (user.role === "admin") {

      const justBecameAdmin = localStorage.getItem("justBecameAdmin");

      if (justBecameAdmin) {
        navigate("/admin-welcome");
      } else {
        navigate("/admin");
      }

    } 
    else if (user.role === "super_admin") {
      navigate("/super-admin");
    }

  }, [user, navigate]);

  // optional loading UI
  if (!user) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto">

      <h2 className="text-3xl font-bold mb-6">
        Welcome, {user.name}
      </h2>

      {/* USER VIEW */}
      {user.role === "user" && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Your Bookings
          </h3>
          <MyBookings />
        </div>
      )}

    </div>
  );
};

export default Dashboard;