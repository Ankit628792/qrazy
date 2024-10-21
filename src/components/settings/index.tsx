"use client";

import React, { useState } from "react";
import PersonalDetail from "./PersonalDetail";
import CompanyInformation from "./CompanyInformation";
import CompanyContact from "./CompanyContact";
import ProfileCard from "./ProfileCard";
import ResetPassword from "./ResetPassword";

export interface IProfileCard {
  profileImage: string;
  fullName: string;
  location: string;
  companyURL: string;
}

export interface IPersonalDetailsCard {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ICompanyDetailsCard {
  bussinessName: string;
  gstNumber: string;
  aboutYourCompany: string;
  companyURL: string;
}

export interface ICompanyContactCard {
  address: string;
  pinCode: string;
  country: string;
  contactEmail: string;
  contactNumber: string;
}

export interface ISettingsState {
  profileCard: IProfileCard;
  personalDetailsCard: IPersonalDetailsCard;
  companyDetailsCard: ICompanyDetailsCard;
  companyContactCard: ICompanyContactCard;
}

function Settings() {
  const [rootLevelState, setRootLevelState] = useState({
    profileCard: {
      profileImage:
        "https://images.unsplash.com/photo-1685113177022-84ece209ba8d",
      fullName: "Delanki India",
      location: "United States of America & Atlanta",
      companyURL: "www.delanki.com",
    },
    personalDetailsCard: {
      firstName: "Ankit",
      lastName: "Kumar",
      email: "ankit@gmail.com",
    },
    companyDetailsCard: {
      bussinessName: "Delanki India",
      gstNumber: "1234512345",
      aboutYourCompany: "Create a beautiful website for your business.",
      companyURL: "google.com",
    },
    companyContactCard: {
      address: "Delanki India",
      pinCode: "110053",
      country: "India",
      contactEmail: "test@gmail.com",
      contactNumber: "+918787676545",
    },
  });
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
        <CompanyInformation
          companyDetailsCard={rootLevelState.companyDetailsCard}
        />
        <CompanyContact
          companyContactCard={rootLevelState.companyContactCard}
        />
      </div>
    </section>
  );
}

export default Settings;
