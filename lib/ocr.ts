import { z } from "zod";

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export class OCRConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OCRConfigError";
  }
}

export type OCRExtractionResult = {
  text: string;
  provider: "demo" | "google-vision";
  mode: "demo" | "live";
  note?: string;
};

export const imageUploadSchema = z.object({
  size: z.number().max(MAX_FILE_SIZE_BYTES, "The image is too large. Maximum size is 10MB."),
  type: z
    .string()
    .refine((value) => ACCEPTED_IMAGE_TYPES.includes(value), {
      message: "Please upload a JPG, PNG, or WEBP image.",
    }),
});

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 KB";
  }

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

class DemoOCRProvider {
  async extractText(file: File): Promise<OCRExtractionResult> {
    const fileName = file.name || "uploaded-image";
    const fileType = file.type || "unknown";
    const size = formatFileSize(file.size);

    return {
      text: `Demo OCR output for ${fileName}\n\nThis output is clearly labeled as demo data because the app is running without a configured OCR provider.\n\n- File: ${fileName}\n- Type: ${fileType}\n- Size: ${size}\n\nSample extracted text:\nInvoice no. 1048\nCustomer: Northwind Labs\nAmount due: $1,284.00\nDue date: 2026-10-05\nStatus: Pending review`,
      provider: "demo",
      mode: "demo",
      note: "The app is running in demo mode. Set OCR_PROVIDER=google-vision or use the browser-based OCR flow for a real local extraction.",
    };
  }
}

class GoogleVisionProvider {
  async extractText(file: File): Promise<OCRExtractionResult> {
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    if (!apiKey) {
      throw new OCRConfigError(
        "Text extraction is not configured yet. Add GOOGLE_VISION_API_KEY or use the browser-based OCR flow.",
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {
                  type: "DOCUMENT_TEXT_DETECTION",
                  maxResults: 1,
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new OCRConfigError(
        `We couldn't reach the OCR provider. Please try again later. ${errorText}`,
      );
    }

    const body = (await response.json()) as {
      responses?: Array<{ fullTextAnnotation?: { text?: string } }>;
    };

    const extractedText = body.responses?.[0]?.fullTextAnnotation?.text?.trim();

    if (!extractedText) {
      throw new OCRConfigError("We couldn't extract any readable text from this image.");
    }

    return {
      text: extractedText,
      provider: "google-vision",
      mode: "live",
      note: "This text was extracted with Google Vision OCR.",
    };
  }
}

export async function extractTextFromImage(file: File): Promise<OCRExtractionResult> {
  const providerName = process.env.OCR_PROVIDER ?? "demo";

  if (providerName === "demo") {
    return new DemoOCRProvider().extractText(file);
  }

  if (providerName === "google-vision") {
    return new GoogleVisionProvider().extractText(file);
  }

  throw new OCRConfigError("Unsupported OCR provider configured. Use demo or google-vision.");
}
