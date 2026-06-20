import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ordersAPI, projectsAPI } from "../../api";
import {
  Users,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  RefreshCw,
  Zap,
  TrendingUp,
  Award,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Percent,
} from "lucide-react";
import StatCard from "../../components/StatCard";
import { StatCardSkeleton } from "../../components/Skeletons";
import EmptyState from "../../components/EmptyState";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "../../components/OrderStatus";
import { ConfirmModal } from "../../components/Modal";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "in_progress",
  "delivered",
  "cancelled",
];
const PAYMENT_OPTIONS = ["pending", "partial", "paid", "failed"];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [filter, setFilter] = useState({ status: "", paymentStatus: "" });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [confirmSeed, setConfirmSeed] = useState(false);
  const [deliveryUrl, setDeliveryUrl] = useState({});

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, studentsRes] = await Promise.all([
        ordersAPI.getStats(),
        ordersAPI.getAll(filter),
        ordersAPI.getAllStudents(),
      ]);
      setStats(statsRes.data.stats);
      setOrders(ordersRes.data.orders);
      setStudents(studentsRes.data.students);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await projectsAPI.seed();
      toast.success("🎉 12 projects seeded successfully!");
    } catch {
      toast.error("Seed failed");
    } finally {
      setSeeding(false);
    }
  };

  const updateStatus = async (orderId, field, value) => {
    try {
      await ordersAPI.updateStatus(orderId, { [field]: value });
      toast.success("✅ Updated successfully!");
      loadData();
    } catch {
      toast.error("Update failed");
    }
  };

  const setDelivery = async (orderId) => {
    const url = deliveryUrl[orderId];
    if (!url) return toast.error("Enter a download URL first");
    await updateStatus(orderId, "deliveryFileUrl", url);
    await updateStatus(orderId, "orderStatus", "delivered");
    setDeliveryUrl((p) => ({ ...p, [orderId]: "" }));
  };

  // Calculate total earnings from paid orders
  const totalEarnings = orders
    .filter((o) => o.paymentStatus === "paid" || o.paymentStatus === "partial")
    .reduce((sum, o) => sum + (o.paidAmount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f0a] via-[#0d1a0d] to-[#0a0f0a] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, rgba(74, 222, 128, 0.02) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs text-emerald-300 mb-2">
              <Zap className="w-3 h-3" />
              <span>Admin Panel</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Manage orders, students, and projects from one place
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmSeed(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:border-emerald-500/30 transition-all duration-300 text-sm"
            >
              <Zap className="w-4 h-4 text-emerald-400" /> Seed Projects
            </button>
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-gray-300 hover:text-white hover:border-emerald-500/30 transition-all duration-300 text-sm"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Confirm seed modal */}
        <ConfirmModal
          open={confirmSeed}
          onClose={() => setConfirmSeed(false)}
          onConfirm={handleSeed}
          title="Seed 12 Projects?"
          message="This will DELETE all existing projects and re-seed the default 12. Continue?"
          confirmLabel={seeding ? "Seeding..." : "Yes, Seed"}
          danger
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {!stats ? (
            Array(5)
              .fill(0)
              .map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stats.totalOrders}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12% this month</span>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stats.pendingOrders}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-orange-400">
                  <span>⏳ Awaiting processing</span>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Delivered</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stats.deliveredOrders}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>Completed successfully</span>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Students</p>
                    <p className="text-2xl font-bold text-white mt-1">
                      {stats.totalStudents}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-blue-400">
                  <Award className="w-3 h-3" />
                  <span>Active learners</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Earnings</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-1">
                      ${(totalEarnings || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>+8% growth</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-1 w-fit">
          {[
            ["orders", "📦 Orders"],
            ["students", "👨‍🎓 Students"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === key
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300">
            <div className="px-6 py-4 border-b border-gray-800 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  className="bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  value={filter.status}
                  onChange={(e) =>
                    setFilter((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="">All Statuses</option>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
                <select
                  className="bg-gray-800/50 border border-gray-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500/50"
                  value={filter.paymentStatus}
                  onChange={(e) =>
                    setFilter((f) => ({ ...f, paymentStatus: e.target.value }))
                  }
                >
                  <option value="">All Payments</option>
                  {PAYMENT_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-sm text-gray-400 ml-auto">
                {orders.length} orders found
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No orders found"
                desc="Try changing the filters to see more results."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-800/30 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      {[
                        "Order",
                        "Student",
                        "Project",
                        "Budget",
                        "Paid",
                        "Due",
                        "Payment %",
                        "Deadline",
                        "Payment",
                        "Status",
                        "Deliver",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left font-medium whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {orders.map((order) => {
                      const paidAmount = order.paidAmount || 0;
                      const dueAmount =
                        order.dueAmount || order.budget - paidAmount;
                      const percentage = order.paymentPercentage || 0;

                      return (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-800/30 transition-colors duration-200"
                        >
                          <td className="px-4 py-3 font-mono text-xs text-emerald-400">
                            #{order._id.slice(-6).toUpperCase()}
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-white whitespace-nowrap">
                              {order.student?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.student?.phone}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-200 max-w-[130px] truncate flex items-center gap-1.5">
                              {order.projectName}
                              {order.isCustom && (
                                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                                  CUSTOM
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.programmingLanguage}
                            </p>
                          </td>
                          <td className="px-4 py-3 font-bold text-emerald-400">
                            ${order.budget}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-green-400 font-medium">
                              ${paidAmount}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`font-medium ${
                                dueAmount > 0
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }`}
                            >
                              ${dueAmount}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm font-medium ${
                                  percentage >= 100
                                    ? "text-green-400"
                                    : percentage >= 50
                                      ? "text-yellow-400"
                                      : "text-orange-400"
                                }`}
                              >
                                {percentage}%
                              </span>
                              <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    percentage >= 100
                                      ? "bg-green-400"
                                      : percentage >= 50
                                        ? "bg-yellow-400"
                                        : "bg-orange-400"
                                  }`}
                                  style={{
                                    width: `${Math.min(percentage, 100)}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(order.deadline).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={order.paymentStatus}
                              onChange={(e) =>
                                updateStatus(
                                  order._id,
                                  "paymentStatus",
                                  e.target.value,
                                )
                              }
                              className={`text-xs rounded-xl px-3 py-1.5 cursor-pointer bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50 ${
                                order.paymentStatus === "paid"
                                  ? "border-emerald-500/30"
                                  : order.paymentStatus === "partial"
                                    ? "border-yellow-500/30"
                                    : ""
                              }`}
                            >
                              {PAYMENT_OPTIONS.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                            {order.utrNumber && (
                              <p className="text-xs text-gray-500 mt-0.5 font-mono">
                                UTR: {order.utrNumber}
                              </p>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={order.orderStatus}
                              onChange={(e) =>
                                updateStatus(
                                  order._id,
                                  "orderStatus",
                                  e.target.value,
                                )
                              }
                              className={`text-xs rounded-xl px-3 py-1.5 cursor-pointer bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:border-emerald-500/50 ${
                                order.orderStatus === "delivered"
                                  ? "border-emerald-500/30"
                                  : ""
                              }`}
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>
                                  {s.replace("_", " ")}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            {order.orderStatus !== "delivered" ? (
                              <div className="flex gap-1">
                                <input
                                  className="bg-gray-800/50 border border-gray-700 rounded-xl px-2 py-1.5 text-xs text-white placeholder-gray-500 w-28 focus:outline-none focus:border-emerald-500/50"
                                  placeholder="File URL"
                                  value={deliveryUrl[order._id] || ""}
                                  onChange={(e) =>
                                    setDeliveryUrl((p) => ({
                                      ...p,
                                      [order._id]: e.target.value,
                                    }))
                                  }
                                />
                                <button
                                  onClick={() => setDelivery(order._id)}
                                  className="text-xs bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                                >
                                  Send
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Delivered
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300">
            <div className="px-6 py-4 border-b border-gray-800">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Registered Students ({students.length})
              </h3>
            </div>
            {students.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No students yet"
                desc="Students will appear here after they register."
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-800/30 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      {["Name", "Email", "Phone", "College", "Joined"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left font-medium"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {students.map((s) => (
                      <tr
                        key={s._id}
                        className="hover:bg-gray-800/30 transition-colors duration-200"
                      >
                        <td className="px-4 py-3 font-medium text-white">
                          {s.name}
                        </td>
                        <td className="px-4 py-3 text-gray-300">{s.email}</td>
                        <td className="px-4 py-3 text-gray-400">{s.phone}</td>
                        <td className="px-4 py-3 text-gray-500">
                          {s.college || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(s.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
