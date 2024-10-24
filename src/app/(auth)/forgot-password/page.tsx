/* eslint-disable @next/next/no-img-element */
"use client";

import AuthSuccess from "@/components/auth/Success";
import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import * as Yup from "yup";

type IForm = Record<string, string | null>;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

function Page() {
  const [form, setForm] = useState<IForm>({
    email: null,
  });
  const [errors, setErrors] = useState<IForm>({
    email: null,
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
          src="https://cdn.dribbble.com/userupload/12009241/file/original-3232c6f74a1fc2b27ce620f7ff7a0fac.jpg"
          className="absolute inset-0 w-full h-full object-cover "
          alt=""
        />
        {/* <img src="https://cdn.dribbble.com/userupload/11042736/file/original-0450a87d75537e71b23978984040f36d.jpg" className='absolute inset-0 w-full h-full object-cover ' alt="" /> */}
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-lg md:max-w-max p-10 sm:p-16 xl:py-20 bg-white bg-opacity-80 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-80 dark:backdrop-blur-sm rounded-2xl relative">
            <div className="w-full max-w-lg flex flex-col items-center justify-center gap-2">
              <h1 className="text-5xl lg:text-6xl 2xl:text-7xl font-bold text-center">
                Forgot Password?
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-center">
                Enter the email address associated with your account.
              </p>
              <div className="my-4 w-full text-center">
                <Input
                  id="email"
                  name="email"
                  placeholder="Type Email Here..."
                  value={form.email || ""}
                  onChange={handleChange}
                  className={cn("xl:text-lg xl:py-6 text-center")}
                  onFocus={() => setErrors({ ...errors, email: "" })}
                />
                <Error error={errors.email} />
              </div>
              <Button size={"lg"} className="">
                <span className="sm:text-lg select-none">Submit</span>
              </Button>
            </div>
          </div>
        </form>
      </section>
      <AuthSuccess
        open={success}
        title="Request Sent Successfully"
        description="If an account exists for the email you entered, you will receive a password reset link shortly. Please check your email and follow the instructions to reset your password."
        onClose={() => setSuccess(false)}
      />
    </>
  );
}

export default Page;
