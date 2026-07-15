# WhyDidItMove — Stock Movement Explainer

An AI-powered tool that explains why a stock moved, in plain English.
Enter any NSE/US ticker → get 7-day price analysis + real news headlines
+ Gemini-powered explanation with BULLISH/BEARISH/NEUTRAL sentiment.

## Live Demo
[tender-celebration-production-f279.up.railway.app](https://tender-celebration-production-f279.up.railway.app)

## Problem
Retail investors see a stock drop 5% and have no idea why. They open
multiple news sites, read conflicting articles, and still feel confused.
WhyDidItMove solves this with a single-screen, plain-English explanation
backed by real market data and news.

## Tech Stack
**Backend:** FastAPI, Python, yfinance, NewsAPI, Gemini 2.5 Flash  
**Frontend:** React, Recharts, Axios  
**Deployment:** Railway (backend + frontend)

## Features
- Real-time 7-day price movement chart
- Auto-detects Indian (NSE) vs US listed stocks
- Gemini AI synthesizes news + price data into 3-4 sentence explanation
- BULLISH / BEARISH / NEUTRAL sentiment badge
- NaN price data handling for production stability

## Architecture

React Frontend (Railway)

↓

FastAPI Backend (Railway)

↓

yfinance → 7-day price data

NewsAPI  → recent headlines

Gemini   → plain-English explanation

## Setup

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
GEMINI_API_KEY=your_key
NEWS_API_KEY=your_key

uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Sample Tickers
- Indian stocks: `TCS`, `INFY`, `RELIANCE`, `WIPRO`
- US stocks: `AAPL`, `TSLA`, `GOOGL`
