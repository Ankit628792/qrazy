"use server"
import { cookies } from "next/headers"

export const getCookie = async (name: string) => {
    const cookieStore = cookies()
    return cookieStore.get(name)?.value
}

export const setCookie = async (name: string, value: string, options: any = {}) => {
    const cookieStore = cookies()
    cookieStore.set(name, value, { ...options })
}

export const deleteCookie = (name: string) => {
    const cookieStore = cookies()
    cookieStore.delete(name)
}