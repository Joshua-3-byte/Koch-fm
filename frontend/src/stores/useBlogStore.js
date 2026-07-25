import { create } from 'zustand'
import toast from 'react-hot-toast'
import axios from '../lib/axios'

export const useBlogStore = create((set, get) => ({
  blogs: [],
  loading: false,

  setBlogs: (blogs) => set({ blogs }),

  fetchBlogs: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('/blogs')
      set({ blogs: res.data, loading: false })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching blogs')
      set({ loading: false })
    }
  },

  fetchSingleBlog: async (id) => {
    set({ loading: true })
    try {
      const res = await axios.get(`/blogs/${id}`)
      set({ loading: false })
      return res.data
    } catch (error) {
      set({ loading: false })
      toast.error(error.response?.data?.message || 'Error fetching blog')
      return null
    }
  },

  createBlog: async (blogData) => {
    set({ loading: true })
    try {
      const res = await axios.post('/blogs', blogData)
      set((state) => ({
        blogs: [res.data, ...state.blogs],
        loading: false
      }))
      toast.success('Blog created successfully!')
      return res.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating blog')
      set({ loading: false })
      throw error
    }
  },

  updateBlog: async (id, updatedData) => {
    set({ loading: true })
    try {
      const res = await axios.put(`/blogs/${id}`, updatedData)
      set((state) => ({
        blogs: state.blogs.map(blog =>
          blog._id === id ? res.data : blog
        ),
        loading: false
      }))
      toast.success('Blog updated successfully!')
      return res.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating blog')
      set({ loading: false })
      throw error
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true })
    try {
      await axios.delete(`/blogs/${id}`)
      set((state) => ({
        blogs: state.blogs.filter(blog => blog._id !== id),
        loading: false
      }))
      toast.success('Blog deleted successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting blog')
      set({ loading: false })
    }
  }
}))