# 🔬 Cytomind - AI-Powered Bone Marrow Cell Classification

A full-stack AI system for automated bone marrow cell analysis and cancer risk assessment. Uses an ensemble deep learning model (ResNet-50 + Vision Transformer) to classify 21 types of bone marrow cells with 93.5% accuracy.

![Architecture](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![AI](https://img.shields.io/badge/AI-PyTorch-EE4C2C?logo=pytorch)
![DB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)

---

## 📋 What You Need to Download/Install

Before starting, make sure you have these installed on your computer:

| Software | Version | Download Link |
|----------|---------|---------------|
| **Node.js** | 18+ | https://nodejs.org/ (Download LTS version) |
| **Python** | 3.9+ | https://www.python.org/downloads/ (Check "Add to PATH" during install) |
| **MongoDB** | 7+ | https://www.mongodb.com/try/download/community (Community Server) |
| **Git** | Latest | https://git-scm.com/downloads |

> ⚠️ **IMPORTANT**: During Python install, check ✅ **"Add Python to PATH"**
> ⚠️ **IMPORTANT**: During MongoDB install, select ✅ **"Install as Service"** (default)

---

## 📦 Files You Need

You need TWO things:
1. **This code** (from GitHub)  
2. **The AI model file** `ensemble_final.pth` (~442 MB) — shared via Google Drive

---

## 🚀 Step-by-Step Setup Guide (Windows)

### Step 1: Clone This Repository

Open **Command Prompt** or **PowerShell** and run:

```bash
git clone https://github.com/srijeethT/Cytomind.git
cd Cytomind
```

### Step 2: Download the AI Model

1. Download `ensemble_final.pth` from the shared Google Drive link
2. Place it in the **root folder** of the project (same level as `package.json`)

Your folder should look like:
```
Cytomind/
├── app/
├── backend/
├── src/
├── ensemble_final.pth    ← PUT THE MODEL FILE HERE
├── model_metadata.json
├── package.json
└── ...
```

### Step 3: Install MongoDB

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Select **"Complete"** installation
4. ✅ Check **"Install MongoDB as a Service"** (this is the default)
5. Finish the installation
6. MongoDB will start automatically as a Windows service

**Verify MongoDB is running:**
```bash
# Open PowerShell and run:
Get-Service MongoDB*
# You should see: Status = Running
```

### Step 4: Create Environment Files

#### 4a. Create `.env.local` in the root folder:

Create a new file called `.env.local` in the `Cytomind/` folder with this content:

```env
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/cytomind

# JWT Secret for authentication
JWT_SECRET=cytomind-secret-key-2024

# ML Backend URL (Python server)
ML_BACKEND_URL=http://127.0.0.1:8000
```

#### 4b. Create `.env` in the backend folder:

Create a new file called `.env` in the `Cytomind/backend/` folder with this content:

```env
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/cytomind

# Model path
MODEL_PATH=../ensemble_final.pth
```

### Step 5: Install Frontend Dependencies

```bash
# In the Cytomind/ folder:
npm install
```

This will take 1-2 minutes.

### Step 6: Install Backend Dependencies

```bash
# Install PyTorch (CPU version - works on any computer):
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Install other Python packages:
pip install -r backend/requirements.txt
```

This will take 5-10 minutes depending on your internet speed.

### Step 7: Start the Application

You need **TWO terminals** open:

#### Terminal 1 — Start ML Backend:
```bash
cd backend
python main.py
```
Wait until you see: `Uvicorn running on http://127.0.0.1:8000`

#### Terminal 2 — Start Frontend:
```bash
# In the Cytomind/ folder (NOT backend/):
npm run dev
```
Wait until you see: `Local: http://localhost:3000`

### Step 8: Open the App! 🎉

Open your browser and go to: **http://localhost:3000**

1. Click **"Create new lab account"**
2. Enter your email, lab name, and password
3. Sign in
4. Upload bone marrow cell images
5. Get AI classification results!

---

## 🔧 Quick Start Script (Windows)

Instead of doing steps 7 manually, you can use the batch file:

Create a file called `start.bat` in the root folder:
```batch
@echo off
echo ============================================
echo    CYTOMIND - Bone Marrow Cell Classifier
echo ============================================
echo.
echo Starting ML Backend...
start cmd /k "cd backend && python main.py"
echo Waiting for backend to load (30 seconds)...
timeout /t 30 /nobreak
echo.
echo Starting Frontend...
start cmd /k "npm run dev"
echo.
echo ============================================
echo   Open http://localhost:3000 in your browser
echo ============================================
pause
```

Double-click `start.bat` to start everything!

---

## 🧬 21 Cell Types Classified

### 🔴 Malignant Cells
| Code | Cell Type | Associated Disease |
|------|-----------|-------------------|
| BLA | Blast Cell | Acute Leukemia |
| MYB | Myeloblast | AML |
| PMO | Promyelocyte | APL |
| FGC | Faggot Cell | APL |
| HAC | Hairy Cell | Hairy Cell Leukemia |
| LYI | Lymphocyte Immature | ALL |
| ABE | Abnormal Eosinophil | Myeloproliferative Disorders |
| PLM | Plasma Cell | Multiple Myeloma |

### 🟢 Normal Cells
| Code | Cell Type |
|------|-----------|
| LYT | Lymphocyte |
| MON | Monocyte |
| EOS | Eosinophil |
| BAS | Basophil |
| NGB | Band Neutrophil |
| NGS | Segmented Neutrophil |
| NIF | Neutrophil Immature |

### 🟡 Precursor Cells
| Code | Cell Type |
|------|-----------|
| EBO | Erythroblast |
| PEB | Proerythroblast |
| MMZ | Metamyelocyte |
| KSC | Kidney Shaped Cell |

### ⚪ Other
| Code | Cell Type |
|------|-----------|
| ART | Artefact |
| OTH | Other |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   CYTOMIND SYSTEM                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐         ┌──────────────────────┐      │
│  │   FRONTEND   │ ──────► │    ML BACKEND        │      │
│  │  (Next.js)   │ ◄────── │  (Python FastAPI)    │      │
│  │  Port: 3000  │         │    Port: 8000        │      │
│  └──────┬───────┘         └──────────┬───────────┘      │
│         │                            │                  │
│         ▼                            ▼                  │
│  ┌──────────────┐         ┌──────────────────────┐      │
│  │   MongoDB    │         │   PyTorch Model      │      │
│  │ (Users/Jobs) │         │  (ViT + ResNet)      │      │
│  └──────────────┘         └──────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ❓ Troubleshooting

### "MongoDB is not running"
```bash
# Start MongoDB service:
net start MongoDB
```

### "torch import error / fbgemm.dll error"
```bash
# Reinstall PyTorch CPU version:
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu --force-reinstall
```

### "Cannot connect to backend"
- Make sure Terminal 1 (backend) shows "Uvicorn running on http://127.0.0.1:8000"
- The backend takes 30-60 seconds to load the AI model

### "npm install fails"
```bash
# Clear cache and retry:
npm cache clean --force
npm install
```

### "Page shows error after login"
- Make sure `.env.local` file exists in the root folder
- Make sure MongoDB service is running

---

## 👥 Team

- Built as a Major Project for Bone Marrow Cell Classification
- AI Model: Ensemble (ResNet-50 + Vision Transformer) — 93.5% Accuracy
- Dataset: 21 classes of bone marrow cells

---

## 📄 License

This project is for educational/research purposes.
