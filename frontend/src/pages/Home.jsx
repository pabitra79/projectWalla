import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Zap,
  Users,
  Play,
  Sparkles,
  Rocket,
  Globe,
  Eye,
} from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { projectsAPI } from "../api";
import CustomProjectCard from "../components/CustomProjectCard";
import CustomProjectModal from "../components/CustomProjectModal";

const STEPS = [
  {
    num: "01",
    title: "Choose Project",
    desc: "Browse our 12 ready-made project templates.",
  },
  {
    num: "02",
    title: "Place Order",
    desc: "Fill the order form with your requirements and deadline.",
  },
  {
    num: "03",
    title: "Pay Securely",
    desc: "Pay via UPI/QR code. Simple and fast.",
  },
  {
    num: "04",
    title: "Get Delivered",
    desc: "Download your complete project before the deadline.",
  },
];

const STATS = [
  { icon: Users, value: "500+", label: "Students Served" },
  { icon: CheckCircle, value: "98%", label: "On-Time Delivery" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Zap, value: "24hr", label: "Support" },
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    projectsAPI
      .getAll()
      .then((res) => setProjects(res.data.projects.slice(0, 6)))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ===== HERO SECTION - BLACK SCI-FI THEME ===== */}
      <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.15]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="diamondGrid"
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
            <rect width="100%" height="100%" fill="url(#diamondGrid)" />
          </svg>

          {/* Glowing Orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />

          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-float-particle" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float-particle delay-700" />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-300 rounded-full animate-float-particle delay-1400" />
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-float-particle delay-2000" />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-indigo-400 rounded-full animate-float-particle delay-2500" />
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-purple-200 rounded-full animate-float-particle delay-3000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-indigo-900/30 border border-indigo-500/30 rounded-full px-4 py-2 text-sm font-medium text-indigo-300 mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>College Projects Delivered Fast</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Revealing the
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Treasures of
                </span>
                <br />
                <span className="text-white">Project Excellence</span>
              </h1>

              {/* Quote */}
              <p className="text-lg text-gray-300 max-w-lg mb-8 leading-relaxed italic border-l-4 border-indigo-400 pl-4">
                "You want to wake up in the morning and think the future is
                going to be great — and that's what being a developer is all
                about. Quality code, complete documentation, before your
                deadline."
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3.5 px-8 rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  Get Started{" "}
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("video-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 border-2 border-indigo-500/30 text-indigo-300 font-semibold py-3.5 px-8 rounded-xl hover:bg-indigo-500/10 transition-all duration-300"
                >
                  <Play className="w-5 h-5" /> Watch the Video
                </button>
              </div>
            </div>

            {/* Right Content - Diamond/Image Section */}
            <div className="relative">
              {/* Main Diamond Shape */}
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Outer Diamond */}
                <div className="absolute inset-0 border-2 border-indigo-500/30 rotate-45 rounded-2xl animate-pulse-slow" />

                {/* Inner Diamond with Image */}
                <div className="absolute inset-4 rotate-45 rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/20">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop"
                    alt="Project Development"
                    className="w-full h-full object-cover transform -rotate-45 scale-150"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-purple-600/20" />
                </div>

                {/* Floating Elements around Diamond */}
                <div className="absolute -top-6 -right-6 bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-indigo-500/20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Quality Code
                      </p>
                      <p className="text-xs text-gray-400">Professional</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-indigo-500/20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        100% Original
                      </p>
                      <p className="text-xs text-gray-400">Plagiarism Free</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-3 border border-indigo-500/20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">98%</p>
                      <p className="text-xs text-gray-400">On-Time</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-8 -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-3 border border-indigo-500/20 animate-float-delayed">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">4.9/5</p>
                      <p className="text-xs text-gray-400">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - BLACK BACKGROUND */}
      <section className="relative bg-black border-t border-gray-800 py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="diamondGridStats"
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
            <rect width="100%" height="100%" fill="url(#diamondGridStats)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-2xl mb-3 border border-indigo-500/20">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="text-sm text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects - BLACK BACKGROUND */}
      <section className="relative bg-black py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="diamondGridProjects"
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
            <rect width="100%" height="100%" fill="url(#diamondGridProjects)" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Popular Projects
            </h2>
            <p className="text-gray-400">
              Ready-made projects in your tech stack
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} />
            ))}
            <CustomProjectCard onClick={() => setCustomModalOpen(true)} />
          </div>
          <div className="text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3.5 px-8 rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02]"
            >
              View All 12 Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - BLACK BACKGROUND with diamond pattern */}
      <section className="relative bg-black border-t border-gray-800 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="diamondGridHow"
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
            <rect width="100%" height="100%" fill="url(#diamondGridHow)" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-gray-400">
              Simple 4-step process to get your project
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.num} className="text-center relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-indigo-500/30 z-0" />
                )}
                <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-2xl mb-4 text-lg shadow-lg shadow-indigo-500/30">
                  {step.num}
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges - BLACK BACKGROUND */}
      <section className="relative bg-black border-t border-gray-800 py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="diamondGridTrust"
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
            <rect width="100%" height="100%" fill="url(#diamondGridTrust)" />
          </svg>
        </div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your data and orders are completely confidential.",
              },
              {
                icon: Clock,
                title: "On-Time Guarantee",
                desc: "We deliver before your submission deadline, always.",
              },
              {
                icon: Code2,
                title: "Quality Code",
                desc: "Clean, documented, and runnable code every time.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
                  <Icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - BLACK BACKGROUND with diamond pattern and images */}
      <section className="relative py-24 overflow-hidden bg-black border-t border-indigo-500/20">
        {/* Background Diamond Pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="diamondGridCTA"
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
            <rect width="100%" height="100%" fill="url(#diamondGridCTA)" />
          </svg>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />

        {/* ===== IMAGES IN DIAMOND SHAPES ===== */}
        {/* Diamond with Image - Top Left */}
        <div className="absolute top-10 left-10 w-20 h-20 rotate-45 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl shadow-indigo-500/20 animate-float-slow">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center"
            alt="Project"
            className="w-full h-full object-cover -rotate-45 scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-purple-600/20" />
        </div>

        {/* Diamond with Image - Top Right */}
        <div className="absolute top-10 right-10 w-20 h-20 rotate-45 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl shadow-indigo-500/20 animate-float-slow">
          <img
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&h=100&fit=crop&crop=center"
            alt="Student"
            className="w-full h-full object-cover -rotate-45 scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-purple-600/20" />
        </div>

        {/* Diamond with Image - Bottom Left */}
        <div className="absolute bottom-20 left-20 w-16 h-16 rotate-45 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-xl shadow-purple-500/20 animate-float-slow-delayed">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center"
            alt="Code"
            className="w-full h-full object-cover -rotate-45 scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-pink-600/20" />
        </div>

        {/* Diamond with Image - Bottom Right */}
        <div className="absolute bottom-20 right-20 w-16 h-16 rotate-45 rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-xl shadow-purple-500/20 animate-float-slow-delayed">
          <img
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=center"
            alt="Coding"
            className="w-full h-full object-cover -rotate-45 scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-pink-600/20" />
        </div>

        {/* Diamond with Image - Middle Left */}
        <div className="absolute top-1/2 left-5 -translate-y-1/2 w-14 h-14 rotate-45 rounded-2xl overflow-hidden border-2 border-pink-500/30 shadow-xl shadow-pink-500/20 animate-float-slow">
          <img
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=center"
            alt="Tech"
            className="w-full h-full object-cover -rotate-45 scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/30 to-indigo-600/20" />
        </div>

        {/* Diamond with Image - Middle Right */}
        <div className="absolute top-1/2 right-5 -translate-y-1/2 w-14 h-14 rotate-45 rounded-2xl overflow-hidden border-2 border-pink-500/30 shadow-xl shadow-pink-500/20 animate-float-slow">
          <img
            src="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=100&h=100&fit=crop&crop=center"
            alt="Design"
            className="w-full h-full object-cover -rotate-45 scale-150"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/30 to-indigo-600/20" />
        </div>

        {/* ===== CIRCLES WITH IMAGES ===== */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/20 animate-pulse-slow">
          <img
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&h=100&fit=crop&crop=center"
            alt="Student"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-xl shadow-purple-500/20 animate-pulse-slow-delayed">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center"
            alt="Project"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scattered Circles */}
        <div className="absolute top-1/3 left-20 w-8 h-8 rounded-full overflow-hidden border-2 border-yellow-500/30 shadow-xl shadow-yellow-500/20 animate-float-slow">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center"
            alt="Code"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-1/3 right-20 w-8 h-8 rounded-full overflow-hidden border-2 border-pink-500/30 shadow-xl shadow-pink-500/20 animate-float-slow-delayed">
          <img
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&crop=center"
            alt="Tech"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-1/3 left-32 w-6 h-6 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-xl shadow-cyan-500/20 animate-float-slow">
          <img
            src="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=100&h=100&fit=crop&crop=center"
            alt="Design"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-1/3 right-32 w-6 h-6 rounded-full overflow-hidden border-2 border-orange-500/30 shadow-xl shadow-orange-500/20 animate-float-slow-delayed">
          <img
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&h=100&fit=crop&crop=center"
            alt="Student"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ===== DECORATIVE FLOATING DIAMONDS ===== */}
        <div className="absolute top-10 right-10 w-16 h-16 border-2 border-indigo-400/20 rotate-45 rounded-lg animate-float" />
        <div className="absolute bottom-20 left-10 w-12 h-12 border-2 border-purple-400/20 rotate-45 rounded-lg animate-float-delayed" />
        <div className="absolute top-1/2 right-20 w-8 h-8 border-2 border-pink-400/20 rotate-45 rounded-lg animate-float" />
        <div className="absolute top-1/2 left-20 w-8 h-8 border-2 border-cyan-400/20 rotate-45 rounded-lg animate-float-delayed" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl px-6 py-2 mb-8 backdrop-blur-sm">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-400 rotate-45 rounded-sm" />
            <span className="text-indigo-300 font-medium">Premium Quality</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Shine Bright
            </span>
            <br />
            <span className="text-white">With Your Project</span>
          </h2>

          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Join 500+ students who discovered the treasure of quality projects.
            <span className="text-indigo-300 font-semibold block mt-2">
              ✦ 100% Original Code ✦ Complete Documentation ✦ On-Time Delivery ✦
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 px-10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:shadow-indigo-500/30"
            >
              <span className="relative z-10">Start Your Journey</span>
              <Rocket className="w-5 h-5 relative z-10 group-hover:translate-y-[-2px] transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.05]"
            >
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Explore Projects
            </Link>
          </div>

          {/* <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-400">Students Served</p>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">4.9/5</p>
                <p className="text-xs text-gray-400">Average Rating</p>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">98%</p>

                <p className="text-xs text-gray-400">On-Time Delivery</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Custom Project Modal */}
      <CustomProjectModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
      />

      {/* Add animations to your CSS */}
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

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(0deg);
          }
        }

        @keyframes float-slow-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(0deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes pulse-slow-delayed {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 2s;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-slow-delayed {
          animation: float-slow-delayed 6s ease-in-out infinite 3s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}
