"use client"
import { useMutation } from "@tanstack/react-query"
import { forgotPassword, login, register, resetPassword, updatePassword } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { setToken, showError, showInfo, showSuccess } from "@/lib"


export const useLogin = () => {
    const router = useRouter()
    return useMutation({
        mutationKey: ["login"],
        mutationFn: login,
        onSuccess: (res: any) => {
            let format = {
                "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMDc2YzJlZS1jMjcxLTRjMzYtOThjMi0wNGVjOWMwZTY0NjEiLCJpYXQiOjE3MzA5NjUyMTcsImV4cCI6MTczMDk2ODgxN30.q0CW98vcWPaPwDYI-AmeSmToo1W84nguBaRs6J83BJQ",
                "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMDc2YzJlZS1jMjcxLTRjMzYtOThjMi0wNGVjOWMwZTY0NjEiLCJpYXQiOjE3MzA5NjUyMTcsImV4cCI6MTczMTA1MTYxN30.mqHmNAILpqucuGtiftD-TP6cctgnGQ-39gUShqNQDu8",
                "expiresIn": {
                    "token": 3600000,
                    "refreshToken": 604800000
                }
            }
            console.log(res)
            if (res.success) {
                showSuccess(res.message);
                setToken(res?.data?.token)
                router.replace("/")
            }
            else {
                showError(res.message)
            }
        },
        onError: (error, variables, context) => {
            // Handle error
            console.error("Error logging in:", error)
        }
    })
}

export const useRegister = (callback?: Function) => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: register,
        onSuccess: (res: any) => {
            // Handle success
            console.log(res)
            if (res.success) {
                showError(res.message);
                showInfo("Verification Email is sent");
                if (typeof callback === "function") {
                    callback();
                }
            }
        },
        onError: (error) => {
            // Handle error
            console.error("Error registering:", error)
        }
    })
}

export const useForgotPassword = (callback?: Function, err?: Function) => {
    return useMutation({
        mutationKey: ["forgotPassword"],
        mutationFn: forgotPassword,
        onSuccess: (res: any) => {
            // Handle success
            console.log(res)
            if (res.success) {
                showSuccess(res.message);
                if (typeof callback === "function") {
                    callback();
                }
            }
            else {
                if (typeof err === "function") {
                    err(res.message);
                }
            }
        },
        onError: (error) => {
            // Handle error
            console.error("Error forgotting password:", error)
        }
    })
}

export const useResetPassword = (callback?: Function) => {
    return useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: resetPassword,
        onSuccess: (res: any) => {
            // Handle success
            console.log(res)
            if (res.success) {
                showSuccess(res.message);
                if (typeof callback === "function") {
                    callback();
                }
            }
        },
        onError: (error) => {
            // Handle error
            console.error("Error updating password:", error)
        }
    })
}

export const useUpdatePassword = () => {
    return useMutation({
        mutationKey: ["updatePassword"],
        mutationFn: updatePassword,
        onSuccess: (res: any) => {
            if (res.success) {
                showSuccess(res.message);
            }
            // Handle success
            console.log(res)
        },
        onError: (error) => {
            // Handle error
            console.error("Error updating password:", error)
        }
    })
}