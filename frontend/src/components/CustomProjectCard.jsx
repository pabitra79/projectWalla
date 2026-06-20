import { Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CustomProjectCard({ onClick }) {
  return (
    <Link
      to="/order/custom"
      className="group relative flex flex-col h-full min-h-[320px] items-center justify-center gap-4 rounded-2xl bg-gray-900/50 border-2 border-dashed border-indigo-500/40 hover:border-indigo-400 hover:bg-gray-900/80 transition-all duration-300 p-8 text-center hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/20 cursor-pointer"
    >
      {/* Same styling as ProjectCard */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 flex items-center justify-center transition-all duration-300">
          <Plus className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
          Custom Project
        </h3>

        <p className="text-gray-400 text-sm max-w-[200px]">
          Don't see your idea? Tell us your own project
        </p>

        <div className="flex flex-wrap gap-1.5 justify-center">
          <span className="bg-gray-800/50 text-gray-300 text-xs px-2.5 py-1 rounded-full border border-gray-700/50">
            Any Language
          </span>
          <span className="bg-gray-800/50 text-gray-300 text-xs px-2.5 py-1 rounded-full border border-gray-700/50">
            Any Topic
          </span>
        </div>

        <div className="flex items-center justify-between w-full mt-2 pt-3 border-t border-gray-800/50">
          <span className="text-xs text-gray-500">Starting from</span>
          <span className="text-emerald-400 font-bold text-lg">$99</span>
        </div>

        <span className="inline-flex items-center gap-1.5 text-indigo-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
          Request Custom <Sparkles className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
