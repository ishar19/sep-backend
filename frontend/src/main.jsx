import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import NewJob from './pages/newJob.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/newJob' element={<NewJob />} />
        <Route path='/editJob/:id' element={<NewJob />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
