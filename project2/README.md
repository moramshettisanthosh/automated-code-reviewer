# NovaReviewAI

**NovaReviewAI** is a modern, production-ready automated code review platform built for developers, hackathons, internships, and portfolio showcases.

## Tagline
**AI-powered code review with professional insights, live analysis, and developer-first productivity.**

## Color Palette
- Primary: #3F4EFC
- Accent: #1DD4FF
- Secondary: #0F172A
- Surface: #111827
- Glow: #E0F2FE

## Overview
NovaReviewAI allows users to upload files, paste code, connect GitHub, and receive AI-powered reviews for bugs, security issues, performance, best practices, and automated documentation.

## Features
- AI-powered multi-language analysis
- Upload source files and paste code manually
- GitHub repository integration
- Code review history and analytics
- Bug, vulnerability, and performance detection
- Code quality, readability, and maintainability scoring
- Inline suggestions and explain/fix modes
- Export review reports as PDF
- Responsive modern dashboard with dark/light theme

## Project Structure
- `backend/` — Express API, MongoDB models, authentication, AI review engine
- `frontend/` — React + Vite UI, Tailwind, Monaco editor, protected routes

## Setup
### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
```
### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
```

## Run Locally
### Backend
```bash
cd backend
npm run dev
```
### Frontend
```bash
cd frontend
npm run dev
```

## Deployment
- Frontend deployable on Vercel
- Backend deployable on Render / Railway
- MongoDB Atlas integration

## Environment Variables
See `backend/.env.example` and `frontend/.env.example` for required keys.

## Testing
- Backend API tests: `cd backend && npm test`
- Frontend unit tests: `cd frontend && npm run test`

## AI Integration
NovaReviewAI is built to integrate with OpenAI or Gemini using secure environment variables and request streaming support.
