import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNewsStore } from '../stores/useNewsStore'
import { useShowStore } from '../stores/useShowStore'
import { usePresenterStore } from '../stores/usePresenterStore'
import { useBlogStore } from '../stores/useBlogStore'
import { 
  FiBook, 
  FiRadio, 
  FiUsers, 
  FiFileText,
  FiCalendar,
  FiClock,
  FiArrowUpRight,
  FiArrowDownRight,
  FiEye,
  FiPlus,
  FiTrendingUp
} from 'react-icons/fi'

const AdminDashboard = () => {
  const { news, fetchNews, loading: newsLoading } = useNewsStore()
  const { shows, fetchShows, loading: showsLoading } = useShowStore()
  const { presenters, fetchPresenters, loading: presentersLoading } = usePresenterStore()
  const { blogs, fetchBlogs, loading: blogsLoading } = useBlogStore()

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    fetchNews()
    fetchShows()
    fetchPresenters()
    fetchBlogs()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const getTodayShows = () => {
    const today = currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
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
    }).slice(0, 4)
  }

  const todayShows = getTodayShows()

  const stats = [
    {
      id: 1,
      title: 'Total Stories',
      value: news.length,
      icon: FiBook,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12',
      changeType: 'up'
    },
    {
      id: 2,
      title: 'Active Shows',
      value: shows.length,
      icon: FiRadio,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '+3',
      changeType: 'up'
    },
    {
      id: 3,
      title: 'Presenters',
      value: presenters.length,
      icon: FiUsers,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+5',
      changeType: 'up'
    },
    {
      id: 4,
      title: 'Blog Posts',
      value: blogs.length,
      icon: FiFileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+8',
      changeType: 'up'
    }
  ]

  const getStatusColor = (status) => {
    const statusMap = {
      'Published': 'bg-emerald-100 text-emerald-700',
      'Draft': 'bg-amber-100 text-amber-700',
      'Pending': 'bg-orange-100 text-orange-700'
    }
    return statusMap[status] || 'bg-gray-100 text-gray-700'
  }

  const getTimeAgo = (date) => {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now - past
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return past.toLocaleDateString()
  }

  const loading = newsLoading || showsLoading || presentersLoading || blogsLoading

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'up' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {stat.change}%
                    </span>
                    {stat.changeType === 'up' ? (
                      <FiArrowUpRight className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <FiArrowDownRight className="w-3 h-3 text-rose-600" />
                    )}
                    <span className="text-xs text-gray-400">this month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Add New Story', action: 'stories' },
          { label: 'Create Show', action: 'shows' },
          { label: 'Add Presenter', action: 'presenters' },
          { label: 'Write Blog', action: 'blogs' }
        ].map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.08 }}
            className="group bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiPlus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            <span className="text-sm">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Stories */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase flex items-center gap-2">
                <FiBook className="w-4 h-4 text-red-600" />
                Recent Stories
              </h3>
              <button className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors flex items-center gap-1">
                View All
                <FiArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {news.slice(0, 4).map((story) => (
              <div key={story._id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {story.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {getTimeAgo(story.createdAt)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor('Published')}`}>
                        Published
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-gray-600 transition-colors flex-shrink-0">
                    <FiEye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {news.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-400">No stories yet. Create your first story!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-red-600" />
                Today's Schedule
              </h3>
              <button className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors flex items-center gap-1">
                Full Schedule
                <FiArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {todayShows.length > 0 ? (
              todayShows.map((show) => (
                <div key={show._id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <FiRadio className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {show.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400 truncate">
                          with {show.host?.name || 'Unknown Host'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-red-600">
                        {show.startTime}
                      </p>
                      <p className="text-xs text-gray-400">- {show.endTime}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-400">No shows scheduled for today</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-5 text-white"
        >
          <p className="text-xs font-medium uppercase tracking-wider opacity-80">Total Views This Week</p>
          <p className="text-3xl font-bold tracking-tight mt-1">12,847</p>
          <div className="flex items-center gap-1.5 mt-2">
            <FiTrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium opacity-90">23% from last week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white"
        >
          <p className="text-xs font-medium uppercase tracking-wider opacity-80">New Stories This Month</p>
          <p className="text-3xl font-bold tracking-tight mt-1">
            {news.filter(story => {
              const now = new Date()
              const created = new Date(story.createdAt)
              return created.getMonth() === now.getMonth() && 
                     created.getFullYear() === now.getFullYear()
            }).length}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <FiTrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium opacity-90">Active this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-5 text-white"
        >
          <p className="text-xs font-medium uppercase tracking-wider opacity-80">Total Engagement</p>
          <p className="text-3xl font-bold tracking-tight mt-1">3,921</p>
          <div className="flex items-center gap-1.5 mt-2">
            <FiTrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium opacity-90">18% from last month</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard