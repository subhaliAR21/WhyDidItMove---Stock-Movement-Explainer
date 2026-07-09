import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def explain_movement(ticker: str, price_change: float, headlines: list) -> dict:
    headlines_text = "\n".join([f"- {h}" for h in headlines])
    
    prompt = f"""
You are a financial analyst explaining stock movements to a retail investor in India.

Stock: {ticker}
7-day price change: {price_change}%
Recent news headlines:
{headlines_text}

Explain in exactly 3-4 sentences:
1. What happened to the stock price
2. Which news likely caused it
3. Overall sentiment

End with one word: BULLISH, BEARISH, or NEUTRAL

Be specific. Use numbers. No jargon.
"""
    
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    text = response.text.strip()
    
    sentiment = "NEUTRAL"
    if "BULLISH" in text.upper():
        sentiment = "BULLISH"
    elif "BEARISH" in text.upper():
        sentiment = "BEARISH"
    
    return {
        "explanation": text,
        "sentiment": sentiment
    }