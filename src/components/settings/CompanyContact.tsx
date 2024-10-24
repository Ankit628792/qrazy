"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SearchSelect from "../ui/search-select";
import SaveOptions from "../ak/SaveOptions";
import { cn } from "@/lib/utils";
import Error from "../ui/error";
import { ICompanyContactCard } from ".";
import * as Yup from "yup";

const options = [
  { id: 1, value: "1", label: "Option 1" },
  { id: 2, value: "2", label: "Option 2" },
  { id: 3, value: "3", label: "Option 3" },
];

interface ICompanyDetailsCard {
  companyContactCard: ICompanyContactCard;
}

const companyContactSchema = Yup.object({
  address: Yup.string().required("Address is required"),
  pinCode: Yup.string().required("Pin Code is required"),
  country: Yup.string().required("Country is required"),
  contactEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  contactNumber: Yup.string()
    .test('starts-with-plus', 'Contact number must start with +', (value) => {
      return value && value.startsWith('+'); // Ensure the number starts with "+"
    })
    .test('valid-length', 'Contact number must be between 7 and 15 digits long', (value) => {
      return value && value.length >= 7 && value.length <= 15; // Ensure the length is between 7-15 digits
    })
    .test('only-digits-after-plus', 'Contact number should contain only digits after +', (value) => {
      return /^[+][0-9]+$/.test(value); // Ensure only digits follow after "+"
    })
    .required("Contact number is required"),
});

function CompanyContact({
  companyContactCard = {
    address: "",
    pinCode: "",
    country: "",
    contactEmail: "",
    contactNumber: "",
  },
}: ICompanyDetailsCard) {
  const [companyContactForm, setCompanyContactForm] =
    useState<ICompanyContactCard>(companyContactCard);
  const [country, setCountry] = useState<string>("");
  const [idealState, setIdealState] =
    useState<ICompanyContactCard>(companyContactCard);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string | null>>({
    address: null,
    pinCode: null,
    country: null,
    contactEmail: null,
    contactNumber: null,
  });

  useEffect(() => {
    if (
      companyContactForm.address === idealState.address &&
      companyContactForm.pinCode === idealState.pinCode &&
      companyContactForm.country === idealState.country &&
      companyContactForm.contactEmail === idealState.contactEmail &&
      companyContactForm.contactNumber === idealState.contactNumber
    ) {
      setShowSaveButton(false);
    } else {
      setShowSaveButton(true);
    }
  }, [companyContactForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyContactForm({
      ...companyContactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (option: Option) => {
    setCountry(option.value);
    setCompanyContactForm({
      ...companyContactForm,
      country: option.label,
    });
    setErrors({ ...errors, country: "" });
  };

  const handleSave = async () => {
    try {
      await companyContactSchema.validate(companyContactForm, {
        abortEarly: false,
      });
      console.log("Form:", companyContactForm);
      setErrors({});
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: companyContactForm,
        errors: validationErrors,
      });
    }
  };

  const handleCancel = () => {
    setCompanyContactForm(idealState);
    setErrors({});
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="font-medium -mb-2">Company Contact</h1>
        <SaveOptions
          visible={showSaveButton}
          onSave={() => handleSave()}
          onCancel={handleCancel}
        />
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-2">
        <div className="w-full">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="e.g. 123 Main St, New Delhi"
            className={cn("2xl:text-lg")}
            value={companyContactForm.address}
            name="address"
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, address: "" })}
          />
          <Error error={errors.address} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="pinCode">Pin Code</Label>
            <Input
              type="text"
              id="pinCode"
              placeholder="e.g. 110053"
              className={cn("2xl:text-lg")}
              name="pinCode"
              value={companyContactForm.pinCode}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, pinCode: "" })}
            />
            <Error error={errors.pinCode} />
          </div>
          <div className="w-full">
            <Label htmlFor="location">Country</Label>
            <SearchSelect
              selectedValue={country}
              options={options}
              onChange={handleSelect}
            />
            <Error error={errors.country} />
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
              name="contactEmail"
              value={companyContactForm.contactEmail}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, contactEmail: "" })}
            />
            <Error error={errors.contactEmail} />
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
              name="contactNumber"
              value={companyContactForm.contactNumber}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, contactNumber: "" })}
            />
            <Error error={errors.contactNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyContact;
