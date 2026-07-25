import React, { useState, useEffect } from 'react'
import { useBlogStore } from '../stores/useBlogStore'
import toast from 'react-hot-toast'
import { Pencil, Trash2, Plus } from 'lucide-react'

const AdminBlogs = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const { blogs, loading, fetchBlogs, createBlog, updateBlog, deleteBlog } = useBlogStore()

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    author: '',
    content: ''
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      author: '',
      content: ''
    })
    setEditingBlog(null)
    setShowCreateForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content || !formData.author || !formData.image) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      if (editingBlog) {
        await updateBlog(editingBlog, formData)
      } else {
        await createBlog(formData)
      }
      resetForm()
    } catch (error) {
      // Error is handled in the store
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog._id)
    setFormData({
      title: blog.title,
      image: blog.image || '',
      author: blog.author || '',
      content: blog.content || ''
    })
    setShowCreateForm(true)
  }

  const handleDelete = (id, title) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-900 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-base font-medium text-white">Delete Blog</p>
              <p className="mt-1 text-sm text-gray-400">Are you sure you want to delete "{title}"? This action cannot be undone.</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-700">
          <button
            onClick={() => {
              toast.dismiss(t.id)
              deleteBlog(id)
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 focus:outline-none transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-300 hover:bg-gray-800 focus:outline-none transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 5000 })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>📝 All Blogs</h2>
        <button
          onClick={() => {
            resetForm()
            setShowCreateForm(true)
          }}
          className='w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 rounded-lg text-sm sm:text-base font-medium text-white transition-colors duration-200 flex items-center justify-center gap-2'
        >
          <Plus size={18} /> Create Blog
        </button>
      </div>

      <hr className='border-gray-300' />

      {/* Create/Edit Form */}
      {showCreateForm && (
        <form onSubmit={handleSubmit} className='bg-gray-100 rounded-xl p-4 sm:p-6 border border-gray-300'>
          <h3 className='text-lg sm:text-xl font-semibold text-red-600 mb-4'>
            {editingBlog ? 'Edit Blog' : 'Create New Blog'}
          </h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>Title *</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Enter blog title...'
                className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500'
              />
            </div>

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Author *</label>
              <input
                type='text'
                name='author'
                value={formData.author}
                onChange={handleInputChange}
                placeholder='Enter author name...'
                className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500'
              />
            </div>

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Content *</label>
              <textarea
                name='content'
                value={formData.content}
                onChange={handleInputChange}
                rows='8'
                placeholder='Write your blog content...'
                className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none'
              />
            </div>

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Image</label>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700'
              />
              {formData.image && (
                <p className='text-sm text-gray-500 mt-1'>Image uploaded</p>
              )}
            </div>

            <div className='flex flex-col sm:flex-row gap-3 pt-2'>
              <button
                type='submit'
                disabled={loading}
                className='px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors duration-200 disabled:opacity-50'
              >
                {loading ? 'Saving...' : (editingBlog ? 'Update Blog' : 'Publish Blog')}
              </button>
              <button
                type='button'
                onClick={resetForm}
                className='px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200'
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Blogs Grid */}
      {loading && blogs.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-base sm:text-lg'>Loading blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className='text-center py-16 bg-gray-100 rounded-xl border border-gray-200'>
          <div className='text-6xl mb-4'>📝</div>
          <p className='text-gray-500 text-base sm:text-lg'>No blogs created</p>
          <p className='text-gray-400 text-sm mt-1'>Click "Create Blog" to add your first blog</p>
          <button
            onClick={() => {
              resetForm()
              setShowCreateForm(true)
            }}
            className='mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors duration-200'
          >
            + Create Blog
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4'>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className='bg-gray-200 rounded-xl border border-gray-300 p-4 hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row gap-4'
            >
              {/* Image */}
              <div className='w-full md:w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-300'>
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-500 text-sm'>
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h3 className='text-lg font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 line-clamp-1'>
                      {blog.title}
                    </h3>
                    <p className='text-sm text-gray-700'>
                      By {blog.author} • {formatDate(blog.createdAt)}
                    </p>
                  </div>
                  <div className='flex gap-2 flex-shrink-0 ml-2'>
                    <button
                      onClick={() => handleEdit(blog)}
                      className='w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-200 flex items-center justify-center'
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id, blog.title)}
                      className='w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors duration-200 flex items-center justify-center'
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className='text-gray-700 text-sm mt-2 line-clamp-2'>
                  {blog.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminBlogs