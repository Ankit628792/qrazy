/* eslint-disable @next/next/no-img-element */
"use client";
import AuthSuccess from "@/components/auth/Success";
import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import * as Yup from "yup";

type IForm = Record<string, string | null>;

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  cPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function Page() {
  const [form, setForm] = useState<IForm>({
    password: null,
    cPassword: null,
  });
  const [errors, setErrors] = useState<IForm>({
    password: null,
    cPassword: null,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(form, { abortEarly: false });
      console.log("Form:", form);
      setSuccess(true);
      setErrors({});
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: form,
        errors: validationErrors,
      });
    }
  };

  return (
    <>
      <section className="w-full h-dvh grid place-items-center p-5 bg-gray-100 dark:bg-zinc-900 relative">
        <img
          src="https://cdn.dribbble.com/userupload/11778289/file/original-30222bd2b7b500836333696035a3ad4f.jpg"
          className="absolute inset-0 w-full h-full object-cover "
          alt=""
        />
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-lg md:max-w-max p-10 sm:p-16 xl:px-20 bg-white bg-opacity-90 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-90 dark:backdrop-blur-sm rounded-2xl relative">
            <div className="w-full max-w-lg flex flex-col items-center justify-center gap-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
                Reset Password
              </h1>
              <div className="w-full">
                <Label htmlFor="password" className="text-lg">
                  New Password
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Type Here..."
                  className={cn("xl:text-lg")}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, password: "" })}
                />
                {errors.password && <Error error={errors.password} />}
              </div>
              <div className="w-full">
                <Label htmlFor="cPassword" className="text-lg">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  id="cPassword"
                  name="cPassword"
                  placeholder="Type Here..."
                  className={cn("xl:text-lg")}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, cPassword: "" })}
                />
                {errors.cPassword && <Error error={errors.cPassword} />}
              </div>
              <Button size={"lg"} className="mt-4">
                <span className="sm:text-lg select-none">Submit</span>
              </Button>
            </div>
          </div>
        </form>
      </section>
      <AuthSuccess
        open={success}
        title="Password Updated Successfully!"
        description="Your password has been updated successfully. You can now log in with your new credentials."
        onClose={() => setSuccess(false)}
      />
    </>
  );
}

export default Page;
