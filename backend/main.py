from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
from newsapi import NewsApiClient
from explainer import explain_movement
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

@app.get("/analyze/{ticker}")
async def analyze(ticker: str):

    # Auto-add .NS for Indian stocks if not already present
    if '.' not in ticker:
        ticker_yf = ticker + '.NS'
    else:
        ticker_yf = ticker

    # Step 1: Price data
    stock = yf.Ticker(ticker_yf)
    hist = stock.history(period="7d")

    if hist.empty:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="7d")

    if hist.empty:
        return {"error": "Invalid ticker or no data found"}

    # Fix NaN values
    hist = hist.dropna()
    if hist.empty:
        return {"error": "No valid price data found"}

    price_change = round(
        float((hist["Close"].iloc[-1] - hist["Close"].iloc[0]) / hist["Close"].iloc[0] * 100), 2
    )
    current_price = round(float(hist["Close"].iloc[-1]), 2)

    # Step 2: News
    newsapi = NewsApiClient(api_key=NEWS_API_KEY)
    news = newsapi.get_everything(q=ticker, language="en", page_size=5)
    headlines = [article["title"] for article in news["articles"]]

    # Step 3: Gemini explanation
    result = await explain_movement(ticker, price_change, headlines)

    return {
        "ticker": ticker,
        "price_change_7d": price_change,
        "current_price": current_price,
        "headlines": headlines,
        "explanation": result["explanation"],
        "sentiment": result["sentiment"]
    }