import { useEffect, useState } from "react";
import { Search, Filter, X, Package } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import CustomProjectCard from "../components/CustomProjectCard";
import CustomProjectModal from "../components/CustomProjectModal";
import { ProjectGridSkeleton } from "../components/Skeletons";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import { projectsAPI } from "../api";

const TECH_FILTERS = [
  "All",
  "React",
  "Node.js",
  "Java",
  "PHP",
  "Python",
  "C++",
  "MongoDB",
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);

  const fetchProjects = async (tech, q) => {
    setLoading(true);
    try {
      const res = await projectsAPI.getAll({
        tech: tech !== "All" ? tech : undefined,
        search: q || undefined,
      });

      console.log("API response:", res.data); // add this
      setProjects(res.data.projects || []);
      // setProjects(res.data.projects);
    } catch (err) {
      console.error("fetchProjects error:", err); // add this too
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(activeFilter, search);
  }, [activeFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    fetchProjects(activeFilter, search);
    setTimeout(() => setIsSearching(false), 300);
  };

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("All");
    fetchProjects("All", "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f0a] via-[#0d1a0d] to-[#0a0f0a] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Simple background pattern instead of SVG data URL */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, rgba(74, 222, 128, 0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glowing Orbs - Green Tinted */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-3xl" />

        {/* Floating Particles - Green */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-float-particle" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400/30 rounded-full animate-float-particle delay-700" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-300/30 rounded-full animate-float-particle delay-1400" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-green-300/30 rounded-full animate-float-particle delay-2000" />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-emerald-400/30 rounded-full animate-float-particle delay-2500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header with Green Accent */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-300 mb-4">
            <Filter className="w-4 h-4" />
            <span>Explore Our Collection</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Our{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            12 ready-made projects across different tech stacks,
            <span className="text-emerald-300"> curated for excellence</span>
          </p>
        </div>

        {/* Search with Green Theme */}
        <form
          onSubmit={handleSearch}
          className="flex gap-3 max-w-md mx-auto mb-8"
        >
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search
                className={`w-4 h-4 transition-colors duration-300 ${
                  isSearching ? "text-emerald-400" : "text-emerald-300/50"
                }`}
              />
            </div>
            <input
              className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Search
          </button>
        </form>

        {/* Filters with Green Theme */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TECH_FILTERS.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveFilter(tech)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === tech
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25 scale-[1.05]"
                  : "bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/30"
              }`}
            >
              {tech}
              {activeFilter === tech && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {!loading && projects.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-400">
              Showing{" "}
              <span className="text-emerald-300 font-medium">
                {projects.length}
              </span>{" "}
              projects
            </p>
            {(search || activeFilter !== "All") && (
              <button
                onClick={clearFilters}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>
        )}

        {loading ? (
          <ProjectGridSkeleton count={6} />
        ) : projects.length === 0 ? (
          <>
            <EmptyState
              icon={Package}
              title="No projects found"
              desc="Try a different search or filter to find what you're looking for."
              action={
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  Clear Filters
                </button>
              }
            />
            {/* Even with zero results, client can still request a custom project */}
            <div className="max-w-sm mx-auto mt-8">
              <CustomProjectCard onClick={() => setCustomModalOpen(true)} />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} />
            ))}
            {/* Custom project card — always shown as the last card in the grid */}
            <CustomProjectCard onClick={() => setCustomModalOpen(true)} />
          </div>
        )}
      </div>

      <CustomProjectModal
        open={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
      />
    </div>
  );
}
