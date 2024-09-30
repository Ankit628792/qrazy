'use client'

import React, { SyntheticEvent, useState } from 'react'
import { MultiFileUploadProps } from '../../../types'

export const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  maxFiles = Infinity,
  minFiles = 1,
  maxSize,
  allowedExtensions,
  dragAndDrop = false,
  showProgress = false,
  onFilesChange,
  setProgress,
  ...props
}) => {
  const [files, setFiles] = useState<File[]>([])
  const [progress, _setProgress] = useState<number>(0)

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      if (newFiles.length < minFiles || newFiles.length > maxFiles) {
        alert(`Please select between ${minFiles} and ${maxFiles} files.`)
        return
      }

      if (maxSize && newFiles.some((file) => file.size > maxSize)) {
        alert(`Some files exceed the maximum size of ${maxSize / 1000000}MB.`)
        return
      }

      if (
        allowedExtensions &&
        newFiles.some(
          (file) => !allowedExtensions.includes(file.type.split('/')[1])
        )
      ) {
        alert(`Some files have disallowed extensions.`)
        return
      }

      setFiles(newFiles)
      onFilesChange && onFilesChange(newFiles)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.items) {
      const newFiles: File[] = []
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile()
          if (file) newFiles.push(file)
        }
      }
      setFiles(newFiles)
      onFilesChange && onFilesChange(newFiles)
    }
  }

  const onProgress = (e: SyntheticEvent<HTMLProgressElement, Event>) => {
    _setProgress(progress)
    setProgress && setProgress(e)
  }

  return (
    <div>
      {dragAndDrop ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-dashed border-2 p-4"
        >
          Drag & Drop files here
        </div>
      ) : null}
      <input
        type="file"
        multiple
        onChange={handleFilesChange}
        className="mt-4"
        {...props}
      />
      {showProgress && (
        <progress
          onProgress={onProgress}
          value={progress}
          max={100}
          className="mt-4 w-full"
        >
          {progress}
        </progress>
      )}
      <ul className="mt-4">
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  )
}
