"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { Upload, X, FileText, CheckCircle2 } from "lucide-react";
import { cx } from "@lib";

interface FileUploadProps {
  label?: string;
  onFileSelect?: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
}

export const FileUpload = ({
  label,
  onFileSelect,
  accept,
  maxSizeMB = 10,
  className,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    setSelectedFile(file);
    if (onFileSelect) onFileSelect(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError(null);
    if (onFileSelect) onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={cx("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-midnight">{label}</label>
      )}

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cx(
          "relative mt-2 border-2 border-dashed rounded-[24px] p-8 flex flex-col items-center justify-center space-y-4 transition-all cursor-pointer",
          isDragging
            ? "border-blue-main bg-blue-50/50 scale-[1.01]"
            : selectedFile
              ? "border-green-200 bg-green-50/20"
              : "border-gray-100 bg-gray-50/30 hover:border-blue-main/30 hover:bg-gray-50/50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={onInputChange}
          className="hidden"
        />

        {selectedFile ? (
          <div className="flex flex-col items-center space-y-3 w-full animate-in fade-in zoom-in duration-300">
            <div className="size-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-sm shadow-green-200/50">
              <FileText size={28} />
            </div>
            <div className="text-center w-full px-4">
              <p className="text-sm font-bold text-gray-900 truncate max-w-xs mx-auto">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold">
                <CheckCircle2 size={12} />
                Ready to upload
              </div>
              <button
                onClick={removeFile}
                className="size-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors shadow-sm"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className={cx(
                "size-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors",
                isDragging
                  ? "bg-blue-main text-white"
                  : "bg-white text-gray-300"
              )}
            >
              <Upload size={24} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900">
                Upload your work
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Drag and drop your files here, or click to browse
              </p>
            </div>
            <button className="px-6 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:border-blue-main/30 shadow-sm transition-all active:scale-95">
              Browse Files
            </button>
          </>
        )}

        {error && (
          <p className="absolute -bottom-6 left-1 text-[10px] font-bold text-red-500 animate-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
