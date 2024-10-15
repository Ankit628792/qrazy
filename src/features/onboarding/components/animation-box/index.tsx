import React from 'react'
import useOnboardingStore from '../../store/onboarding.store'
import { cn } from '@/libs/utils'

type AnimationBoxQuestionsProps = {
  currentStep: number
  setCurrentStep: (step: number) => void
}

const Video = ({
  index,
  src,
  currentIndex,
  background
}: {
  index: number
  currentIndex: number
  src: string
  background: string
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (videoRef.current) {
      if (index === currentIndex) {
        videoRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' })
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [currentIndex, index])

  return (
    <div className={'w-full shrink-0 h-full relative ' + background}>
      <video
        key={index}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain object-center relative z-10 shrink-0 snap-center"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export const AnimationBox = ({
  currentStep,
  setCurrentStep
}: AnimationBoxQuestionsProps) => {
  const { onboardingVideos } = useOnboardingStore()
  const preloadVideos = () => {
    onboardingVideos.forEach((video) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = video.url
      link.as = 'video'
      document.head.appendChild(link)
    })
  }
  React.useEffect(() => {
    preloadVideos()
  }, [])
  return (
    <div className="relative flex-grow rounded-3xl w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl flex-col hidden lg:flex">
      <div className="rounded-3xl flex-grow w-full relative snap-x snap-mandatory overflow-x-auto scroll-hidden select-none bg-[#A0D9B5] hidden lg:flex">
        {onboardingVideos.map((video, i) => {
          return (
            <Video
              key={i}
              index={i}
              currentIndex={currentStep}
              src={video.url}
              background={video.background}
            />
          )
        })}
      </div>
      <div className="z-20 absolute w-full bottom-0 h-40 grid place-items-center">
        <div className=" flex items-center justify-center gap-1">
          {onboardingVideos.map((_, i) => {
            return (
              <div
                onClick={() => setCurrentStep(i)}
                key={i}
                className={cn(
                  'w-10 h-2 rounded-full shrink-0 cursor-pointer',
                  i === currentStep
                    ? 'bg-emerald-500'
                    : i < currentStep
                      ? 'bg-emerald-700'
                      : 'bg-emerald-100'
                )}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
