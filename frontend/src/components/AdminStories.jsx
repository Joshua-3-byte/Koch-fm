import React, { useState, useEffect } from 'react'
import { useNewsStore } from '../stores/useNewsStore'
import toast from 'react-hot-toast'
import { Pencil, Trash2 } from 'lucide-react'

const AdminStories = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingStory, setEditingStory] = useState(null)
  const { news, loading, createNews, fetchNews, deleteNews, updateNews } = useNewsStore()

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    author: '',
    tag: '',
    content: '',
    isBreaking: false
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
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
      tag: '',
      content: '',
      isBreaking: false
    })
    setEditingStory(null)
    setShowCreateForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content) {
      toast.error('Please fill in title and content')
      return
    }

    if (editingStory) {
      await updateNews(editingStory, formData)
    } else {
      await createNews(formData)
    }
    resetForm()
  }

  const handleEdit = (story) => {
    setEditingStory(story._id)
    setFormData({
      title: story.title,
      image: story.image || '',
      author: story.author || '',
      tag: story.tag || '',
      content: story.content || '',
      isBreaking: story.isBreaking || false
    })
    setShowCreateForm(true)
  }

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-900 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-base font-medium text-white">Delete Story</p>
              <p className="mt-1 text-sm text-gray-400">Are you sure you want to delete this story? This action cannot be undone.</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-700">
          <button
            onClick={() => {
              toast.dismiss(t.id)
              deleteNews(id)
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

  return (
    <div className='space-y-6'>
      {/* Header with title and create button */}
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-gray-900'>All Stories</h2>
        <button
          onClick={() => {
            resetForm()
            setShowCreateForm(true)
          }}
          className='px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-base font-medium text-white transition-colors duration-200 flex items-center gap-2'
        >
          <span className='text-xl leading-none'>+</span> Create Story
        </button>
      </div>

      {/* Line break below header */}
      <hr className='border-gray-300' />

      {/* Create/Edit Story Form */}
      {showCreateForm && (
        <form onSubmit={handleSubmit} className='bg-gray-100 rounded-xl p-6 border border-gray-300'>
          <h3 className='text-xl font-semibold text-red-600 mb-4'>
            {editingStory ? 'Edit Story' : 'Create New Story'}
          </h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>Title *</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Enter story title...'
                className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
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
                <label className='block text-sm text-gray-700 mb-1'>Tag</label>
                <select
                  name='tag'
                  value={formData.tag}
                  onChange={handleInputChange}
                  className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-red-500'
                >
                  <option value=''>Select tag</option>
                  <option value='politics'>Politics</option>
                  <option value='sports'>Sports</option>
                  <option value='business'>Business</option>
                  <option value='technology'>Technology</option>
                  <option value='world'>World</option>
                </select>
              </div>
            </div>

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Content *</label>
              <textarea
                name='content'
                value={formData.content}
                onChange={handleInputChange}
                rows='12'
                placeholder='Write your story content...'
                className='w-full bg-white border border-gray-300
                 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:border-red-500 resize-none'
              ></textarea>
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

            {/* Breaking News Checkbox */}
            <div className='flex items-center gap-2'>
              <input
                type='checkbox'
                id='isBreaking'
                name='isBreaking'
                checked={formData.isBreaking}
                onChange={handleInputChange}
                className='w-4 h-4 accent-red-600 cursor-pointer'
              />
              <label htmlFor='isBreaking' className='text-sm font-medium text-gray-700 cursor-pointer'>
                Mark as Breaking News
              </label>
            </div>

            <div className='flex gap-3 pt-2'>
              <button
                type='submit'
                disabled={loading}
                className='px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors duration-200 disabled:opacity-50'
              >
                {loading ? 'Saving...' : (editingStory ? 'Update Story' : 'Publish Story')}
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

      {/* Stories Cards Grid - 4 Columns */}
      <div className='grid grid-cols-4 gap-4'>
        {loading && news.length === 0 ? (
          <div className='col-span-4 bg-gray-100 rounded-xl p-12 border border-gray-300 text-center'>
            <p className='text-gray-500 text-base'>Loading stories...</p>
          </div>
        ) : news.length === 0 ? (
          <div className='col-span-4 bg-gray-100 rounded-xl p-12 border border-gray-300 text-center'>
            <p className='text-gray-500 text-base'>No stories found. Click "Create Story" to add one.</p>
          </div>
        ) : (
          news.map((story) => (
            <div
              key={story._id}
              className={`bg-gray-200 rounded-xl border p-4 hover:border-red-400 transition-colors duration-200 shadow-sm flex flex-col ${
                story.isBreaking ? 'border-red-500 border-2' : 'border-gray-300'
              }`}
            >
              {/* Breaking Badge */}
              {story.isBreaking && (
                <div className='bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 text-center animate-pulse'>
                  🔴 BREAKING
                </div>
              )}

              {/* Image - Fit properly without cropping */}
              <div className='w-full h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-300 mb-3'>
                {story.image ? (
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className='w-full h-full object-contain bg-gray-300' 
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-500 text-xs'>No Image</div>
                )}
              </div>

              {/* Content */}
              <div className='flex-1 flex flex-col'>
                <div className='flex-1'>
                  <h3 className='text-base font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 mb-1 line-clamp-2'>
                    {story.title}
                  </h3>
                  <div className='flex items-center gap-2 mt-1 flex-wrap mb-2'>
                    <span className='text-xs text-gray-700'>By {story.author}</span>
                    <span className='text-xs text-gray-500'>•</span>
                    <span className='text-xs text-gray-700'>
                      {story.createdAt ? new Date(story.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Date not available'}
                    </span>
                    {story.tag && (
                      <>
                        <span className='text-xs text-gray-500'>•</span>
                        <span className='text-xs bg-gray-300 px-2 py-0.5 rounded-full text-gray-700'>{story.tag}</span>
                      </>
                    )}
                  </div>
                  <p className='text-gray-700 text-xs line-clamp-2'>
                    {story.content}
                  </p>
                </div>
                
                {/* Action Buttons - Resized to match icon size */}
                <div className='flex gap-2 mt-3 pt-3 border-t border-gray-300'>
                  <button
                    onClick={() => handleEdit(story)}
                    className='w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-200 flex items-center justify-center'
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className='w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors duration-200 flex items-center justify-center'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminStories