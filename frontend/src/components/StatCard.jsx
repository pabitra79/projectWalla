// StatCard — reusable metric card for Admin Dashboard and Student Dashboard
// Usage:
//   <StatCard icon={Package} label="Total Orders" value={42} color="text-indigo-600 bg-indigo-50" />

export default function StatCard({ icon: Icon, label, value, color = 'text-indigo-600 bg-indigo-50', trend, trendLabel }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel}
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
