import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import OrderForm from "./pages/OrderForm";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import { Login, Register } from "./pages/Auth";
import { About, Contact } from "./pages/AboutContact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import { Link } from "lucide-react";

function Layout({ children, noFooter, noWhatsApp }) {
  return (
    <div
      className="min-h-screen flex flex-col bg-black"
      style={{
        background: "black",
      }}
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      {!noFooter && <Footer />}
      {!noWhatsApp && <WhatsAppFloat />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { borderRadius: "12px", fontSize: "14px" },
          }}
        />
        <Routes>
          {/* Public */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/projects"
            element={
              <Layout>
                <Projects />
              </Layout>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <Layout>
                <ProjectDetail />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          {/* Auth */}
          <Route
            path="/login"
            element={
              <Layout noFooter noWhatsApp>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout noFooter noWhatsApp>
                <Register />
              </Layout>
            }
          />
          {/* Protected — Student */}
          <Route
            path="/order/:projectId"
            element={
              <ProtectedRoute>
                <Layout>
                  <OrderForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/custom"
            element={
              <ProtectedRoute>
                <Layout>
                  <OrderForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:orderId"
            element={
              <ProtectedRoute>
                <Layout>
                  <Payment />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Protected — Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Layout noWhatsApp>
                  <AdminDashboard />
                </Layout>
              </AdminRoute>
            }
          />
          // Add route
          <Route
            path="/forgot-password"
            element={
              <Layout noFooter noWhatsApp>
                <ForgotPassword />
              </Layout>
            }
          />
          {/* 404 */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                  <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <p className="text-4xl">🔍</p>
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Page Not Found
                  </h1>
                  <p className="text-gray-400 mb-6">
                    The page you're looking for doesn't exist.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Go Home
                  </Link>
                </div>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
