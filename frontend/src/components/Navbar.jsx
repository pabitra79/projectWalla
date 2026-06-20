import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Code2,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User,
  Mail,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const indicatorRef = useRef(null);
  const navItemsRef = useRef([]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const moveIndicator = (index) => {
    const item = navItemsRef.current[index];
    if (indicatorRef.current && item) {
      indicatorRef.current.style.width = item.offsetWidth + "px";
      indicatorRef.current.style.left = item.offsetLeft + "px";
      indicatorRef.current.style.opacity = "1";
    }
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentIndex = navLinks.findIndex((link) => isActive(link.to));
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
      setTimeout(() => moveIndicator(currentIndex), 50);
    }
  }, [location.pathname]);

  useEffect(() => {
    const currentIndex = navLinks.findIndex((link) => isActive(link.to));
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
      setTimeout(() => moveIndicator(currentIndex), 100);
    }
  }, []);

  const handleMouseEnter = (index) => {
    moveIndicator(index);
  };

  const handleMouseLeave = () => {
    moveIndicator(activeIndex);
  };

  return (
    <>
      <div className="navbar-spacer"></div>

      <nav className={`navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span>ProjectWalla</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </Link>

          {/* Desktop Navigation with Indicator */}
          <div className="nav-menu-wrapper">
            <div className="nav-menu">
              <div className="indicator" ref={indicatorRef}></div>
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  ref={(el) => (navItemsRef.current[index] = el)}
                  className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    setActiveIndex(index);
                    moveIndicator(index);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Auth & Contact */}
          <div className="nav-actions">
            {user ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="nav-action-link">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" className="nav-action-link">
                    <User className="w-4 h-4" /> My Orders
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="nav-action-link text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-action-link">
                  Login
                </Link>
                <Link to="/register" className="btn-get-started">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="mobile-toggle" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${open ? "active" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`mobile-link ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-divider"></div>
          {user ? (
            <>
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                onClick={() => setOpen(false)}
                className="mobile-link"
              >
                {isAdmin ? "Dashboard" : "My Orders"}
              </Link>
              <button
                onClick={handleLogout}
                className="mobile-link text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="mobile-link"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mobile-cta"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <style jsx>{`
        /* Spacer */
        .navbar-spacer {
          height: 80px;
        }

        .navbar-wrapper {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1200px, 94%);
          z-index: 1000;
          /* Dark theme matching home page */
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(99, 102, 241, 0.15);
          box-shadow:
            0 4px 30px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
          transition: all 0.3s ease;
        }

        .navbar-wrapper.scrolled {
          background: rgba(0, 0, 0, 0.92);
          border-color: rgba(99, 102, 241, 0.25);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
        }

        .navbar-container {
          padding: 0 20px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.15rem;
          color: #f1f5f9;
          flex-shrink: 0;
          transition: color 0.3s ease;
        }

        .logo:hover {
          color: #94a3b8;
        }

        .logo-icon {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        /* Navigation Menu */
        .nav-menu-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .nav-menu {
          position: relative;
          display: flex;
          gap: 4px;
          padding: 6px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .indicator {
          position: absolute;
          top: 6px;
          left: 6px;
          height: 40px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.15);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 16px rgba(99, 102, 241, 0.15);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          border: 1px solid rgba(99, 102, 241, 0.1);
        }

        .nav-link {
          position: relative;
          z-index: 2;
          padding: 0 18px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #e2e8f0;
        }

        .nav-link.active {
          color: #818cf8;
        }

        /* Right Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .nav-action-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          text-decoration: none;
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-action-link:hover {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.05);
        }

        .btn-get-started {
          padding: 8px 20px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 10px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
        }

        .btn-get-started:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
        }

        /* Mobile Toggle */
        .mobile-toggle {
          display: none;
          padding: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #e2e8f0;
          border-radius: 8px;
          transition: background 0.3s ease;
        }

        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          padding: 16px 20px 20px;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: 0 0 20px 20px;
          animation: slideDown 0.3s ease;
        }

        .mobile-menu.active {
          display: block;
        }

        .mobile-link {
          display: block;
          padding: 12px 16px;
          text-decoration: none;
          color: #94a3b8;
          font-weight: 500;
          border-radius: 10px;
          transition: all 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-size: 0.95rem;
        }

        .mobile-link:hover {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-link.active {
          color: #818cf8;
          background: rgba(99, 102, 241, 0.1);
        }

        .mobile-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 8px 0;
        }

        .mobile-cta {
          display: block;
          width: 100%;
          margin-top: 8px;
          padding: 12px;
          text-align: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          text-decoration: none;
          font-weight: 600;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .navbar-wrapper {
            top: 12px;
            width: 96%;
            border-radius: 16px;
          }

          .navbar-container {
            height: 60px;
            padding: 0 14px;
          }

          .nav-menu-wrapper {
            display: none;
          }

          .nav-actions {
            display: none;
          }

          .mobile-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .navbar-spacer {
            height: 72px;
          }

          .logo {
            font-size: 1rem;
          }

          .logo-icon {
            width: 30px;
            height: 30px;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .navbar-wrapper {
            top: 8px;
            width: 98%;
            border-radius: 12px;
          }

          .navbar-container {
            height: 52px;
            padding: 0 10px;
          }

          .navbar-spacer {
            height: 60px;
          }

          .logo span {
            font-size: 0.85rem;
          }

          .logo-icon {
            width: 26px;
            height: 26px;
          }

          .logo-icon svg {
            width: 14px;
            height: 14px;
          }

          .mobile-toggle svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </>
  );
}
