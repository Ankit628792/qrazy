'use client'

import React, { useState } from 'react'
import PersonalDetail from './PersonalDetail'
import CompanyInformation from './CompanyInformation'
import CompanyContact from './CompanyContact'
import ProfileCard from './ProfileCard'
import ResetPassword from './ResetPassword'
import CompleteOnboarding from './CompleteOnboarding'
import { useQuery } from '@tanstack/react-query'
import { getOnboarding } from '@/services/profile.service'

export interface IProfileCard {
  profileImage: string
  fullName: string
  location: string
  companyURL: string
}

export interface IPersonalDetailsCard {
  firstName: string
  lastName: string
  email: string
}

export interface ICompanyDetailsCard {
  businessName: string
  gstNumber: string
  aboutYourCompany: string
  companyURL: string
}

export interface ICompanyContactCard {
  address: string
  pinCode: string
  country: string
  contactEmail: string
  contactNumber: string
}

export interface ISettingsState {
  profileCard: IProfileCard
  personalDetailsCard: IPersonalDetailsCard
  companyDetailsCard: ICompanyDetailsCard
  companyContactCard: ICompanyContactCard
}

function Settings() {
  const { data } = useQuery({ queryKey: ["settings"], queryFn: getOnboarding, retry: false })

  const dataFormat = {
    "success": true,
    "message": "get_business_details",
    "data": {
      "id": "33d42a15-0dc8-464e-9759-40638fb93d19",
      "businessName": "Amul",
      "gstNo": "",
      "logo": "blob:http://localhost:3000/0b48cfc4-6ac3-40fa-97b5-9e54d41bf6ea",
      "websiteUrl": "https://gptgo.ai",
      "thumbnail": "blob:http://localhost:3000/0b48cfc4-6ac3-40fa-97b5-9e54d41bf6ea",
      "description": "we are the milk product company",
      "address": {
        "address": "New Delhi, India, South Asia",
        "country": "Option 2",
        "state": "",
        "pincode": 110078
      },
      "contactDetail": {
        "customerCareEmail": "ankit628792@gmail.com",
        "contactNumber": "+919818451195"
      }
    }
  }

  console.log({ data })
  const [rootLevelState, setRootLevelState] = useState({
    profileCard: {
      profileImage:
        'https://images.unsplash.com/photo-1685113177022-84ece209ba8d',
      fullName: 'Delanki India',
      location: 'United States of America & Atlanta',
      companyURL: 'www.delanki.com'
    },
    personalDetailsCard: {
      firstName: 'Ankit',
      lastName: 'Kumar',
      email: 'ankit@gmail.com'
    },
    companyDetailsCard: {
      businessName: 'Delanki India',
      gstNumber: '1234512345',
      aboutYourCompany: 'Create a beautiful website for your business.',
      companyURL: 'google.com'
    },
    companyContactCard: {
      address: 'Delanki India',
      pinCode: '110053',
      country: 'India',
      contactEmail: 'test@gmail.com',
      contactNumber: '+918787676545'
    }
  })
  return (
    <section className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:max-w-xs xl:max-w-sm flex flex-col gap-2.5">
        <ProfileCard profileCard={rootLevelState.profileCard} />
        <ResetPassword />
      </div>
      <div className="flex-grow flex flex-col gap-2 rounded-3xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-3">
        <PersonalDetail
          personalDetailsCard={rootLevelState.personalDetailsCard}
        />
        {
          data?.data
            ?
            <>
              <CompanyInformation
                companyDetailsCard={rootLevelState.companyDetailsCard}
              />
              <CompanyContact
                companyContactCard={rootLevelState.companyContactCard}
              />
            </>
            :
            <CompleteOnboarding />
        }
      </div>
    </section>
  )
}

export default Settings
