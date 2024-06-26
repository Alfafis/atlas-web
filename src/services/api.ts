import { toast } from '@/components/ui/use-toast'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://devatlas.cloud/atlas/'
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('atlas_token')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.data.error === 'access denied') {
      localStorage.removeItem('atlas_token')
      toast({
        variant: 'destructive',
        title: 'Você foi desconectado.',
        description: 'Faça login novamente.'
      })
    }
    return Promise.reject(error)
  }
)
