import {create} from 'zustand'
import axios from '../lib/axios'
import { toast} from 'react-hot-toast'

export  const useUserStore = create((set,get) => ({
  user:null,
  loading:false,
  checkingAuth: true,

  signup: async ({email,password,confirmPassword}) => {
    set({loading: true})

    if(password !== confirmPassword ) {
      set({loading: false})
      return toast.error('Passwords do not match!')
    }

    try {
      const res = await axios.post('/auth/admin/signup', {email,password})
      set({user: res.data,loading: false})
    } catch (error) {
      set({loading: false})
      toast.error(error.response.data.message || 'An Error Occured')
    }
  },

 
  login: async (email,password) => {
    set({loading: true})

    try {
      const res = await axios.post('/auth/admin/login', {email,password})
      set({user: res.data,loading: false})
    } catch (error) {
      set({loading: false})
      toast.error(error.response.data.message || 'An Error Occured')
    }
  },

  checkAuth: async () => {
    set({checkingAuth: true})
    try {
      const response = await axios.get('/auth/admin/profile')
      set({user: response.data, checkingAuth: false})
    } catch (error) {
      set({checkingAuth: false, user:null})
    }
    
  }
}))