import { create } from 'zustand'
import toast from 'react-hot-toast'
import axios from '../lib/axios'

export const useShowStore = create((set, get) => ({
  shows: [],
  loading: false,

  setShows: (shows) => set({ shows }),

  fetchShows: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('/shows')
      set({ shows: res.data, loading: false })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching shows')
      set({ loading: false })
    }
  },

  createShow: async (showData) => {
    set({ loading: true })
    try {
      const res = await axios.post('/shows', showData)
      set((state) => ({
        shows: [res.data, ...state.shows],
        loading: false
      }))
      toast.success('Show created successfully!')
      return res.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating show')
      set({ loading: false })
      throw error
    }
  },

  updateShow: async (id, updatedData) => {
    set({ loading: true })
    try {
      const res = await axios.put(`/shows/${id}`, updatedData)
      set((state) => ({
        shows: state.shows.map(show => 
          show._id === id ? res.data : show
        ),
        loading: false
      }))
      toast.success('Show updated successfully!')
      return res.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating show')
      set({ loading: false })
      throw error
    }
  },

  deleteShow: async (id) => {
    set({ loading: true })
    try {
      await axios.delete(`/shows/${id}`)
      set((state) => ({
        shows: state.shows.filter(show => show._id !== id),
        loading: false
      }))
      toast.success('Show deleted successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting show')
      set({ loading: false })
    }
  }
}))