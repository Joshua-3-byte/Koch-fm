import React, { useState, useEffect } from 'react'
import { useBlogStore } from '../stores/useBlogStore'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const BlogsPage = () => {
  const { blogs, loading, fetchBlogs } = useBlogStore()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className='w-full bg-gray-100 min-h-screen py-12 pt-20 sm:pt-24 relative z-10'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <p className='text-gray-500 text-lg'>Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-100 min-h-screen pt-16 sm:pt-20'>
      
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-red-900 to-red-800 text-white min-h-[40vh] flex items-center justify-center overflow-hidden'>
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
            
          </motion.div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'>
            Our Blogs
          </h1>
          <p className='text-xl sm:text-2xl text-red-200 font-light max-w-2xl mx-auto'>
            Stories, insights, and updates from the community
          </p>
        </motion.div>
      </section>

      {/* Blogs Grid */}
      <section className='max-w-7xl mx-auto px-4 py-12 sm:py-16'>
        {blogs.length === 0 ? (
          <div className='text-center py-16 bg-white rounded-xl border border-gray-200'>
            <p className='text-gray-500 text-lg'>No blogs available</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className='w-full h-52 overflow-hidden bg-gray-100'>
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
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
                  <h3 className='text-lg sm:text-xl font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 line-clamp-2'>
                    {blog.title}
                  </h3>
                  
                  <p className='text-sm text-gray-600 mt-2'>
                    By {blog.author}
                  </p>
                  
                  <p className='text-xs text-gray-400 mt-1'>
                    {formatDate(blog.createdAt)}
                  </p>

                  <p className='text-gray-500 text-sm mt-3 line-clamp-3 flex-1'>
                    {blog.content}
                  </p>

                  <Link
                    to={`/blogs/${blog._id}`}
                    className='text-red-600 hover:text-red-700 text-sm font-medium mt-4 inline-flex items-center gap-1'
                  >
                    Read More <span className='text-base'>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Total blogs count */}
        {blogs.length > 0 && (
          <div className='text-center text-gray-500 text-sm mt-8'>
            {blogs.length} {blogs.length === 1 ? 'blog' : 'blogs'} available
          </div>
        )}
      </section>
    </div>
  )
}

export default BlogsPage