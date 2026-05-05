import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import MainLayout from "./Components/layout/MainLayout";
import AuthLayout from "./Components/layout/AuthLayout";

import MyBookings from "./Pages/MyBookings";
import Admin from "./Pages/Admin";
import SuperAdmin from "./Pages/SuperAdmin";
import Dashboard from "./Pages/Dashboard";
import BookingSection from "./features/booking/BookingSection";
import HotelDetails from "./Pages/HotelDetails";
import BecomeHost from "./Pages/BecomeHost";
import AdminWelcome from "./Pages/AdminWelcome";
import ScrollToTop from "./Components/ScrollToTop";

// 🔥 LAZY IMPORTS (clean + consistent naming)
const Home = lazy(() => import("./Pages/Home"));
const AboutUs = lazy(() => import("./Pages/Aboutus"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Hotels = lazy(() => import("./Pages/Hotels"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));

const hideNavbarFooterRoutes = ["/login", "/register"];

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
}

function App() {
  const location = useLocation();
  const shouldHideLayout = hideNavbarFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}
      <ScrollToTop />
      <main className="flex-grow">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route element={<MainLayout />}/>
            <Route element={<AuthLayout />}/>

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTECTED */}
            <Route path="/hotels" element={<Hotels />} />

            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route path="/hotels/:id" element={<HotelDetails />} />

            {/* DASHBOARDS */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/super-admin" element={<SuperAdmin />} />
            <Route path="/booking/:id" element={<BookingSection />} />
            <Route path="/admin-welcome" element={<AdminWelcome />} />

            {/* HOST */}
            <Route path="/become-host" element={<BecomeHost />} />

          </Routes>
        </Suspense>
      </main>

      {!shouldHideLayout && <Footer />}
    </div>
  );
}

export default App;
