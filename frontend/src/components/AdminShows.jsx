import React, { useState, useEffect } from 'react'
import { useShowStore } from '../stores/useShowStore'
import { usePresenterStore } from '../stores/usePresenterStore'
import toast from 'react-hot-toast'
import { Pencil, Trash2, Plus } from 'lucide-react'

const AdminShows = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingShow, setEditingShow] = useState(null)
  const { shows, loading, fetchShows, createShow, updateShow, deleteShow } = useShowStore()
  const { presenters, fetchPresenters } = usePresenterStore()

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    host: '',
    scheduleType: 'single',
    dayOfWeek: '',
    dayRangeStart: '',
    dayRangeEnd: '',
    startTime: '',
    endTime: ''
  })

  useEffect(() => {
    fetchShows()
    fetchPresenters()
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
      description: '',
      image: '',
      host: '',
      scheduleType: 'single',
      dayOfWeek: '',
      dayRangeStart: '',
      dayRangeEnd: '',
      startTime: '',
      endTime: ''
    })
    setEditingShow(null)
    setShowCreateForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.host || !formData.startTime || !formData.endTime) {
      toast.error('Please fill in all required fields')
      return
    }

    if (formData.scheduleType === 'single' && !formData.dayOfWeek) {
      toast.error('Please select a day for single day schedule')
      return
    }

    if (formData.scheduleType === 'range' && (!formData.dayRangeStart || !formData.dayRangeEnd)) {
      toast.error('Please select start and end days for range schedule')
      return
    }

    try {
      if (editingShow) {
        await updateShow(editingShow, formData)
      } else {
        await createShow(formData)
      }
      resetForm()
    } catch (error) {
      // Error is handled in the store
    }
  }

  const handleEdit = (show) => {
    setEditingShow(show._id)
    setFormData({
      title: show.title,
      description: show.description,
      image: show.image || '',
      host: show.host?._id || show.host || '',
      scheduleType: show.scheduleType || 'single',
      dayOfWeek: show.dayOfWeek || '',
      dayRangeStart: show.dayRangeStart || '',
      dayRangeEnd: show.dayRangeEnd || '',
      startTime: show.startTime || '',
      endTime: show.endTime || ''
    })
    setShowCreateForm(true)
  }

  const handleDelete = (id, title) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-gray-900 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-base font-medium text-white">Delete Show</p>
              <p className="mt-1 text-sm text-gray-400">Are you sure you want to delete "{title}"? This action cannot be undone.</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-700">
          <button
            onClick={() => {
              toast.dismiss(t.id)
              deleteShow(id)
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
    if (show.scheduleType === 'range' && show.dayRangeStart && show.dayRangeEnd) {
      return `${formatDay(show.dayRangeStart)} - ${formatDay(show.dayRangeEnd)}`
    }
    return formatDay(show.dayOfWeek) || ''
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>All Shows</h2>
        <button
          onClick={() => {
            resetForm()
            setShowCreateForm(true)
          }}
          className='w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 rounded-lg text-sm sm:text-base font-medium text-white transition-colors duration-200 flex items-center justify-center gap-2'
        >
          <Plus size={18} /> Create Show
        </button>
      </div>

      <hr className='border-gray-300' />

      {showCreateForm && (
        <form onSubmit={handleSubmit} className='bg-gray-100 rounded-xl p-4 sm:p-6 border border-gray-300'>
          <h3 className='text-lg sm:text-xl font-semibold text-red-600 mb-4'>
            {editingShow ? 'Edit Show' : 'Create New Show'}
          </h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm text-gray-700 mb-1'>Show Title *</label>
              <input type='text' name='title' value={formData.title} onChange={handleInputChange} placeholder='Enter show title...' className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500' />
            </div>

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Description *</label>
              <textarea name='description' value={formData.description} onChange={handleInputChange} rows='3' placeholder='Enter show description...' className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none' />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm text-gray-700 mb-1'>Host *</label>
                <select name='host' value={formData.host} onChange={handleInputChange} className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-red-500'>
                  <option value=''>Select Host</option>
                  {presenters.map((presenter) => (
                    <option key={presenter._id} value={presenter._id}>{presenter.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm text-gray-700 mb-1'>Schedule Type *</label>
                <div className='flex gap-4 mt-2'>
                  <label className='flex items-center gap-2 text-sm text-gray-700 cursor-pointer'>
                    <input type='radio' name='scheduleType' value='single' checked={formData.scheduleType === 'single'} onChange={handleInputChange} className='accent-red-600' /> Single Day
                  </label>
                  <label className='flex items-center gap-2 text-sm text-gray-700 cursor-pointer'>
                    <input type='radio' name='scheduleType' value='range' checked={formData.scheduleType === 'range'} onChange={handleInputChange} className='accent-red-600' /> Day Range
                  </label>
                </div>
              </div>
            </div>

            {formData.scheduleType === 'single' && (
              <div>
                <label className='block text-sm text-gray-700 mb-1'>Day of Week *</label>
                <select name='dayOfWeek' value={formData.dayOfWeek} onChange={handleInputChange} className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-red-500'>
                  <option value=''>Select Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>{formatDay(day)}</option>
                  ))}
                </select>
              </div>
            )}

            {formData.scheduleType === 'range' && (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm text-gray-700 mb-1'>Start Day *</label>
                  <select name='dayRangeStart' value={formData.dayRangeStart} onChange={handleInputChange} className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-red-500'>
                    <option value=''>Start Day</option>
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>{formatDay(day)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm text-gray-700 mb-1'>End Day *</label>
                  <select name='dayRangeEnd' value={formData.dayRangeEnd} onChange={handleInputChange} className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-red-500'>
                    <option value=''>End Day</option>
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>{formatDay(day)}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm text-gray-700 mb-1'>Start Time *</label>
                <input type='time' name='startTime' value={formData.startTime} onChange={handleInputChange} className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-red-500' />
              </div>
              <div>
                <label className='block text-sm text-gray-700 mb-1'>End Time *</label>
                <input type='time' name='endTime' value={formData.endTime} onChange={handleInputChange} className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-red-500' />
              </div>
            </div>

            <div>
              <label className='block text-sm text-gray-700 mb-1'>Show Image</label>
              <input type='file' accept='image/*' onChange={handleImageChange} className='w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-600 file:text-white hover:file:bg-red-700' />
              {formData.image && <p className='text-sm text-gray-500 mt-1'>Image uploaded</p>}
            </div>

            <div className='flex flex-col sm:flex-row gap-3 pt-2'>
              <button type='submit' disabled={loading} className='px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors duration-200 disabled:opacity-50'>
                {loading ? 'Saving...' : (editingShow ? 'Update Show' : 'Create Show')}
              </button>
              <button type='button' onClick={resetForm} className='px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200'>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {loading && shows.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-base sm:text-lg'>Loading shows...</p>
        </div>
      ) : shows.length === 0 ? (
        <div className='text-center py-12 sm:py-16 bg-gray-100 rounded-xl border border-gray-200'>
          <p className='text-gray-500 text-base sm:text-lg'>No shows created</p>
          <p className='text-gray-400 text-sm mt-1'>Click "Create Show" to add your first show</p>
          <button onClick={() => { resetForm(); setShowCreateForm(true) }} className='mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium text-white transition-colors duration-200'>
            + Create Show
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {shows.map((show) => (
            <div key={show._id} className='bg-gray-200 rounded-xl border border-gray-300 p-4 hover:shadow-md transition-shadow duration-200 flex flex-col'>
              <div className='w-full h-40 sm:h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-300 mb-3'>
                {show.image ? (
                  <img src={show.image} alt={show.title} className='w-full h-full object-cover' />
                ) : (
                  <div className='w-full h-full flex items-center justify-center text-gray-500 text-sm'>No Image</div>
                )}
              </div>
              <div className='flex-1'>
                <div className='flex flex-wrap items-start justify-between gap-2'>
                  <div>
                    <h3 className='text-base sm:text-lg font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 line-clamp-1'>
                      {show.title}
                    </h3>
                    <p className='text-sm text-gray-700'>Host: {show.host?.name || 'Unknown'}</p>
                  </div>
                  <div className='flex gap-2'>
                    <button onClick={() => handleEdit(show)} className='w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-200 flex items-center justify-center' title="Edit">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(show._id, show.title)} className='w-7 h-7 sm:w-8 sm:h-8 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors duration-200 flex items-center justify-center' title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className='mt-2'>
                  <span className='inline-block bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full'>
                    {formatSchedule(show)} • {formatTime(show.startTime)} - {formatTime(show.endTime)}
                  </span>
                </div>
                <p className='text-gray-700 text-sm mt-2 line-clamp-2'>{show.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminShows