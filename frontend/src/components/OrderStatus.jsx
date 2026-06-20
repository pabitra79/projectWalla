import { CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react';

// Order status badge — use in order tables and cards
export function OrderStatusBadge({ status }) {
  const CONFIG = {
    pending:     { label: 'Pending',     class: 'bg-yellow-100 text-yellow-700',  icon: Clock },
    confirmed:   { label: 'Confirmed',   class: 'bg-blue-100 text-blue-700',      icon: CheckCircle },
    in_progress: { label: 'In Progress', class: 'bg-indigo-100 text-indigo-700',  icon: Package },
    delivered:   { label: 'Delivered',   class: 'bg-green-100 text-green-700',    icon: Truck },
    cancelled:   { label: 'Cancelled',   class: 'bg-red-100 text-red-700',        icon: XCircle },
  };
  const cfg = CONFIG[status] || CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.class}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

// Payment status badge
export function PaymentStatusBadge({ status }) {
  const CONFIG = {
    pending: { label: '⏳ Payment Pending', class: 'bg-orange-100 text-orange-700' },
    paid:    { label: '✅ Paid',            class: 'bg-green-100 text-green-700' },
    failed:  { label: '❌ Failed',          class: 'bg-red-100 text-red-700' },
  };
  const cfg = CONFIG[status] || CONFIG.pending;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.class}`}>
      {cfg.label}
    </span>
  );
}

// Progress stepper shown on student's order detail
const STEPS = [
  { key: 'pending',     label: 'Order Placed' },
  { key: 'confirmed',   label: 'Confirmed' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'delivered',   label: 'Delivered' },
];

export function OrderStepper({ status }) {
  const currentIdx = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = i <= currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                ${done ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'} 
                ${active ? 'ring-4 ring-indigo-100' : ''}`}>
                {done && i < currentIdx ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <p className={`text-xs mt-1 text-center whitespace-nowrap ${done ? 'text-indigo-600 font-medium' : 'text-gray-400'}`}>
                {step.label}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mb-4 mx-1 transition-colors ${i < currentIdx ? 'bg-indigo-600' : 'bg-gray-100'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
