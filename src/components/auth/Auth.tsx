import Logo from "@/components/ak/Logo"
import { cn } from "@/lib/utils"
import Link from "next/link"

const images = [
    "https://cdn.dribbble.com/userupload/4972790/file/original-963f1a25237cfee6042f3231de26e03b.jpg",
    "https://cdn.dribbble.com/users/879147/screenshots/15629321/media/3a1a92cf292b30dcfc4296e3a0195fa1.jpeg",
    // "https://cdn.dribbble.com/users/879147/screenshots/11917345/media/d416df6e4a1c7d79975c43f3987a4d8b.jpeg",
    "https://cdn.dribbble.com/users/879147/screenshots/15843427/media/4cec4239ac4dff78979bc8d5e9ad8678.jpeg",
    "https://cdn.dribbble.com/users/879147/screenshots/11957488/media/5e88c37f53fee6054ddb5ad16eb08c69.jpeg",
    "https://cdn.dribbble.com/users/902546/screenshots/3988111/artboard_1.png",
    // gif
    "https://cdn.dribbble.com/userupload/4399623/file/original-355a41a8db20c5b9e043b4bb3d512ec9.gif",
    "https://cdn.dribbble.com/userupload/8694723/file/original-da472a4caa7d10c823fee91132afe19b.gif",
    "https://cdn.dribbble.com/userupload/8880711/file/original-066cba4d1b4cb926bc5266eb403e582f.gif"

]

function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)]
}

function Auth({
    children,
    type
}: Readonly<{
    children: React.ReactNode;
    type: string; // "login" or "register"
}>) {
    return (
        <section className={cn("w-full flex h-dvh bg-zinc-900 dark:bg-white", type == "register" ? "flex-row-reverse" : "")}>
            <div className={cn("w-full lg:w-1/2 p-10 bg-white dark:bg-zinc-900 grid place-items-center relative")}>
                <div className="flex flex-col gap-2 w-full max-w-sm xl:max-w-md">
                    <Logo />
                    {children}
                </div>

                <div className="text-base flex flex-wrap gap-2 justify-between w-full absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex-shrink-0">Copyright&copy;2023
                        <Link href={""} className="text-yellow-500 px-1 font-medium">
                            Delanki
                        </Link>
                    </div>
                    <div className="flex-shrink-0 space-x-4">
                        <Link href={""} className="text-yellow-500 font-medium">
                            Privacy Policy
                        </Link>
                        <Link href={""} className="text-yellow-500 font-medium">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block w-1/2 relative">
                <div className="absolute inset-0 z-10 bg-white dark:bg-zinc-900 bg-opacity-5 dark:bg-opacity-5"></div>
                <img src={getRandomImage()} className="w-full h-full object-cover object-center" alt="" />
            </div>
        </section>
    )
}

export default Auth