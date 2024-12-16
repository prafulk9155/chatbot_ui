import  { useState } from 'react';
import api from '../services/axiosInstance';// Adjust the path based on location
import ChatBox from './ChatBox';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDataFound, setIsDataFound] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/image-generator/match-image/', { prompt });
      setResponseData(response.data);

      setIsDataFound(true);
    } catch (error) {
      console.error('Error fetching website data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Image Generator </h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt for image generation"
          className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Fetching details...' : 'Fetch Image'}
        </button>
      </form>
      {loading && <p className="text-center">Loading... Please wait.</p>}
      { isDataFound &&
        <div className='grid grid-cols-2 gap-4'>
            <div>
<img  className='w-70' src={responseData?.chosen_image} alt="Generated Image1"  size='100'/></div>
<div>
<img className='w-70' src={responseData?.rejected_image} alt="Generated Image2"  size='100' /></div>
</div>

      }
    </div>
  );
}

export default ImageGenerator;

