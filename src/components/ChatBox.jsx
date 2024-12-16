import  { useState } from 'react';
import api from '../services/axiosInstance';

function ChatBox({ context = null }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await api.post('/web-scrapper/query/', {
        messages: [...messages, newMessage],
        context,
        question: input,
      });
        // Assuming the response contains { answer: "your answer", error: false }
        const answerMessage = { role: 'assistant', content: response.data.answer };

        setMessages([...messages, newMessage, answerMessage]);

    } catch (error) {
      console.error('Error in chat:', error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="h-96 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
        {loading && <p className="text-center">AI is thinking...</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;

