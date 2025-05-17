import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Pages
import Home from '@/pages/Home'
import PhotoUpload from '@/pages/PhotoUpload'
import CelebritySelection from '@/pages/CelebritySelection'
import CarSelection from '@/pages/CarSelection'
import VirtualTour from '@/pages/VirtualTour'
import VideoGeneration from '@/pages/VideoGeneration'
import VideoShare from '@/pages/VideoShare'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<PhotoUpload />} />
            <Route path="/celebrities" element={<CelebritySelection />} />
            <Route path="/cars" element={<CarSelection />} />
            <Route path="/tour" element={<VirtualTour />} />
            <Route path="/video" element={<VideoGeneration />} />
            <Route path="/share" element={<VideoShare />} />
            
            {/* Placeholder routes that will be implemented later */}
            <Route path="/how-it-works" element={<Home />} />
            <Route path="/gallery" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/terms" element={<Home />} />
            <Route path="/privacy" element={<Home />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
