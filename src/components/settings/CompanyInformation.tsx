"use client";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import SaveOptions from "../ak/SaveOptions";
import Error from "../ui/error";
import { ICompanyDetailsCard } from ".";
import * as Yup from "yup";
import { useState } from "react";

interface ICompanyInformation {
  companyDetailsCard: ICompanyDetailsCard;
}

const companyDetailsSchema = Yup.object({
  bussinessName: Yup.string().required("Business Name is required"),
  gstNumber: Yup.string().optional(),
  aboutYourCompany: Yup.string().required("About your company is required"),
  companyURL: Yup.string()
    .url("Invalid URL")
    .required("Company URL is required"),
});

function CompanyInformation({
  companyDetailsCard = {
    bussinessName: "",
    gstNumber: "",
    aboutYourCompany: "",
    companyURL: "",
  },
}: ICompanyInformation) {
  const [companyDetailsForm, setCompanyDetailsForm] =
    useState<ICompanyDetailsCard>(companyDetailsCard);

  const [errors, setErrors] = useState<Record<string, string | null>>({
    bussinessName: null,
    gstNumber: null,
    aboutYourCompany: null,
    companyURL: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompanyDetailsForm({
      ...companyDetailsForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await companyDetailsSchema.validate(companyDetailsForm, {
        abortEarly: false,
      });
      console.log("Form:", companyDetailsForm);
      setErrors({});
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: companyDetailsForm,
        errors: validationErrors,
      });
    }
  };

  const handleCancel = () => {};
  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="font-medium -mb-2">Company Information</h1>
        <SaveOptions
          onSave={() => handleSave()}
          onCancel={() => handleCancel()}
          visible={true}
        />
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="business">Business Name</Label>
            <Input
              type="text"
              id="business"
              placeholder="e.g. Amul, Nestlé, Tropicana "
              className={cn("2xl:text-lg")}
              name="bussinessName"
              value={companyDetailsForm.bussinessName}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, bussinessName: "" })}
            />
            {errors.bussinessName && <Error error={errors.bussinessName} />}
          </div>
          <div className="w-full">
            <Label htmlFor="lastName">
              GST No{" "}
              <span className="text-gray-500 text-xs md:text-sm">
                (optional)
              </span>
            </Label>
            <Input
              type="text"
              id="lastName"
              placeholder="e.g. 22AAAAA0000A1Z5"
              className={cn("2xl:text-lg")}
              name="gstNumber"
              value={companyDetailsForm.gstNumber}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, gstNumber: "" })}
            />
            {errors.gstNumber && <Error error={errors.gstNumber} />}
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">About your business</Label>
          <Textarea
            placeholder="e.g. We are a local bakery specializing in artisanal breads and pastries."
            id="description"
            className="h-40 overflow-y-auto"
            name="aboutYourCompany"
            value={companyDetailsForm.aboutYourCompany}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, aboutYourCompany: "" })}
          />
          {errors.aboutYourCompany && <Error error={errors.aboutYourCompany} />}
        </div>
        <div className="w-full">
          <Label htmlFor="website">Company Website</Label>
          <Input
            type="url"
            id="website"
            placeholder="e.g. https://www.delanki.com"
            className={cn("2xl:text-lg")}
            name="companyURL"
            value={companyDetailsForm.companyURL}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, companyURL: "" })}
          />
          {errors.companyURL && <Error error={errors.companyURL} />}
        </div>
      </div>
    </div>
  );
}

export default CompanyInformation;
