import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ordersAPI } from "../api";
import { useAuth } from "../context/AuthContext";
import {
  Package,
  Clock,
  CheckCircle,
  Download,
  CreditCard,
  TrendingUp,
  Users,
  Zap,
  Sparkles,
  Activity,
  Heart,
  Shield,
  Rocket,
  DollarSign,
  Percent,
} from "lucide-react";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
  OrderStepper,
} from "../components/OrderStatus";
import EmptyState from "../components/EmptyState";
import { StatCardSkeleton } from "../components/Skeletons";

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    ordersAPI
      .getMyOrders()
      .then((r) => setOrders(r.data.orders))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
  };

  // Calculate total paid amount across all orders
  const totalPaid = orders.reduce((sum, o) => sum + (o.paidAmount || 0), 0);
  const totalDue = orders.reduce((sum, o) => sum + (o.dueAmount || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Sci-Fi Background */}
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
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-white/10">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
              <p className="text-white/40 text-sm">
                Welcome back,{" "}
                <span className="text-white/60">
                  {user?.name?.split(" ")[0]}
                </span>
                ! 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array(4)
              .fill(0)
              .map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              {/* Total Orders */}
              <div className="relative group overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-indigo-500/10 via-indigo-600/5 to-purple-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-white/40 text-sm font-medium">
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {stats.total}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">
                        +12% this month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                    <Package className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="relative group overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-yellow-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-white/40 text-sm font-medium">
                      Awaiting Processing
                    </p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {stats.pending}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span className="text-xs text-orange-400">
                        Pending delivery
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <Clock className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </div>

              {/* Delivered */}
              <div className="relative group overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-green-500/10 via-green-600/5 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-white/40 text-sm font-medium">
                      Completed Successfully
                    </p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {stats.delivered}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">Delivered</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="relative group overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-emerald-500/10 via-green-600/5 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-white/40 text-sm font-medium">
                      Total Paid
                    </p>
                    <p className="text-3xl font-bold text-emerald-400 mt-1">
                      ${totalPaid}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <DollarSign className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-yellow-400">
                        Due: ${totalDue}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Orders Section */}
        <div className="relative overflow-hidden rounded-2xl bg-[#14141f] border border-white/5">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-500/30">
                <Package className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h2 className="font-semibold text-white">My Orders</h2>
                <p className="text-xs text-white/30">
                  {orders.length} orders found
                </p>
              </div>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4" /> New Order
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Package className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-white font-semibold mb-2">No orders yet</h3>
              <p className="text-white/40 text-sm mb-4">
                Browse our projects and place your first order
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300"
              >
                Browse Projects <Rocket className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {orders.map((order) => {
                const paidAmount = order.paidAmount || 0;
                const dueAmount = order.dueAmount || order.budget - paidAmount;
                const percentage = order.paymentPercentage || 0;
                const isFullyPaid = percentage >= 100;

                return (
                  <div key={order._id}>
                    {/* Order Row */}
                    <div
                      className="px-6 py-4 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                      onClick={() =>
                        setExpanded(expanded === order._id ? null : order._id)
                      }
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                              <Activity className="w-4 h-4 text-indigo-400" />
                            </div>
                            <h3 className="font-semibold text-white truncate">
                              {order.projectName}
                            </h3>
                            {order.isCustom && (
                              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                                CUSTOM
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 ml-11">
                            <span className="text-indigo-400 font-mono">
                              #{order._id.slice(-6).toUpperCase()}
                            </span>
                            <span className="w-px h-3 bg-white/10" />
                            <span>{order.programmingLanguage}</span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-white/20" />
                              Due: {new Date(order.deadline).toDateString()}
                            </span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="font-semibold text-white/80">
                              ${order.budget}
                            </span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="flex items-center gap-1.5">
                              <span className="text-emerald-400">
                                Paid: ${paidAmount}
                              </span>
                              <span className="text-yellow-400">
                                Due: ${dueAmount}
                              </span>
                            </span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="flex items-center gap-1">
                              <Percent className="w-3 h-3 text-white/30" />
                              <span
                                className={`font-medium ${
                                  isFullyPaid
                                    ? "text-green-400"
                                    : percentage >= 50
                                      ? "text-yellow-400"
                                      : "text-orange-400"
                                }`}
                              >
                                {percentage}%
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <OrderStatusBadge status={order.orderStatus} />
                          <PaymentStatusBadge status={order.paymentStatus} />
                        </div>
                      </div>

                      {/* Payment Progress Bar */}
                      <div className="mt-2 ml-11">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isFullyPaid
                                  ? "bg-green-400"
                                  : percentage >= 50
                                    ? "bg-yellow-400"
                                    : "bg-orange-400"
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-white/30 font-mono">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expanded === order._id && (
                      <div className="px-6 pb-5 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-t border-indigo-500/10">
                        <div className="pt-4 mb-4">
                          <OrderStepper status={order.orderStatus} />
                        </div>

                        {/* Payment Breakdown */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-xs text-white/30">Total</p>
                            <p className="text-lg font-bold text-white">
                              ${order.budget}
                            </p>
                          </div>
                          <div className="bg-emerald-500/10 rounded-xl p-3 text-center border border-emerald-500/20">
                            <p className="text-xs text-white/30">Paid</p>
                            <p className="text-lg font-bold text-emerald-400">
                              ${paidAmount}
                            </p>
                          </div>
                          <div
                            className={`rounded-xl p-3 text-center border ${
                              dueAmount > 0
                                ? "bg-yellow-500/10 border-yellow-500/20"
                                : "bg-green-500/10 border-green-500/20"
                            }`}
                          >
                            <p className="text-xs text-white/30">Due</p>
                            <p
                              className={`text-lg font-bold ${
                                dueAmount > 0
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }`}
                            >
                              ${dueAmount}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                          {order.paymentStatus === "pending" && (
                            <Link
                              to={`/payment/${order._id}`}
                              className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-400 px-4 py-2 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02]"
                            >
                              <CreditCard className="w-3.5 h-3.5" /> Complete
                              Payment
                            </Link>
                          )}
                          {order.paymentStatus === "partial" && (
                            <Link
                              to={`/payment/${order._id}`}
                              className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 px-4 py-2 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-[1.02]"
                            >
                              <CreditCard className="w-3.5 h-3.5" /> Pay
                              Remaining ${dueAmount}
                            </Link>
                          )}
                          {order.orderStatus === "delivered" &&
                            order.deliveryFileUrl && (
                              <a
                                href={order.deliveryFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-4 py-2 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02]"
                              >
                                <Download className="w-3.5 h-3.5" /> Download
                                Project
                              </a>
                            )}
                          {order.adminNotes && (
                            <p className="text-xs text-white/40 italic flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-400" />
                              Admin note: {order.adminNotes}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/projects"
            className="group p-4 bg-[#14141f] border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30 group-hover:scale-110 transition-transform">
                <Rocket className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  Browse Projects
                </p>
                <p className="text-white/30 text-xs">Find your next project</p>
              </div>
            </div>
          </Link>

          <Link
            to="/contact"
            className="group p-4 bg-[#14141f] border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Get Support</p>
                <p className="text-white/30 text-xs">24/7 assistance</p>
              </div>
            </div>
          </Link>

          <Link
            to="/projects"
            className="group p-4 bg-[#14141f] border border-white/5 rounded-2xl hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  Quality Guarantee
                </p>
                <p className="text-white/30 text-xs">100% satisfaction</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
