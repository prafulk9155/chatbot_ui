import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/landing" className="text-2xl font-bold">AI Chatbot</Link>
        <ul className="flex space-x-4">
          <li><Link to="/website" className="hover:underline">Website Analysis</Link></li>
          <li><Link to="/document" className="hover:underline">Document Analysis</Link></li>

          <li><Link to="/ai-chat" className="hover:underline">General AI Chat</Link></li>
          <li><Link to="/image-generator" className="hover:underline">Image Generator</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

