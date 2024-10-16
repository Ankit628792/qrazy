import { create } from 'zustand'
import { CURRENT_AUTH_STEP } from '../auth.interface'

const images = [
  'https://cdn.dribbble.com/userupload/4972790/file/original-963f1a25237cfee6042f3231de26e03b.jpg',
  'https://cdn.dribbble.com/users/879147/screenshots/15629321/media/3a1a92cf292b30dcfc4296e3a0195fa1.jpeg',
  'https://cdn.dribbble.com/users/879147/screenshots/15843427/media/4cec4239ac4dff78979bc8d5e9ad8678.jpeg',
  'https://cdn.dribbble.com/users/879147/screenshots/11957488/media/5e88c37f53fee6054ddb5ad16eb08c69.jpeg',
  'https://cdn.dribbble.com/userupload/4399623/file/original-355a41a8db20c5b9e043b4bb3d512ec9.gif',
  'https://cdn.dribbble.com/userupload/8694723/file/original-da472a4caa7d10c823fee91132afe19b.gif',
  'https://cdn.dribbble.com/userupload/8880711/file/original-066cba4d1b4cb926bc5266eb403e582f.gif'
]

type AuthManagementState = {
  currentAuthStep: CURRENT_AUTH_STEP
  authStepsImages: typeof images
  setCurrentAuthStep: (value: CURRENT_AUTH_STEP) => void
}

const useAuthStore = create<AuthManagementState>((set) => ({
  currentAuthStep: CURRENT_AUTH_STEP.LOGIN,
  authStepsImages: images,
  setCurrentAuthStep: (value: CURRENT_AUTH_STEP) =>
    set({ currentAuthStep: value })
}))

export default useAuthStore
