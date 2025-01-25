import { get, post, put } from './HttpService';

export interface Onboarding {
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
    return post('/business/', data)
}

export const getOnboarding = () => get('/business/');
export const updateOnboarding = (data: Onboarding) => put('/business/', data)

