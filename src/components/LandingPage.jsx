import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to AI Chatbot</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/website" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Website Analysis</h2>
          <p>Analyze any website and ask questions about its content.</p>
        </Link>
        <Link to="/document" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Document Analysis</h2>
          <p>Upload and analyze documents, including resumes and PDFs.</p>
        </Link>
        <Link to="/ai-chat" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">General AI Chat</h2>
          <p>Chat with our AI about any topic.</p>
        </Link>
        <Link to="/image-generator" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Image Generator</h2>
          <p>Chat with our AI about any topic and generate Image according to that.</p>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

