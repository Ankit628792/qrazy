'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { showToast } from '@/utils/show-toast'
import { AUTH_LOCAL_STORAGE_KEYS } from '@/features/auth/auth.interface'

const TIMEOUT = 5000
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const _axios = axios.create({
  timeout: TIMEOUT,
  baseURL: BASE_URL
})

_axios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem(AUTH_LOCAL_STORAGE_KEYS.TOKEN)

      config.headers
      if (token) {
        config.headers['Authorization'] = `Token ${token}`
      }
      return config
    }
    return config
  },
  (error) => {
    toast.error(error)
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  (response) => {
    showToast({ response })
    return response
  },
  (error) => {
    toast.error(error)
    return Promise.reject(error)
  }
)

const getAxiosClient = () => _axios

const HttpService = {
  getAxiosClient,
  get: getAxiosClient().get,
  post: getAxiosClient().post,
  put: getAxiosClient().put,
  patch: getAxiosClient().patch,
  delete: getAxiosClient().delete
}

export default HttpService
