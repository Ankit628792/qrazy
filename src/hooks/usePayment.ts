import { useRazorpay, RazorpayOrderOptions } from "react-razorpay"; import { useState } from 'react';
import { useCreateQROrder } from './qr/useCreateQROrder';
import { useRouter } from "next/navigation";

const usePayment = () => {
    const [success, setSuccess] = useState<any>(false)
    const router = useRouter();
    const { error, isLoading, Razorpay } = useRazorpay();
    const { mutate: createQROrder, ...props } = useCreateQROrder(({ data }: any) => {
        const options: RazorpayOrderOptions = {
            ...data,
            handler: function (response: any) {
                console.log("PAYMENT SUCCESS")
                setSuccess({ ...data });
                setTimeout(() => {
                    router.push('/qrs')
                }, 2000);

            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response: any) {
            console.log("FAILED ", response)
        });

        rzp1.open();
    })

    return { success, setSuccess, createQROrder, ...props, isPending: (isLoading || props.isPending) }
}


export default usePayment
