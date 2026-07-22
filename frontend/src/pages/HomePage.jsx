import React, { useState, useEffect } from 'react'
import { PhoneIcon, PlayIcon, PauseIcon } from 'lucide-react'
import { RadioPlayer } from '../components/RadioPlayer'
import VolumeControl from '../components/VolumeControl'
import SocialIcons from '../components/SocialIcons'
import NewsSection from '../components/NewsSection'
import ShowsSection from '../components/ShowsSection'
import { RADIO_STREAM_URL, STATION_INFO } from '../lib/constants'
import { useShowStore } from '../stores/useShowStore'
import logo from '../assets/logo.png'

const HomePage = () => {
  const {
    audioElement,
    isPlaying, 
    volume,
    togglePlay,
    handleVolumeChange
  } = RadioPlayer(RADIO_STREAM_URL)

  const { shows, fetchShows } = useShowStore()
  const [currentShow, setCurrentShow] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    fetchShows()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const isTimeInRange = (currentTimeStr, startTime, endTime) => {
    if (startTime <= endTime) {
      return currentTimeStr >= startTime && currentTimeStr <= endTime
    } else {
      return currentTimeStr >= startTime || currentTimeStr <= endTime
    }
  }

  useEffect(() => {
    if (shows.length === 0) return

    const now = currentTime
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const currentDay = days[now.getDay()]
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`

    let foundShow = null

    for (const show of shows) {
      let isOnAir = false

      if (show.scheduleType === 'single' || !show.scheduleType) {
        const showDay = show.dayOfWeek ? show.dayOfWeek.toLowerCase() : null
        if (showDay === currentDay) {
          if (isTimeInRange(currentTimeStr, show.startTime, show.endTime)) {
            isOnAir = true
          }
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
          if (isTimeInRange(currentTimeStr, show.startTime, show.endTime)) {
            isOnAir = true
          }
        }
      }

      if (isOnAir) {
        foundShow = show
        break
      }
    }

    setCurrentShow(foundShow)
  }, [shows, currentTime])

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
    if (!show) return ''
    if (show.scheduleType === 'range' && show.dayRangeStart && show.dayRangeEnd) {
      return `${formatDay(show.dayRangeStart)} - ${formatDay(show.dayRangeEnd)}`
    }
    return formatDay(show.dayOfWeek) || ''
  }

  return (
    <div className='w-full'>
      {audioElement}
      
      <div className='max-w-7xl mx-auto px-4 pt-20 sm:pt-21 pb-6 mb-8 sm:mb-12 text-white'>
        <div className='rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-[#3d2a2a] to-[#2a1a1a] backdrop-blur-sm relative transition-all duration-300 hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]'>
          
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none'></div>
          
          <div className='flex flex-col lg:flex-row gap-6 relative'>
            {/* LEFT SIDE */}
            <div className='w-full lg:w-1/2'>
              <div className='mb-4 sm:mb-6 relative flex justify-center'>
                <div className='bg-gradient-to-r from-red-600/60 to-red-700/40 rounded-xl py-2 sm:py-3 px-6 sm:px-8 text-center cursor-pointer hover:from-red-600/70 hover:to-red-700/50 transition-all duration-300 hover:scale-105 shadow-[0_0_30px_-10px_rgba(220,38,38,0.3)]'>
                  <h2 className='text-xl sm:text-2xl font-bold text-white'>Listen Live</h2>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row items-start gap-4 mb-6 relative'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 mx-auto sm:mx-0'>
                  <img src={logo} alt='Koch FM Logo' className='w-full h-full object-cover' />
                </div>

                <div className='flex-1 text-center sm:text-left'>
                  <p className='text-red-500 font-semibold text-base sm:text-lg flex items-center justify-center sm:justify-start gap-3'>
                    <span className={`w-3 h-3 rounded-full animate-pulse inline-block ${isPlaying ? 'bg-red-500' : 'bg-red-500/30'}`}></span>
                    On Air
                    <span className='text-gray-400 text-sm font-normal ml-1'>{STATION_INFO.frequency}</span>
                  </p>
                  <p className='text-gray-300 text-sm font-medium'>{STATION_INFO.tagline}</p>
                </div>
              </div>

              {/* Current Show Display */}
              <div className='bg-gradient-to-br from-[#5a3a3a]/30 to-[#3d2a2a]/30 rounded-xl p-3 sm:p-4 mb-6 relative transition-all duration-300'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4'>
                  <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#3d2a2a] flex-shrink-0'>
                    {currentShow && currentShow.image ? (
                      <img src={currentShow.image} alt={currentShow.title} className='w-full h-full object-cover' />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <img src={logo} alt='Koch FM Logo' className='w-full h-full object-cover p-4' />
                      </div>
                    )}
                  </div>

                  <div className='flex-1 text-center sm:text-left'>
                    {currentShow ? (
                      <>
                        <p className='text-white text-lg sm:text-xl font-bold hover:text-red-400 transition-colors duration-300'>
                          {currentShow.title}
                        </p>
                        <p className='text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-2'>
                          <span className='w-1.5 h-1.5 bg-red-400 rounded-full inline-block'></span>
                          {currentShow.host?.name || 'Unknown Presenter'}
                        </p>
                        <div className='mt-2 flex justify-center sm:justify-start'>
                          <span className='inline-block bg-red-600/40 text-red-300 text-xs font-medium px-3 py-1 rounded-full border border-red-500/40'>
                            {formatSchedule(currentShow)} • {formatTime(currentShow.startTime)} - {formatTime(currentShow.endTime)}
                          </span>
                        </div>
                        <p className='text-green-400 text-xs font-medium mt-1 animate-pulse'>
                          🔴 Currently Airing
                        </p>
                      </>
                    ) : (
                      <>
                        <p className='text-white text-lg sm:text-xl font-bold'>🎵 Playing Music</p>
                        <p className='text-gray-400 text-sm'>Non-stop hits from the community</p>
                        <p className='text-gray-500 text-xs mt-1'>Stay tuned for upcoming shows</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-center sm:justify-start gap-4 relative'>
                <button 
                  onClick={togglePlay}
                  className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 flex items-center justify-center transition-all duration-300 shadow-[0_0_35px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_-10px_rgba(0,0,0,0.9)] hover:scale-105 active:scale-95 cursor-pointer'
                >
                  {isPlaying ? (
                    <PauseIcon className='text-white' size={24} />
                  ) : (
                    <PlayIcon className='text-white ml-1' size={24} />
                  )}
                </button>

                <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className='w-full lg:w-1/2'>
              <div className='h-full flex flex-col justify-center text-center lg:text-left'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-4 tracking-tight'>
                  {STATION_INFO.name}
                </h1>

                <p className='text-gray-300 text-sm sm:text-base mb-6 leading-relaxed'>
                  {STATION_INFO.description}
                </p>
                
                <div className='flex justify-center lg:justify-start'>
                  <SocialIcons />
                </div>
                
                <div className='flex items-center justify-center lg:justify-start gap-3 mt-6'>
                  <PhoneIcon className='text-red-400' size={20} />
                  <span className='text-white text-base sm:text-lg font-medium'>{STATION_INFO.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShowsSection />
      <NewsSection />
    </div>
  )
}

export default HomePage