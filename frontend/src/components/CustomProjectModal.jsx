import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Code2,
  Calendar,
  DollarSign,
  FileText,
  Building2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const LANGUAGES = [
  "Java",
  "Python",
  "PHP",
  "JavaScript",
  "C++",
  "C#",
  "React",
  "Node.js",
  "Other",
];

export default function CustomProjectModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectName: "",
    college: "",
    programmingLanguage: "",
    deadline: "",
    budget: "",
    requirements: "",
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.projectName.trim())
      newErrors.projectName = "Project name is required";
    if (!form.college.trim()) newErrors.college = "College name is required";
    if (!form.programmingLanguage)
      newErrors.programmingLanguage = "Please select a language";
    if (!form.deadline) newErrors.deadline = "Deadline is required";
    if (!form.budget || form.budget < 1)
      newErrors.budget = "Valid budget is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Store custom order details in sessionStorage
    sessionStorage.setItem("customOrder", JSON.stringify(form));

    onClose();
    // Navigate to order form with custom flag
    navigate("/order/custom");
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        role="button"
        tabIndex={0}
      />
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl shadow-indigo-500/10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Custom Project Request
              </span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Tell us your idea and we'll build it for you
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Name *
            </label>
            <input
              className={`w-full bg-gray-800/50 border ${errors.projectName ? "border-red-500" : "border-gray-700"} rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all`}
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              placeholder="e.g., Library Management System"
            />
            {errors.projectName && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.projectName}
              </p>
            )}
          </div>

          {/* College */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              College Name *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                className={`w-full bg-gray-800/50 border ${errors.college ? "border-red-500" : "border-gray-700"} rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all`}
                name="college"
                value={form.college}
                onChange={handleChange}
                placeholder="Your college name"
              />
            </div>
            {errors.college && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.college}
              </p>
            )}
          </div>

          {/* Language & Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Programming Language *
              </label>
              <select
                className={`w-full bg-gray-800/50 border ${errors.programmingLanguage ? "border-red-500" : "border-gray-700"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none`}
                name="programmingLanguage"
                value={form.programmingLanguage}
                onChange={handleChange}
              >
                <option value="">Select language...</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              {errors.programmingLanguage && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />{" "}
                  {errors.programmingLanguage}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Deadline *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  className={`w-full bg-gray-800/50 border ${errors.deadline ? "border-red-500" : "border-gray-700"} rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all`}
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  min={minDateStr}
                />
              </div>
              {errors.deadline && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.deadline}
                </p>
              )}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Your Budget ($) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                className={`w-full bg-gray-800/50 border ${errors.budget ? "border-red-500" : "border-gray-700"} rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all`}
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="Enter your budget"
                min="1"
              />
            </div>
            {errors.budget && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.budget}
              </p>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Requirements
            </label>
            <div className="relative">
              <textarea
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                placeholder="Specific modules, features, or requirements..."
                rows={3}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3.5 rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Continue to Order Form
          </button>
        </form>
      </div>
    </div>
  );
}
