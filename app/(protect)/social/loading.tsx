export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800 dark:border-gray-600 dark:border-t-gray-400" />
        <p className="text-gray-800 font-medium dark:text-gray-400">
          Loading...
        </p>
      </div>
    </div>
  );
}
