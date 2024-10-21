import { create } from "zustand";

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

  setProfileCard: (profileCard: IProfileCard) => void;
  setResetPasswordCard: (resetPasswordCard: IResetPasswordCard) => void;
  setPersonalDetailsCard: (personalDetailsCard: IPersonalDetailsCard) => void;
  setCompanyDetailsCard: (companyDetailsCard: ICompanyDetailsCard) => void;
  setCompanyContactCard: (companyContactCard: ICompanyContactCard) => void;
}

const useSettingsStore = create<ISettingsState>((set) => ({
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
    fullName: "",
    lastName: "",
    email: "",
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

  setProfileCard: (profileCard) => set({ profileCard }),
  setResetPasswordCard: (resetPasswordCard) => set({ resetPasswordCard }),
  setPersonalDetailsCard: (personalDetailsCard) => set({ personalDetailsCard }),
  setCompanyDetailsCard: (companyDetailsCard) => set({ companyDetailsCard }),
  setCompanyContactCard: (companyContactCard) => set({ companyContactCard }),
}));

export { useSettingsStore };
