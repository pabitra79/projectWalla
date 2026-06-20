import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Star,
  Clock,
  ArrowLeft,
  ShoppingCart,
  Heart,
  Activity,
  Shield,
  Code2,
  Users,
  Zap,
  Calendar,
  FileText,
  Download,
  MessageCircle,
  Sparkles,
  Rocket,
} from "lucide-react";
import { projectsAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import Badge from "../components/Badge";
import { PageSpinner } from "../components/Spinner";

const PROJECT_ICONS = [
  "🎓",
  "🛒",
  "📚",
  "🏥",
  "📝",
  "🏦",
  "📦",
  "🏨",
  "📋",
  "💬",
  "🍔",
  "👥",
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectIndex, setProjectIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    projectsAPI
      .getAll()
      .then((res) => {
        const idx = res.data.projects.findIndex((p) => p._id === id);
        setProjectIndex(idx >= 0 ? idx : 0);
      })
      .catch(() => {});

    projectsAPI
      .getOne(id)
      .then((res) => setProject(res.data.project))
      .catch(() => navigate("/projects"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleOrder = () => {
    if (!user) return navigate("/login", { state: { from: `/order/${id}` } });
    navigate(`/order/${id}`);
  };

  if (loading) return <PageSpinner />;
  if (!project) return null;

  const icon = PROJECT_ICONS[projectIndex % PROJECT_ICONS.length];
  const discount = project.originalPrice
    ? Math.round(
        ((project.originalPrice - project.price) / project.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Sci-Fi Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="0.5"
              />
              <circle cx="60" cy="60" r="1" fill="#4f46e5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-indigo-400 text-sm mb-6 transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#14141f] border border-white/5 p-6">
              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />

              <div className="relative flex items-start gap-5 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 border border-white/10 backdrop-blur-sm">
                  {icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {project.title}
                    </h1>
                    {discount > 0 && (
                      <span className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full border border-red-500/20 flex-shrink-0 backdrop-blur-sm">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/40 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {project.rating}
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span>{project.totalOrders} orders placed</span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-indigo-400" />
                      Popular
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-wrap gap-2">
                {project.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 backdrop-blur-sm hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-[#14141f] border border-white/5 rounded-xl p-1">
              {[
                { id: "description", label: "Description", icon: FileText },
                { id: "features", label: "Features", icon: CheckCircle },
                { id: "reviews", label: "Reviews", icon: Star },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-[#14141f] border border-white/5 rounded-2xl p-6 min-h-[300px]">
              {activeTab === "description" && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    About This Project
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Mini */}
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <h3 className="text-sm font-medium text-white/40 mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.techTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60 flex items-center gap-2"
                        >
                          <Code2 className="w-4 h-4 text-indigo-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    What's Included
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features?.length > 0 ? (
                      project.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/20 transition-all duration-300"
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/60 text-sm">{f}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-white/40">No features listed</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400" />
                    Student Reviews
                  </h2>
                  <div className="text-center py-8">
                    <div className="text-5xl font-bold text-white mb-2">
                      {project.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(project.rating)
                              ? "text-amber-400 fill-amber-400"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-white/40 text-sm">
                      {project.totalOrders} orders placed
                    </p>
                    <p className="text-white/20 text-sm mt-4">
                      Be the first to review this project
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Images */}
            <div className="bg-[#14141f] border border-white/5 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-400" />
                Project Preview
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="aspect-video bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl flex items-center justify-center border border-white/5 group hover:border-indigo-500/20 transition-all duration-300"
                  >
                    <div className="text-center space-y-2">
                      <div className="w-12 h-1.5 bg-white/10 rounded mx-auto" />
                      <div className="w-16 h-1.5 bg-white/10 rounded mx-auto" />
                      <div className="w-10 h-1.5 bg-white/10 rounded mx-auto" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/20 mt-3 text-center">
                Real screenshots sent after order confirmation
              </p>
            </div>
          </div>

          {/* Sticky Order Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-[#14141f] border border-white/5 rounded-2xl p-6">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-white">
                    ${project.price}
                  </div>
                  {project.originalPrice > 0 && (
                    <div className="text-sm text-white/30 line-through mt-1">
                      ${project.originalPrice}
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 mt-2 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
                      <Zap className="w-3 h-3" />
                      Save {discount}%
                    </div>
                  )}
                </div>

                {/* Order Button */}
                <button
                  onClick={handleOrder}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 px-6 rounded-xl hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 mb-5"
                >
                  <ShoppingCart className="w-5 h-5" /> Order Now
                </button>

                {/* Features List */}
                <div className="space-y-3">
                  {[
                    {
                      icon: Shield,
                      label: "100% Original Code",
                      color: "text-indigo-400",
                    },
                    {
                      icon: CheckCircle,
                      label: "Complete Documentation",
                      color: "text-green-400",
                    },
                    {
                      icon: FileText,
                      label: "Setup Instructions",
                      color: "text-blue-400",
                    },
                    {
                      icon: Clock,
                      label: "Deadline Guaranteed",
                      color: "text-amber-400",
                    },
                    {
                      icon: Users,
                      label: "Free Revisions",
                      color: "text-purple-400",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-2.5 bg-white/5 rounded-xl border border-white/5"
                    >
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-sm text-white/60">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Contact */}
                <div className="mt-5 pt-4 border-t border-white/5 text-center">
                  <a
                    href="https://wa.me/918787565964"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-green-400 text-sm font-medium hover:text-green-300 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp before ordering
                  </a>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-white/30">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <span>Secure Payment • 100% Refund Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
