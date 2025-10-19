import { Link } from 'react-router-dom';

import { ThemeToggle } from '../components/ThemeToggle';

export default function Home() {
  return (
    <div className="p-8 space-y-12">
      <ThemeToggle />
      <div>
        <h1 className="text-4xl font-bold mb-4">FractUI Dev Work</h1>
        <p className="text-gray-600">Component development and testing environment</p>
      </div>

      {/* Basic Components */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Basic Components</h2>
        <div className="space-y-2">
          <div>
            <Link to="/input" className="text-blue-600 hover:underline">
              Input Component
            </Link>
          </div>
          <div>
            <Link to="/button" className="text-blue-600 hover:underline">
              Button Component
            </Link>
          </div>
          <div>
            <Link to="/link" className="text-gray-400">
              Link Component (Coming Soon)
            </Link>
          </div>
        </div>
      </section>

      {/* Complex Components */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Complex Components</h2>
        <div className="space-y-2">
          <div>
            <Link to="/modal" className="text-gray-400">
              Modal Component (Coming Soon)
            </Link>
          </div>
          <div>
            <Link to="/dropdown" className="text-gray-400">
              Dropdown Component (Coming Soon)
            </Link>
          </div>
          <div>
            <Link to="/table" className="text-gray-400">
              Data Table Component (Coming Soon)
            </Link>
          </div>
        </div>
      </section>

      {/* More Coming Soon */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">More Coming Soon</h2>
        <div className="text-gray-500">
          <p>Card, Navigation, Toast, Tooltip, Accordion, Tabs</p>
        </div>
      </section>
    </div>
  );
}
