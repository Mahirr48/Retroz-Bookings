import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-100 py-10 text-gray-700 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Retroz Hotels
          </h3>
          <p className="text-sm">
            Providing premium stays and unforgettable experiences worldwide.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-medium text-gray-900 dark:text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="transition hover:text-amber-600">About Us</Link></li>
            <li><Link to="/careers" className="transition hover:text-amber-600">Careers</Link></li>
            <li><Link to="/contact" className="transition hover:text-amber-600">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-medium text-gray-900 dark:text-white">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="transition hover:text-amber-600">FAQ</Link></li>
            <li><Link to="/terms" className="transition hover:text-amber-600">Terms of Service</Link></li>
            <li><Link to="/privacy" className="transition hover:text-amber-600">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-medium text-gray-900 dark:text-white">Newsletter</h4>
          <p className="mb-3 text-sm">Subscribe for offers and updates.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
            />
            <button className="rounded-r-md bg-amber-600 px-4 py-2 text-sm text-white transition hover:bg-amber-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between border-t border-gray-200 px-6 pt-6 text-sm dark:border-white/10 md:flex-row">
        <p>© {new Date().getFullYear()} Retroz Hotels. All rights reserved.</p>
        <div className="mt-4 flex space-x-4 md:mt-0">
          <a href="#" className="transition hover:text-amber-600">Facebook</a>
          <a href="#" className="transition hover:text-amber-600">Twitter</a>
          <a href="#" className="transition hover:text-amber-600">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
