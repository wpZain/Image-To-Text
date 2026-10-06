# Textify

Textify is a polished image-to-text OCR web app built with Next.js, Tailwind CSS, TypeScript, and a server-side OCR abstraction. It lets users upload an image, review a preview, extract text, edit the result, copy it, and download it as a `.txt` file.

## Features

- Premium landing page and product branding
- OCR workspace with drag-and-drop upload and image preview
- Server-side OCR abstraction with demo and Google Vision support
- Validation for file type and file size
- Text editor with copy and download actions
- Responsive layout for desktop and mobile
- SEO metadata and clean policy pages

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Lucide icons
- Sharp for image validation
- Google Vision-ready OCR abstraction

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment variables

See `.env.example` for the supported variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
OCR_PROVIDER=demo
GOOGLE_VISION_API_KEY=
```

### OCR configuration

- `OCR_PROVIDER=tesseract` uses the built-in local OCR engine and works without any API key.
- `OCR_PROVIDER=demo` keeps a clearly labeled sample-output mode for testing or fallback scenarios.
- `OCR_PROVIDER=google-vision` enables the Google Cloud Vision implementation, which requires a valid `GOOGLE_VISION_API_KEY`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Production deployment

The app is ready for standard Next.js deployment. Set the same environment variables in your hosting provider and deploy the app with your preferred platform.

## Future roadmap

- Real OCR provider integration across more languages and image types
- Persistent user history for uploaded jobs
- Batch processing and PDF support
- Export to DOCX, CSV, and other formats
"# Image-To-Text" 
