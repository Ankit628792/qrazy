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

const validationSchemaForSaveDraft = Yup.object({
  title: Yup.string().required('Title is required'),
  image: Yup.object({
    file: Yup.mixed().required('File is required')
  })
})

const validationSchemaForAddProduct = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  mrp: Yup.number().min(1).required('MRP is required'),
  mrl: Yup.number().min(1).required('MRL is required'),
  category: Yup.object({
    id: Yup.number().required('ID is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required')
  }),
  image: Yup.object({
    id: Yup.number().required('ID is required'),
    url: Yup.string().required('Image is required'),
    file: Yup.mixed().required('File is required')
  }),
  links: Yup.array().of(
    Yup.object({
      id: Yup.number().required('ID is required'),
      url: Yup.string()
        .nullable()
        .notRequired()
        .test('is-valid-url', 'Please enter a valid URL', (value) => {
          if (value == null || value === '') return true
          return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}.*$/.test(
            value
          )
        })
    })
  )
})

function ManageProduct() {
  const { title, description } = useTitleDescriptionStore()
  const { mrp, mrl } = usePricingStore()
  const { links } = useLinksStore()
  const { category } = useCategoryStore()
  const { image } = useImageStore()
  const { images } = useImagesStore()
  const { errors, setError, setEmptyErrors } = useProductErrorsStore()

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      // Validate the form data
      await validationSchemaForSaveDraft.validate(
        { title, image },
        { abortEarly: false }
      )
      // Reset any previous errors if validation is successful
      setEmptyErrors()
      console.log('Form:', { title, image })
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
      console.log('Form:', formData) // Log form data after validation success
  
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
          <span className="hidden md:inline-block">Create</span> New Product
        </h1>
        <div className="flex gap-2 sm:gap-3 md:gap-4">
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
