import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Copy,
  QrCode,
  CheckCircle,
  MessageCircle,
  Clock,
  Shield,
  Smartphone,
  Wallet,
  CreditCard,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Percent,
} from "lucide-react";
import { ordersAPI } from "../api";
import { PageSpinner } from "../components/Spinner";
import { OrderStepper } from "../components/OrderStatus";

const UPI_ID = "barikpabitra79@oksbi";
const WHATSAPP = "918787565964";

export default function Payment() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [utr, setUtr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("qr");
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersAPI
      .getOne(orderId)
      .then((r) => {
        setOrder(r.data.order);
        // Set default percentage based on what's already paid
        const alreadyPaid = r.data.order.paidAmount || 0;
        const total = r.data.order.budget || r.data.order.totalAmount || 0;

        if (alreadyPaid > 0) {
          const paidPercent = Math.round((alreadyPaid / total) * 100);
          // If paid 29%, default to 79% (pay 20% more)
          if (paidPercent >= 29 && paidPercent < 79) {
            setSelectedPercentage(79);
          }
          // If paid 79%, default to 100% (pay 51% more)
          else if (paidPercent >= 79 && paidPercent < 100) {
            setSelectedPercentage(100);
          } else {
            setSelectedPercentage(29);
          }
        } else {
          setSelectedPercentage(29);
        }
        setLoading(false);
      })
      .catch(() => {
        navigate("/dashboard");
        setLoading(false);
      });
  }, [orderId]);

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!utr.trim()) {
      return toast.error("Enter your UTR / Transaction ID");
    }
    setSubmitting(true);
    try {
      const totalAmount =
        Number(order.budget) || Number(order.totalAmount) || 0;
      const alreadyPaid = Number(order.paidAmount) || 0;

      // Calculate new total paid after this payment
      const newPaidAmount = Math.round(
        (totalAmount * selectedPercentage) / 100,
      );
      const additionalPayment = newPaidAmount - alreadyPaid;

      if (additionalPayment <= 0) {
        toast.error("You've already paid this amount or more");
        setSubmitting(false);
        return;
      }

      const dueAmount = totalAmount - newPaidAmount;

      // Determine payment status
      let paymentStatus = "pending";
      if (selectedPercentage >= 100) {
        paymentStatus = "paid";
      } else if (selectedPercentage > 0 && selectedPercentage < 100) {
        paymentStatus = "partial";
      }

      // Submit payment with amount details
      await ordersAPI.submitPayment(orderId, {
        utrNumber: utr.trim(),
        paidAmount: Number(newPaidAmount),
        dueAmount: Number(dueAmount),
        paymentPercentage: Number(selectedPercentage),
        paymentStatus: paymentStatus,
        totalAmount: Number(totalAmount),
      });

      toast.success(
        `✅ Additional payment of $${additionalPayment} submitted! Total paid: $${newPaidAmount}`,
      );
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting payment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageSpinner />;
  if (!order) return null;

  const totalAmount = Number(order.budget) || Number(order.totalAmount) || 0;
  const alreadyPaid = Number(order.paidAmount) || 0;
  const alreadyPaidPercent = Math.round((alreadyPaid / totalAmount) * 100);

  // Calculate payment options based on what's already paid
  const getPaymentOptions = () => {
    const options = [];

    if (alreadyPaidPercent < 29) {
      options.push({
        label: "Enroll Now (29%)",
        value: 29,
        description: "Start your project",
      });
    }

    if (alreadyPaidPercent < 79) {
      const additional = 79 - alreadyPaidPercent;
      options.push({
        label: `Pay to 79% (${additional}% more)`,
        value: 79,
        description: `$${Math.round((totalAmount * 79) / 100)} total`,
      });
    }

    if (alreadyPaidPercent < 100) {
      const additional = 100 - alreadyPaidPercent;
      options.push({
        label: `Complete Payment (${additional}% more)`,
        value: 100,
        description: `$${totalAmount} total`,
      });
    }

    return options;
  };

  const paymentOptions = getPaymentOptions();
  const selectedAmount = Math.round((totalAmount * selectedPercentage) / 100);
  const additionalPayment = selectedAmount - alreadyPaid;
  const dueAfterPayment = totalAmount - selectedAmount;

  const waMsg = encodeURIComponent(
    `Hi! I just paid additional $${additionalPayment} (Total paid: $${selectedAmount}) for Order #${orderId.slice(-8).toUpperCase()}. Please confirm.`,
  );

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-300 mb-4">
            <Lock className="w-4 h-4" />
            <span>Secure Payment</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">
            {alreadyPaid > 0 ? "Pay Remaining" : "Complete Your"}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Payment
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            {alreadyPaid > 0
              ? `Already paid $${alreadyPaid} (${alreadyPaidPercent}%). Pay the remaining amount.`
              : "Pay securely via UPI to confirm your order"}
          </p>
        </div>

        {/* Progress */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 mb-8 hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-emerald-400" />
            <p className="text-sm text-gray-300">Order Progress</p>
          </div>
          <OrderStepper status={order.orderStatus} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Order ID</span>
                  <span className="font-mono text-emerald-300">
                    #{orderId.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Project</span>
                  <span className="text-white">{order.projectName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Language</span>
                  <span className="text-white">
                    {order.programmingLanguage}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Deadline</span>
                  <span className="text-white">
                    {new Date(order.deadline).toDateString()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Total Amount</span>
                  <span className="font-bold text-emerald-400">
                    $ {totalAmount}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Already Paid</span>
                  <span className="font-bold text-green-400">
                    $ {alreadyPaid} ({alreadyPaidPercent}%)
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Paying Now</span>
                  <span className="font-bold text-yellow-400">
                    ${additionalPayment}
                  </span>
                </div>
                <div className="flex justify-between py-3 mt-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl px-4 -mx-2 border border-emerald-500/20">
                  <span className="font-semibold text-white">
                    After Payment
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400 block">
                      ${selectedAmount} ({selectedPercentage}%)
                    </span>
                    {dueAfterPayment > 0 ? (
                      <span className="text-xs text-yellow-400">
                        Due: ${dueAfterPayment}
                      </span>
                    ) : (
                      <span className="text-xs text-green-400">
                        ✅ Fully Paid
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 text-center">
              <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">
                Your payment is secure and encrypted
              </p>
              <p className="text-xs text-gray-500">Powered by UPI</p>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Options */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5 text-emerald-400" />
                {alreadyPaid > 0
                  ? "Pay Remaining Amount"
                  : "Choose Payment Amount"}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {paymentOptions.map((option) => {
                  const amount = Math.round((totalAmount * option.value) / 100);
                  const isSelected = selectedPercentage === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSelectedPercentage(option.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                          : "border-gray-700 hover:border-gray-500 bg-gray-800/30"
                      }`}
                    >
                      <p className="text-lg font-bold text-white">
                        {option.value}%
                      </p>
                      <p className="text-xl font-bold text-emerald-400 mt-1">
                        ${amount}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {option.description}
                      </p>
                      {isSelected && (
                        <div className="mt-2 flex items-center justify-center gap-1">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-emerald-400">
                            Selected
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods Tabs */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex gap-2 mb-6 bg-gray-800/50 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab("qr")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "qr"
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  Scan QR
                </button>
                <button
                  onClick={() => setActiveTab("upi")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "upi"
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  UPI ID
                </button>
              </div>

              {/* QR Tab */}
              {activeTab === "qr" && (
                <div className="animate-fade-in">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur-2xl animate-pulse" />
                      <img
                        src="/images/qr/qr.jpeg"
                        alt="UPI QR"
                        className="relative w-56 h-56 object-contain rounded-2xl border-2 border-emerald-500/30 bg-white p-4 shadow-2xl shadow-emerald-500/20"
                      />
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Scan Me
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">
                      Scan using{" "}
                      <span className="text-emerald-400 font-medium">GPay</span>{" "}
                      •{" "}
                      <span className="text-emerald-400 font-medium">
                        PhonePe
                      </span>{" "}
                      •{" "}
                      <span className="text-emerald-400 font-medium">
                        Paytm
                      </span>
                    </p>
                  </div>

                  <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="font-semibold text-white text-sm mb-2">
                      📝 Steps to Pay:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">1.</span>
                        Open any UPI app (GPay/PhonePe/Paytm)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">2.</span>
                        Scan the QR code above
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">3.</span>
                        Pay{" "}
                        <span className="text-emerald-400 font-bold">
                          $ {additionalPayment}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">4.</span>
                        Enter UTR below to confirm
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* UPI ID Tab */}
              {activeTab === "upi" && (
                <div className="animate-fade-in space-y-4">
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">UPI ID</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono font-semibold text-white text-lg">
                        {UPI_ID}
                      </p>
                      <button
                        onClick={copyUPI}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl text-emerald-400 transition-all duration-300"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="font-semibold text-white text-sm mb-2">
                      📱 Pay with UPI ID:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">1.</span>
                        Open your UPI app
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">2.</span>
                        Pay to:{" "}
                        <span className="text-emerald-400 font-mono">
                          {UPI_ID}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">3.</span>
                        Enter amount:{" "}
                        <span className="text-emerald-400 font-bold">
                          $ {additionalPayment}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">4.</span>
                        Enter UTR below to confirm
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* UTR Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Confirm Your Payment
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    UTR / Transaction ID *
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                      value={utr}
                      onChange={(e) => setUtr(e.target.value)}
                      placeholder="e.g. 425612378901"
                      required
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the transaction ID from your UPI app
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Pay ${additionalPayment} ({selectedPercentage}%)
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                <span className="text-xs text-gray-500">or</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              </div>

              <div className="mt-4 text-center">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium group"
                >
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Send WhatsApp confirmation
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
