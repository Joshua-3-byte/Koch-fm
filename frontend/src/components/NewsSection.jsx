import React, { useState, useEffect } from 'react'
import { useNewsStore } from '../stores/useNewsStore'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const NewsSection = () => {
  const { news, loading, fetchNews, fetchBreakingNews } = useNewsStore()
  const [breakingNews, setBreakingNews] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [displayNews, setDisplayNews] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const categories = ['all', 'politics', 'sports', 'business', 'technology', 'world']

  useEffect(() => {
    fetchNews()
    loadBreakingNews()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setDisplayNews(news)
    } else {
      setDisplayNews(news.filter(item => item.tag === selectedCategory))
    }
    setCurrentPage(1)
  }, [news, selectedCategory])

  const loadBreakingNews = async () => {
    const data = await fetchBreakingNews()
    setBreakingNews(data)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const getFeaturedStory = () => {
    if (breakingNews.length > 0) {
      return breakingNews[0]
    }
    return displayNews.length > 0 ? displayNews[0] : null
  }

  const getGridNews = () => {
    const featured = getFeaturedStory()
    const featuredId = featured?._id
    const filtered = displayNews.filter(item => item._id !== featuredId)
    return filtered
  }

  const gridNews = getGridNews()
  const featuredStory = getFeaturedStory()

  const totalPages = Math.ceil(gridNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = gridNews.slice(startIndex, startIndex + itemsPerPage)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='w-full bg-gray-100 py-8 sm:py-12 mt-6 sm:mt-8 relative z-10 text-gray-900'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>Latest News</h2>
          <Link to='/news' className='text-red-600 hover:text-red-700 font-medium flex items-center gap-1 text-sm sm:text-base'>
            View All News <span className='text-lg sm:text-xl'>→</span>
          </Link>
        </div>

        {loading && (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-base sm:text-lg'>Loading news...</p>
          </div>
        )}

        {!loading && (
          <>
            <div className='flex flex-wrap gap-2 mb-6'>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {breakingNews.length > 0 && (
              <div className='bg-red-600 rounded-xl p-3 sm:p-4 mb-6 shadow-lg shadow-red-900/30'>
                <div className='flex items-center gap-3 overflow-hidden'>
                  <span className='bg-white text-red-600 text-xs font-bold px-2 py-1 sm:px-3 rounded-full animate-pulse whitespace-nowrap'>
                    🔴 BREAKING
                  </span>
                  <div className='flex-1 overflow-hidden'>
                    <div className='animate-marquee whitespace-nowrap'>
                      {breakingNews.map((newsItem, index) => (
                        <span key={newsItem._id} className='text-white text-sm sm:text-base font-medium mx-4'>
                          {newsItem.title}
                          {index < breakingNews.length - 1 && ' •'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {featuredStory && (
              <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-6'>
                <div className='flex flex-col md:flex-row'>
                  <div className='md:w-2/5 h-56 sm:h-64 md:h-auto overflow-hidden bg-gray-100'>
                    {featuredStory.image ? (
                      <img src={featuredStory.image} alt={featuredStory.title} className='w-full h-full object-cover' />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center text-gray-400'>No Image</div>
                    )}
                  </div>
                  <div className='md:w-3/5 p-4 sm:p-6 flex flex-col justify-center bg-white'>
                    {featuredStory.tag && (
                      <span className='text-xs sm:text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2 inline-block w-fit'>
                        {featuredStory.tag.charAt(0).toUpperCase() + featuredStory.tag.slice(1)}
                      </span>
                    )}
                    <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
                      {featuredStory.title}
                    </h3>
                    <div className='flex items-center gap-3 text-xs sm:text-sm text-gray-500 mb-3'>
                      <span>By {featuredStory.author || 'Unknown'}</span>
                      <span>•</span>
                      <span>{featuredStory.createdAt ? formatDate(featuredStory.createdAt) : 'Date not available'}</span>
                    </div>
                    <p className='text-gray-600 text-sm sm:text-base mb-4 line-clamp-3'>
                      {featuredStory.content}
                    </p>
                    <Link to={`/news/${featuredStory._id}`} className='text-red-600 hover:text-red-700 font-medium text-sm sm:text-base flex items-center gap-1 w-fit'>
                      Read More <span className='text-lg sm:text-xl'>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {currentItems.length > 0 ? (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
                  {currentItems.map((item) => (
                    <div key={item._id} className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col'>
                      <div className='h-40 sm:h-48 overflow-hidden bg-gray-100'>
                        {item.image ? (
                          <img src={item.image} alt={item.title} className='w-full h-full object-cover' />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>No Image</div>
                        )}
                      </div>
                      <div className='p-3 sm:p-4 flex-1 flex flex-col bg-white'>
                        {item.tag && (
                          <span className='text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full mb-2 inline-block w-fit'>
                            {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                          </span>
                        )}
                        <h4 className='text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 line-clamp-2'>
                          {item.title}
                        </h4>
                        <div className='flex items-center gap-2 text-xs text-gray-500 mb-2'>
                          <span>By {item.author || 'Unknown'}</span>
                          <span>•</span>
                          <span>{item.createdAt ? formatDate(item.createdAt) : '--'}</span>
                        </div>
                        <p className='text-gray-600 text-xs sm:text-sm line-clamp-2 flex-1'>
                          {item.content}
                        </p>
                        <Link to={`/news/${item._id}`} className='text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium mt-3 inline-flex items-center gap-1'>
                          Read More <span className='text-sm sm:text-base'>→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className='flex items-center justify-center gap-4 mt-6'>
                    <button onClick={goToPrevPage} disabled={currentPage === 1} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white shadow-sm transition-all duration-200 ${currentPage === 1 ? 'opacity-40 cursor-not-allowed text-gray-400' : 'hover:bg-red-50 hover:border-red-400 hover:text-red-600 hover:shadow-md'}`}>
                      <ChevronLeft size={16} />
                    </button>
                    <span className='text-sm text-gray-500 font-medium'>{currentPage} / {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-gray-300 bg-white shadow-sm transition-all duration-200 ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed text-gray-400' : 'hover:bg-red-50 hover:border-red-400 hover:text-red-600 hover:shadow-md'}`}>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className='text-center py-12 bg-gray-50 rounded-xl border border-gray-200'>
                <p className='text-gray-500 text-base sm:text-lg'>No news found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NewsSection