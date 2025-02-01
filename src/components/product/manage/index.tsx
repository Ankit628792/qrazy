'use client'
import { Button } from '@/components/ui/button'
import { CheckCircle, FileClock } from 'lucide-react'
import GeneralInformation from './GeneralInformation'
import Pricing from './Pricing'
import Links from './Links'
import Category from './Category'
import UploadImages from './UploadImages'
import {
  useCategoryStore,
  useImagesStore,
  useImageStore,
  useLinksStore,
  usePricingStore,
  useProductErrorsStore,
  useTitleDescriptionStore
} from '@/store/product.store'
import * as Yup from 'yup'
import { useCreateProductMutation } from '@/hooks/product/useCreateProduct'
import { useDraftProductMutation } from '@/hooks/product/useDraftProduct'
import { useUpdateProductMutation } from '@/hooks/product/useUpdateProduct'
import { useEffect } from 'react'
import { getId } from '@/lib'

const validationSchemaForSaveDraft = Yup.object({
  title: Yup.string().required('Title is required'),
  image: Yup.object({
    file: Yup.mixed().required('File is required')
  }),
  category: Yup.object({
    id: Yup.string().required('ID is required'),
    name: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required')
  }),
})

const validationSchemaForAddProduct = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  mrp: Yup.number().min(1).required('MRP is required'),
  mrl: Yup.number().min(1).required('MRL is required'),
  category: Yup.object({
    id: Yup.string().required('ID is required'),
    name: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required')
  }),
  image: Yup.object({
    id: Yup.mixed(),
    url: Yup.string().nullable(),
    file: Yup.mixed().nullable(),
  }).test('url-or-file', 'Either URL or file is required', function (value) {
    if (!value) return this.createError({ path: 'image', message: 'Image object is required' });

    const { url, file } = value;
    if (!url && !file) {
      return this.createError({ path: 'image', message: 'Either URL or file is required' });
    }
    return true;
  }),
  links: Yup.array().of(
    Yup.object({
      id: Yup.mixed(),
      url: Yup.string()
        .nullable()
        .notRequired()
        .test('is-valid-url', 'Please enter a valid URL', (value) => {
          if (!value) return true;
          return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}.*$/.test(value);
        })
    })
  )
});

