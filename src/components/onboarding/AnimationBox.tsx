import { cn } from '@/lib/utils';
import React, { useEffect } from 'react'

const videos = [
  {
    id: 0,
    url: "https://cdn.dribbble.com/userupload/3536595/file/original-a1b3608bafa81a5c6d1cfdd7e52f7cf7.mp4",
    background: "bg-[#A0D9B5]",
  },
  {
    id: 1,
    url: "https://cdn.dribbble.com/userupload/3230430/file/original-33c1104902e73d1598b323a01a908862.mp4",
    background: "bg-[#A8D3D8]",
  },
  {
    id: 2,
    url: "https://cdn.dribbble.com/userupload/3491211/file/original-a8ecefbc723c3a14421c0e47b0cfe500.mp4",
    background: "bg-[#B2DEC4]",
  },
  {
    id: 3,
    url: "https://cdn.dribbble.com/userupload/3500007/file/original-a895cf5073002b46352a9eccd7c85b98.mp4",
    background: "bg-[#B1DEC2]"
  },
]

const preloadVideos = () => {
  videos.forEach((video) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = video.url;
    link.as = 'video';
    document.head.appendChild(link);
  });
};

function AnimationBox({ index, setIndex }: { index: number, setIndex: (index: number) => void }) {

  useEffect(() => {
    preloadVideos();
  }, []);

  return (
    <div className='relative flex-grow rounded-3xl w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl flex-col hidden lg:flex'>
      <div className='rounded-3xl flex-grow w-full relative snap-x snap-mandatory overflow-x-auto scroll-hidden select-none bg-[#A0D9B5] hidden lg:flex'>
        {
          videos.map((video, i) => {
            return <Video key={i} index={i} currentIndex={index} src={video.url} background={video.background} />
          })
        }
      </div>
      <div className='z-20 absolute w-full bottom-0 h-40 grid place-items-center'>
        <div className=' flex items-center justify-center gap-1'>
          {
            videos.map((_, i) => {
              return <div onClick={() => setIndex(i)} key={i} className={cn('w-10 h-2 rounded-full shrink-0 cursor-pointer', i === index ? 'bg-emerald-500' : i < index ? 'bg-emerald-700' : 'bg-emerald-100')} />
            })
          }
        </div>
      </div>
    </div>

  )
}

export default AnimationBox

const Video = ({ index, src, currentIndex, background }: { index: number, currentIndex: number, src: string, background: string }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (index === currentIndex) {
        videoRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentIndex, index])

  return (
    <div className={'w-full shrink-0 h-full relative ' + background}>
      {/* <div className='absolute bottom-0 left-0 right-0 w-full h-48 bg-white bg-opacity-20 backdrop-blur-sm z-20' /> */}
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