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
  currentPassword: Yup.string()
    .required("Current Password is required")
    .matches(/^\S*$/, "Password cannot contain spaces"),
  newPassword: Yup.string()
    .required("New Password is required")
    .test(
      "min-length",
      "Password must be at least 6 characters long",
      (value) => value && value.length >= 6
    )
    .test(
      "has-lowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value)
    )
    .test(
      "has-uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value)
    )
    .test("has-number", "Password must contain at least one number", (value) =>
      /\d/.test(value)
    )
    .test(
      "has-special-char",
      "Password must contain at least one special character",
      (value) => /[@$!%*?&]/.test(value)
    )
    .test("no-spaces", "Password cannot contain spaces", (value) =>
      /^\S*$/.test(value)
    ),
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
          <Error error={errors.currentPassword} />
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
          <Error error={errors.newPassword} />
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
