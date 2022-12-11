import { Login } from '@/presentation/pages/login/login'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}
