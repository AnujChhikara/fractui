import { Link } from 'react-router-dom';

export default function ButtonDemo() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Button Component Demo</h1>
      </div>

      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700">Coming Soon</h2>
          <p className="text-gray-500 max-w-md">
            The Button component is currently in development. Check back soon for interactive
            examples and documentation.
          </p>
        </div>
      </div>
    </div>
  );
}
