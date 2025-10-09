# Pulse IoT Dashboard

A modern Next.js application for managing IoT devices with a beautiful UI built using shadcn/ui components.

## 🏗️ Project Structure

This project follows Next.js App Router conventions:

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── devices/           # Devices page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── index.ts          # Component exports
├── hooks/                 # Custom React hooks
│   ├── use-mobile.tsx    # Mobile detection hook
│   └── use-toast.ts      # Toast notifications hook
├── lib/                   # Utility functions
│   └── utils.ts          # Common utilities
├── types/                 # TypeScript type definitions
│   └── index.ts          # Global types
├── constants/             # Application constants
│   └── index.ts          # App constants
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Charts:** Recharts
- **TypeScript:** Full type safety

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server