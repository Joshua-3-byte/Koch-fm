import React, { useState, useEffect } from 'react'
import { usePresenterStore } from '../stores/usePresenterStore'
import toast from 'react-hot-toast'
import { Pencil, Trash2, Plus } from 'lucide-react'

const AdminPresenters = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPresenter, setEditingPresenter] = useState(null)
  const { presenters, loading, fetchPresenters, createPresenter, updatePresenter, deletePresenter } = usePresenterStore()

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    image: '',
    socialLinks: {
      twitter: '',
      instagram: '',
      facebook: ''
    }
  })

  useEffect(() => {
    fetchPresenters()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialKey]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
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
      name: '',
      bio: '',
      image: '',
      socialLinks: {
        twitter: '',
        instagram: '',
        facebook: ''
      }
    })
    setEditingPresenter(null)
    setShowCreateForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.bio || !formData.image) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      if (editingPresenter) {
        await updatePresenter(editingPresenter, formData)
      } else {
        await createPresenter(formData)
      }
      resetForm()
    } catch (error) {
      // Error handled in store
    }
  }

  const handleEdit = (presenter) => {
    setEditingPresenter(presenter._id)
    setFormData({
      name: presenter.name,
      bio: presenter.bio,
      image: presenter.image || '',
      socialLinks: presenter.socialLinks || { twitter: '', instagram: '', facebook: '' }
    })
    setShowCreateForm(true)
  }

  const handleDelete = (id, name) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-900 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-base font-medium text-white">Delete Presenter</p>
              <p className="mt-1 text-sm text-gray-400">Are you sure you want to delete "{name}"? This action cannot be undone.</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-700">
          <button
            onClick={() => {
              toast.dismiss(t.id)
              deletePresenter(id)
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
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-gray-900'> All Presenters</h2>
        <button
          onClick={() => {
            resetForm()
            setShowCreateForm(true)
          }}
          className='px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-base font-medium text-white transition-colors duration-200 flex items-center gap-2'
        >
          <Plus size={20} /> Add Presenter
        </button>
      </div>

      <hr className='border-gray-300' />

      {/* Create/Edit Form */}
      {showCreateForm && (
        <form onSubmit={handleSubmit} className='bg-gray-100 rounded-xl p-6 border border-gray-300'>
          <h3 className='text-xl font-semibold text-red-600 mb-4'>
            {editingPresenter ? 'Edit Presenter' : 'Add New Presenter'}
          </h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>Name *</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Enter presenter name...'
                className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500'
              />
            </div>

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Bio *</label>
              <textarea
                name='bio'
                value={formData.bio}
                onChange={handleInputChange}
                rows='3'
                placeholder='Enter presenter bio...'
                className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none'
              />
            </div>

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Image *</label>
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

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Social Links</label>
              <div className='space-y-2'>
                <input
                  type='text'
                  name='social.twitter'
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder='Twitter URL...'
                  className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500'
                />
                <input
                  type='text'
                  name='social.instagram'
                  value={formData.socialLinks.instagram}
                  onChange={handleInputChange}
                  placeholder='Instagram URL...'
                  className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500'
                />
                <input
                  type='text'
                  name='social.facebook'
                  value={formData.socialLinks.facebook}
                  onChange={handleInputChange}
                  placeholder='Facebook URL...'
                  className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500'
                />
              </div>
            </div>

            <div className='flex gap-3 pt-2'>
              <button
                type='submit'
                disabled={loading}
                className='px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors duration-200 disabled:opacity-50'
              >
                {loading ? 'Saving...' : (editingPresenter ? 'Update Presenter' : 'Add Presenter')}
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

      {/* Presenters Grid - 3 columns with grey background */}
      {loading && presenters.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Loading presenters...</p>
        </div>
      ) : presenters.length === 0 ? (
        <div className='text-center py-16 bg-gray-100 rounded-xl border border-gray-200'>
          <div className='text-6xl mb-4'></div>
          <p className='text-gray-500 text-lg'>No presenters added</p>
          <p className='text-gray-400 text-sm mt-1'>Click "Add Presenter" to add your first presenter</p>
          <button
            onClick={() => {
              resetForm()
              setShowCreateForm(true)
            }}
            className='mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors duration-200'
          >
            + Add Presenter
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {presenters.map((presenter) => (
            <div
              key={presenter._id}
              className='bg-gray-200 rounded-xl border border-gray-300 p-4 hover:shadow-md transition-shadow duration-200'
            >
              {/* Image */}
              <div className='w-20 h-20 rounded-full overflow-hidden bg-gray-300 mx-auto mb-3'>
                {presenter.image ? (
                  <img
                    src={presenter.image}
                    alt={presenter.name}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-500 text-2xl'>
                    
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className='text-lg font-bold text-gray-900 text-center'>
                {presenter.name}
              </h3>

              {/* Bio */}
              <p className='text-gray-700 text-sm text-center line-clamp-2 mt-1'>
                {presenter.bio}
              </p>

              {/* Actions - Icon only with matching background size */}
              <div className='flex justify-center gap-3 mt-3 pt-3 border-t border-gray-300'>
                <button
                  onClick={() => handleEdit(presenter)}
                  className='w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-200 flex items-center justify-center'
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(presenter._id, presenter.name)}
                  className='w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors duration-200 flex items-center justify-center'
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPresenters