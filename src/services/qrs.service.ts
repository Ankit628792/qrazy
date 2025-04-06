import { get, post } from "./HttpService";

type OrderProduct = {
    "productId": string;
    "quantity": number,
    "expiryDate": Date;
    "mrl": number;
}
interface IOrderQR {
    "qrOrders": OrderProduct[];
    "qrType": string;
    "templateId": string;
}

export interface ITransactionId {
    "razorpayOrderId"?: string;
    "orderId"?: string;
}

export const orderQR = (data: IOrderQR) => post("/qr/order", data)

export const getOrderHistory = () => get("/qr/orderDetails")

export const getOrderDetails = (data: ITransactionId) => {
    const key = Object.keys(data)[0]
    if (key) {
        // @ts-ignore
        return get(`/qr/orderDetail?${key}=${data[key] as string}`)
    }
}

export const getQrCodeList = ({ orderId }: {
    orderId: string
}) => {
    return get("/qr/qrCodes/" + orderId)
}