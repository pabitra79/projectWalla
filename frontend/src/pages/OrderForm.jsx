import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ClipboardList,
  User,
  Mail,
  Phone,
  Building2,
  Code2,
  Calendar,
  DollarSign,
  FileText,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Send,
  Loader2,
  Info,
  AlertCircle,
} from "lucide-react";
import { projectsAPI, ordersAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/PageHeader";

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

export default function OrderForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [isCustomOrder, setIsCustomOrder] = useState(false);
  const [customProjectName, setCustomProjectName] = useState("");
  const [form, setForm] = useState({
    college: user?.college || "",
    programmingLanguage: "",
    deadline: "",
    budget: "",
    requirements: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (projectId) {
      projectsAPI.getOne(projectId).then((r) => {
        setProject(r.data.project);
        setForm((f) => ({ ...f, budget: r.data.project.price }));
      });
    }
  }, [projectId]);

  // Check for custom order
  // useEffect(() => {
  //   const customData = sessionStorage.getItem("customOrder");
  //   if (customData && window.location.pathname.includes("/order/custom")) {
  //     const data = JSON.parse(customData);
  //     setIsCustomOrder(true);
  //     setCustomProjectName(data.projectName);
  //     setForm({
  //       college: data.college || user?.college || "",
  //       programmingLanguage: data.programmingLanguage || "",
  //       deadline: data.deadline || "",
  //       budget: data.budget || "",
  //       requirements: data.requirements || "",
  //     });
  //     sessionStorage.removeItem("customOrder");
  //   }
  // }, []);
  // Check if this is a custom order - just check the URL
  useEffect(() => {
    if (window.location.pathname.includes("/order/custom")) {
      setIsCustomOrder(true);
    }
  }, []);
  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate custom project name
    if (isCustomOrder && !customProjectName.trim()) {
      newErrors.customProjectName = "Please enter your project name";
    }

    if (!form.programmingLanguage)
      newErrors.programmingLanguage = "Please select a programming language";
    if (!form.deadline) newErrors.deadline = "Please select a deadline";
    if (!form.budget || form.budget < 1)
      newErrors.budget = "Please enter a valid budget";
    if (!form.college.trim())
      newErrors.college = "Please enter your college name";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      let res;
      if (isCustomOrder) {
        // Custom order - no projectId
        res = await ordersAPI.createCustom({
          projectName: customProjectName,
          college: form.college,
          programmingLanguage: form.programmingLanguage,
          deadline: form.deadline,
          budget: form.budget,
          requirements: form.requirements,
        });
      } else {
        // Normal order with projectId
        res = await ordersAPI.create({ projectId, ...form });
      }
      toast.success("🎉 Order placed successfully! Redirecting to payment...");
      setTimeout(() => navigate(`/payment/${res.data.order._id}`), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const minDateStr = minDate.toISOString().split("T")[0];

  // Calculate estimated delivery
  const getEstimatedDelivery = () => {
    if (!form.deadline) return null;
    const date = new Date(form.deadline);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f0a] via-[#0d1a0d] to-[#0a0f0a] text-white">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-300 mb-4">
            <ClipboardList className="w-4 h-4" />
            <span>Place Your Order</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">
            Complete Your{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Order
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            {project
              ? `Ordering: ${project.title}`
              : "Fill in your project details below"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Student Information */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-400" />
                    Student Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                      <label className="text-xs text-gray-400 uppercase tracking-wider">
                        Full Name
                      </label>
                      <p className="text-white font-medium mt-1 flex items-center gap-2">
                        <User className="w-4 h-4 text-emerald-400" />
                        {user?.name || "Not provided"}
                      </p>
                    </div>
                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                      <label className="text-xs text-gray-400 uppercase tracking-wider">
                        Email
                      </label>
                      <p className="text-white font-medium mt-1 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-emerald-400" />
                        {user?.email || "Not provided"}
                      </p>
                    </div>
                    <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-4">
                      <label className="text-xs text-gray-400 uppercase tracking-wider">
                        Phone
                      </label>
                      <p className="text-white font-medium mt-1 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-400" />
                        {user?.phone || "Not provided"}
                      </p>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        College Name *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          className={`w-full bg-gray-800/50 border ${errors.college ? "border-red-500" : "border-gray-700"} rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300`}
                          name="college"
                          value={form.college}
                          onChange={handleChange}
                          placeholder="Your college name"
                          required
                        />
                      </div>
                      {errors.college && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.college}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Project Details */}
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-emerald-400" />
                    Project Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Project Name - INPUT for custom, DISPLAY for normal */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Project Name *
                      </label>
                      {isCustomOrder ? (
                        <input
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                          name="customProjectName"
                          value={customProjectName}
                          onChange={(e) => setCustomProjectName(e.target.value)}
                          placeholder="Enter your project name"
                          required
                        />
                      ) : (
                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white">
                          {project?.title || "Not selected"}
                        </div>
                      )}
                      {errors.customProjectName && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Project name is
                          required
                        </p>
                      )}
                    </div>

                    {/* Programming Language */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Programming Language *
                      </label>
                      <select
                        className={`w-full bg-gray-800/50 border ${errors.programmingLanguage ? "border-red-500" : "border-gray-700"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 appearance-none`}
                        name="programmingLanguage"
                        value={form.programmingLanguage}
                        onChange={handleChange}
                        required
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

                    {/* Deadline */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Deadline *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          className={`w-full bg-gray-800/50 border ${errors.deadline ? "border-red-500" : "border-gray-700"} rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300`}
                          type="date"
                          name="deadline"
                          value={form.deadline}
                          onChange={handleChange}
                          min={minDateStr}
                          required
                        />
                      </div>
                      {errors.deadline && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.deadline}
                        </p>
                      )}
                      {form.deadline && (
                        <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Estimated delivery: {getEstimatedDelivery()}
                        </p>
                      )}
                    </div>

                    {/* Budget */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Your Budget ($) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          className={`w-full bg-gray-800/50 border ${errors.budget ? "border-red-500" : "border-gray-700"} rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300`}
                          type="number"
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          placeholder="Enter your budget"
                          min="1"
                          required
                        />
                      </div>
                      {errors.budget && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.budget}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    Special Requirements
                  </h3>
                  <div className="relative">
                    <textarea
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                      name="requirements"
                      value={form.requirements}
                      onChange={handleChange}
                      placeholder="Any specific modules, database preferences, extra features..."
                      rows={4}
                    />
                    <span className="absolute bottom-3 right-3 text-xs text-gray-500">
                      {form.requirements.length}/500
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    <Info className="w-3 h-3 inline mr-1" />
                    Be as detailed as possible to get the best results
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-4 rounded-2xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Confirm Order & Proceed to Payment
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {(project || isCustomOrder) && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-emerald-400" />
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-800/30 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Project
                    </p>
                    <p className="text-white font-medium mt-1">
                      {isCustomOrder ? customProjectName : project?.title}
                    </p>
                  </div>

                  {/* Only show tech stack for normal orders */}
                  {!isCustomOrder && project && (
                    <div className="bg-gray-800/30 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.techTags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.techTags?.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{project.techTags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Show "Custom" badge for custom orders */}
                  {isCustomOrder && (
                    <div className="bg-gray-800/30 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Order Type
                      </p>
                      <span className="text-indigo-300 font-medium text-sm bg-indigo-500/20 px-3 py-1 rounded-full inline-block mt-1">
                        ✨ Custom Project
                      </span>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Amount</span>
                      <span className="text-2xl font-bold text-emerald-400">
                        ${form.budget || project?.price || 99}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-gray-300">
                        Quality code guaranteed
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-gray-300">
                        Complete documentation
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-gray-300">On-time delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Shield className="w-4 h-4" />
                      <span className="text-gray-300">100% original code</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-center">
                      <Sparkles className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-400">
                        Need help? Chat with us on WhatsApp
                      </p>
                      <a
                        href="https://wa.me/918787565964"
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors"
                      >
                        💬 Chat Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
