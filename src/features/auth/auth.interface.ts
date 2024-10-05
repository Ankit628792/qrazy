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

export enum PERMISSION_LEVEL {
  EDIT = 'edit',
  VIEW = 'view',
  DELETE = 'delete',
  FULL = 'full',
  DENIED = 'denied'
}

export interface IModulesAndPermissions {
  [key: string]: PERMISSION_LEVEL
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
  modulesAndPermissions: IModulesAndPermissions | {}
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
  SUCCESS = 'Login successful',
  ERROR = 'Login failed',
  OTP_SENT = 'OTP sent to your email',
  USER_NOT_CREATED = 'User not created',
  USER_NOT_FOUND = 'User not found',
  USER_LOGGED_OUT = 'User logged out'
}

export enum USER_TYPE {
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}

export enum AUTH_LOCAL_STORAGE_KEYS {
  USERNAME = 'username',
  USERTYPE = 'usertype',
  TOKEN = 'token',
  USER_DETAILS = 'userDetails',
  MODULES_AND_PERMISSIONS = 'modulesAndPermissions'
}

export enum QUERY_STATUS {
  PENDING = 'pending',
  RESOLVED = 'resolved'
}
