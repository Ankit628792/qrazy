import { get, post, put } from './HttpService';

interface Onboarding {
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
}

export const postOnboarding = (data: Onboarding) => {
    console.log(data)
    return post('/business', data)
}

export const getOnboarding = () => get('/business/');
export const updateOnboarding = (data: Partial<Onboarding>) => put('/business', data)

