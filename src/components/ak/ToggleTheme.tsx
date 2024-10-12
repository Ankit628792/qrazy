"use client"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

function ToggleTheme() {
    const { setTheme } = useTheme()
    return (
        <div className="w-full flex flex-col items-center z-50 cursor-pointer">
            <Sun onClick={() => setTheme("light")} className="w-7 h-7 dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0" />
            <Moon onClick={() => setTheme("dark")} className="absolute w-7 h-7 dark:rotate-90 dark:scale-0 transition-all rotate-0 scale-100" />
        </div>
    )
}

export default ToggleTheme