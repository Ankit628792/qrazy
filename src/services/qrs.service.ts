import { post } from "./HttpService";

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

export const orderQR = (data: IOrderQR) => post("/qr/order", data)