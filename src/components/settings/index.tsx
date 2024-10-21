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

export interface IResetPasswordCard {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IPersonalDetailsCard {
  fullName: string;
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
  resetPasswordCard: IResetPasswordCard;
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
    resetPasswordCard: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    personalDetailsCard: {
      fullName: "Ankit",
      lastName: "Kumar",
      email: "ankit@gmail.com",
    },
    companyDetailsCard: {
      bussinessName: "",
      gstNumber: "",
      aboutYourCompany: "",
      companyURL: "",
    },
    companyContactCard: {
      address: "",
      pinCode: "",
      country: "",
      contactEmail: "",
      contactNumber: "",
    },
  });
  return (
    <section className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:max-w-xs xl:max-w-sm flex flex-col gap-2.5">
        <ProfileCard profileCard={rootLevelState.profileCard} />
        <ResetPassword />
      </div>
      <div className="flex-grow flex flex-col gap-2 rounded-3xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-3">
        <PersonalDetail />
        <CompanyInformation />
        <CompanyContact />
      </div>
    </section>
  );
}

export default Settings;
