// EmptyState — shown when a list/table has no data
// Usage:
//   <EmptyState icon={Package} title="No orders yet" desc="Place your first order." action={<Link to="/projects">Browse</Link>} />

export default function EmptyState({ icon: Icon, title, desc, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      {Icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-gray-300" />
        </div>
      )}
      <h3 className="font-semibold text-gray-800 text-base mb-1">{title}</h3>
      {desc && <p className="text-gray-400 text-sm max-w-xs mb-5">{desc}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
