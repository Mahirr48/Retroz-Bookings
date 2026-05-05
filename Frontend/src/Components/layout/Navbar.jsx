import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  MdMenu,
  MdClose,
  MdDashboard,
  MdLuggage,
  MdLogout,
  MdLogin,
  MdAppRegistration,
  MdHotel,
  MdSupervisorAccount,
  MdAddHome,
  MdLightMode,
  MdDarkMode,
  MdInfo,
  MdContactSupport,
} from "react-icons/md";
import { FaHotel } from "react-icons/fa";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const Navbar = () => {
  const user = getStoredUser();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const isActive = (path) => location.pathname === path;
  const toggleTheme = () => setIsDarkMode((value) => !value);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`relative px-1 py-2 text-sm font-semibold transition-colors duration-200 group ${
        isActive(to)
          ? "text-indigo-600 dark:text-indigo-300"
          : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-indigo-600 dark:bg-indigo-300 transition-transform duration-300 ${
          isActive(to) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );

  const MobileNavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
        isActive(to)
          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200"
          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
      }`}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0 opacity-75" />}
      <span>{children}</span>
    </Link>
  );

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/90 py-2 shadow-sm shadow-slate-200/60 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 dark:shadow-black/20"
          : "border-b border-transparent bg-white py-4 dark:bg-slate-950"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="rounded-xl bg-indigo-600 p-2 text-white shadow-md shadow-indigo-200 transition-colors group-hover:bg-indigo-700 dark:shadow-indigo-950/40">
              <FaHotel className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-slate-950 to-slate-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:from-white dark:to-slate-300">
              Retroz
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/hotels">Properties</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>

            {user?.role === "user" && (
              <NavLink to="/become-host">Become a Host</NavLink>
            )}

            {user?.role === "super_admin" && (
              <NavLink to="/super-admin">Super Admin</NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Use light mode" : "Use dark mode"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:text-indigo-200"
            >
              {isDarkMode ? <MdLightMode className="h-5 w-5" /> : <MdDarkMode className="h-5 w-5" />}
            </button>

            {!user ? (
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-50"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((value) => !value)}
                  className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-3 pr-1.5 transition hover:border-indigo-300 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-white/10 dark:bg-white/10 dark:hover:border-indigo-400/50 dark:hover:bg-white/15 dark:focus:ring-offset-slate-950"
                >
                  <span className="hidden max-w-[110px] truncate text-sm font-semibold text-slate-700 dark:text-slate-100 sm:block">
                    {user.name || "User"}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white shadow-inner">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                </button>

                <div
                  className={`absolute right-0 mt-3 w-60 origin-top-right rounded-2xl border border-slate-100 bg-white py-2 shadow-xl shadow-slate-200/60 transition-all duration-200 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/30 ${
                    dropdownOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
                  }`}
                >
                  <div className="mb-1 border-b border-slate-100 px-4 py-3 dark:border-white/10">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Signed in as</p>
                    <p className="truncate text-sm font-bold text-slate-950 dark:text-white">{user.email}</p>
                  </div>

                  <Link to="/dashboard" className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-200">
                    <MdDashboard className="mr-3 h-4 w-4" /> Dashboard
                  </Link>
                  <Link to="/my-bookings" className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-200">
                    <MdLuggage className="mr-3 h-4 w-4" /> My Bookings
                  </Link>

                  <div className="my-1 h-px bg-slate-100 dark:bg-white/10" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
                  >
                    <MdLogout className="mr-3 h-4 w-4" /> Log out
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 md:hidden dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:text-indigo-200"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <MdClose className="h-6 w-6" /> : <MdMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-[72px] z-40 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed right-3 top-[84px] z-50 max-h-[calc(100vh-100px)] w-[min(22rem,calc(100vw-1.5rem))] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/20 transition-all duration-300 md:hidden dark:border-white/10 dark:bg-slate-900 dark:shadow-black/50 ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-6 pointer-events-none opacity-0"
        }`}
      >
        {user && (
          <div className="mb-4 rounded-2xl bg-slate-50 p-4 dark:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-base font-bold text-white">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-950 dark:text-white">{user.name || "User"}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-1">
          <MobileNavLink to="/" icon={FaHotel}>Home</MobileNavLink>
          <MobileNavLink to="/about" icon={MdInfo}>About Us</MobileNavLink>
          <MobileNavLink to="/hotels" icon={MdHotel}>Properties</MobileNavLink>
          <MobileNavLink to="/contact" icon={MdContactSupport}>Contact Us</MobileNavLink>

          {user?.role === "user" && (
            <MobileNavLink to="/become-host" icon={MdAddHome}>Become a Host</MobileNavLink>
          )}

          {user?.role === "super_admin" && (
            <MobileNavLink to="/super-admin" icon={MdSupervisorAccount}>Super Admin</MobileNavLink>
          )}
        </nav>

        <div className="my-4 h-px bg-slate-200 dark:bg-white/10" />

        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
        >
          <span className="flex items-center gap-3">
            {isDarkMode ? <MdLightMode className="h-5 w-5 opacity-75" /> : <MdDarkMode className="h-5 w-5 opacity-75" />}
            {isDarkMode ? "Light mode" : "Dark mode"}
          </span>
          <span className="text-xs text-slate-400">{isDarkMode ? "On" : "Off"}</span>
        </button>

        {!user ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              to="/login"
              className="flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <MdLogin className="mr-2" /> Log in
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700"
            >
              <MdAppRegistration className="mr-2" /> Sign up
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-1">
            <MobileNavLink to="/dashboard" icon={MdDashboard}>Dashboard</MobileNavLink>
            <MobileNavLink to="/my-bookings" icon={MdLuggage}>My Bookings</MobileNavLink>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
            >
              <MdLogout className="mr-3 h-5 w-5 opacity-75" /> Log out
            </button>
          </div>
        )}
      </aside>
    </header>
  );
};

export default Navbar;
