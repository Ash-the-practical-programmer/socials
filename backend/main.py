# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure Gemini API
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust for your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request body
class ChatRequest(BaseModel):
    message: str
    is_initial: bool = False

# Initialize Gemini model
model = "gemini-2.0-flash"

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        if request.is_initial:
            prompt = "Greet the user as a friendly AI assistant and offer to help with any questions."
        else:
            prompt = request.message
        response = client.models.generate_content(
            model=model, contents=prompt
        )
        return {"response": response.text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling Gemini API: {str(e)}")