import SaveOptions from "@/components/ak/SaveOptions";
import Error from "@/components/ui/error";
import { useClickOutside } from "@/lib";
import { cn } from "@/lib/utils";
import {
  useProductDetailsStore,
  useProductErrorsStore,
} from "@/store/product.store";
import { FileIcon, ImagePlus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

type ProductImage = {
  id: number | string;
  url: string;
  file?: File | null;
};

function UploadImages() {
  const { image, images, setImage, setImages } = useProductDetailsStore();
  const { errors, setError } = useProductErrorsStore();

  const ref = useRef(null);
  const outerRef = useRef(null);
  useClickOutside(
    () => {
      console.log("clicked outside");
    },
    ref,
    outerRef
  );

  const handleImageChange = (file: File) => {
    const updatedImage = {
      ...image,
      url: URL.createObjectURL(file),
      file: file,
    } as ProductImage;
    setImage(updatedImage);
    setError("image.id", "");
    setError("image.file", "");
    setError("image.url", "");
  };

  const handleImagesChange = (i: number, file: File) => {
    let arr = [...images];
    arr[i].url = URL.createObjectURL(file);
    arr[i].file = file;
    setImages(arr);
    setError(`images[${i}].id`, "");
    setError(`images[${i}].file`, "");
    setError(`images[${i}].url`, "");
  };
  return (
    <div
      className="manage-product-element flex-grow lg:flex-grow-0"
      ref={outerRef}
    >
      <div className="px-2 flex items-center justify-between">
        <h1 className="input-wrapper-title">Upload Images</h1>
        <SaveOptions onSave={() => {}} onCancel={() => {}} />
      </div>
      <div className="input-wrapper">
        <div className="w-full aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-900 rounded-lg grid place-items-center">
          <FileUploader
            handleChange={(file: File) => {
              handleImageChange(file);
            }}
            name="logo"
            types={["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"]}
            children={
              <>
                {image?.url ? (
                  <img
                    src={image.url}
                    alt=""
                    className="w-full h-full rounded-lg object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <ImagePlus className="transform scale-[3] opacity-5 mx-auto" />
                    <p className="opacity-15 font-medium text-xs mt-8 text-center">
                      Only jpg, jpeg and png
                    </p>
                  </div>
                )}
              </>
            }
          />
          {(errors["image.url"] ||
            errors["image.file"] ||
            errors["image.id"]) && (
            <Error
              error={
                errors["image.id"] ||
                errors["image.file"] ||
                errors["image.url"] ||
                "Image is required"
              }
            />
          )}
        </div>
      </div>
      <div
        className={cn(
          "bg-white dark:bg-black p-4 pb-3 rounded-2xl flex gap-2 sm:gap-4 items-center justify-center overflow-x-auto file-input-wrapper"
        )}
        ref={ref}
      >
        {images.map((image, i) => (
          <div key={i} className="flex flex-col">
            <FileUploader
              handleChange={(file: File) => handleImagesChange(i, file)}
              name="logo"
              types={["jpg", "JPG", "png", "PNG", "jpeg", "JPEG"]}
              children={
                <>
                  <div
                    key={image.id}
                    className="w-20 h-20 overflow-hidden bg-gray-100 dark:bg-zinc-900 rounded-lg grid place-items-center"
                  >
                    {image.url ? (
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-full rounded-lg object-contain"
                      />
                    ) : (
                      <ImagePlus className="opacity-5" />
                    )}
                  </div>
                </>
              }
            />
            {(errors[`images[${i}].id`] ||
              errors[`images[${i}].file`] ||
              errors[`images[${i}].url`]) && (
              <Error
                error={
                  errors[`images[${i}].id`] ||
                  errors[`images[${i}].file`] ||
                  errors[`images[${i}].url`] ||
                  "Image is required"
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadImages;
