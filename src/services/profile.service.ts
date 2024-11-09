import { post } from './HttpService';

export const postOnboarding = (data: {
    businessName: string,
    gstNo: string,
    logo: string,
    websiteUrl: string,
    thumbnail: string | null,
    description: string,
    address: {
        address: string,
        country: string,
        state: string | null | undefined,
        pincode: number | string
    },
    contactDetail: {
        customerCareEmail: string,
        contactNumber: string
    }
}) => {
    console.log(data)
    return post('/business', data)
}

