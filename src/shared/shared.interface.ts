export enum HTTP_STATUS_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  OK = 200,
  CREATED = 201,
  UPDATED = 200,
  CONFLICT = 409
}

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  USER: '/user',
  NOT_FOUND: '/404',
  INVOICE: '/invoice',
  PRODUCT: '/product',
  REPORT: '/report',
  OVERVIEW: '/overview',
  SETTINGS: '/settings'
}

export interface IRouteParams {
  [key: string]: string
}
