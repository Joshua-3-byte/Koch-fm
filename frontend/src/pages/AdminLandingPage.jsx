import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdminDashboard from '../components/AdminDashboard'
import AdminStories from '../components/AdminStories'
import AdminShows from '../components/AdminShows'
import AdminPresenters from '../components/AdminPresenters'

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'stories', label: 'Stories' },
  { id: 'shows', label: 'Shows' },
  { id: 'presenters', label: 'Presenters' }
]

export const AdminLandingPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className='min-h-screen bg-white text-gray-900 relative overflow-hidden'>
      <div className='relative z-10 container mx-auto px-4 py-10'>
        {/* Header and Tabs on the same line */}
        <div className='flex items-center justify-between mb-8 flex-wrap gap-4'>
          <motion.h1
            className='text-3xl font-bold text-red-600 whitespace-nowrap'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            KOCH FM Admin
          </motion.h1>

          <div className='flex gap-2 flex-wrap items-center'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
            
            {/* Logout Button */}
            <button
              className='px-6 py-2 rounded-lg transition-colors duration-200 text-sm font-medium bg-red-600 text-white hover:bg-red-700'
              onClick={() => console.log('Logout clicked')}
            >
              Logout
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'stories' && <AdminStories />}
        {activeTab === 'shows' && <AdminShows />}
        {activeTab === 'presenters' && <AdminPresenters />}
      </div>
    </div>
  )
}