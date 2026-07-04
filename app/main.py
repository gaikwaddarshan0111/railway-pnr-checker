from fastapi import FastAPI
from app.routers import pnr


app = FastAPI(
    title  = "Railway PNR Status Checker API",
    version = "1.0.0",
    description = "Backend API for Railway PNR Status Checker"
)

@app.get("/")
def home():
    return {
        "message" : "Welcome to Railway PNR Status Checker API 🚆"
    }
app.include_router(pnr.router)
