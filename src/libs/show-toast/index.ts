import toast from 'react-hot-toast'
import Logger from '@/libs/logger.util'
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { HTTP_STATUS_CODE } from '@/shared/shared.interface'
import { LOGIN_ALERT } from '@/features/auth/auth.interface'

interface IResponseData {
  message: LOGIN_ALERT
  status: HTTP_STATUS_CODE
}

interface IAxiosConfig {}

interface IShowToast {
  response: AxiosResponse<
    IResponseData,
    InternalAxiosRequestConfig<IAxiosConfig>
  >
}

export const showToast = ({ response }: IShowToast) => {
  if (!response.data.status) return toast.error('Error')

  switch (response.data.status) {
    case HTTP_STATUS_CODE.OK:
    case HTTP_STATUS_CODE.CREATED:
    case HTTP_STATUS_CODE.UPDATED:
      toast.success(response?.data?.message || 'Success')
      Logger.info(response?.data?.message || 'Success')
      break
    case HTTP_STATUS_CODE.BAD_REQUEST:
    case HTTP_STATUS_CODE.UNAUTHORIZED:
    case HTTP_STATUS_CODE.FORBIDDEN:
    case HTTP_STATUS_CODE.NOT_FOUND:
    case HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR:
      toast.error(response?.data?.message || 'Error')
      Logger.error(response?.data?.message || 'Error')
      break
    default:
      break
  }
}
