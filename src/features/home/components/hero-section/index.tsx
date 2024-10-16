import { SparklesCore } from '@/features/home/components/sparkles'
import { Cover } from '../cover'

type HeroSectionProps = {
  title?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
}

export const HeroSection = ({
  title = 'QRAZY',
  background = 'transparent',
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  particleColor = '#FFFFFF'
}: HeroSectionProps) => {
  return (
    <div className="h-[70vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="flex md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        <div>
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Build amazing websites <br /> at <Cover>warp speed</Cover>
          </h1>
        </div>
      </h1>
      <div className="w-[70rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background={background}
          minSize={minSize}
          maxSize={maxSize}
          particleDensity={particleDensity}
          particleColor={particleColor}
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  )
}
