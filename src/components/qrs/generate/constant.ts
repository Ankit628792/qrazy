import { faker } from "@faker-js/faker"


export const productQRList = Array(10).fill(1).map((_, i) => {
    let dt = {
        id: faker.number.int({ min: 100, max: 10000 }),
        productId: faker.database.mongodbObjectId(),
        productTitle: faker.commerce.productName(),
        qrs: Array(100).fill(1).map(() => faker.finance.accountNumber())
    }
    return dt
})

export const generateQRList = () => {
    return Array(10).fill(1).map((_, i) => {
        let dt = {
            id: faker.number.int({ min: 100, max: 10000 }),
            productId: faker.database.mongodbObjectId(),
            productTitle: faker.commerce.productName(),
            qrs: Array(100).fill(1).map(() => faker.finance.accountNumber())
        }
        return dt
    })
}