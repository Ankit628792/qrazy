'use client'

import React, { useState } from 'react'
import { ImageUploadProps } from '../../../../types'

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileChange,
  showPreview = true,
  ...props
}) => {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
    if (onFileChange) {
      onFileChange(file)
    }
    if (props.onChange) {
      props.onChange(event)
    }
  }

  return (
    <div className="image-upload">
      {showPreview && preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Preview" className="image-preview" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        {...props}
      />
    </div>
  )
}
