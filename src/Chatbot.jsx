// src/Chatbot.jsx
import { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [website, setWebsite] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [model, setModel] = useState('WebScraper'); // Default model
    const [urlSubmitted, setUrlSubmitted] = useState(false); // Track if URL is submitted

    const sendUrl = async (e) => {
        e.preventDefault();

        // Call the API with the URL
        try {
            const response = await axios.post('http://127.0.0.1:8000/scrape/', {
                "url":website,
            });

            if (!response.data.error) {
                const botMessage = { text: "URL submitted successfully! Now you can enter your question.", sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
                setUrlSubmitted(true); // Mark that the URL has been submitted
            } else {
                const botMessage = { text: "There was an error with the URL. Please try again.", sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
        } catch (error) {
            console.error('Error sending URL:', error);
            const botMessage = { text: "There was an error connecting to the server.", sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }

        // Clear the input field
        setWebsite('');
    };

    const sendMessage = async (e) => {
        e.preventDefault();
    
        // Add user message to the chat
        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
    
        // Call the chatbot API for questions only if URL is submitted
        if (urlSubmitted) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/query', {
                    question: input,
                });
    
                // Check if there's no error and if the answer exists
                if (!response.data.error && response.data.answer) {
                    const botMessage = { text: response.data.answer, sender: 'bot' };
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                } else {
                    const botMessage = { text: "Error: Unable to get a valid response.", sender: 'bot' };
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                }
            } catch (error) {
                console.error('Error sending message:', error);
                const botMessage = { text: "Error while getting a response from the bot.", sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
        } else {
            const botMessage = { text: "Please submit a URL first.", sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    
        // Clear the input field
        setInput('');
    };
    

    return (
        <div className="flex flex-col lg:flex-row max-w-16xl mx-auto my-10 border rounded-lg shadow-lg">
            {/* Left side: Chat history */}
            <div className="w-full lg:w-1/3 border-r border-gray-300 p-4 overflow-y-auto h-96">
                <h2 className="text-xl font-semibold mb-4">Chat History</h2>
                <div className="flex flex-col space-y-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
                            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right side: Chat window */}
            <div className="w-full lg:w-2/3 p-4">
                <h1 className="text-2xl font-bold mb-4">Chatbot</h1>
                <div className="mb-4">
                    <label htmlFor="modelSelect" className="block text-sm font-medium mb-1">Select Chatbot Model:</label>
                    <select
                        id="modelSelect"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    >
                        <option value="WebScraper">Website Scraper Chatbot</option>
                        <option value="LinkedIn">LinkedIn Profile Chatbot</option>
                    </select>
                </div>
                
                {/* URL Input */}
                {!urlSubmitted ? (
                    <form onSubmit={sendUrl} className="mb-4">
                        <input
                            type="text"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Please insert website URL..."
                            required
                            className="border border-gray-300 rounded-md p-2 flex-grow mr-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white rounded-md px-4">Submit URL</button>
                    </form>
                ) : (
                    <form onSubmit={sendMessage} className="flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a question..."
                            required
                            className="border border-gray-300 rounded-md p-2 flex-grow mr-2"
                        />
                        <button type="submit" className="bg-blue-500 text-white rounded-md px-4">Send</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
