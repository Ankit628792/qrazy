"use client";
import SaveOptions from "../ak/SaveOptions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Error from "../ui/error";
import { IPersonalDetailsCard } from ".";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface PersonalDetailProps {
  personalDetailsCard: IPersonalDetailsCard;
}

const personalDetailsSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function PersonalDetail({
  personalDetailsCard = {
    firstName: "",
    lastName: "",
    email: "",
  },
}: PersonalDetailProps) {
  const [personalDetailsForm, setPersonalDetailsForm] =
    useState<IPersonalDetailsCard>(personalDetailsCard);
  const [idealState, setIdealState] =
    useState<IPersonalDetailsCard>(personalDetailsCard);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string | null>>({
    firstName: null,
    lastName: null,
    email: null,
  });

  useEffect(() => {
    if (
      personalDetailsForm.firstName === idealState.firstName &&
      personalDetailsForm.lastName === idealState.lastName
    ) {
      setShowSaveButton(false);
    } else {
      setShowSaveButton(true);
    }
  }, [personalDetailsForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalDetailsForm({
      ...personalDetailsForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await personalDetailsSchema.validate(personalDetailsForm, {
        abortEarly: false,
      });
      console.log("Form:", personalDetailsForm);
      setErrors({});
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: personalDetailsForm,
        errors: validationErrors,
      });
    }
  };

  const handleCancel = () => {
    setPersonalDetailsForm(idealState);
    setErrors({});
  };

  return (
    <div className="flex flex-col gap-3 pt-1 pb-2">
      <div className="px-2 flex items-center justify-between">
        <h1 className="font-medium -mb-2">Personal Details</h1>
        <SaveOptions
          onSave={() => handleSave()}
          onCancel={() => handleCancel()}
          visible={showSaveButton}
        />
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full">
            <Label htmlFor="fName">First Name</Label>
            <Input
              id="fName"
              placeholder="Type here..."
              className={cn("2xl:text-lg")}
              name="firstName"
              value={personalDetailsForm.firstName}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, firstName: "" })}
            />
            <Error error={errors.firstName} />
          </div>
          <div className="w-full">
            <Label htmlFor="lName">Last Name</Label>
            <Input
              id="lName"
              placeholder="Type here..."
              className={cn("2xl:text-lg")}
              name="lastName"
              value={personalDetailsForm.lastName}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, lastName: "" })}
            />
            <Error error={errors.lastName} />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            disabled
            placeholder="Enter your email"
            className={cn("2xl:text-lg")}
            name="email"
            value={personalDetailsForm.email}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, email: "" })}
          />
          <Error error={errors.email} />
        </div>
      </div>
    </div>
  );
}

export default PersonalDetail;