function ManageProduct(props: { isEdit?: boolean, initialData?: any } | undefined) {
  const isEdit = props?.isEdit || false
  const initialData = props?.initialData || null
  const { title, description, setTitle, setDescription } = useTitleDescriptionStore()
  const { mrp, mrl, setMrl, setMrp } = usePricingStore()
  const { links, setLinks } = useLinksStore()
  const { category, setCategory } = useCategoryStore()
  const { image, setImage } = useImageStore()
  const { images, setImages } = useImagesStore()
  const { errors, setError, setEmptyErrors } = useProductErrorsStore()

  const {
    mutate: createProduct,
  } = useCreateProductMutation()
  const {
    mutate: updateProduct,
  } = useUpdateProductMutation()
  const {
    mutate: saveDraft,
  } = useDraftProductMutation()

  useEffect(() => {
    if (initialData) {
      console.log({ initialData })
      const { title, description, productLinks, image, images, category, mrl, mrp } = initialData
      if (title) {
        setTitle(title)
      }
      if (description) {
        setDescription(description)
      }
      if (productLinks) {
        let arr = Array(5)
          .fill(1)
          .map((_, i) => ({ id: i, url: productLinks[i] || '' }))
        setLinks(arr)
      }
      if (image) {
        setImage({ id: getId(), url: image, file: null })
      }
      if (images) {
        let arr = Array(4)
          .fill(1)
          .map((_, i) => ({ id: i, url: images[i]?.url || '', file: null }))
        setImages(arr)
      }
      if (category) {
        setCategory(category)
      }
      if (mrl) {
        setMrl(mrl)
      }
      if (mrp) {
        setMrp(mrp)
      }
    }
  }, [initialData])

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validate the form data
      await validationSchemaForSaveDraft.validate(
        { title, image, category },
        { abortEarly: false }
      )
      // Reset any previous errors if validation is successful
      setEmptyErrors()

      const formData = { title, description, mrp, mrl, links, category, images, image }
      console.log({ "handleSaveDraft": formData })

      // Call the mutation to save the draft
      saveDraft(formData)

    } catch (err: unknown) {
      setEmptyErrors()

      // Initialize an object to store errors
      const validationErrors: Record<string, string> = {}

      // Check if error is an instance of Yup.ValidationError
      if (err instanceof Yup.ValidationError) {
        // Loop through each error and store it in validationErrors
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message
          }
        })

        // Set the errors in the state after collecting all errors
        for (const path in validationErrors) {
          if (validationErrors.hasOwnProperty(path)) {
            setError(path as keyof typeof errors, validationErrors[path])
          }
        }

        console.log('Form:', {
          formData: { title, image },
          errors,
          validationErrors,
        })
      }
    }
  }


  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    // Collect form data in an object to reduce repetition
    const formData = { title, description, mrp, mrl, links, category, images, image }
    try {
      // Validate form data using Yup schema
      await validationSchemaForAddProduct.validate(formData, { abortEarly: false })

      // Reset errors if validation succeeds
      setEmptyErrors()
      console.log({ "first": "handleAddProduct" })
      // Call the mutation to create a new product
      if (isEdit) {
        updateProduct({ id: initialData?.id, status: "active", ...formData });
      }
      else
        createProduct(formData)
    } catch (err: unknown) {
      // Initialize validation errors object
      const validationErrors: Record<string, string> = {}

      // Check if the error is a Yup validation error
      if (err instanceof Yup.ValidationError) {
        // Loop through validation errors and collect them
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message
          }
        })

        // Set errors in state in a batch after collecting them
        Object.keys(validationErrors).forEach((field) => {
          setError(field as keyof typeof errors, validationErrors[field])
        })

        // Log validation errors along with the form data and existing errors
        console.log('Form:', {
          formData,
          errors: validationErrors,
          errorFromStore: errors,
        })
      }
    }
  }


  return (
    <section className="py-5 sm:px-3">
      <div className="flex items-center justify-between gap-4 w-full">
        <h1 className="text-2xl lg:text-3xl font-semibold">
          {
            isEdit
              ? 'Edit Product'
              :
              <>
                <span className="hidden md:inline-block">Create</span> New Product
              </>
          }
        </h1>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          {
            (isEdit && initialData?.id)
              ?
              <Button
                variant={'default'}
                onClick={handleAddProduct}
                className="gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <CheckCircle /> Update Product
              </Button>
              :
              <>
                <Button
                  variant={'outline'}
                  onClick={handleSaveDraft}
                  className="gap-2 hidden sm:inline-flex rounded-full"
                >
                  <FileClock /> Save Draft
                </Button>
                <Button
                  variant={'default'}
                  onClick={handleAddProduct}
                  className="gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <CheckCircle /> Add Product
                </Button>
              </>
          }

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
  )
}

export default ManageProduct


// let productFinal = {
//   "title": "Project Tille",
//   "description": "Here is the description",
//   "mrp": 1000,
//   "mrl": 10,
//   "links": [
//     {
//       "id": 0,
//       "url": "https://www.samsung.com/in/smartphones/galaxy-s24-ultra/"
//     },
//     {
//       "id": 1,
//       "url": "https://www.gsmarena.com/samsung_galaxy_s24_ultra-12771.php"
//     },
//   ],
//   "category": {
//     "id": 2,
//     "name": "Option 2",
//     "description": "2"
//   },
//   "images": [
//     {
//       "id": 0,
//       "url": "blob:http://localhost:3000/b1fe2225-17e3-4e77-a400-e1f18c4c4b8b",
//       "file": {}
//     },
//     {
//       "id": 1,
//       "url": "blob:http://localhost:3000/1001f8ae-a516-45af-aae4-53aa852afc10",
//       "file": {}
//     },
//   ],
//   "image": {
//     "id": "",
//     "url": "blob:http://localhost:3000/7cef9bbf-8951-4dcb-9c10-9e1020480058",
//     "file": {}
//   }
// }