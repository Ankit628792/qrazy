import { create } from 'zustand'

const OnboardingTitles = [
  'Basic Info',
  'Personalization',
  'Company Location',
  'Contact Details'
]

const videos = [
  {
    id: 0,
    url: 'https://cdn.dribbble.com/userupload/3536595/file/original-a1b3608bafa81a5c6d1cfdd7e52f7cf7.mp4',
    background: 'bg-[#A0D9B5]'
  },
  {
    id: 1,
    url: 'https://cdn.dribbble.com/userupload/3230430/file/original-33c1104902e73d1598b323a01a908862.mp4',
    background: 'bg-[#A8D3D8]'
  },
  {
    id: 2,
    url: 'https://cdn.dribbble.com/userupload/3491211/file/original-a8ecefbc723c3a14421c0e47b0cfe500.mp4',
    background: 'bg-[#B2DEC4]'
  },
  {
    id: 3,
    url: 'https://cdn.dribbble.com/userupload/3500007/file/original-a895cf5073002b46352a9eccd7c85b98.mp4',
    background: 'bg-[#B1DEC2]'
  }
]

type OnboardingManagementState = {
  currentStep: number
  onboardingTitles: typeof OnboardingTitles
  onboardingVideos: typeof videos
  setCurrentStep: (step: number) => void
}

const useOnboardingStore = create<OnboardingManagementState>((set) => ({
  currentStep: 0,
  onboardingTitles: OnboardingTitles,
  onboardingVideos: videos,
  setCurrentStep: (step) => set({ currentStep: step })
}))

export default useOnboardingStore
