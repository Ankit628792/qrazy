import React from 'react'
import SearchSelect from '@/shadcn-ui/search-select'
import UploadLogo from '@/components/atoms/inputs/custom-upload'
import Link from 'next/link'
import { cn } from '@/libs/utils'
import { Input } from '@/shadcn-ui/input'
import { Label } from '@/shadcn-ui/label'
import { Textarea } from '@/shadcn-ui/textarea'
import { Button } from '@/shadcn-ui/button'
import { ROUTES } from '@/shared/shared.interface'
import useOnboardingStore from '../../store/onboarding.store'

type OnBoardingQuestionsProps = {
  currentStep: number
  setCurrentStep: (step: number) => void
}

const BasicInfo = () => {
  return (
    <div className=" space-y-4 py-4">
      <div className="w-full">
        <Label htmlFor="business" className="text-base">
          Business Name
        </Label>
        <Input
          type="text"
          id="business"
          placeholder="e.g. Amul, Nestlé, Tropicana "
          className={cn('2xl:text-lg')}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="lastName" className="text-base">
          GST No{' '}
          <span className="text-gray-500 text-xs md:text-sm">(optional)</span>
        </Label>
        <Input
          type="text"
          id="lastName"
          placeholder="e.g. 22AAAAA0000A1Z5"
          className={cn('2xl:text-lg')}
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="description" className="text-base">
          About your business
        </Label>
        <Textarea
          placeholder="e.g. We are a local bakery specializing in artisanal breads and pastries."
          id="description"
          className="h-40 overflow-y-auto"
        />
      </div>
    </div>
  )
}

const Personalization = () => {
  const [logo, setLogo] = React.useState<File | null>(null)

  return (
    <div className="space-y-4 py-4">
      <div className="w-full">
        <UploadLogo file={logo} handleChange={(file) => setLogo(file)} />
      </div>
      <div className="w-full">
        <Label htmlFor="website" className="text-base">
          Company Website
        </Label>
        <Input
          type="url"
          id="website"
          placeholder="e.g. https://www.delanki.com"
          className={cn('2xl:text-lg')}
        />
      </div>
    </div>
  )
}

const options = [
  { id: 1, value: '1', label: 'Option 1' },
  { id: 2, value: '2', label: 'Option 2' },
  { id: 3, value: '3', label: 'Option 3' }
]

const LocationInfo = () => {
  const [country, setCountry] = React.useState<string>('')
  return (
    <div className="space-y-4 py-4">
      <div className="w-full">
        <Label htmlFor="address" className="text-base">
          Address
        </Label>
        <Input
          type="text"
          id="address"
          placeholder="e.g. 123 Main St, New Delhi"
          className={cn('2xl:text-lg')}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="pinCode" className="text-base">
          Pin Code
        </Label>
        <Input
          type="text"
          id="pinCode"
          placeholder="e.g. 110053"
          className={cn('2xl:text-lg')}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="location" className="text-base">
          Country
        </Label>
        <SearchSelect value={country} onChange={setCountry} options={options} />
      </div>
    </div>
  )
}

const ContactInfo = () => {
  return (
    <div className="space-y-4 py-4">
      <div className="w-full">
        <Label htmlFor="contactEmail" className="text-base">
          Contact Email
        </Label>
        <Input
          type="text"
          id="contactEmail"
          placeholder="e.g. contact@delanki.com"
          className={cn('2xl:text-lg')}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="contactNumber" className="text-base">
          Contact Number{' '}
          <span className="text-xs italic text-right opacity-50">
            (* include country code)
          </span>
        </Label>
        <Input
          type="tel"
          id="contactNumber"
          placeholder="e.g. +911234567890"
          className={cn('2xl:text-lg')}
        />
        <p className="text-xs italic">* Please include country code</p>
      </div>
    </div>
  )
}

export const OnBoardingQuestions = ({
  currentStep,
  setCurrentStep
}: OnBoardingQuestionsProps) => {
  const { onboardingTitles } = useOnboardingStore()

  function renderComponent() {
    switch (currentStep) {
      case 0:
        return <BasicInfo />
      case 1:
        return <Personalization />
      case 2:
        return <LocationInfo />
      case 3:
        return <ContactInfo />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col flex-grow px-5 pb-5 pt-28 sm:px-10">
      <div className="flex-grow flex flex-col gap-3">
        <div className="flex items-center gap-4 -mb-2">
          <div className="flex items-center gap-1">
            {onboardingTitles.map((_, i) => {
              return (
                <div
                  key={i}
                  onClick={() => setCurrentStep(i)}
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
          <Link href={ROUTES.USER}>
            <p className="text-emerald-500 hover:text-emerald-700 cursor-pointer">
              Skip to Dashboard
            </p>
          </Link>
        </div>
        <p className="text-sm 2xl:text-base">
          {currentStep + 1} of {onboardingTitles.length}
        </p>
        <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-bold">
          {onboardingTitles[currentStep]}
        </h1>
        {renderComponent()}
      </div>
      <div className="flex items-center gap-10">
        <Button
          disabled={currentStep < 1}
          size={'lg'}
          className="min-w-36"
          onClick={() => setCurrentStep(currentStep > 0 ? currentStep - 1 : 0)}
        >
          <span className="text-lg">Previous</span>
        </Button>
        <Button
          size={'lg'}
          className="bg-emerald-500 hover:bg-emerald-700 dark:text-white min-w-36"
          onClick={() => setCurrentStep(currentStep < 3 ? currentStep + 1 : 3)}
        >
          <span className="text-lg">
            {currentStep == 3 ? 'Continue' : 'Next'}
          </span>
        </Button>
      </div>
    </div>
  )
}
