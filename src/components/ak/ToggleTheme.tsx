"use client"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

function ToggleTheme() {
    const { setTheme } = useTheme()
    return (
        <div className="w-full flex items-center fixed top-2 left-2 z-50 cursor-pointer">
            <Sun onClick={() => setTheme("dark")} className="w-8 h-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon onClick={() => setTheme("light")} className="absolute w-8 h-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
    )
}

export default ToggleTheme