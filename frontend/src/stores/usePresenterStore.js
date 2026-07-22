import { create } from 'zustand'
import toast from 'react-hot-toast'
import axios from '../lib/axios'

export const usePresenterStore = create((set, get) => ({
  presenters: [],
  loading: false,

  fetchPresenters: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('/presenters')
      set({ presenters: res.data, loading: false })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching presenters')
      set({ loading: false })
    }
  },

  createPresenter: async (presenterData) => {
    set({ loading: true })
    try {
      const res = await axios.post('/presenters', presenterData)
      set((state) => ({
        presenters: [res.data, ...state.presenters],
        loading: false
      }))
      toast.success('Presenter created successfully!')
      return res.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating presenter')
      set({ loading: false })
      throw error
    }
  },

  updatePresenter: async (id, updatedData) => {
    set({ loading: true })
    try {
      const res = await axios.put(`/presenters/${id}`, updatedData)
      set((state) => ({
        presenters: state.presenters.map(presenter =>
          presenter._id === id ? res.data : presenter
        ),
        loading: false
      }))
      toast.success('Presenter updated successfully!')
      return res.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating presenter')
      set({ loading: false })
      throw error
    }
  },

  deletePresenter: async (id) => {
    set({ loading: true })
    try {
      await axios.delete(`/presenters/${id}`)
      set((state) => ({
        presenters: state.presenters.filter(presenter => presenter._id !== id),
        loading: false
      }))
      toast.success('Presenter deleted successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting presenter')
      set({ loading: false })
    }
  }
}))