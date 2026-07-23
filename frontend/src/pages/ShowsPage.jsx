import React, { useState, useEffect } from 'react'
import { useShowStore } from '../stores/useShowStore'
import { motion } from 'framer-motion'

const ShowsPage = () => {
  const { shows, loading, fetchShows } = useShowStore()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    fetchShows()
  }, [])

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatDay = (day) => {
    if (!day) return ''
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  const formatTime = (time) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const formatSchedule = (show) => {
    if (show.scheduleType === 'range' && show.dayRangeStart && show.dayRangeEnd) {
      return `${formatDay(show.dayRangeStart)} - ${formatDay(show.dayRangeEnd)}`
    }
    return formatDay(show.dayOfWeek) || ''
  }

  const isTimeInRange = (currentTimeStr, startTime, endTime) => {
    if (startTime <= endTime) {
      return currentTimeStr >= startTime && currentTimeStr <= endTime
    } else {
      return currentTimeStr >= startTime || currentTimeStr <= endTime
    }
  }

  // Check if a show is currently airing
  const isShowOnAir = (show) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const currentDay = days[currentTime.getDay()]
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()
    const currentTimeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`

    const showDay = show.dayOfWeek ? show.dayOfWeek.toLowerCase() : null

    if (show.scheduleType === 'single' || !show.scheduleType) {
      if (showDay === currentDay) {
        return isTimeInRange(currentTimeStr, show.startTime, show.endTime)
      }
    } else if (show.scheduleType === 'range') {
      const dayIndex = days.indexOf(currentDay)
      const startDayIndex = days.indexOf(show.dayRangeStart)
      const endDayIndex = days.indexOf(show.dayRangeEnd)

      let isInRange = false
      if (startDayIndex <= endDayIndex) {
        isInRange = dayIndex >= startDayIndex && dayIndex <= endDayIndex
      } else {
        isInRange = dayIndex >= startDayIndex || dayIndex <= endDayIndex
      }

      if (isInRange) {
        return isTimeInRange(currentTimeStr, show.startTime, show.endTime)
      }
    }
    return false
  }

  if (loading) {
    return (
      <div className='w-full bg-gray-100 min-h-screen py-12 mt-16 sm:mt-20 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <p className='text-gray-500 text-lg'>Loading shows...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-100 min-h-screen pt-16 sm:pt-20'>
      
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-red-900 to-red-800 text-white py-16 sm:py-20 overflow-hidden'>
        <div className='absolute inset-0 bg-black/40'></div>
        
        <motion.div 
          className='relative z-10 max-w-7xl mx-auto px-4 text-center'
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='inline-block p-4 bg-red-600/30 rounded-full mb-6'
          >
            <span className='text-4xl'>📻</span>
          </motion.div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'>
            Our Shows
          </h1>
          <p className='text-xl sm:text-2xl text-red-200 font-light max-w-2xl mx-auto'>
            Tune in to 99.9 FM for the best in community radio
          </p>
        </motion.div>
      </section>

      {/* Shows Grid */}
      <section className='max-w-7xl mx-auto px-4 py-12 sm:py-16'>
        {shows.length === 0 ? (
          <div className='text-center py-16 bg-white rounded-xl border border-gray-200'>
            <p className='text-gray-500 text-lg'>No shows available</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {shows.map((show, index) => {
              const onAir = isShowOnAir(show)
              
              return (
                <motion.div
                  key={show._id}
                  className={`bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                    onAir ? 'border-red-500 border-2 shadow-red-100' : 'border-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Image */}
                  <div className='w-full h-52 overflow-hidden bg-gray-100 relative'>
                    {onAir && (
                      <div className='absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse'>
                        🔴 LIVE
                      </div>
                    )}
                    {show.image ? (
                      <img
                        src={show.image}
                        alt={show.title}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className='p-5 flex-1 flex flex-col'>
                    <h3 className='text-lg sm:text-xl font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 line-clamp-1'>
                      {show.title}
                    </h3>
                    
                    <p className='text-sm text-gray-600 mt-1'>
                      Host: {show.host?.name || 'Unknown Presenter'}
                    </p>

                    <div className='mt-3'>
                      <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                        onAir 
                          ? 'bg-red-100 text-red-700 border border-red-200' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {formatSchedule(show)} • {formatTime(show.startTime)} - {formatTime(show.endTime)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className='text-gray-500 text-sm mt-3 line-clamp-2 flex-1'>
                      {show.description || 'No description available'}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Total shows count */}
        {shows.length > 0 && (
          <div className='text-center text-gray-500 text-sm mt-8'>
            {shows.length} {shows.length === 1 ? 'show' : 'shows'} available
          </div>
        )}
      </section>
    </div>
  )
}

export default ShowsPage