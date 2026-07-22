import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNewsStore } from '../stores/useNewsStore'

const SingleNewsPage = () => {
  const { id } = useParams()
  const { fetchSingleNews, fetchNews, news } = useNewsStore()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStory = async () => {
      setLoading(true)
      const data = await fetchSingleNews(id)
      setStory(data)
      setLoading(false)
    }
    loadStory()
    fetchNews()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  // Get other stories (exclude current)
  const otherStories = news.filter(item => item._id !== id).slice(0, 4)

  if (loading) {
    return (
      <div className='w-full bg-gray-100 min-h-screen py-12 mt-8 relative z-10 text-gray-900'>
        <div className='max-w-7xl mx-auto px-4 text-center py-12'>
          <p className='text-gray-500 text-lg'>Loading story...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className='w-full bg-gray-100 min-h-screen py-12 mt-8 relative z-10 text-gray-900'>
        <div className='max-w-7xl mx-auto px-4 text-center py-12'>
          <p className='text-gray-500 text-lg'>Story not found</p>
          <Link to='/' className='text-red-600 hover:text-red-700 mt-4 inline-block'>
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-100 min-h-screen py-12 mt-8 relative z-10 text-gray-900'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Back Button */}
        <Link to='/news' className='text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1 mb-6'>
          ← Back to News
        </Link>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Main Content - Left */}
          <div className='lg:w-3/4'>
            <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-8 md:p-10'>
              {/* Title */}
              <h1 className='text-4xl md:text-5xl font-bold text-black mb-8 text-center leading-tight'>
                {story.title}
              </h1>

              {/* Image */}
              <div className='w-full rounded-lg overflow-hidden bg-gray-100 mb-8'>
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.title}
                    className='w-full h-auto max-h-[600px] object-contain'
                  />
                ) : (
                  <div className='w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400'>
                    No Image
                  </div>
                )}
              </div>

              {/* Author, Date, Tag */}
              <div className='flex flex-wrap items-center justify-center gap-4 text-base text-gray-600 mb-8'>
                <span className='font-medium text-gray-800'>By {story.author || 'Unknown'}</span>
                <span className='text-gray-400'>•</span>
                <span>{story.createdAt ? formatDate(story.createdAt) : 'Date not available'}</span>
                {story.tag && (
                  <>
                    <span className='text-gray-400'>•</span>
                    <span className='text-sm font-medium text-red-600 bg-red-50 px-4 py-1 rounded-full'>
                      {story.tag.charAt(0).toUpperCase() + story.tag.slice(1)}
                    </span>
                  </>
                )}
              </div>

              {/* Content - Playfair Display Font */}
              <div className='prose prose-xl max-w-none text-black leading-relaxed font-playfair'>
                {story.content.split('\n').map((paragraph, index) => (
                  <p key={index} className='mb-5 text-lg text-black'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Right */}
          <div className='lg:w-1/4'>
            <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-5'>
              <h3 className='text-xl underline font-bold text-gray-900 mb-4'> Also Read</h3>
              
              {otherStories.length === 0 ? (
                <p className='text-gray-500 text-sm'>No other stories available</p>
              ) : (
                <div className='space-y-4'>
                  {otherStories.map((item) => (
                    <Link
                      key={item._id}
                      to={`/news/${item._id}`}
                      className='block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300'
                    >
                      {/* Image */}
                      <div className='w-full h-28 overflow-hidden bg-gray-100'>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm'>
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className='p-3'>
                        {item.tag && (
                          <span className='text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full inline-block mb-1'>
                            {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                          </span>
                        )}
                        <h4 className='text-sm font-bold text-gray-900 line-clamp-2'>
                          {item.title}
                        </h4>
                        <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
                          <span>By {item.author || 'Unknown'}</span>
                          <span>•</span>
                          <span>{item.createdAt ? formatDate(item.createdAt) : '--'}</span>
                        </div>
                        <span className='text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center gap-1 mt-2'>
                          Read More →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div> 

        {/* Bottom Back Button */}
        <div className='mt-8 text-center'>
          <Link to='/news' className='text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1'>
            ← Back to News
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleNewsPage