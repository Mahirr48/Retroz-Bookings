import { useEffect, useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { MdDarkMode, MdLightMode, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    if (!payload.name || !payload.email || !payload.password) {
      setError("Please fill all fields.");
      return;
    }

    if (payload.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await registerUser(payload);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-white text-gray-900 font-sans transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <button
        type="button"
        onClick={() => setIsDarkMode((value) => !value)}
        aria-label={isDarkMode ? "Use light mode" : "Use dark mode"}
        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:text-indigo-600 dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:text-indigo-200"
      >
        {isDarkMode ? <MdLightMode className="h-5 w-5" /> : <MdDarkMode className="h-5 w-5" />}
      </button>

      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <motion.img
          src="/hotelimg.webp"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.04,
                },
              },
            }}
            className="text-white max-w-xl"
          >
            {"Stay differently.".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-semibold inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 text-sm text-white/80 leading-relaxed"
            >
              Experience spaces designed for comfort, detail, and calm.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="text-sm tracking-wide font-medium text-gray-700 dark:text-slate-300">
            RETROZ.
          </Link>

          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold">Create your account</h2>
            <p className="text-sm text-gray-500 mt-1">
              Start your journey with us.
            </p>
          </div>

          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-600 font-medium">
                Full name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-black/10 focus:border-black hover:shadow-md transition-all outline-none dark:border-white/10 dark:bg-slate-900 dark:focus:border-indigo-300 dark:focus:ring-indigo-300/20"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="mt-1 w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-black/10 focus:border-black hover:shadow-md transition-all outline-none dark:border-white/10 dark:bg-slate-900 dark:focus:border-indigo-300 dark:focus:ring-indigo-300/20"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Password"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-black/10 focus:border-black hover:shadow-md transition-all outline-none pr-10 dark:border-white/10 dark:bg-slate-900 dark:focus:border-indigo-300 dark:focus:ring-indigo-300/20"
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

            <div className="flex items-start text-sm text-gray-600">
              <input type="checkbox" required className="mt-1 mr-2 accent-black" />
              <p>
                I agree to the <span className="text-black font-medium">Terms</span>{" "}
                and <span className="text-black font-medium">Privacy Policy</span>
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-black text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-gray-900 active:scale-[0.98] transition-all disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </motion.button>
          </form>

          <div className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-black">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
