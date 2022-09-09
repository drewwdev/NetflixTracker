import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CreateNewMedia from './pages/CreateNewMedia/CreateNewMedia'
import GetMediaList from './pages/GetMediaList/GetMediaList'
import GetSingleMedia from './pages/GetSingleMedia/GetSingleMedia'
import UpdateSingleMedia from './pages/UpdateSingleMedia/UpdateSingleMedia'

export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center h-screen bg-slate-50">
        <Link to="/">
          <h1>Netflix Tracker</h1>
        </Link>
        <Routes>
          <Route path="/" element={<GetMediaList />} />
          <Route path="/Media/create" element={<CreateNewMedia />} />
          <Route path="/Media/:id" element={<GetSingleMedia />} />
          <Route path="/Media/update/:id" element={<UpdateSingleMedia />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
