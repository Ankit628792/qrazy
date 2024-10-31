/* eslint-disable @next/next/no-img-element */
import SaveOptions from "@/components/ak/SaveOptions";
import { Input } from "@/components/ui/input";
import { getFavicon } from "@/lib";
import { useLinksStore, useProductErrorsStore } from "@/store/product.store";
import { Link } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TIMER = 500;

function Links() {
  const { links, setLinks } = useLinksStore();
  const { errors, setError } = useProductErrorsStore();
  const [debounceTimer, setDebounceTimer] = useState(null);

  const validateLinks = () => {
    links.forEach((link, i) => {
      if (link.url) {
        const isValid =
          /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}.*$/.test(
            link.url
          );
        if (!isValid) {
          return toast.error(`Please enter a valid URL for link ${i + 1}`);
        }
      }
    });
  };

  const handleChange = (i: number, value: string) => {
    let arr: ProductLink[] = [...links];
    arr[i].url = value;
    setLinks(arr);

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(() => {
      validateLinks();
    }, TIMER);
    setDebounceTimer(newTimer);
  };

  return (
    <div className="manage-product-element">
      <div className="px-2 flex items-center justify-between">
        <h1 className="input-wrapper-title">Product Links</h1>
        <SaveOptions onSave={() => {}} onCancel={() => {}} />
      </div>
      <div className="input-wrapper">
        {links.map((link, i) => {
          let favicon = getFavicon(link.url);
          return (
            <div key={link.id} className="w-full flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg p-0.5 bg-gray-100 dark:bg-zinc-900 grid place-items-center">
                {favicon ? (
                  <img
                    src={favicon}
                    onError={(e) => {
                      e.currentTarget.src = "/website.png";
                    }}
                    className="w-full h-full rounded-lg object-contain"
                    alt=""
                  />
                ) : (
                  <Link className="w-full" />
                )}
              </div>
              <Input
                value={link.url}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="Paste your link here"
                className={`py-5 2xl:text-base ${
                  errors[`links[${i}].url`] ? "border-red-500" : ""
                }`}
                onFocus={() => {
                  setError(`links[${i}].url`, "");
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Links;
