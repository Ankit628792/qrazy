"use client";

import { useSettingsStore } from "@/store/settings.store";
import { GlobeLock } from "lucide-react";

const ProfileCard = () => {
  const { profileCard, setProfileCard } = useSettingsStore();
  return (
    <div className="w-full rounded-3xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm overflow-hidden lg:sticky lg:top-0">
      <div className="h-32 w-full">
        <img
          className="w-full h-full object-cover"
          src={"https://images.unsplash.com/photo-1513346940221-6f673d962e97"}
          alt=""
        />
      </div>
      <div className="-mt-12 z-10 relative px-5">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 group bg-white dark:bg-black">
            <img
              className="w-full h-full rounded-full object-cover"
              style={{ rotate: `y 180deg` }}
              src={profileCard.profileImage}
              alt=""
            />
          </div>
          <p className="text-xl font-bold mt-2">{profileCard.fullName}</p>
          <p className="hover:underline underline-offset-2 text-sm cursor-pointer line-clamp-1 hover:text-sky-500">
            {profileCard.companyURL}
          </p>
          <div className="flex flex-col items-end gap-0.5 absolute top-14 right-0 max-w-28 sm:max-w-60 lg:max-w-28 xl:max-w-40">
            <GlobeLock className="w-5 shrink-0" />
            <span className="text-xs sm:text-sm lg:text-xs xl:text-sm text-right">
              {profileCard.location}
            </span>
          </div>
        </div>
        <hr className="-mx-5 my-2" />
        <p className="text-xs pb-3 text-gray-500">Member since Aug 2023</p>
      </div>
    </div>
  );
};

export default ProfileCard;
