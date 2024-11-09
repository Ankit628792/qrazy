"use client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { forgotPassword, login, me, register, resetPassword, updatePassword } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { setToken, showError, showInfo, showSuccess } from "@/lib"
import { postOnboarding } from "@/services/profile.service"

interface Error {
    success: boolean,
    message: string,
    errors: any
}

interface Success {
    success: boolean,
    message: string,
    data: any
}


function useMe() {
    return useQuery({
        queryKey: ["validateToken"],
        queryFn: () => me(),
        retry: false
    });
}

export default useMe;


export const useLogin = (err: Function) => {
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
            if (res.success) {
                showSuccess(res.message);
                setToken(res?.data?.token, res?.data?.expiresIn.token)
                router.replace("/settings")
            }
            else {
                showError(res.message)
            }
        },
        onError: (error: Error) => {
            // Handle error
            if (typeof err === "function") {
                // err(error?.errors)
            }
            showError(error.message)
            console.error("Error logging in:", error)
        }
    })
}

export const useRegister = (callback?: Function, err?: Function) => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: register,
        onSuccess: (res: any) => {
            // Handle success
            console.log(res)
            if (res.success) {
                showSuccess(res.message);
                showInfo("Verification Email is sent");
                if (typeof callback === "function") {
                    callback();
                }
            }
        },
        onError: (error: Error) => {
            // Handle error
            if (typeof err === "function") {
                err(error?.errors)
            }
            showError(error.message)
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

export const usePostOnboarding = () => {
    return useMutation({
        mutationKey: ["postOnboarding"],
        mutationFn: postOnboarding,
        onSuccess: (res: any) => {
            console.log(res)
            if (res.success) {
                showSuccess(res.message);
            }
            // Handle success
            console.log(res)
        },
        onError: (error) => {
            showError(error.message);
            // Handle error
            console.error("Error posting onboarding data:", error)
        }
    })
}