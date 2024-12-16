import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import WebsiteAnalysis from './components/WebsiteAnalysis';
import DocumentAnalysis from './components/DocumentAnalysis';
import GeneralAIChat from './components/GeneralAIChat';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isLoggedIn && <Header />}
        <Routes>
          {/* Redirect from '/' */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/landing" replace />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          {/* Protected routes */}
          <Route
            path="/landing"
            element={isLoggedIn ? <LandingPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/website"
            element={isLoggedIn ? <WebsiteAnalysis /> : <Navigate to="/" replace />}
          />
          <Route
            path="/document"
            element={isLoggedIn ? <DocumentAnalysis /> : <Navigate to="/" replace />}
          />
          <Route
            path="/ai-chat"
            element={isLoggedIn ? <GeneralAIChat /> : <Navigate to="/" replace />}
          />
          <Route
            path="/image-generator"
            element={isLoggedIn ? <ImageGenerator /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
