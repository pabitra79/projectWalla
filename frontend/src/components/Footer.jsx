import { Link } from "react-router-dom";
import {
  Code2,
  MessageCircle,
  Mail,
  Phone,
  Sparkles,
  ArrowUp,
  Heart,
  Zap,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-indigo-500/20">
      {/* Pure Black Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Diamond Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="diamondGridFooter"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="40,0 80,40 40,80 0,40"
                fill="none"
                stroke="#818cf8"
                strokeWidth="1"
              />
              <circle cx="40" cy="40" r="2" fill="#818cf8" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamondGridFooter)" />
        </svg>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-0 left-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ProjectWalla
              </span>
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Your trusted partner for college project development. We help
              students submit quality projects on time with complete
              documentation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                ["/", "Home"],
                ["/projects", "Projects"],
                ["/about", "About Us"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-indigo-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full" />
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { icon: Shield, label: "100% Original Code" },
                { icon: Clock, label: "On-Time Delivery" },
                { icon: Star, label: "Quality Guaranteed" },
                { icon: Zap, label: "24/7 Support" },
              ].map(({ icon: Icon, label }) => (
                <li key={label}>
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full" />
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/918787565964"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-gray-500 hover:text-indigo-400 transition-all duration-300 group p-2 rounded-lg hover:bg-indigo-500/5"
                >
                  <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:help.projectwalla@gmail.com"
                  className="flex items-center gap-3 text-gray-500 hover:text-purple-400 transition-all duration-300 group p-2 rounded-lg hover:bg-purple-500/5"
                >
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  <span>help@projectwalla.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500 p-2">
                <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <span>+91 6294343584</span>
                  <br />
                  <span className="text-xs text-gray-600">
                    Mon-Sat, 9AM-8PM
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} ProjectWalla. All rights reserved.
            <span className="hidden sm:inline"> Built with</span>
            <span className="inline sm:hidden"> ❤️</span>
            <span className="hidden sm:inline">
              <Heart className="w-3.5 h-3.5 text-red-400 inline mx-1 animate-pulse" />
              by Nabanita & Pabitra
            </span>
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className={`w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-110 ${
                showScroll ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
