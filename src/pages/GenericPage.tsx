interface GenericPageProps {
  title: string;
  subtitle?: string;
  content: string;
}

export function GenericPage({ title, subtitle, content }: GenericPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl mb-4 text-center">{title}</h1>
          {subtitle && (
            <p className="text-xl text-center max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  );
}
