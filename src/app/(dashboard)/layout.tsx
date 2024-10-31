import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'

const videos = [
  'https://cdn.dribbble.com/userupload/17017857/file/original-62fa9969e36f163fedf9f0823f65a93d.mp4',
  'https://cdn.dribbble.com/userupload/16365481/file/original-527fee647d12f31fce8a309ad136c4bb.mp4',
  'https://cdn.dribbble.com/userupload/3512180/file/original-911726969e930ec1a9de928a210eaa08.mp4',
  'https://cdn.dribbble.com/userupload/4213115/file/original-1661378315d11a8600261da1893292fd.mp4',
  'https://cdn.dribbble.com/userupload/3925721/file/original-9f49796a94f8c249cc575f6d0be5a3f8.mp4',
  'https://cdn.dribbble.com/userupload/11681192/file/original-2677420fe8d1476f6dc2305c74e8021a.mp4',
  'https://cdn.dribbble.com/userupload/4058457/file/original-2f84bd66ad476bc7eadb281678faf536.mp4',
  'https://cdn.dribbble.com/users/32512/screenshots/14472718/media/770b5947d658142698a7dca576bec7d6.mp4',
  'https://cdn.dribbble.com/userupload/4271286/file/original-065578eef467715ef66ef5b0eb3a0162.mp4',
  'https://cdn.dribbble.com/userupload/4275120/file/original-f83b965091a5c2d9dcf864d168f12341.mp4'
]

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* <video muted autoPlay loop className="fixed inset-0 w-full h-full z-0 object-cover" src={videos[videos.length - 1]}></video> */}
      {/* <div className="bg-zinc-100 dark:bg-zinc-900 bg-opacity-50 backdrop-blur-md dark:bg-opacity-50 fixed inset-0 w-full h-full"></div> */}
      <div className="bg-gradient-to-b from-zinc-200 to-sky-100 dark:from-zinc-700 dark:to-zinc-900 fixed inset-0 w-full h-full"></div>
      <main className="flex flex-col min-h-dvh w-full relative">
        <Header />
        <section className="flex-grow w-full flex px-5 gap-4 h-dvh">
          <Sidebar />
          <div className="flex-grow overflow-y-auto pb-5 pt-24 scroll-hidden">
            {children}
          </div>
        </section>
      </main>
    </>
  )
}
