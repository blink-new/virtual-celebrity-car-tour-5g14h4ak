import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Pages
import Home from './pages/Home'
import PhotoUpload from './pages/PhotoUpload'
import CelebritySelection from './pages/CelebritySelection'
import CarSelection from './pages/CarSelection'
import VirtualTour from './pages/VirtualTour'
import VideoGeneration from './pages/VideoGeneration'
import VideoShare from './pages/VideoShare'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<PhotoUpload />} />
            <Route path="/celebrities" element={<CelebritySelection />} />
            <Route path="/cars" element={<CarSelection />} />
            <Route path="/tour" element={<VirtualTour />} />
            <Route path="/video" element={<VideoGeneration />} />
            <Route path="/share" element={<VideoShare />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" richColors />
    </Router>
  )
}

export default App