import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useUserStore } from './stores/useUserStore'
import { AdminLandingPage } from './pages/AdminLandingPage'
import LoadingSpinner from './components/LandingSpinner'
import AllNewsPage from './pages/AllNewsPage'
import SingleNewsPage from './pages/SingleNewsPage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ShowsPage from './pages/ShowsPage'
import ContactPage from './pages/ContactPage'  // ✅ ADD THIS

const AppContent = () => {
  const { user, checkAuth, checkingAuth } = useUserStore()
  const location = useLocation()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const isAdminRoute =
    location.pathname === '/adminLandingPage' ||
    location.pathname.startsWith('/admin')

  if (checkingAuth) return <LoadingSpinner />

  return (
    <div
      className={`min-h-screen relative overflow-hidden flex flex-col ${
        isAdminRoute ? 'bg-white text-gray-900' : 'bg-red-900 text-white'
      }`}
    >
      {!isAdminRoute && (
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
          </div>
        </div>
      )}

      <div
        className={`relative z-50 flex flex-col min-h-screen ${
          !isAdminRoute ? 'pt-20' : ''
        }`}
      >
        {!isAdminRoute && <Navbar />}

        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
            <Route path='/shows' element={<ShowsPage />} />
            <Route path='/contact' element={<ContactPage />} />  {/* ✅ ADD THIS */}
            <Route path='/news' element={<AllNewsPage />} />
            <Route path='/news/:id' element={<SingleNewsPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route
              path='/login'
              element={
                user ? <Navigate to='/adminLandingPage' /> : <LoginPage />
              }
            />
            <Route
              path='/adminLandingPage'
              element={
                user ? <AdminLandingPage /> : <Navigate to='/login' />
              }
            />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>

      <Toaster />
    </div>
  ) 
}

function App() {
  return <AppContent />
}

export default App