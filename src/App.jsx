import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
