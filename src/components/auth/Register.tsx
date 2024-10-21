"use client";

import Auth from "@/components/auth/Auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Error from "../ui/error";
import * as Yup from "yup";

type IRegisterForm = Record<string, string | null>;

const registerSchema = Yup.object({
  fName: Yup.string().required("First Name is required"),
  lName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  cPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function Register() {
  const [registerForm, setRegisterForm] = React.useState<IRegisterForm>({
    fName: null,
    lName: null,
    email: null,
    password: null,
    cPassword: null,
  });
  const [errors, setErrors] = React.useState<IRegisterForm>({
    fName: null,
    lName: null,
    email: null,
    password: null,
    cPassword: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerSchema.validate(registerForm, { abortEarly: false });
      console.log("Form:", registerForm);
      setErrors({});
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      const firstError = err.inner[0];
      validationErrors[firstError.path] = firstError.message;
      setErrors(validationErrors);
      console.log("Form:", {
        formData: registerForm,
        errors: validationErrors,
      });
    }
  };
  return (
    <Auth type="register">
      <>
        <h1 className="text-4xl font-bold select-none mb-2">
          Qrazy Welcomes You!
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full text-base xl:text-lg">
              <Label className="xl:text-base">First Name</Label>
              <Input
                id="fName"
                name="fName"
                placeholder="Type here..."
                value={registerForm.fName || ""}
                onChange={handleChange}
                onFocus={() => setErrors({ ...errors, fName: "" })}
              />
              {errors.fName && <Error>{errors.fName}</Error>}
            </div>
            <div className="w-full text-base xl:text-lg">
              <Label className="xl:text-base">Last Name</Label>
              <Input
                id="lName"
                name="lName"
                placeholder="Type here..."
                value={registerForm.lName || ""}
                onChange={handleChange}
                onFocus={() => setErrors({ ...errors, lName: "" })}
              />
              {errors.lName && <Error>{errors.lName}</Error>}
            </div>
          </div>
          <div className="w-full text-base xl:text-lg">
            <Label className="xl:text-base">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              value={registerForm.email || ""}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, email: "" })}
            />
            {errors.email && <Error>{errors.email}</Error>}
          </div>
          <div className="w-full text-base xl:text-lg">
            <Label className="xl:text-base">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={registerForm.password || ""}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, password: "" })}
            />
            {errors.password && <Error>{errors.password}</Error>}
          </div>
          <div className="w-full text-base xl:text-lg">
            <Label className="xl:text-base">Confirm Password</Label>
            <Input
              id="cPassword"
              placeholder="Re-Type Your Password"
              name="cPassword"
              value={registerForm.cPassword || ""}
              onChange={handleChange}
              onFocus={() => setErrors({ ...errors, cPassword: "" })}
            />
            {errors.cPassword && <Error>{errors.cPassword}</Error>}
          </div>
          <Button size="lg" className="w-full mt-2">
            <span className="text-base lg:text-lg">Register</span>{" "}
            <MoveRight className="ml-2" />
          </Button>
        </form>
        <div className="text-sm xl:text-base flex items-center justify-center">
          <p>Already have an account?</p>
          <Link href={"/login"} className="text-emerald-500 px-1 font-medium">
            Login
          </Link>
        </div>
      </>
    </Auth>
  );
}

export default Register;
