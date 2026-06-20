// Spinner — use anywhere you need a loading state
export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-5 h-5 border-2', md: 'w-8 h-8 border-4', lg: 'w-12 h-12 border-4' };
  return (
    <div className={`${sizes[size]} border-indigo-600 border-t-transparent rounded-full animate-spin ${className}`} />
  );
}

// Full-page centered spinner
export function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

// Section-level spinner
export function SectionSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Spinner size="md" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}
