'use client'

import axios from 'axios'

const TIMEOUT = 5000
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const _axios = axios.create({
  timeout: TIMEOUT,
  baseURL: BASE_URL
})

_axios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('access_token')

      config.headers
      if (token) {
        config.headers['Authorization'] = `Token ${token}`
      }
      return config
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
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
