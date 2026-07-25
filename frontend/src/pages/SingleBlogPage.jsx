import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBlogStore } from '../stores/useBlogStore'

const SingleBlogPage = () => {
  const { id } = useParams()
  const { fetchSingleBlog, fetchBlogs, blogs } = useBlogStore()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true)
      const data = await fetchSingleBlog(id)
      setBlog(data)
      setLoading(false)
    }
    loadBlog()
    fetchBlogs()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const otherBlogs = blogs.filter(item => item._id !== id).slice(0, 4)

  if (loading) {
    return (
      <div className='w-full bg-gray-100 min-h-screen py-12 pt-20 sm:pt-24 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <p className='text-gray-500 text-lg'>Loading blog...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className='w-full bg-gray-100 min-h-screen py-12 pt-20 sm:pt-24 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <p className='text-gray-500 text-lg'>Blog not found</p>
          <Link to='/' className='text-red-600 hover:text-red-700 mt-4 inline-block'>
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-100 min-h-screen pt-16 sm:pt-20'>
      <div className='max-w-7xl mx-auto px-4 py-8 sm:py-12'>
        {/* Back Button */}
        <Link to='/blogs' className='text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1 mb-6 text-sm sm:text-base'>
          ← Back to Blogs
        </Link>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Main Content */}
          <div className='lg:w-3/4'>
            <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6 md:p-8 lg:p-10'>
              {/* Title */}
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 leading-tight'>
                {blog.title}
              </h1>

              {/* Author & Date */}
              <div className='flex items-center gap-3 text-sm text-gray-600 mb-6'>
                <span className='font-medium text-gray-800'>By {blog.author}</span>
                <span className='text-gray-400'>•</span>
                <span>{formatDate(blog.createdAt)}</span>
              </div>

              {/* Image */}
              <div className='w-full rounded-lg overflow-hidden bg-gray-100 mb-6'>
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className='w-full h-auto max-h-[500px] object-contain'
                  />
                ) : (
                  <div className='w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400'>
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed'>
                {blog.content.split('\n').map((paragraph, index) => (
                  <p key={index} className='mb-4 text-base sm:text-lg'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Other Blogs */}
          <div className='lg:w-1/4'>
            <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-5'>
              <h3 className='text-lg font-bold text-gray-900 mb-4'>📰 Also Read</h3>
              
              {otherBlogs.length === 0 ? (
                <p className='text-gray-500 text-sm'>No other blogs available</p>
              ) : (
                <div className='space-y-4'>
                  {otherBlogs.map((item) => (
                    <Link
                      key={item._id}
                      to={`/blogs/${item._id}`}
                      className='block bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300'
                    >
                      <div className='w-full h-24 overflow-hidden bg-gray-100'>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>
                            No Image
                          </div>
                        )}
                      </div>
                      <div className='p-3'>
                        <h4 className='text-sm font-bold text-gray-900 line-clamp-2'>
                          {item.title}
                        </h4>
                        <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
                          <span>By {item.author}</span>
                          <span>•</span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                        <span className='text-red-600 hover:text-red-700 text-xs font-medium inline-flex items-center gap-1 mt-2'>
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
          <Link to='/blogs' className='text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1'>
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SingleBlogPage