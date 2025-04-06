'use client'

import React, { useEffect, useState } from 'react'
import PersonalDetail from './PersonalDetail'
import CompanyInformation from './CompanyInformation'
import CompanyContact from './CompanyContact'
import ProfileCard from './ProfileCard'
import ResetPassword from './ResetPassword'
import CompleteOnboarding from './CompleteOnboarding'
import { useQuery } from '@tanstack/react-query'
import { getOnboarding, Onboarding } from '@/services/profile.service'
import Loader from '../ak/Loader'
import { useAdminStore } from '@/store/admin.store'
import { usePutOnboarding } from '@/hooks'

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
  const { data, isLoading, isFetching, error } = useQuery({ queryKey: ["settings"], queryFn: getOnboarding, retry: false })
  const { admin } = useAdminStore()

  const [rootLevelState, setRootLevelState] = useState<{
    profileCard: IProfileCard;
    personalDetailsCard: IPersonalDetailsCard;
    companyDetailsCard: ICompanyDetailsCard;
    companyContactCard: ICompanyContactCard;
  } | undefined>()

  useEffect(() => {
    if (data?.data && !isFetching) {

      const info = data?.data

      const formattedData = {
        profileCard: {
          profileImage: 'https://images.unsplash.com/photo-1685113177022-84ece209ba8d',
          fullName: info.businessName,
          location: info.address.address + ", " + info.address.state + ", " + info.address.country,
          companyURL: info.websiteUrl
        },
        personalDetailsCard: {
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email
        },
        companyDetailsCard: {
          businessName: info.businessName,
          gstNumber: info.gstNo,
          aboutYourCompany: info.description,
          companyURL: info.websiteUrl
        },
        companyContactCard: {
          address: info.address.address,
          pinCode: info.address.pincode.toString(),
          country: info.address.country,
          contactEmail: info.contactDetail.customerCareEmail,
          contactNumber: info.contactDetail.contactNumber
        }
      }
      setRootLevelState(formattedData)
    }
    else if (!isFetching) {
      setRootLevelState(undefined)
    }

  }, [data, isFetching])

  const { mutate, isPending } = usePutOnboarding()
  const onSave = (data: { personalDetailsCard: IPersonalDetailsCard } | { companyContactCard: ICompanyContactCard } | { companyDetailsCard: ICompanyDetailsCard }) => {
    setRootLevelState(prev => {
      return { ...prev, ...data }
    })

    const info = { ...rootLevelState, ...data };
    let formattedData: Onboarding = {
      "businessName": info.companyDetailsCard?.businessName as string,
      "gstNo": info.companyDetailsCard?.gstNumber as string,
      "logo": info.profileCard?.profileImage as string,
      "websiteUrl": info.companyDetailsCard?.companyURL as string,
      "thumbnail": info.profileCard?.profileImage as string,
      "description": info.companyDetailsCard?.aboutYourCompany as string,
      "address": {
        "address": info.companyContactCard?.address as string,
        "country": info.companyContactCard?.country as string,
        "state": "",
        "pincode": info.companyContactCard?.pinCode as string
      },
      "contactDetail": {
        "customerCareEmail": info.companyContactCard?.contactEmail as string,
        "contactNumber": info.companyContactCard?.contactNumber as string
      }
    }

    mutate(formattedData)
  }

  if (isLoading) {
    return <Loader />
  }

  if ((!rootLevelState || (admin && !admin?.isClientOnboarded))) {
    return <CompleteOnboarding />
  }

  return (
    <section className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:max-w-xs xl:max-w-sm flex flex-col gap-2.5">
        <ProfileCard profileCard={rootLevelState?.profileCard} />
        <ResetPassword />
      </div>
      <div className="flex-grow flex flex-col gap-2 rounded-3xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-3">
        <PersonalDetail
          onSave={onSave}
          isPending={isPending}
          personalDetailsCard={rootLevelState?.personalDetailsCard}
        />
        {
          data?.data
            ?
            <>
              <CompanyInformation
                onSave={onSave}
                isPending={isPending}
                companyDetailsCard={rootLevelState?.companyDetailsCard}
              />
              <CompanyContact
                onSave={onSave}
                isPending={isPending}
                companyContactCard={rootLevelState?.companyContactCard}
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
