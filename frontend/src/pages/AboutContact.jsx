import { Link } from "react-router-dom";
import {
  Code2,
  Shield,
  Clock,
  Star,
  MessageCircle,
  Mail,
  Phone,
  Send,
  Users,
  Award,
  Rocket,
  Zap,
  CheckCircle,
  Target,
  Heart,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function About() {
  const SKILLS = [
    { name: "Java", level: 95 },
    { name: "PHP", level: 90 },
    { name: "Python", level: 85 },
    { name: "React", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "MySQL", level: 90 },
    { name: "MongoDB", level: 80 },
    { name: "C++", level: 75 },
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Students Helped" },
    { icon: Award, value: "98%", label: "Satisfaction Rate" },
    { icon: Rocket, value: "12", label: "Project Categories" },
    { icon: Zap, value: "24/7", label: "Support Available" },
  ];

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

        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-float-particle" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400/30 rounded-full animate-float-particle delay-700" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-300/30 rounded-full animate-float-particle delay-1400" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-green-300/30 rounded-full animate-float-particle delay-2000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur-2xl" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30">
              <Code2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              ProjectWalla
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We help engineering and BCA/MCA students get quality projects done
            on time — so they can focus on learning and building their future.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 rounded-2xl mb-3">
                <Icon className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-emerald-400" />
              Our Story
            </h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                ProjectWalla was started by a developer who saw fellow students
                struggle with college projects — tight deadlines, complex
                requirements, and no guidance. We decided to fix that.
              </p>
              <p>
                Today, we've helped{" "}
                <span className="text-emerald-400 font-semibold">
                  500+ students
                </span>{" "}
                across India get their projects — from simple management systems
                to full-stack web apps. Every project is handcrafted with clean
                code and complete documentation.
              </p>
              <p className="text-emerald-300 font-medium">
                Our promise: quality code, on time, at a student-friendly price.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-emerald-400" />
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To make quality project development accessible to every student,
                regardless of their technical background, and to bridge the gap
                between academic requirements and real-world skills.
              </p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                Our Vision
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To become India's most trusted platform for college project
                development, empowering students to excel in their academic
                journey and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-16 hover:border-emerald-500/30 transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-emerald-400" />
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                  <span>{s.name}</span>
                  <span className="text-emerald-400">{s.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-1000"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Shield,
              title: "Privacy First",
              desc: "Your order details are never shared with anyone. 100% confidential.",
            },
            {
              icon: Clock,
              title: "Always On Time",
              desc: "We track every deadline and deliver before your submission date.",
            },
            {
              icon: Star,
              title: "Quality Guaranteed",
              desc: "Clean, commented, runnable code — every single time.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group"
            >
              <div className="relative">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-all duration-300">
                  <Icon className="w-7 h-7 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 rounded-3xl blur-xl transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
          >
            <span>View Our Projects</span>
            <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("✅ Message sent! We'll reply within 2 hours.");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(
          data.message || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
      console.error("Contact form error:", error);
    } finally {
      setSending(false);
    }
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
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-300 mb-4">
            <MessageCircle className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Get In{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Have questions? We're here to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/916294343584"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                      WhatsApp (Fastest)
                    </p>
                    <p className="text-sm text-gray-400">+91 6294343584</p>
                  </div>
                </a>
                <a
                  href="mailto:help.projectwalla@gmail.com"
                  className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-indigo-400 transition-colors">
                      Email
                    </p>
                    <p className="text-sm text-gray-400">
                      help.projectwalla@gmail.com
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/30">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Call Us</p>
                    <p className="text-sm text-gray-400">+91 6294343584</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/30">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Response Time</p>
                    <p className="text-sm text-gray-400">
                      Within 2 hours (9AM – 8PM)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <p className="font-semibold text-emerald-300 mb-2">
                💬 Prefer WhatsApp?
              </p>
              <p className="text-sm text-gray-300 mb-4">
                Most students get a reply in under 10 minutes on WhatsApp!
              </p>
              <a
                href="https://wa.me/916294343584?text=Hi! I need help with a college project."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-400" />
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="+91 99999 99999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message *
                </label>
                <textarea
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Describe your project requirement..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
