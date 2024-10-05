'use client'

import React, { useState } from 'react'
import { MultiImageUploadProps } from '../../../../types'

export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  onFilesChange,
  showPreviews = true,
  ...props
}) => {
  const [previews, setPreviews] = useState<string[]>([])

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : null
    if (files) {
      const readerPromises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result as string)
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })
      Promise.all(readerPromises).then((loadedPreviews) => {
        setPreviews(loadedPreviews)
      })
    } else {
      setPreviews([])
    }
    if (onFilesChange) {
      onFilesChange(files)
    }
    if (props.onChange) {
      props.onChange(event)
    }
  }

  return (
    <div className="multi-image-upload">
      {showPreviews &&
        previews.map((preview, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={preview}
            alt={`Preview ${index}`}
            className="image-preview"
          />
        ))}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        {...props}
      />
    </div>
  )
}
