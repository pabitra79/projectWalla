import { Link } from "react-router-dom";
import { Star, ShoppingCart, Sparkles, Zap } from "lucide-react";

const TECH_COLORS = {
  React: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Node.js": "bg-green-500/20 text-green-300 border-green-500/30",
  Java: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  PHP: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Python: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  MongoDB: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "C++": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  MySQL: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
};

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

const GRADIENT_BG = [
  "from-rose-500/20 to-purple-500/20",
  "from-blue-500/20 to-cyan-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-orange-500/20 to-red-500/20",
  "from-indigo-500/20 to-blue-500/20",
  "from-pink-500/20 to-rose-500/20",
];

export default function ProjectCard({ project, index = 0 }) {
  const icon = PROJECT_ICONS[index % PROJECT_ICONS.length];
  const gradient = GRADIENT_BG[index % GRADIENT_BG.length];
  const discount = project.originalPrice
    ? Math.round(
        ((project.originalPrice - project.price) / project.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="group relative h-full">
      {/* Animated Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />

      {/* Card Body */}
      <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-800 hover:border-indigo-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20 flex flex-col h-full">
        {/* Animated Icon Header with Floating Particles */}
        <div
          className={`relative bg-gradient-to-br ${gradient} h-44 flex items-center justify-center overflow-hidden`}
        >
          {/* Floating particles */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-4 left-8 w-2 h-2 bg-white/30 rounded-full animate-float-particle" />
            <div className="absolute top-8 right-12 w-3 h-3 bg-purple-400/30 rounded-full animate-float-particle delay-300" />
            <div className="absolute bottom-8 left-16 w-2 h-2 bg-indigo-400/30 rounded-full animate-float-particle delay-700" />
            <div className="absolute bottom-12 right-8 w-3 h-3 bg-pink-400/30 rounded-full animate-float-particle delay-500" />
            <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-float-particle delay-1000" />
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-400/30 rounded-full animate-float-particle delay-1200" />
          </div>

          {/* Main Icon with Pulse Animation */}
          <span className="text-6xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10 animate-float">
            {icon}
          </span>

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30 animate-pulse-slow z-20">
              🔥 {discount}% OFF
            </span>
          )}

          {/* Sparkle Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-5 flex flex-col flex-1 relative">
          {/* Title with Underline Animation */}
          <h3 className="font-bold text-white text-base mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-1">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {project.shortDesc || project.description}
          </p>

          {/* Tags with Hover Effects */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techTags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`badge ${TECH_COLORS[tag] || "bg-gray-800 text-gray-300 border-gray-700"} border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default`}
              >
                {tag}
              </span>
            ))}
            {project.techTags?.length > 3 && (
              <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded-full border border-gray-700">
                +{project.techTags.length - 3}
              </span>
            )}
          </div>

          {/* Rating with Stars Animation */}
          <div className="flex items-center gap-1 text-amber-400 text-sm mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < Math.floor(project.rating || 4.5)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-700 text-gray-700"
                  } group-hover:scale-110 group-hover:rotate-12`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            <span className="font-medium text-white ml-1">
              {project.rating || 4.5}
            </span>
            <span className="text-gray-500 text-xs">
              ({project.totalOrders || 0} orders)
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-800">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ${project.price}
              </span>
              {project.originalPrice > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${project.originalPrice}
                </span>
              )}
            </div>

            <Link
              to={`/projects/${project._id}`}
              className="group/btn relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm py-2.5 px-5 rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce-once" />
                <span>Order</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) scale(1.5);
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes gradient-xy {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-gradient-xy {
          animation: gradient-xy 3s ease-in-out infinite;
          background-size: 200% 200%;
        }

        .animate-bounce-once {
          animation: bounce-once 0.5s ease;
        }

        @keyframes bounce-once {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .group:hover .animate-bounce-once {
          animation: bounce-once 0.5s ease;
        }
      `}</style>
    </div>
  );
}
