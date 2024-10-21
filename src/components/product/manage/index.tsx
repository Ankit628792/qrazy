"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileClock } from "lucide-react";
import GeneralInformation from "./GeneralInformation";
import Pricing from "./Pricing";
import Links from "./Links";
import Category from "./Category";
import UploadImages from "./UploadImages";
import {
  useProductDetailsStore,
  useProductErrorsStore,
} from "@/store/product.store";
import * as Yup from "yup";

const validationSchemaForSaveDraft = Yup.object({
  title: Yup.string().required("Title is required"),
  image: Yup.object({
    url: Yup.string().required("Image is required"),
  }),
});

const validationSchemaForAddProduct = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  mrp: Yup.number().min(1).required("MRP is required"),
  mrl: Yup.number().min(1).required("MRL is required"),
  links: Yup.array().of(
    Yup.object({
      url: Yup.string().required("URL is required"),
    })
  ),
  category: Yup.object({
    name: Yup.string().required("Name is required"),
  }),
  image: Yup.object({
    url: Yup.string().required("Image is required"),
  }),
  images: Yup.array().of(
    Yup.object({
      url: Yup.string().required("Required"),
    })
  ),
});

function ManageProduct() {
  const { title, description, mrp, mrl, links, category, image, images } =
    useProductDetailsStore();
  const { errors, setError } = useProductErrorsStore();

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchemaForSaveDraft.validate(
        { title, image },
        { abortEarly: false }
      );
      console.log("Form:", { title, image });
      setError("title", null);
      setError("description", null);
      setError("mrp", null);
      setError("mrl", null);
      setError("links", null);
      setError("category", null);
      setError("images", null);
      setError("image", null);
    } catch (err: unknown) {
      console.log("Form:", {
        formData: { title, image },
      });
      const validationErrors: Record<string, string> = {};
      (err as Yup.ValidationError).inner.forEach(async (error) => {
        validationErrors[error.path] = error.message;
        await setError(error.path as keyof typeof errors, error.message);
      });
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchemaForAddProduct.validate(
        { title, description, mrp, mrl, links, category, images, image },
        { abortEarly: false }
      );
      console.log("Form:", { title, description, mrp, mrl, links, category });
      setError("title", null);
      setError("description", null);
      setError("mrp", null);
      setError("mrl", null);
      setError("links", null);
      setError("category", null);
      setError("images", null);
      setError("image", null);
    } catch (err: unknown) {
      const validationErrors: Record<string, string> = {};
      console.log("Form:", {
        formData: { title, description, mrp, mrl, links, category },
        errors: validationErrors,
        errorFromStore: errors,
      });
      (err as Yup.ValidationError).inner.forEach(async (error) => {
        validationErrors[error.path] = error.message;
        await setError(error.path as keyof typeof errors, error.message);
      });
    }
  };

  return (
    <section className="py-5 sm:px-3">
      <div className="flex items-center justify-between gap-4 w-full">
        <h1 className="text-2xl lg:text-3xl font-semibold">
          <span className="hidden md:inline-block">Create</span> New Product
        </h1>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          <Button
            variant={"outline"}
            onClick={handleSaveDraft}
            className="gap-2 hidden sm:inline-flex rounded-full"
          >
            <FileClock /> Save Draft
          </Button>
          <Button
            variant={"default"}
            onClick={handleAddProduct}
            className="gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <CheckCircle /> Add Product
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4 py-4">
        <div className="flex flex-col gap-4 flex-grow">
          <GeneralInformation />
          <Pricing />
          <Links />
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:max-w-sm xl:max-w-md">
          <UploadImages />
          <Category />
        </div>
      </div>
    </section>
  );
}

export default ManageProduct;
