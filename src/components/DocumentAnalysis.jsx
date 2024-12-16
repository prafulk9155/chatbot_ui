import  { useState } from 'react';
import axios from 'axios';
import ChatBox from './ChatBox';

function DocumentAnalysis() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [documentData, setDocumentData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await axios.post('/api/analyze-document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDocumentData(response.data);
    } catch (error) {
      console.error('Error analyzing document:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Document Analysis</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
          className="mb-4"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading || !file}
        >
          {loading ? 'Analyzing...' : 'Analyze Document'}
        </button>
      </form>
      {loading && <p className="text-center">Analyzing document... Please wait.</p>}
      {documentData && <ChatBox context={documentData} />}
    </div>
  );
}

export default DocumentAnalysis;

