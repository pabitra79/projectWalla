// PageHeader — consistent top section for all pages
// Usage:
//   <PageHeader icon={ClipboardList} title="Place Your Order" subtitle="Fill in your details" />

export default function PageHeader({
  icon: Icon,
  title,
  subtitle,
  iconBg = "bg-blue-400",
  iconColor = "text-indigo-600",
  children,
}) {
  return (
    <div className="text-center mb-8">
      {Icon && (
        <div
          className={`inline-flex items-center justify-center w-12 h-12 ${iconBg} rounded-2xl mb-3`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-700 mt-1">{subtitle}</p>}
      {children}
    </div>
  );
}
