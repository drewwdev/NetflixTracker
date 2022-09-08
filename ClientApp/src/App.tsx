import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateNewMedia from './components/CreateNewMedia'
import MediaList from './components/MediaList'

export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center h-screen bg-slate-50">
        <h1>Netflix Tracker</h1>
        <Routes>
          <Route path="/" element={<MediaList />} />
          <Route path="/CreateNewMedia" element={<CreateNewMedia />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
