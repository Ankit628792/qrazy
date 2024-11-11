import { removeToken } from "@/lib";
import { logout } from "@/services/auth.service";
import { useAdminStore } from "@/store/admin.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
    const router = useRouter();
    const { setLoading, setAdmin } = useAdminStore();
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: logout,
        onMutate: () => {
            setLoading({
                state: true,
                text: "Logging out..."
            })
        },
        onSuccess: async (res: any) => {
            removeToken();
            setAdmin(null);
            router.replace("/login");
        },
        onError: (err: any) => {
            // Handle error
            console.error(err)
            if (typeof err === "function") {
                err();
            }
        },
        onSettled: () => {
            setLoading({
                state: false,
            })
        }
    });

}