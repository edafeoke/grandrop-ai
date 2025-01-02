// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  if (!str) return ''; // Handle empty or undefined strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function devLog(...args: any[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(...args)
  }
}