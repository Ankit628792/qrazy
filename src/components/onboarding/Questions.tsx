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

type IGenericForm = Record<string, string | null>;

export type IRootOnboardingForm = {
  basicInfo: {
    business: string | null;
    gstNo: string | null;
    description: string | null;
  };
  personalization: {
    logo: string | null;
    website: string | null;
  };
  locationInfo: {
    address: string | null;
    pinCode: string | null;
    country: string | null;
  };
  contactInfo: {
    contactEmail: string | null;
    contactNumber: string | null;
  };
};

interface IProps {
  index: number;
  onboardingRootForm: IRootOnboardingForm;
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
        business: null,
        gstNo: null,
        description: null,
      },
      personalization: {
        logo: null,
        website: null,
      },
      locationInfo: {
        address: null,
        pinCode: null,
        country: null,
      },
      contactInfo: {
        contactEmail: null,
        contactNumber: null,
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
            setOnboardingRootForm={setOnboardingRootForm}
            setIndex={setIndex}
          />
        );
      case 1:
        return (
          <Personalization
            index={index}
            onboardingRootForm={onboardingRootForm}
            setOnboardingRootForm={setOnboardingRootForm}
            setIndex={setIndex}
          />
        );
      case 2:
        return (
          <LocationInfo
            index={index}
            onboardingRootForm={onboardingRootForm}
            setOnboardingRootForm={setOnboardingRootForm}
            setIndex={setIndex}
          />
        );
      case 3:
        return (
          <ContactInfo
            index={index}
            onboardingRootForm={onboardingRootForm}
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
  setOnboardingRootForm,
  setIndex,
}: IProps) => {
  const basicInfoSchema = Yup.object({
    business: Yup.string().required("Business name is required"),
    gstNo: Yup.string(),
    description: Yup.string().required("Description is required"),
  });

  const [errors, setErrors] = React.useState<IGenericForm>({
    business: null,
    gstNo: null,
    description: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOnboardingRootForm({
      ...onboardingRootForm,
      basicInfo: {
        ...onboardingRootForm.basicInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      await basicInfoSchema.validate(onboardingRootForm.basicInfo, {
        abortEarly: false,
      });
      setErrors({});
      setIndex(index + 1);
      console.log("Form:", {
        formData: onboardingRootForm.basicInfo,
      });
      setIndex(index < 3 ? index + 1 : 3);
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
            value={onboardingRootForm.basicInfo.business || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, business: "" })}
          />
          {errors.business && <Error error={errors.business} />}
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
            value={onboardingRootForm.basicInfo.gstNo || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, gstNo: "" })}
          />
          {errors.gstNo && <Error error={errors.gstNo} />}
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
            value={onboardingRootForm.basicInfo.description || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, description: "" })}
          />
          {errors.description && <Error error={errors.description} />}
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
  setOnboardingRootForm,
  setIndex,
}: IProps) => {
  const personalizationSchema = Yup.object({
    logo: Yup.string().required("Logo is required"),
    website: Yup.string().required("Website is required"),
  });

  const [errors, setErrors] = React.useState<IGenericForm>({
    logo: null,
    website: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOnboardingRootForm({
      ...onboardingRootForm,
      personalization: {
        ...onboardingRootForm.personalization,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleLogoChange = (file: File) => {
    setOnboardingRootForm({
      ...onboardingRootForm,
      personalization: {
        ...onboardingRootForm.personalization,
        logo: URL.createObjectURL(file),
      },
    });
    setErrors({ ...errors, logo: "" });
  };

  const handleSubmit = async () => {
    try {
      await personalizationSchema.validate(onboardingRootForm.personalization, {
        abortEarly: false,
      });
      setErrors({});
      console.log("Form:", {
        formData: onboardingRootForm.personalization,
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
            file={onboardingRootForm.personalization.logo}
            handleChange={handleLogoChange}
            name="logo"
          />
          {errors.logo && <Error error={errors.logo} />}
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
            value={onboardingRootForm.personalization.website || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, website: "" })}
          />
          {errors.website && <Error error={errors.website} />}
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
  setOnboardingRootForm,
  setIndex,
}: IProps) => {
  const locationInfoSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    pinCode: Yup.string().required("Pin code is required"),
    country: Yup.string().required("Country is required"),
  });

  const [errors, setErrors] = React.useState<IGenericForm>({
    address: null,
    pinCode: null,
    country: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOnboardingRootForm({
      ...onboardingRootForm,
      locationInfo: {
        ...onboardingRootForm.locationInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleCountryChange = (option: Option) => {
    const { value } = option;
    setOnboardingRootForm({
      ...onboardingRootForm,
      locationInfo: {
        ...onboardingRootForm.locationInfo,
        country: value,
      },
    });
    setErrors({ ...errors, country: "" });
  };

  const handleSubmit = async () => {
    try {
      await locationInfoSchema.validate(onboardingRootForm.locationInfo, {
        abortEarly: false,
      });
      setErrors({});
      console.log("Form:", {
        formData: onboardingRootForm.locationInfo,
      });
      setIndex(index < 3 ? index + 1 : 3);
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: onboardingRootForm.locationInfo,
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
            value={onboardingRootForm.locationInfo.address || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, address: "" })}
          />
          {errors.address && <Error error={errors.address} />}
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
            value={onboardingRootForm.locationInfo.pinCode || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, pinCode: "" })}
          />
          {errors.pinCode && <Error error={errors.pinCode} />}
        </div>
        <div className="w-full">
          <Label htmlFor="location" className="text-base">
            Country
          </Label>
          <SearchSelect
            selectedValue={onboardingRootForm.locationInfo.country || ""}
            onChange={handleCountryChange}
            options={options}
          />
          {errors.country && <Error error={errors.country} />}
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
  setOnboardingRootForm,
  setIndex,
}: IProps) => {
  const contactInfoSchema = Yup.object({
    contactEmail: Yup.string().email().required("Email is required"),
    contactNumber: Yup.string()
      .matches(
        /^[+][0-9]{1,4}[0-9]{10,12}$/,
        "Contact number should include country code"
      )
      .required("Contact number is required"),
  });

  const [errors, setErrors] = React.useState<IGenericForm>({
    contactEmail: null,
    contactNumber: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOnboardingRootForm({
      ...onboardingRootForm,
      contactInfo: {
        ...onboardingRootForm.contactInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      await contactInfoSchema.validate(onboardingRootForm.contactInfo, {
        abortEarly: false,
      });
      setErrors({});
      console.log("Form:", {
        formData: onboardingRootForm.contactInfo,
        onboardingRootForm,
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
            value={onboardingRootForm.contactInfo.contactEmail || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, contactEmail: "" })}
          />
          {errors.contactEmail && <Error error={errors.contactEmail} />}
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
            value={onboardingRootForm.contactInfo.contactNumber || ""}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, contactNumber: "" })}
          />
          <p className="text-xs italic">* Please include country code</p>
          {errors.contactNumber && <Error error={errors.contactNumber} />}
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
