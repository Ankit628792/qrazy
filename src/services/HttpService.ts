
import { getToken } from '@/lib'
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

      const token = getToken
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      config.headers['Content-Type'] = 'application/json'
      config.headers['Accept'] = 'application/json'

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
    if (response?.config) {
      return response.data
    }
    return response;
  },
  (error) => {
    // const { data = {}, status, statusText } = error?.response || {};
    // data.description = data.message || statusText;
    // data.message = data.error || statusText;
    // data.statusCode = data.statusCode || status;
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

export const post = getAxiosClient().post
export const get = getAxiosClient().get
export const put = getAxiosClient().put
export const patch = getAxiosClient().patch
export const del = getAxiosClient().delete

export default HttpService
