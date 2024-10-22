"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as Yup from "yup";
import Error from "../ui/error";

type IResetPasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const resetPasswordSchema = Yup.object({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

const ResetPassword = () => {
  const [resetPasswordForm, setResetPasswordForm] =
    React.useState<IResetPasswordForm>({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [errors, setErrors] = React.useState<Record<string, string | null>>({
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPasswordForm({
      ...resetPasswordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await resetPasswordSchema.validate(resetPasswordForm, {
        abortEarly: false,
      });
      console.log("Form:", resetPasswordForm);
      setErrors({});
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: resetPasswordForm,
        errors: validationErrors,
      });
    }
  };

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm p-3 lg:sticky lg:top-72">
      <div className="pt-1 px-2 pb-3">
        <h1 className="font-medium">Password Setting</h1>
      </div>
      <div className="bg-white dark:bg-black p-4 rounded-2xl flex flex-col gap-0.5">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type="password"
            id="currentPassword"
            placeholder="Type here..."
            name="currentPassword"
            value={resetPasswordForm.currentPassword}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, currentPassword: "" })}
          />
          {errors.currentPassword && <Error error={errors.currentPassword} />}
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            placeholder="Must contain alphanumeric, special & min 8 chars"
            name="newPassword"
            value={resetPasswordForm.newPassword}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, newPassword: "" })}
          />
          {errors.newPassword && <Error error={errors.newPassword} />}
        </div>
        <div>
          <Label htmlFor="confirmPassword">Re-enter Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Verify your password"
            name="confirmPassword"
            value={resetPasswordForm.confirmPassword}
            onChange={handleChange}
            onFocus={() => setErrors({ ...errors, confirmPassword: "" })}
          />
          {errors.confirmPassword && (
            <Error error={errors.confirmPassword || ""} />
          )}
        </div>
        <hr className="my-1" />
        <Button className="w-full" onClick={() => handleSave()}>
          <span className="">Save</span>
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
