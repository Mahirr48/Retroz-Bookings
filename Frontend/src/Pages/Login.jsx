import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdDarkMode, MdLightMode, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    if (!payload.email || !payload.password) {
      setError("Enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await loginUser(payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex font-sans bg-[#f5f5f7] transition-colors duration-300 dark:bg-slate-950">
      <button
        type="button"
        onClick={() => setIsDarkMode((value) => !value)}
        aria-label={isDarkMode ? "Use light mode" : "Use dark mode"}
        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:text-indigo-600 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:text-indigo-200"
      >
        {isDarkMode ? <MdLightMode className="h-5 w-5" /> : <MdDarkMode className="h-5 w-5" />}
      </button>

      <div className="hidden lg:block w-1/2 relative">
        <motion.img
          src="/hotelimglogin.webp"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white max-w-lg"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-semibold mb-4"
            >
              Welcome back
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm text-white/80 leading-relaxed"
            >
              Access your stays, manage bookings, and continue your experience seamlessly.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md px-8"
        >
          <Link to="/" className="text-sm text-gray-500 tracking-wide dark:text-slate-300">
            RETROZ.
          </Link>

          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-500 mt-1">Enter your details below</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4 text-sm text-red-500"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-black focus:ring-1 focus:ring-black/10 outline-none transition dark:border-white/10 dark:bg-slate-900 dark:focus:border-indigo-300 dark:focus:ring-indigo-300/20"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-black focus:ring-1 focus:ring-black/10 outline-none pr-10 dark:border-white/10 dark:bg-slate-900 dark:focus:border-indigo-300 dark:focus:ring-indigo-300/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-gray-500 hover:text-black">
                Forgot password?
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </motion.button>
          </form>

          <div className="mt-6 text-sm text-gray-500 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-black font-medium">
              Create one
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
