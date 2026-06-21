import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("pw_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle auth errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("pw_token");
      localStorage.removeItem("pw_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

// Auth
export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
  updateProfile: (data) => API.put("/auth/update-profile", data),

  // ✅ Forgot Password - New routes
  forgotPassword: (email) => API.post("/auth/forgot-password", { email }),
  verifyOTP: (email, otp) => API.post("/auth/verify-otp", { email, otp }),
  resetPassword: (email, otp, newPassword) =>
    API.post("/auth/reset-password", { email, otp, newPassword }),
  resendOTP: (email) => API.post("/auth/resend-otp", { email }),
};

// Projects
export const projectsAPI = {
  getAll: (params) => API.get("/projects", { params }),
  getOne: (id) => API.get(`/projects/${id}`),
  seed: () => API.post("/projects/seed"),
  create: (data) => API.post("/projects", data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  delete: (id) => API.delete(`/projects/${id}`),
};

// Orders
export const ordersAPI = {
  create: (data) => API.post("/orders", data),
  createCustom: (data) => API.post("/orders/custom", data),
  getMyOrders: () => API.get("/orders/my"),
  getOne: (id) => API.get(`/orders/${id}`),
  submitPayment: (id, paymentData) =>
    API.put(`/orders/${id}/payment`, paymentData), // ← Changed to accept full paymentData
  // Admin
  getAll: (params) => API.get("/orders/admin/all", { params }),
  updateStatus: (id, data) => API.put(`/orders/admin/${id}/status`, data),
  getStats: () => API.get("/orders/admin/stats"),
  getAllStudents: () => API.get("/orders/admin/students"),
};
// Contact
export const contactAPI = {
  send: (data) => API.post("/contact", data),
  getAll: () => API.get("/contact/admin/all"),
  getOne: (id) => API.get(`/contact/admin/${id}`),
  update: (id, data) => API.put(`/contact/admin/${id}`, data),
  delete: (id) => API.delete(`/contact/admin/${id}`),
};

export default API;
