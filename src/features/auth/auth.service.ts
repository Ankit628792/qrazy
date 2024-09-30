import Logger from '@/libs/logger.util'
import HttpService from '@/service/HttpService'
import {
  ICreateUserPayload,
  IUserLoginPayload,
  IUserLoginResponse,
  LOGIN_ALERT
} from './auth.interface'

const userLogin = async (userLoginPayload: IUserLoginPayload) => {
  try {
    const response = await HttpService.post('/users/login', {
      user: {
        ...userLoginPayload
      }
    })
    if (!response.data) return null
    return response?.data?.user as IUserLoginResponse
  } catch (error) {
    Logger.error('User login error')
    return error
  }
}

const getOtp = async (email: string) => {
  const getOtpPayload = {
    user: {
      email
    }
  }
  try {
    const { data } = await HttpService.post('/users/sendotp', {
      ...getOtpPayload
    })
    if (!data.msg) throw new Error(LOGIN_ALERT.OTP_SENT)
    return data.msg
  } catch (error) {
    Logger.error('Get OTP error')
    return null
  }
}

const createUser = async (createUser: ICreateUserPayload) => {
  const createUserPayload = {
    user: {
      ...createUser
    }
  }
  try {
    const { data } = await HttpService.post('/users', {
      ...createUserPayload
    })
    return data
  } catch (error) {
    Logger.error('Create user error')
    return null
  }
}

const AuthService = {
  getOtp,
  userLogin,
  createUser
}

export default AuthService
