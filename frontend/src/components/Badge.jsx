// Reusable Badge component for tech tags, order statuses, payment labels, etc.

const VARIANTS = {
  // Tech tags
  React:    'bg-sky-100 text-sky-700',
  'Node.js':'bg-green-100 text-green-700',
  Java:     'bg-orange-100 text-orange-700',
  PHP:      'bg-purple-100 text-purple-700',
  Python:   'bg-yellow-100 text-yellow-700',
  'C++':    'bg-blue-100 text-blue-700',
  MySQL:    'bg-indigo-100 text-indigo-700',
  MongoDB:  'bg-emerald-100 text-emerald-700',

  // Order statuses
  pending:     'bg-yellow-100 text-yellow-700',
  confirmed:   'bg-blue-100 text-blue-700',
  in_progress: 'bg-indigo-100 text-indigo-700',
  delivered:   'bg-green-100 text-green-700',
  cancelled:   'bg-red-100 text-red-700',

  // Payment
  paid:   'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',

  // Generic
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error:   'bg-red-100 text-red-700',
  info:    'bg-blue-100 text-blue-700',
  default: 'bg-gray-100 text-gray-700',
};

export default function Badge({ label, variant, className = '' }) {
  const style = VARIANTS[variant] || VARIANTS[label] || VARIANTS.default;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style} ${className}`}>
      {label}
    </span>
  );
}
