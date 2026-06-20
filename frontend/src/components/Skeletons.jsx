// Skeleton loaders — show while data is being fetched
// Prevents layout shift and looks better than a spinner on grids

// Single project card skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-36 bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-12 bg-gray-100 rounded-full" />
          <div className="h-5 w-14 bg-gray-100 rounded-full" />
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="h-6 w-16 bg-gray-100 rounded" />
          <div className="h-8 w-20 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// Grid of project card skeletons
export function ProjectGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(count).fill(0).map((_, i) => <ProjectCardSkeleton key={i} />)}
    </div>
  );
}

// Table row skeleton
export function TableRowSkeleton({ cols = 6 }) {
  return (
    <tr className="animate-pulse">
      {Array(cols).fill(0).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-100 rounded w-full" />
        </td>
      ))}
    </tr>
  );
}

// Stat card skeleton
export function StatCardSkeleton() {
  return (
    <div className="card p-5 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded w-20" />
          <div className="h-7 bg-gray-100 rounded w-12" />
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-xl" />
      </div>
    </div>
  );
}
