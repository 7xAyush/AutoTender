# AutoTender - AI-Driven Tender Evaluation System

AutoTender is a prototype full-stack platform for AI-assisted tender evaluation in government and CRPF-style procurement workflows. It ingests tender files, converts extracted legal clauses into structured eligibility rules, evaluates vendor profiles against those rules, and generates auditable pass/fail reports with confidence scoring.

## Problem Statement

Manual tender evaluation is time-consuming, inconsistent, and difficult to audit at scale. AutoTender reduces evaluator effort by standardizing eligibility checks, providing traceable rule decisions, and presenting a reusable workflow that can later integrate production OCR and NLP models.

## Features

- Tender document upload with metadata and local file persistence
- Mock OCR and clause extraction pipeline for PDFs, scanned PDFs, and DOCX files
- Machine-readable eligibility criteria generation
- Criteria review and editing workflow
- Vendor profile capture and eligibility evaluation
- Pass/Fail report with confidence score, criteria-wise reasoning, and audit trail
- Dashboard metrics for tenders, vendors, and evaluation outcomes
- JSON report download for audit or downstream integration

## Architecture

1. Document Ingestion
2. OCR Processing (mocked in prototype)
3. Layout Analysis (mock-ready abstraction)
4. Clause Classification (mock-ready abstraction)
5. Rule Generation
6. Vendor Matching
7. Eligibility Report and Audit Trail

## Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend

- FastAPI
- SQLite
- SQLAlchemy
- Pydantic

## Folder Structure

```text
autotender/
  backend/
    main.py
    database.py
    models.py
    schemas.py
    services/
      extractor.py
      rule_engine.py
      report_generator.py
    uploads/
    requirements.txt
  frontend/
    src/
      App.jsx
      main.jsx
      api.js
      pages/
        Landing.jsx
        Dashboard.jsx
        UploadTender.jsx
        CriteriaReview.jsx
        VendorProfile.jsx
        EvaluationReport.jsx
      components/
        Sidebar.jsx
        Navbar.jsx
        StatCard.jsx
        StatusBadge.jsx
    package.json
    tailwind.config.js
  README.md
```

## Clone and Run

### Prerequisites

- Python 3.10 or newer
- Node.js 18 or newer
- npm
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd autotender
```

If you already cloned the repository into a different folder name, just `cd` into that project root.

### 2. Start the Backend

Open a terminal in the project root and run:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend URLs:

- API root: `http://127.0.0.1:8000`
- Swagger docs: `http://127.0.0.1:8000/docs`

### 3. Start the Frontend

Open a second terminal in the project root and run:

```bash
cd frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Frontend URL:

- App: `http://127.0.0.1:5173`

### 4. Use the Project

Recommended flow:

1. Open `http://127.0.0.1:5173`
2. Upload a tender document from the `Upload Tender` page
3. Review or edit the extracted criteria
4. Submit a vendor profile
5. Review the generated eligibility report

### 5. Stop the Project

- In the backend terminal, press `Ctrl + C`
- In the frontend terminal, press `Ctrl + C`

## Troubleshooting

### Port already in use

If `8000` or `5173` is already occupied, stop the old process or run the service on a different port.

### Frontend dependency issues

If the frontend fails to start, run:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

### Backend virtual environment issues

If Python packages are broken, recreate the virtual environment:

```bash
cd backend
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## API List

- `POST /upload-tender`
- `GET /tenders`
- `GET /tenders/{tender_id}`
- `PUT /criteria/{criterion_id}`
- `POST /vendors`
- `GET /vendors`
- `POST /evaluate`
- `GET /reports/{report_id}`
- `GET /dashboard/summary`

## Future Scope

- Real OCR integration with Tesseract or EasyOCR
- Layout-aware document understanding using LayoutLMv3
- Legal clause classification using RoBERTa
- GeM and CPP portal integration
- On-premise deployment for government and defense environments
- Role-based access control and procurement workflow approvals
