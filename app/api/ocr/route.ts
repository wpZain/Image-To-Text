import { NextResponse } from "next/server";
import sharp from "sharp";

import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE_BYTES,
  OCRConfigError,
  extractTextFromImage,
  imageUploadSchema,
} from "@/lib/ocr";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Please upload an image first." }, { status: 400 });
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Please upload a JPG, PNG, or WEBP image." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "The image is too large. Maximum size is 10MB." },
        { status: 400 },
      );
    }

    const parsed = imageUploadSchema.safeParse({
      size: file.size,
      type: file.type,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid image upload." },
        { status: 400 },
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const metadata = await sharp(bytes).metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json(
        { error: "We couldn't read this image. Please try another file." },
        { status: 400 },
      );
    }

    const result = await extractTextFromImage(file);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof OCRConfigError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("OCR processing failed", error);
    return NextResponse.json(
      { error: "We couldn't process this image. Please try again." },
      { status: 500 },
    );
  }
}
