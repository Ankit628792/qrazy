import toast from 'react-hot-toast'
import validator from 'validator'
import { createRef, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const API_URL = 'https://api.domain.com/api/v1'

const key = process.env.AK_KEY as string
const encrypt = (message: string) => {
  let encryptedMessage = ''
  for (let i = 0; i < message.length; i++) {
    const char = message[i]
    const charCode = char.charCodeAt(0)
    const keyCharCode = key.charCodeAt(i % key.length) // Retrieve the character code of the key at the corresponding position
    const encryptedCharCode = (charCode + keyCharCode) % 256 // Perform simple shift using the key value
    const encryptedChar = String.fromCharCode(encryptedCharCode)
    encryptedMessage += encryptedChar
  }
  return encryptedMessage
}

const API = API_URL
const getToken = localStorage.getItem('access_token')
const setToken = (token: string) => localStorage.setItem('access_token', token)
const removeToken = () => localStorage.removeItem('access_token')

const groupBy = (x: any[], f: (args: any) => void) =>
  Array.isArray(x) && typeof f === 'function'
    ? x.reduce((a, b) => ((a[f(b) as unknown as number] ||= []).push(b), a), {})
    : {}

const fetchPlace = async (text: string) => {
  try {
    const res = await fetch(`https://api.aqqess.me/api/location?search=${text}`)
    if (!res.ok) throw new Error(res.statusText)

    return res.json()
  } catch (err) {
    return { error: 'Unable to retrieve places', err }
  }
}

const isValidPassword = (str: string) => {
  let error = ''
  // Check if the string contains at least one capital letter
  const containsCapitalLetter = /[A-Z]/.test(str)
  if (!containsCapitalLetter) {
    error = 'Password must contain a capital letter'
  }

  // Check if the string contains at least one special character
  const containsSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(str)
  if (!containsSpecialCharacter) {
    error = 'Password must contain a special character'
  }

  // Check if the string contains at least one special character
  const containsNumber = /\d/.test(str)
  if (!containsNumber) {
    error = 'Password must contain a number'
  }

  // Check if the string meets the minimum length requirement
  const hasMinimumLength = validator.isLength(str, { min: 6 })
  if (!hasMinimumLength) {
    error = 'Password must be at least 6 character'
  }

  // Return true if all conditions are met, otherwise return false
  return {
    valid:
      containsCapitalLetter &&
      containsSpecialCharacter &&
      hasMinimumLength &&
      containsNumber,
    error: error
  }
}

const showError = (msg: string) => {
  toast.error(msg, { id: 'error' })
}
const showSuccess = (msg: string) => {
  toast.success(msg, { id: 'success' })
}
const showInfo = (msg: string) => {
  toast.success(msg, { id: 'info' })
}

const openLink = (link: string) => {
  if (!link?.substring(0, 4)?.includes('http')) {
    link = 'https://' + link
  }
  return window.open(link, '_blank')
}

const useClickOutside = (handler: any, ref = null) => {
  const domRef = ref || createRef()

  useEffect(() => {
    const localHandler = (e: any) => {
      if (!domRef.current) return
      // @ts-expect-error available
      // it is available
      if (!domRef.current?.contains(e.target)) handler()
    }
    document.addEventListener('mousedown', localHandler)
    return () => document.removeEventListener('mousedown', localHandler)
  }, [domRef, handler])

  return domRef
}

const fetchLocation = async (loc: string) => {
  let res: any = await fetch(
    'https://api.aqqess.me/api/location?search=' + loc?.toLowerCase()
  )
  if (res.status === 200) {
    res = await res.json()
    return res.data
  } else return []
}

const getFavicon = (url: string) => {
  let domain = url.replace(/^https?:\/\//i, '').replace(/^www\./i, '')
  domain = domain.split('/')[0]

  const icon = 'https://www.' + domain + '/favicon.ico'

  return icon
}

const decodeToken = () => {
  if (!getToken) {
    return false
  }
  var decoded: any = jwtDecode(getToken)
  return decoded?.userInfo
}

const formattedDifference = (hours: number, minutes: number) =>
  `${hours.toString().padStart(2, '0')} Hr ${minutes.toString().padStart(2, '0')} Mins`
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const getSum = (arr: any[], property: string) =>
  Array.isArray(arr)
    ? arr.reduce(
        (sum, item) =>
          sum + (isNaN(Number(item[property])) ? 0 : Number(item[property])),
        0
      )
    : 0
const getObjectWithMaxValue = (arr: any[], fieldName: string) =>
  Array.isArray(arr)
    ? arr.reduce(
        (max, obj) =>
          Number(obj[fieldName]) > (max ? Number(max[fieldName]) : -Infinity)
            ? obj
            : max,
        null
      )
    : {}

const getRandomTime = () => {
  const randomHour = Math.floor(Math.random() * 12) + 1
  const randomMinute = Math.floor(Math.random() * 60)
  const ampm = Math.random() < 0.5 ? 'AM' : 'PM'

  const formattedHour = randomHour < 10 ? `0${randomHour}` : `${randomHour}`
  const formattedMinute =
    randomMinute < 10 ? `0${randomMinute}` : `${randomMinute}`

  return `${formattedHour}:${formattedMinute} ${ampm}`
}

const formatNumber = (value: number | bigint | Intl.StringNumericLiteral) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  })

  return formatter.format(value)
}

const getGreeting = () => {
  const currentHour = new Date().getHours()

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning!'
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good Afternoon!'
  } else if (currentHour >= 18 && currentHour < 24) {
    return 'Good Evening!'
  } else {
    return 'Good Night!'
  }
}

const appUtils = {
  API,
  getToken,
  week,
  months,
  month,
  setToken,
  removeToken,
  groupBy,
  fetchPlace,
  isValidPassword,
  showError,
  showSuccess,
  showInfo,
  openLink,
  useClickOutside,
  fetchLocation,
  getFavicon,
  decodeToken,
  formattedDifference,
  getSum,
  getObjectWithMaxValue,
  getRandomTime,
  formatNumber,
  getGreeting
}

export default appUtils
