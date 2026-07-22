import { create } from 'zustand'
import toast from 'react-hot-toast'
import axios from '../lib/axios'

export const useNewsStore = create((set, get) => ({
  news: [],
  loading: false,

  setNews: (news) => set({ news }),

  createNews: async (newsData) => {
    set({ loading: true })

    try {
      const res = await axios.post('/news', newsData)
      set((state) => ({
        news: [res.data, ...state.news],
        loading: false
      }))
      toast.success('Story created successfully!')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating story')
      set({ loading: false })
    }
  },

  fetchNews: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('/news')
      set({ news: res.data, loading: false })
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error fetching stories')
      set({ loading: false })
    }
  },

  fetchBreakingNews: async () => {
    try {
      const res = await axios.get('/news/breaking')
      return res.data
    } catch (error) {
      return []
    }
  },

  // ✅ ADD THIS FUNCTION - Fetch single news by ID
  fetchSingleNews: async (id) => {
    set({ loading: true })
    try {
      const res = await axios.get(`/news/${id}`)
      set({ loading: false })
      return res.data
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || 'Error fetching story')
      return null
    }
  },

  deleteNews: async (id) => {
    set({ loading: true })
    try {
      await axios.delete(`/news/${id}`)
      set((state) => ({
        news: state.news.filter(story => story._id !== id),
        loading: false
      }))
      toast.success('Story deleted successfully!')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error deleting story')
      set({ loading: false })
    }
  },

  updateNews: async (id, updatedData) => {
    set({ loading: true })
    try {
      const res = await axios.put(`/news/${id}`, updatedData)
      set((state) => ({
        news: state.news.map(story => 
          story._id === id ? res.data : story
        ),
        loading: false
      }))
      toast.success('Story updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating story')
      set({ loading: false })
    }
  }
}))