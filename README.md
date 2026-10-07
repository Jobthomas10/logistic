# LorryMitra AI (ലോറിമിത്ര AI) 🚛
### Multimodal Logistics Document Intelligence & Bilingual Malayalam-English Assistant for Lorry Drivers

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-OpenStreetMap-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![OSRM](https://img.shields.io/badge/Routing-OSRM-0078A8)](https://project-osrm.org/)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Repository:** [https://github.com/Jobthomas10/logistic](https://github.com/Jobthomas10/logistic)

---

## 📌 Overview

**LorryMitra AI** is a purpose-built logistics intelligence platform designed for commercial vehicle drivers, fleet operators, and transport contractors navigating freight corridors in Kerala and South India. 

Transport drivers frequently receive complex legal and tax documents — such as **E-Way Bills (EWB-01)**, **GST Tax Invoices**, **Consignment Notes (Lorry Receipts / LR)**, and **Delivery Challans** — in dense English terminology with micro-print tables. LorryMitra AI solves this by:

1. **Multimodal OCR & Document Intelligence**: Automatically reading and extracting key fields (vehicle numbers, pickup/drop addresses, gross weight, cargo description, value, expiry date) directly from uploaded photos or PDF scans using Google Gemini AI.
2. **Simplified Malayalam Explanation (ലളിത സംഗ്രഹം)**: Translating dense paperwork into 4–5 plain, actionable bullet points tailored for drivers on the road.
3. **Voice Read-Aloud (Text-to-Speech)**: Reading out the summary in measured Malayalam (`ml-IN`) so drivers can listen hands-free.
4. **Ask LorryMitra (Strictly Grounded Voice & Chat Q&A)**: Allowing drivers to ask spoken or typed questions in Malayalam, English, or Manglish (e.g. *"Delivery എവിടെയാണ്?"*, *"Cargo എന്താണ്?"*, *"ബിൽ എപ്പോൾ expire ആകും?"*), with guaranteed zero-hallucination answers drawn strictly from the document.
5. **Open Source Route Map (OpenStreetMap & OSRM)**: Plotting the exact road highway route between the document's Pickup and Delivery locations using Leaflet and the Open Source Routing Machine (OSRM), complete with highway mileage, estimated driving duration, and live vehicle transit status.
6. **High-Contrast Driver Mode**: High-visibility cab interface with oversized touch targets and one-tap voice interactions.
7. **Checkpost & Compliance Warnings**: Real-time alerts for impending E-Way Bill expiration, missing Part-B vehicle details, and fragile cargo precautions.

---

## 🚀 Quick Start / Local Setup Guide

Follow these exact step-by-step terminal commands to run LorryMitra AI on your local machine.

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: v18.0.0 or higher (v20+ recommended). [Download Node.js](https://nodejs.org/)
- **npm**: v9.0.0 or higher (bundled with Node.js)
- **Git**: [Download Git](https://git-scm.com/)

---

### Step 1: Clone the Repository

Open your terminal (PowerShell, Command Prompt, or Bash) and clone the repository:

```bash
git clone https://github.com/Jobthomas10/logistic.git
cd logistic
```

*(If your local directory is named `Transport`, run `cd Transport`)*

---

### Step 2: Install Dependencies

Install all required npm packages (including React 19, Leaflet, Lucide icons, Supabase client, and Vite):

```bash
npm install
```

---

### Step 3: Configure Environment Variables

Create your local `.env` configuration file from the provided `.env.example` template:

#### On Windows (PowerShell):
```powershell
Copy-Item .env.example .env
```

#### On macOS / Linux:
```bash
cp .env.example .env
```

Open `.env` in your text editor and provide your API keys:

```env
# Supabase Configuration (Optional for cloud sync; demo mode works locally without it)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key

# Google Gemini API Key (Required for live multimodal document extraction & AI Q&A)
# Get a free API key at: https://aistudio.google.com/app/apikey
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note**: Even without external API keys, the application includes complete demo Kerala transport documents (FastTrack Consignment Note, Ernakulam-Kozhikode E-Way Bill, Kottayam Rubber LR, and Aluva Steel Challan) with full local deterministic grounding and route mapping.

---

### Step 4: Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

You should see output similar to:

```text
  VITE v8.3.3  ready in 318 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 5: Open in Browser

Open your browser and navigate to:

👉 **[http://localhost:5173](http://localhost:5173)**

The application will load with the primary **FastTrack Logistics Consignment Note** (`KL 07 AB 1234` | Kochi ➔ Bengaluru) pre-loaded on your dashboard.

---

### Step 6 (Optional): Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🗄️ Database Setup (Supabase)

LorryMitra AI includes an enterprise-grade PostgreSQL schema with Row Level Security (RLS) policies.

To configure Supabase cloud synchronization:
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of [`supabase_schema.sql`](./supabase_schema.sql) and click **Run**.
4. Create a storage bucket named `documents` under **Storage** (set to public or authenticated).
5. Copy your **Project URL** and **Anon / Publishable Key** into your `.env` file.

---

## 🗺️ Open Source Map & Routing Engine

LorryMitra AI uses **100% open source** mapping and routing technology with **zero proprietary map API keys required**:

| Component | Technology | Description |
|---|---|---|
| **Map Rendering** | [Leaflet](https://leafletjs.com/) | Lightweight, responsive JavaScript mapping library |
| **Map Tiles** | [OpenStreetMap (OSM)](https://www.openstreetmap.org/) | Global open-access cartography |
| **Highway Routing** | [OSRM (Open Source Routing Machine)](https://project-osrm.org/) | High-performance routing engine calculating real turn-by-turn road geometry along Indian National Highways (NH 544, NH 44, NH 66) |
| **Geocoding** | Custom Transport Hub Directory + [OSM Nominatim](https://nominatim.openstreetmap.org/) | Resolves Kerala and Indian logistics addresses to exact coordinates |

### Route Features:
- **Origin Pin (A)**: Green marker with animated radar pulse indicating consignor warehouse location.
- **Destination Pin (B)**: Red marker indicating consignee delivery depot.
- **Vehicle Position Marker**: Animated amber truck icon stationed along the active transit corridor showing the vehicle number and cargo.
- **Route Metrics**: Automatic calculation of road distance (km) and estimated driving time.
- **Navigation Shortcuts**: Quick links to open turn-by-turn navigation in **OpenStreetMap** or **Google Maps**.

---

## 📁 Project Architecture & Directory Structure

```text
Transport/
├── index.html                   # HTML entry point with Google Fonts (Inter & Outfit)
├── vite.config.js               # Vite bundler configuration
├── package.json                 # Project dependencies & scripts
├── supabase_schema.sql          # Complete Supabase PostgreSQL schema with RLS
├── .env.example                 # Environment variables template
├── public/                      # Static assets (favicons, consignment sample notes)
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Main application orchestrator & tab routing
    ├── App.css                  # Custom animations & utility classes
    ├── index.css                # Global CSS styling & design system
    │
    ├── components/
    │   ├── DashboardView.jsx    # Today's Load overview, key metrics & live route map
    │   ├── RouteMap.jsx         # OpenStreetMap & OSRM Leaflet route visualization
    │   ├── MalayalamSummary.jsx # Simplified Malayalam driver card with voice audio
    │   ├── ChatInterface.jsx    # "Ask LorryMitra" grounded chat & voice Q&A engine
    │   ├── DocumentUploader.jsx # Drag-and-drop file upload & instant sample selector
    │   ├── ExtractionResult.jsx # Tabular breakdown of extracted document fields
    │   ├── DriverMode.jsx       # Large-button high-contrast cab interface
    │   ├── DeliveryCard.jsx     # Origin/destination breakdown with interactive map
    │   ├── CargoCard.jsx        # Cargo weight, packages, HSN codes & invoice value
    │   ├── WarningCard.jsx      # E-Way Bill expiry & compliance alerts
    │   ├── DocumentHistory.jsx  # Processed bill history & search
    │   ├── Navbar.jsx           # Top navigation with language switch & driver mode
    │   ├── Sidebar.jsx          # Desktop left navigation bar
    │   ├── BottomNav.jsx        # Mobile bottom navigation bar
    │   ├── AuthModal.jsx        # Supabase authentication modal
    │   ├── SettingsModal.jsx    # API key & preference configuration
    │   └── DemoTourModal.jsx    # Interactive walkthrough modal
    │
    ├── services/
    │   ├── aiService.js         # Multimodal document extraction & grounded Q&A
    │   ├── mapService.js        # Coordinate resolution & OSRM routing
    │   ├── documentService.js   # Supabase document persistence & file upload
    │   ├── authService.js       # User session management
    │   ├── deliveryService.js   # Delivery status tracking
    │   └── vehicleService.js    # Vehicle fleet management
    │
    ├── data/
    │   ├── sampleDocuments.js   # Verified realistic Kerala logistics documents
    │   └── translations.js      # Complete Malayalam & English translation dictionary
    │
    └── utils/
        └── supabase.js          # Supabase client initializer
```

---

## 🧪 Testing Sample Documents

The application includes verified sample logistics documents for instant testing without needing to scan physical papers:

1. **FastTrack Logistics Consignment Note (Featured Primary)**:
   - **Document**: `FTL/2026/10/0456` | Date: `05-10-2026`
   - **Vehicle**: `KL 07 AB 1234` (Driver: Rajesh Kumar)
   - **Route**: Kochi (Edayar Industrial Area) ➔ Bengaluru (Peenya Industrial Area)
   - **Cargo**: Electrical Equipment (*Distribution Panel, Control Switches, Cables*) — **500 KG** (305 PCS)
   - **Invoice Value**: ₹1,50,000.00 (Total with IGST: ₹1,77,000.00)
2. **E-Way Bill: Vitrified Tiles**:
   - `KL-05-AB-1234` | Kalamassery, Ernakulam ➔ Mavoor Road, Kozhikode (185 km)
3. **Consignment Note: Rubber & Pepper**:
   - `KL-07-CD-5678` | Kanjikuzhy, Kottayam ➔ Kalpetta, Wayanad (290 km, Thamarassery Churam route)
4. **Delivery Challan: TMT Steel Rods (Missing Vehicle Part-B)**:
   - Aluva, Ernakulam ➔ Thrissur Round North (Defective document test case)
5. **Interstate E-Way Bill: Wall Tiles**:
   - `MH-12-CD-9876` | Pune, Maharashtra ➔ Anna Salai, Chennai (Expired test case)

---

## 🛠️ Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite local development server on `http://localhost:5173` |
| `npm run build` | Compiles production assets into `dist/` |
| `npm run preview` | Runs a local web server serving the `dist/` production build |
| `npm run lint` | Runs fast Oxlint code quality checks across all files |

---

## ❓ Troubleshooting & FAQs

### 1. Web Speech Audio is not speaking in Malayalam
- On Chromium browsers, Malayalam speech synthesis uses the system's Indian English / Malayalam voice (`ml-IN` or `en-IN`). Ensure sound is unmuted and browser permissions allow audio playback.

### 2. Microphone Speech-to-Text not working in Chat
- Open your browser permissions settings (click the padlock icon in the URL bar) and allow **Microphone** access for `http://localhost:5173`.
- If on an unsecured network or unsupported browser, preset quick question chips (e.g. *"Delivery എവിടെയാണ്?"*) can be clicked directly.

### 3. Leaflet map tiles not displaying
- Ensure you have an active internet connection so Leaflet can fetch map tiles from OpenStreetMap (`tile.openstreetmap.org`) and turn-by-turn road paths from OSRM (`router.project-osrm.org`).

---

## 📄 License

This project is licensed under the **MIT License**. Free for educational, commercial, and research use.
