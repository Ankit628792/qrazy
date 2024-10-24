"use client";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import SaveOptions from "../ak/SaveOptions";
import Error from "../ui/error";
import { ICompanyDetailsCard } from ".";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export const gstRegex =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;

interface ICompanyInformation {
  companyDetailsCard: ICompanyDetailsCard;
}

const companyDetailsSchema = Yup.object({
  bussinessName: Yup.string().required("Business Name is required"),
  gstNumber: Yup.string().optional().matches(gstRegex, "Invalid GST Number"),
  aboutYourCompany: Yup.string().required("About your company is required"),
  companyURL: Yup.string()
    .matches(
      /^(https:\/\/|www\.)[a-zA-Z0-9-_.]+(\.[a-zA-Z]{2,})+.*$/,
      "Please enter a valid URL"
    )
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
  const [idealState, setIdealState] =
    useState<ICompanyDetailsCard>(companyDetailsCard);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string | null>>({
    bussinessName: null,
    gstNumber: null,
    aboutYourCompany: null,
    companyURL: null,
  });

  useEffect(() => {
    if (
      companyDetailsForm.bussinessName === idealState.bussinessName &&
      companyDetailsForm.gstNumber === idealState.gstNumber &&
      companyDetailsForm.aboutYourCompany === idealState.aboutYourCompany &&
      companyDetailsForm.companyURL === idealState.companyURL
    ) {
      setShowSaveButton(false);
    } else {
      setShowSaveButton(true);
    }
  }, [companyDetailsForm]);

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

  const handleCancel = () => {
    setCompanyDetailsForm(idealState);
    setErrors({});
  };
  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="font-medium -mb-2">Company Information</h1>
        <SaveOptions
          onSave={() => handleSave()}
          onCancel={() => handleCancel()}
          visible={showSaveButton}
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
            <Error error={errors.bussinessName} />
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
            <Error error={errors.gstNumber} />
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
          <Error error={errors.aboutYourCompany} />
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
          <Error error={errors.companyURL} />
        </div>
      </div>
    </div>
  );
}

export default CompanyInformation;
