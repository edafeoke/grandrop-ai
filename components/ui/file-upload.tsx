"use client"

import * as React from "react"
import { UploadIcon, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { toast, Toaster } from "sonner"
import { fileUpload } from "@/actions/indexing"
import { Document } from "@langchain/core/documents"

interface FileUploadProps {
  acceptedFileTypes?: string[];
  onFilesSelected: (files: File[]) => void;
}

export default function FileUpload({ 
  acceptedFileTypes = [".pdf", ".doc", ".docx", ".txt"],
  onFilesSelected
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const formRef = React.useRef<HTMLFormElement>(null)

  const initialState = {
    message: "",
    success: false,
    status: 0,
    data: ""
  }
  const [state, action, isPending] = React.useActionState(fileUpload, initialState)
  const [documents, setDocuments] = React.useState<Document[] | null>(null)

  React.useEffect(() => {
    if (state) {
      if (state.success) {
        const splittedDocuments = JSON.parse(state.data)
        console.log(splittedDocuments)
        setDocuments(splittedDocuments)
        toast.success(state.message)
      } else {
        if (state.status >= 400) {
          toast.error(state.message)
        }
      }
    }
  }, [state])

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter(file => 
      acceptedFileTypes.some(type => file.name.toLowerCase().endsWith(type))
    )
    
    if (validFiles.length > 0) {
      const formData = new FormData()
      validFiles.forEach(file => formData.append('files', file))
      action(formData)

    }
  }, [acceptedFileTypes, action])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(file => 
      acceptedFileTypes.some(type => file.name.toLowerCase().endsWith(type))
    )

    if (validFiles.length > 0) {
      const formData = new FormData()
      onFilesSelected(validFiles)
    }
  }

  return (
    <form ref={formRef} className="w-full max-w-3xl mx-auto space-y-4">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors",
          "hover:border-gray-400",
          isDragging && "border-primary bg-primary/5",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          name="files"
          className="hidden"
          multiple
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileInput}
          disabled={isPending}
        />
        <div className="flex flex-col items-center gap-4">
          {isPending ? (
            <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
          ) : (
            <UploadIcon className="h-10 w-10 text-gray-400" />
          )}
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              {isPending ? 'Uploading...' : 'Drag & drop files here, or click to select files'}
            </p>
            <p className="text-sm text-gray-500">
              Supported File Types: {acceptedFileTypes.join(", ")}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center">
        If you are uploading a PDF, make sure you can select/highlight the text.
      </p>
      <Toaster richColors/>
    </form>
  )
}

