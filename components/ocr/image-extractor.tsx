"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import {
  AlertCircle,
  Check,
  Copy,
  Download,
  FileImage,
  ImageUp,
  LoaderCircle,
  RefreshCw,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatFileSize, getBaseFilename } from "@/lib/utils";

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

type OCRResult = {
  text: string;
  provider: string;
  mode: string;
  note?: string;
};

export function ImageExtractor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<OCRResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const resetResult = () => {
    setResult(null);
    setTextValue("");
  };

  const handleFileSelection = (file: File | null) => {
    if (!file) {
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("The image is too large. Maximum size is 10MB.");
      return;
    }

    setError("");
    setSelectedFile(file);
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return URL.createObjectURL(file);
    });
    resetResult();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    handleFileSelection(nextFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const nextFile = event.dataTransfer.files?.[0] ?? null;
    handleFileSelection(nextFile);
  };

  const handleExtract = async () => {
    if (!selectedFile) {
      setError("Please upload an image first.");
      return;
    }

    setError("");
    setIsProcessing(true);

    try {
      const result = await Tesseract.recognize(selectedFile, "eng", {
        logger: () => undefined,
      });

      const extractedText = result.data.text.trim();

      if (!extractedText) {
        setError("We couldn't extract any readable text from this image.");
        return;
      }

      const nextResult = {
        text: extractedText,
        provider: "tesseract",
        mode: "live",
        note: "This text was extracted locally in the browser with Tesseract OCR.",
      };

      setResult(nextResult);
      setTextValue(nextResult.text);
    } catch {
      setError("Text extraction is temporarily unavailable. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!textValue) {
      return;
    }

    try {
      await navigator.clipboard.writeText(textValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Copy is not available in this browser. You can still select the text manually.");
    }
  };

  const handleDownload = () => {
    if (!textValue) {
      return;
    }

    const filename = selectedFile ? `${getBaseFilename(selectedFile.name)}.txt` : "document.txt";
    const blob = new Blob([textValue], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return null;
    });
    setError("");
    resetResult();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">OCR workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Image to text</h1>
        </div>
        {selectedFile ? (
          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
            {selectedFile.name} · {formatFileSize(selectedFile.size)}
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)] sm:p-6">
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={[
              "relative overflow-hidden rounded-[22px] border border-dashed p-4 transition-all sm:p-6",
              isDragging ? "border-slate-900 bg-slate-50" : "border-slate-300 bg-slate-50/80",
            ].join(" ")}
          >
            {previewUrl ? (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <Image
                    src={previewUrl}
                    alt="Uploaded document preview"
                    width={800}
                    height={500}
                    unoptimized
                    className="max-h-[420px] w-full object-contain"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="rounded-full border-slate-200 bg-white" onClick={() => inputRef.current?.click()}>
                    <ImageUp className="h-4 w-4" />
                    Replace
                  </Button>
                  <Button variant="secondary" className="rounded-full" onClick={handleRemove}>
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <UploadCloud className="h-8 w-8 text-slate-700" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-slate-900">Drop an image here</h2>
                <p className="mt-2 text-sm text-slate-600">or browse from your device</p>
                <Button variant="default" className="mt-5 rounded-full" onClick={() => inputRef.current?.click()}>
                  <FileImage className="h-4 w-4" />
                  Browse image
                </Button>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInputChange}
              className="hidden"
              aria-label="Upload an image to extract text"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1 rounded-full" disabled={!selectedFile || isProcessing} onClick={handleExtract}>
              {isProcessing ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Reading your image...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Extract Text
                </>
              )}
            </Button>
            <Button variant="outline" className="rounded-full border-slate-200 bg-white" onClick={handleRemove} disabled={!selectedFile}>
              Clear
            </Button>
          </div>

          {error ? (
            <div className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
              <span>{error}</span>
            </div>
          ) : null}
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Extracted text</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Editor</h2>
            </div>
            {textValue ? (
              <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                {textValue.length.toLocaleString()} chars
              </div>
            ) : null}
          </div>

          {result?.mode === "demo" ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Demo mode is enabled. This text is clearly labeled as sample output and not a real OCR result.
            </div>
          ) : null}

          {result?.note ? <div className="mt-3 text-xs text-slate-500">{result.note}</div> : null}

          <div className="mt-4 rounded-[22px] border border-slate-200 bg-slate-50 p-3">
            <textarea
              aria-label="Extracted text output"
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
              placeholder="Your extracted text will appear here."
              className="min-h-[420px] w-full resize-none border-0 bg-transparent text-sm leading-7 text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="default" className="rounded-full" onClick={handleCopy} disabled={!textValue}>
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button variant="outline" className="rounded-full border-slate-200 bg-white" onClick={handleDownload} disabled={!textValue}>
              <Download className="h-4 w-4" />
              Download TXT
            </Button>
            <Button variant="secondary" className="rounded-full" onClick={() => setTextValue("")} disabled={!textValue}>
              Clear
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
