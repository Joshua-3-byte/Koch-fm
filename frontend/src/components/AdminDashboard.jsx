import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNewsStore } from '../stores/useNewsStore'
import { useShowStore } from '../stores/useShowStore'
import { usePresenterStore } from '../stores/usePresenterStore'
import { useBlogStore } from '../stores/useBlogStore'
import { useUserStore } from '../stores/useUserStore'

const timeAgo = (dateString) => {
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000)

  if (seconds < 60) return 'just now'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`

  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const AdminDashboard = () => {
  const { user } = useUserStore()
  const { news, loading: newsLoading, fetchNews } = useNewsStore()
  const { shows, loading: showsLoading, fetchShows } = useShowStore()
  const { presenters, loading: presentersLoading, fetchPresenters } = usePresenterStore()
  const { blogs, loading: blogsLoading, fetchBlogs } = useBlogStore()

  useEffect(() => {
    if (news.length === 0) fetchNews()
    if (shows.length === 0) fetchShows()
    if (presenters.length === 0) fetchPresenters()
    if (blogs.length === 0) fetchBlogs()
  }, [])

  const isLoading = newsLoading || showsLoading || presentersLoading || blogsLoading

  const stats = [
    { label: 'Stories', value: news.length },
    { label: 'Shows', value: shows.length },
    { label: 'Presenters', value: presenters.length },
    { label: 'Blogs', value: blogs.length }
  ]

  const recentActivity = useMemo(() => {
    const items = [
      ...news.map((n) => ({
        id: n._id,
        type: 'Story',
        title: n.title,
        createdAt: n.createdAt
      })),
      ...shows.map((s) => ({
        id: s._id,
        type: 'Show',
        title: s.title,
        createdAt: s.createdAt
      })),
      ...presenters.map((p) => ({
        id: p._id,
        type: 'Presenter',
        title: p.name,
        createdAt: p.createdAt
      })),
      ...blogs.map((b) => ({
        id: b._id,
        type: 'Blog',
        title: b.title,
        createdAt: b.createdAt
      }))
    ]

    return items
      .filter((item) => item.createdAt)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8)
  }, [news, shows, presenters, blogs])

  const showsWithoutHost = shows.filter((s) => !s.host).length
  const breakingCount = news.filter((n) => n.isBreaking).length

  const getTodayShows = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    return shows.filter(show => {
      if (show.scheduleType === 'single') {
        return show.dayOfWeek === today
      } else if (show.scheduleType === 'range') {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        const startIndex = days.indexOf(show.dayRangeStart)
        const endIndex = days.indexOf(show.dayRangeEnd)
        const todayIndex = days.indexOf(today)
        return todayIndex >= startIndex && todayIndex <= endIndex
      }
      return false
    }).slice(0, 5)
  }

  const todayShows = getTodayShows()

  return (
    <div className='space-y-8'>
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className='text-2xl font-semibold text-gray-900'>
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}
        </h2>
        <p className='text-base text-gray-500 mt-1'>
          Here is what is happening across KOCH FM right now.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className='bg-white border border-gray-200 rounded-lg p-6'
          >
            <p className='text-base text-gray-500'>{stat.label}</p>
            <p className='text-4xl font-bold text-gray-900 mt-1'>
              {isLoading ? '—' : stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Today's schedule */}
      <div className='bg-white border border-gray-200 rounded-lg'>
        <div className='px-6 py-5 border-b border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900'>Today's Schedule</h3>
        </div>
        <div className='divide-y divide-gray-100'>
          {isLoading && (
            <p className='px-6 py-6 text-base text-gray-500'>Loading schedule...</p>
          )}
          {!isLoading && todayShows.length === 0 && (
            <p className='px-6 py-6 text-base text-gray-500'>No shows scheduled for today.</p>
          )}
          {!isLoading && todayShows.map((show) => (
            <div key={show._id} className='px-6 py-4 flex items-center justify-between'>
              <div>
                <p className='text-base font-medium text-gray-900'>{show.title}</p>
                <p className='text-sm text-gray-500 mt-0.5'>
                  {show.host?.name || 'No host assigned'} • {show.startTime} - {show.endTime}
                </p>
              </div>
              <span className='text-sm text-gray-400'>
                {show.scheduleType === 'single' ? 'Weekly' : 'Weekday'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Recent activity */}
        <div className='lg:col-span-2 bg-white border border-gray-200 rounded-lg'>
          <div className='px-6 py-5 border-b border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-900'>Recent Activity</h3>
          </div>

          <div className='divide-y divide-gray-100'>
            {isLoading && (
              <p className='px-6 py-6 text-base text-gray-500'>Loading activity...</p>
            )}

            {!isLoading && recentActivity.length === 0 && (
              <p className='px-6 py-6 text-base text-gray-500'>No activity yet.</p>
            )}

            {!isLoading &&
              recentActivity.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className='px-6 py-4 flex items-center justify-between gap-4'
                >
                  <div className='min-w-0'>
                    <p className='text-base text-gray-900 truncate'>{item.title}</p>
                    <p className='text-sm text-gray-500 mt-0.5'>{item.type}</p>
                  </div>
                  <span className='text-sm text-gray-400 whitespace-nowrap'>
                    {timeAgo(item.createdAt)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Right column */}
        <div className='space-y-6'>
          {/* Content health */}
          <div className='bg-white border border-gray-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Content Health</h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-base text-gray-600'>Breaking news live</span>
                <span className='text-base font-medium text-gray-900'>{breakingCount}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-base text-gray-600'>Shows missing a host</span>
                <span
                  className={`text-base font-medium ${
                    showsWithoutHost > 0 ? 'text-red-600' : 'text-gray-900'
                  }`}
                >
                  {showsWithoutHost}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-base text-gray-600'>Total presenters</span>
                <span className='text-base font-medium text-gray-900'>{presenters.length}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-base text-gray-600'>Total content items</span>
                <span className='text-base font-medium text-gray-900'>
                  {news.length + shows.length + blogs.length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className='bg-white border border-gray-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Quick Stats</h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-base text-gray-600'>Latest story</span>
                <span className='text-base font-medium text-gray-900'>
                  {news.length > 0 ? timeAgo(news[0].createdAt) : '—'}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-base text-gray-600'>Latest blog</span>
                <span className='text-base font-medium text-gray-900'>
                  {blogs.length > 0 ? timeAgo(blogs[0].createdAt) : '—'}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-base text-gray-600'>Active shows</span>
                <span className='text-base font-medium text-gray-900'>
                  {shows.filter(s => s.scheduleType).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard