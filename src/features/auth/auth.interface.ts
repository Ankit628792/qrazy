export interface IUserLogin {
  token: string
  username: string
  user_type: string
}

export interface ICreateUserPayload {
  email: string
  password: string
  user_type: string
}

export interface IUserLoginPayload {
  email: string
  password: string
  user_type: string
}

export interface IAuthContext {
  user: IUserLogin | null
  loading: Boolean
  logOut: () => void
  loginWithEmail: (
    data: Record<string, string | number | boolean>
  ) => Promise<boolean>
  registerUser: (
    createRegistrationPayload: ICreateUserPayload
  ) => Promise<boolean>
}

export interface IUserLoginResponse {
  username: string
  token: string
  user_type: string
  email: string
  bio: string
  image: string | null
}

export enum LOGIN_ALERT {
  SUCCESS = 'success',
  ERROR = 'Login failed',
  OTP_SENT = 'OTP sent to your email',
  USER_NOT_CREATED = 'User not created',
  USER_NOT_FOUND = 'User not found'
}
