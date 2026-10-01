"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Check, Loader2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: "team" | "events" | "projects" | "general";
  placeholder?: string;
  helperText?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  folder = "general",
  placeholder = "https://... or /media/...",
  helperText,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WebP, SVG).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File is too large (max 10MB).");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-slate-700 font-bold text-xs uppercase font-mono">
          {label}
        </label>
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === "upload"
                ? "bg-blue-100 text-blue-700 font-bold"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Direct Upload
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === "url"
                ? "bg-blue-100 text-blue-700 font-bold"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div>
          {value ? (
            <div className="relative flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-300">
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized={value.startsWith("http")}
                />
              </div>
              <div className="flex-1 min-w-0 pr-8">
                <p className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Image attached
                </p>
                <p className="text-[10px] font-mono text-slate-500 truncate" title={value}>
                  {value}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors shadow-xs"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-50/50"
                  : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-2 space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <p className="text-xs font-mono text-blue-600 font-semibold">
                    Uploading image...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-1 space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-700 font-sans">
                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-[10px] font-mono text-slate-400">
                    PNG, JPG, WebP or SVG up to 10MB
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-500 pr-8"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {uploadError && (
        <p className="text-[10px] font-mono text-red-600 bg-red-50 p-1.5 rounded border border-red-200">
          {uploadError}
        </p>
      )}

      {helperText && !uploadError && (
        <p className="text-[10px] text-slate-400 font-mono">{helperText}</p>
      )}
    </div>
  );
}
