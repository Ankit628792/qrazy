"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SearchSelect from "../ui/search-select";
import SaveOptions from "../ak/SaveOptions";
import { cn } from "@/lib/utils";
import Error from "../ui/error";
import { useSettingsStore } from "@/store/settings.store";

const options = [
  { id: 1, value: "1", label: "Option 1" },
  { id: 2, value: "2", label: "Option 2" },
  { id: 3, value: "3", label: "Option 3" },
];

function CompanyContact() {
  const [country, setCountry] = useState<string>("");

  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="font-medium -mb-2">Company Contact</h1>
        <SaveOptions visible onSave={() => {}} onCancel={() => {}} />
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="e.g. 123 Main St, New Delhi"
            className={cn("2xl:text-lg")}
          />
          <Error error="Error here" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="pinCode">Pin Code</Label>
            <Input
              type="text"
              id="pinCode"
              placeholder="e.g. 110053"
              className={cn("2xl:text-lg")}
            />
            <Error error="Error here" />
          </div>
          <div className="w-full">
            <Label htmlFor="location">Country</Label>
            <SearchSelect
              value={country}
              onChange={setCountry}
              options={options}
            />
            <Error error="Error here" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              type="text"
              id="contactEmail"
              placeholder="e.g. contact@delanki.com"
              className={cn("2xl:text-lg")}
            />
            <Error error="Error here" />
          </div>
          <div className="w-full">
            <Label htmlFor="contactNumber">
              Contact Number{" "}
              <span className="text-xs italic text-right opacity-50">
                (* include country code)
              </span>
            </Label>
            <Input
              type="tel"
              id="contactNumber"
              placeholder="e.g. +911234567890"
              className={cn("2xl:text-lg")}
            />
            <Error error="Error here" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyContact;
