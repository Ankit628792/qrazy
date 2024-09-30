'use client'

import React, { useState, useRef } from 'react'
import { SingleFileUploadProps } from '../../../types'

export const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
  maxSize,
  allowedExtensions = [],
  dragAndDrop = false,
  showProgress = false,
  onFileChange,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File | null): boolean => {
    if (!file) return false

    if (maxSize && file.size > maxSize) {
      alert(`File exceeds the allowed size limit.`)
      return false
    }

    if (allowedExtensions && !allowedExtensions.includes(file.type)) {
      alert(`File type is not allowed.`)
      return false
    }

    return true
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file && validateFile(file)) {
      if (showProgress) {
        // Simulate file upload progress
        let currentProgress = 0
        const interval = setInterval(() => {
          currentProgress += 10
          setProgress(currentProgress)
          if (currentProgress >= 100) {
            clearInterval(interval)
            setProgress(null)
          }
        }, 100)
      }

      if (onFileChange) {
        onFileChange(file)
      }
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null
    if (file && validateFile(file)) {
      if (onFileChange) {
        onFileChange(file)
      }
    }
  }

  return (
    <div
      className={`border-2 p-4 ${
        isDragging ? 'border-primary-500' : 'border-neutral-300'
      }`}
      onDragOver={dragAndDrop ? handleDragOver : undefined}
      onDragEnter={dragAndDrop ? handleDragEnter : undefined}
      onDragLeave={dragAndDrop ? handleDragLeave : undefined}
      onDrop={dragAndDrop ? handleDrop : undefined}
    >
      <input
        {...props} // Spread the rest of the props
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept={allowedExtensions.join(',')}
      />
      <button
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        Upload File
      </button>
      {showProgress && progress !== null && (
        <div className="mt-2">
          <div className="bg-neutral-200 h-4 rounded">
            <div
              style={{ width: `${progress}%` }}
              className="bg-primary-500 h-4 rounded"
            ></div>
          </div>
          <p className="text-center mt-1">{progress}%</p>
        </div>
      )}
    </div>
  )
}

export default SingleFileUpload
