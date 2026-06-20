import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Code2,
  Sparkles,
  Shield,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function AuthCard({ title, subtitle, children, isLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f0a] via-[#0d1a0d] to-[#0a0f0a] flex items-center justify-center px-4 py-12">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, rgba(74, 222, 128, 0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-3xl" />

        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-float-particle" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400/30 rounded-full animate-float-particle delay-700" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-300/30 rounded-full animate-float-particle delay-1400" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-green-300/30 rounded-full animate-float-particle delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              ProjectWalla
            </span>
            <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
          </Link>

          <h1 className="text-3xl font-bold text-white mt-6 mb-2">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-gray-400">
            {isLogin ? "Login to track your orders" : "Join 500+ students"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-900/50 backdrop-blur-2xl border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-emerald-500/5 hover:border-emerald-500/30 transition-all duration-300">
          {children}
        </div>

        {/* Features Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full px-4 py-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-gray-400">Secure & Encrypted</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="text-xs text-gray-400">100% Free</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.5);
            opacity: 0.8;
          }
        }
        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const change = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}! 🎉`);
      navigate(user.role === "admin" ? "/admin" : from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      isLogin
      title="Welcome Back!"
      subtitle="Login to track your orders"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              placeholder="you@email.com"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              name="password"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={change}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPass ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3.5 rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Login
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors hover:underline"
          >
            Register free
          </Link>
        </p>
        <p className="mt-2 text-xs text-gray-500">
          🔒 Secure login • 100% encrypted
        </p>
      </div>
    </AuthCard>
  );
}

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((e2) => ({ ...e2, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (form.phone.length < 10) errs.phone = "Enter a valid phone number";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await register(form);
      toast.success(`Account created! Welcome, ${user.name.split(" ")[0]}! 🎉`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      isLogin={false}
      title="Create Account"
      subtitle="Join 500+ students"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                name="name"
                value={form.name}
                onChange={change}
                className={`w-full bg-gray-800/50 border ${errors.name ? "border-red-500" : "border-gray-700"} rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300`}
                placeholder="Rahul Kumar"
                required
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Phone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                name="phone"
                value={form.phone}
                onChange={change}
                className={`w-full bg-gray-800/50 border ${errors.phone ? "border-red-500" : "border-gray-700"} rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300`}
                placeholder="9999999999"
                required
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              className={`w-full bg-gray-800/50 border ${errors.email ? "border-red-500" : "border-gray-700"} rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300`}
              placeholder="rahul@email.com"
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* College */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            College Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              name="college"
              value={form.college}
              onChange={change}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              placeholder="Your college name"
            />
          </div>
        </div>

        {/* Password & Confirm */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={change}
                className={`w-full bg-gray-800/50 border ${errors.password ? "border-red-500" : "border-gray-700"} rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300`}
                placeholder="Min 6 chars"
                required
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Confirm *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                name="confirmPassword"
                type={showPass ? "text" : "password"}
                value={form.confirmPassword}
                onChange={change}
                className={`w-full bg-gray-800/50 border ${errors.confirmPassword ? "border-red-500" : "border-gray-700"} rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300`}
                placeholder="Repeat password"
                required
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Show Password Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            {showPass ? (
              <EyeOff className="w-3 h-3" />
            ) : (
              <Eye className="w-3 h-3" />
            )}
            {showPass ? "Hide" : "Show"} passwords
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-3.5 rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors hover:underline"
          >
            Login
          </Link>
        </p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            Free forever
          </div>
          <span className="w-1 h-1 bg-gray-700 rounded-full" />
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Shield className="w-3 h-3 text-emerald-400" />
            Secure
          </div>
          <span className="w-1 h-1 bg-gray-700 rounded-full" />
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Instant access
          </div>
        </div>
      </div>
    </AuthCard>
  );
}
