import  { useState } from 'react';
import api from '../services/axiosInstance';// Adjust the path based on location
import ChatBox from './ChatBox';

function WebsiteAnalysis() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [websiteData, setWebsiteData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/web-scrapper/scrape/', { url });
      setWebsiteData(response.data);
    } catch (error) {
      console.error('Error fetching website data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Website Analysis</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Fetching details...' : 'Fetch Data'}
        </button>
      </form>
      {loading && <p className="text-center">Loading... Please wait.</p>}
      {websiteData && <ChatBox context={websiteData} />}
    </div>
  );
}

export default WebsiteAnalysis;

