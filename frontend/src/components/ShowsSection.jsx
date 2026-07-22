import React, { useState, useEffect, useRef } from 'react'
import { useShowStore } from '../stores/useShowStore'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ShowsSection = () => {
  const { shows, loading, fetchShows } = useShowStore()
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4
  const [isAutoSliding, setIsAutoSliding] = useState(true)
  const autoSlideInterval = useRef(null)

  useEffect(() => {
    fetchShows()
  }, [])

  useEffect(() => {
    if (isAutoSliding && shows.length > itemsPerPage) {
      autoSlideInterval.current = setInterval(() => {
        setCurrentPage((prev) => {
          const totalPages = Math.ceil(shows.length / itemsPerPage)
          return (prev + 1) % totalPages
        })
      }, 5000)
    }

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current)
      }
    }
  }, [shows.length, isAutoSliding])

  const totalPages = Math.ceil(shows.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const currentShows = shows.slice(startIndex, startIndex + itemsPerPage)

  const goToNext = () => {
    setIsAutoSliding(false)
    setCurrentPage((prev) => (prev + 1) % totalPages)
    setTimeout(() => setIsAutoSliding(true), 5000)
  }

  const goToPrev = () => {
    setIsAutoSliding(false)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setTimeout(() => setIsAutoSliding(true), 5000)
  }

  const goToPage = (index) => {
    setIsAutoSliding(false)
    setCurrentPage(index)
    setTimeout(() => setIsAutoSliding(true), 5000)
  }

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

  if (loading) {
    return (
      <div className='w-full bg-red-900 py-12 sm:py-16'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <p className='text-gray-300 text-base sm:text-lg'>Loading shows...</p>
        </div>
      </div>
    )
  }

  if (shows.length === 0) {
    return null
  }

  return (
    <div className='w-full bg-red-900 py-12 sm:py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between mb-6 sm:mb-8'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>Our Shows</h2>
        </div>

        <div className='relative'>
          {shows.length > itemsPerPage && (
            <>
              <button
                onClick={goToPrev}
                className='absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5a3a3a] border border-red-700/30 shadow-md hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-200 flex items-center justify-center -ml-3 sm:-ml-6 text-white'
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className='absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5a3a3a] border border-red-700/30 shadow-md hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-200 flex items-center justify-center -mr-3 sm:-mr-6 text-white'
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {currentShows.map((show) => (
              <div
                key={show._id}
                className='bg-[#5a3a3a] rounded-xl border border-red-700/30 overflow-hidden shadow-sm hover:shadow-lg hover:border-red-500 transition-all duration-300 flex flex-col'
              >
                <div className='w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-[#3d2a2a]'>
                  {show.image ? (
                    <img src={show.image} alt={show.title} className='w-full h-full object-cover' />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-500 text-sm'>No Image</div>
                  )}
                </div>

                <div className='p-3 sm:p-5 flex-1 flex flex-col'>
                  <h3 className='text-base sm:text-lg md:text-xl font-bold text-white hover:text-red-400 transition-colors duration-200 line-clamp-1'>
                    {show.title}
                  </h3>
                  <p className='text-sm sm:text-base text-gray-300'>
                    {show.host?.name || 'Unknown Presenter'}
                  </p>
                  <div className='mt-2 sm:mt-3'>
                    <span className='inline-block bg-red-600/40 text-red-300 text-xs sm:text-sm font-medium px-3 py-1 rounded-full border border-red-500/40'>
                      {formatSchedule(show)} • {formatTime(show.startTime)} - {formatTime(show.endTime)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-2 mt-6 sm:mt-8'>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? 'bg-red-500 w-4 sm:w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowsSection