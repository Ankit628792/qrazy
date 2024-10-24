import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OnboardingTitles } from "@/lib/constants";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import UploadLogo from "../ak/UploadLogo";
import SearchSelect, { Option } from "../ui/search-select";
import Link from "next/link";
import * as Yup from "yup";
import Error from "../ui/error";
import { gstRegex } from "../settings/CompanyInformation";
import toast from "react-hot-toast";

type TError = Record<string, string | null>;

interface IBasicForm {
  business: string;
  gstNo: string;
  description: string;
}

interface IPesonlizationForm {
  logo: string | null | File;
  website: string;
}

interface ILocationInfoForm {
  address: string;
  pinCode: string;
  country: string;
}

interface IContactInfoForm {
  contactEmail: string;
  contactNumber: string;
}

export type IRootOnboardingForm = {
  basicInfo: IBasicForm;
  personalization: IPesonlizationForm;
  locationInfo: ILocationInfoForm;
  contactInfo: IContactInfoForm;
};

interface IProps<T> {
  index: number;
  onboardingRootForm: IRootOnboardingForm;
  initialValues: T;
  setOnboardingRootForm: (form: IRootOnboardingForm) => void;
  setIndex: (index: number) => void;
}

interface IQuestion {
  index: number;
  setIndex: (index: number) => void;
}

function Questions({ index, setIndex }: IQuestion) {
  const [onboardingRootForm, setOnboardingRootForm] =
    useState<IRootOnboardingForm>({
      basicInfo: {
        business: "",
        gstNo: "",
        description: "",
      },
      personalization: {
        logo: null,
        website: "",
      },
      locationInfo: {
        address: "",
        pinCode: "",
        country: "",
      },
      contactInfo: {
        contactEmail: "",
        contactNumber: "",
      },
    });
  const titles = OnboardingTitles;

  function renderComponent() {
    switch (index) {
      case 0:
        return (
          <BasicInfo
            index={index}
            onboardingRootForm={onboardingRootForm}
            initialValues={onboardingRootForm.basicInfo}
            setOnboardingRootForm={setOnboardingRootForm}
            setIndex={setIndex}
          />
        );
      case 1:
        return (
          <Personalization
            index={index}
            onboardingRootForm={onboardingRootForm}
            initialValues={onboardingRootForm.personalization}
            setOnboardingRootForm={setOnboardingRootForm}
            setIndex={setIndex}
          />
        );
      case 2:
        return (
          <LocationInfo
            index={index}
            onboardingRootForm={onboardingRootForm}
            initialValues={onboardingRootForm.locationInfo}
            setOnboardingRootForm={setOnboardingRootForm}
            setIndex={setIndex}
          />
        );
      case 3:
        return (
          <ContactInfo
            index={index}
            onboardingRootForm={onboardingRootForm}
            initialValues={onboardingRootForm.contactInfo}
            setOnboardingRootForm={setOnboardingRootForm}
            setIndex={setIndex}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col flex-grow px-5 pb-5 pt-28 sm:px-10">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 -mb-2">
          <div className="flex items-center gap-1">
            {titles.map((_, i) => {
              return (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "w-10 h-2 rounded-full shrink-0 cursor-pointer",
                    i === index
                      ? "bg-emerald-500"
                      : i < index
                      ? "bg-emerald-700"
                      : "bg-emerald-100"
                  )}
                />
              );
            })}
          </div>
          <Link href={"/settings"}>
            <p className="text-emerald-500 hover:text-emerald-700 cursor-pointer">
              Skip to Dashboard
            </p>
          </Link>
        </div>
        <p className="text-sm 2xl:text-base">
          {index + 1} of {titles.length}
        </p>
        <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-bold">
          {titles[index]}
        </h1>
      </div>
      <div className="flex-grow">{renderComponent()}</div>
    </div>
  );
}

export default Questions;

