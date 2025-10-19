import { Input } from '../../packages/fractui/src/components/input/Input';

export default function App() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Input Component Demo</h1>

      {/* Variants Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Default Variant</label>
            <Input placeholder="Default input field" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Error Variant</label>
            <Input variant="error" placeholder="Error state input" />
          </div>
        </div>
      </section>

      {/* Sizes Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Small (sm)</label>
            <Input inputSize="sm" placeholder="Small input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Default</label>
            <Input placeholder="Default size input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Large (lg)</label>
            <Input inputSize="lg" placeholder="Large input" />
          </div>
        </div>
      </section>

      {/* Input Types Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input Types</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Text</label>
            <Input type="text" placeholder="Enter text" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input type="email" placeholder="Enter email" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input type="password" placeholder="Enter password" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number</label>
            <Input type="number" placeholder="Enter number" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <Input type="search" placeholder="Search..." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL</label>
            <Input type="url" placeholder="Enter URL" />
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">States</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Normal</label>
            <Input placeholder="Normal state" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Disabled</label>
            <Input disabled placeholder="Disabled input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">With Value</label>
            <Input value="Pre-filled value" />
          </div>
        </div>
      </section>

      {/* Combined Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Combined Examples</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Small Error Input</label>
            <Input inputSize="sm" variant="error" placeholder="Small error input" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Large Error Input</label>
            <Input inputSize="lg" variant="error" placeholder="Large error input" />
          </div>
        </div>
      </section>
    </div>
  );
}
