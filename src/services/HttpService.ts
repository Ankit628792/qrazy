
import { getCookie } from '@/hooks/cookies.hook'
import { getToken } from '@/lib'
import axios from 'axios'

const TIMEOUT = 30000
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const _axios = axios.create({
  timeout: TIMEOUT,
  baseURL: BASE_URL
})

_axios.interceptors.request.use(
  async (config) => {
    const token = await getCookie('access_token') || getToken

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    config.headers['Content-Type'] = 'application/json'
    config.headers['Accept'] = 'application/json'
    config.headers["Access-Control-Allow-Origin"] = "*"
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  (response) => {
    if (response?.config) {
      return { success: response.data.success, message: response.data.successResponse.message, data: response.data.successResponse.data }
    }
    return response.data;
  },
  (error) => {
    const err = error?.response?.data;
    const data = {
      success: err?.success ?? false,
      message: err?.errorResponse?.message || error.message,
      errors: err?.errorResponse?.errors
    }
    console.log(data)
    return Promise.reject(data)
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