const BasicInfo = ({
  index,
  onboardingRootForm,
  initialValues = {
    business: "",
    gstNo: "",
    description: "",
  },
  setOnboardingRootForm,
  setIndex,
}: IProps<IBasicForm>) => {
  const [basicInfo, setBasicInfo] = React.useState<IBasicForm>(initialValues);

  const basicInfoSchema = Yup.object({
    business: Yup.string().required("Business name is required"),
    gstNo: Yup.string().matches(gstRegex, "Please enter a valid GST number"),
    description: Yup.string().required("Description is required"),
  });

  const [errors, setErrors] = React.useState<TError>({
    business: null,
    gstNo: null,
    description: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await basicInfoSchema.validate(basicInfo, {
        abortEarly: false,
      });
      setErrors({});
      setOnboardingRootForm({
        ...onboardingRootForm,
        basicInfo: {
          ...basicInfo,
        },
      });
      setIndex(index < 3 ? index + 1 : 3);
      console.log("Form:", {
        basicInfo: basicInfo,
        formData: onboardingRootForm.basicInfo,
      });
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: onboardingRootForm.basicInfo,
        errors: validationErrors,
      });
    }
  };

  console.log("Basic Info Form:", onboardingRootForm);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className=" space-y-4 py-4">
        <div className="w-full">
          <Label htmlFor="business" className="text-base">
            Business Name
          </Label>
          <Input
            type="text"
            id="business"
            placeholder="e.g. Amul, Nestlé, Tropicana "
            className={cn("2xl:text-lg")}
            name="business"
            value={basicInfo.business || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, business: "" })}
          />
          <Error error={errors.business} />
        </div>
        <div className="w-full">
          <Label htmlFor="lastName" className="text-base">
            GST No{" "}
            <span className="text-gray-500 text-xs md:text-sm">(optional)</span>
          </Label>
          <Input
            type="text"
            id="lastName"
            name="gstNo"
            placeholder="e.g. 22AAAAA0000A1Z5"
            className={cn("2xl:text-lg")}
            value={basicInfo.gstNo || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, gstNo: "" })}
          />
          <Error error={errors.gstNo} />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="description" className="text-base">
            About your business
          </Label>
          <Textarea
            placeholder="e.g. We are a local bakery specializing in artisanal breads and pastries."
            id="description"
            className="h-40 overflow-y-auto"
            name="description"
            value={basicInfo.description || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, description: "" })}
          />
          <Error error={errors.description} />
        </div>
      </div>
      <div className="flex items-center gap-10">
        <Button
          disabled={index < 1}
          size={"lg"}
          className="min-w-36"
          onClick={() => setIndex(index > 0 ? index - 1 : 0)}
        >
          <span className="text-lg">Previous</span>
        </Button>
        <Button
          size={"lg"}
          className="bg-emerald-500 hover:bg-emerald-700 dark:text-white min-w-36"
          onClick={() => handleSubmit()}
        >
          <span className="text-lg">{index == 3 ? "Continue" : "Next"}</span>
        </Button>
      </div>
    </div>
  );
};

const Personalization = ({
  index,
  onboardingRootForm,
  initialValues = {
    logo: "",
    website: "",
  },
  setOnboardingRootForm,
  setIndex,
}: IProps<IPesonlizationForm>) => {
  const [personalization, setPersonalizatoin] =
    React.useState<IPesonlizationForm>(initialValues);

  const personalizationSchema = Yup.object({
    logo: Yup.string().required("Logo is required"),
    website: Yup.string()
      .matches(
        /^(https:\/\/|www\.)[a-zA-Z0-9-_.]+(\.[a-zA-Z]{2,})+.*$/,
        "Please enter a valid URL"
      )
      .required("Website is required"),
  });

  const [errors, setErrors] = React.useState<TError>({
    logo: null,
    website: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonalizatoin({
      ...personalization,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      // Example: Check if file size exceeds 2MB
      toast.error("File size should be less than 2MB");  
      setErrors({ ...errors, logo: "" });
      return;
    }

    setPersonalizatoin({
      ...personalization,
      logo: URL.createObjectURL(file),
    });
    setErrors({ ...errors, logo: "" });
  };

  const handleSubmit = async () => {
    try {
      await personalizationSchema.validate(personalization, {
        abortEarly: false,
      });
      setErrors({});
      console.log("Form:", {
        formData: personalization,
      });
      setOnboardingRootForm({
        ...onboardingRootForm,
        personalization: {
          ...personalization,
        },
      });
      setIndex(index < 3 ? index + 1 : 3);
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: onboardingRootForm.personalization,
        errors: validationErrors,
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-4 py-4">
        <div className="w-full">
          <UploadLogo
            file={personalization.logo}
            handleChange={handleLogoChange}
            name="logo"
          />
          <Error error={errors.logo} />
        </div>
        <div className="w-full">
          <Label htmlFor="website" className="text-base">
            Company Website
          </Label>
          <Input
            type="url"
            id="website"
            placeholder="e.g. https://www.delanki.com"
            className={cn("2xl:text-lg")}
            name="website"
            value={personalization.website || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, website: "" })}
          />
          <Error error={errors.website} />
        </div>
      </div>
      <div className="flex items-center gap-10">
        <Button
          disabled={index < 1}
          size={"lg"}
          className="min-w-36"
          onClick={() => setIndex(index > 0 ? index - 1 : 0)}
        >
          <span className="text-lg">Previous</span>
        </Button>
        <Button
          size={"lg"}
          className="bg-emerald-500 hover:bg-emerald-700 dark:text-white min-w-36"
          onClick={() => handleSubmit()}
        >
          <span className="text-lg">{index == 3 ? "Continue" : "Next"}</span>
        </Button>
      </div>
    </div>
  );
};

const options = [
  { id: 1, value: "1", label: "Option 1" },
  { id: 2, value: "2", label: "Option 2" },
  { id: 3, value: "3", label: "Option 3" },
];

const LocationInfo = ({
  index,
  onboardingRootForm,
  initialValues = {
    address: "",
    pinCode: "",
    country: "",
  },
  setOnboardingRootForm,
  setIndex,
}: IProps<ILocationInfoForm>) => {
  const [locationInfo, setLocationInfo] =
    React.useState<ILocationInfoForm>(initialValues);

  const locationInfoSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    pinCode: Yup.string().required("Pin code is required"),
    country: Yup.string().required("Country is required"),
  });

  const [errors, setErrors] = React.useState<TError>({
    address: null,
    pinCode: null,
    country: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocationInfo({
      ...locationInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryChange = (option: Option) => {
    const { value } = option;
    setLocationInfo({
      ...locationInfo,
      country: value,
    });
    setErrors({ ...errors, country: "" });
  };

  const handleSubmit = async () => {
    try {
      await locationInfoSchema.validate(locationInfo, {
        abortEarly: false,
      });
      setErrors({});
      console.log("Form:", {
        formData: locationInfo,
      });
      setOnboardingRootForm({
        ...onboardingRootForm,
        locationInfo: {
          ...locationInfo,
        },
      });
      setIndex(index < 3 ? index + 1 : 3);
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: locationInfo,
        errors: validationErrors,
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-4 py-4">
        <div className="w-full">
          <Label htmlFor="address" className="text-base">
            Address
          </Label>
          <Input
            type="text"
            id="address"
            placeholder="e.g. 123 Main St, New Delhi"
            className={cn("2xl:text-lg")}
            name="address"
            value={locationInfo.address || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, address: "" })}
          />
          <Error error={errors.address} />
        </div>
        <div className="w-full">
          <Label htmlFor="pinCode" className="text-base">
            Pin Code
          </Label>
          <Input
            type="text"
            id="pinCode"
            placeholder="e.g. 110053"
            className={cn("2xl:text-lg")}
            name="pinCode"
            value={locationInfo.pinCode || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, pinCode: "" })}
          />
          <Error error={errors.pinCode} />
        </div>
        <div className="w-full">
          <Label htmlFor="location" className="text-base">
            Country
          </Label>
          <SearchSelect
            selectedValue={locationInfo.country || ""}
            onChange={handleCountryChange}
            options={options}
          />
          <Error error={errors.country} />
        </div>
      </div>
      <div className="flex items-center gap-10">
        <Button
          disabled={index < 1}
          size={"lg"}
          className="min-w-36"
          onClick={() => setIndex(index > 0 ? index - 1 : 0)}
        >
          <span className="text-lg">Previous</span>
        </Button>
        <Button
          size={"lg"}
          className="bg-emerald-500 hover:bg-emerald-700 dark:text-white min-w-36"
          onClick={() => handleSubmit()}
        >
          <span className="text-lg">{index == 3 ? "Continue" : "Next"}</span>
        </Button>
      </div>
    </div>
  );
};

