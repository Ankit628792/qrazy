import useOnboardingStore from './store/onboarding.store'
import { AnimationBox } from './components/animation-box'
import { OnBoardingQuestions } from './components/onboarding-questions'
import { LogoText } from '@/components'

export const OnBoardingComponent = () => {
  const { currentStep, setCurrentStep } = useOnboardingStore()
  return (
    <section className="p-5 flex-grow flex gap-5 xl:gap-10 bg-white dark:bg-zinc-900">
      <div className="absolute top-3 left-5 z-10">
        <LogoText />
      </div>
      <OnBoardingQuestions
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <AnimationBox currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </section>
  )
}