const ContactInfo = ({
  index,
  onboardingRootForm,
  initialValues = {
    contactEmail: "",
    contactNumber: "",
  },
  setOnboardingRootForm,
  setIndex,
}: IProps<IContactInfoForm>) => {
  const [contactInfo, setContactInfo] =
    React.useState<IContactInfoForm>(initialValues);

  const contactInfoSchema = Yup.object({
    contactEmail: Yup.string().email().required("Email is required"),
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

  const [errors, setErrors] = React.useState<TError>({
    contactEmail: null,
    contactNumber: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await contactInfoSchema.validate(contactInfo, {
        abortEarly: false,
      });
      setErrors({});
      console.log("Form:", {
        formData: contactInfo,
        onboardingRootForm,
      });
      setOnboardingRootForm({
        ...onboardingRootForm,
        contactInfo: {
          ...contactInfo,
        },
      });
      setIndex(index < 3 ? index + 1 : 3);
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: onboardingRootForm.contactInfo,
        errors: validationErrors,
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-4 py-4">
        <div className="w-full">
          <Label htmlFor="contactEmail" className="text-base">
            Contact Email
          </Label>
          <Input
            type="text"
            id="contactEmail"
            placeholder="e.g. contact@delanki.com"
            className={cn("2xl:text-lg")}
            name="contactEmail"
            value={contactInfo.contactEmail || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, contactEmail: "" })}
          />
          <Error error={errors.contactEmail} />
        </div>
        <div className="w-full">
          <Label htmlFor="contactNumber" className="text-base">
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
            value={contactInfo.contactNumber || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, contactNumber: "" })}
          />
          <p className="text-xs italic">* Please include country code</p>
          <Error error={errors.contactNumber} />
        </div>
      </div>
      <div className="flex items-center gap-10">
        <Button
          disabled={index < 1}
          size={"lg"}
          className="min-w-36"
          onClick={() => setIndex(index > 0 ? index - 1 : 0)}
        >
          <span className="text-lg">Previous</span>
        </Button>
        <Button
          size={"lg"}
          className="bg-emerald-500 hover:bg-emerald-700 dark:text-white min-w-36"
          onClick={() => handleSubmit()}
        >
          <span className="text-lg">{index == 3 ? "Continue" : "Next"}</span>
        </Button>
      </div>
    </div>
  );
};
