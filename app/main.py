from fastapi import FastAPI
from app.schemas.pnr import PNRRequest

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

@app.post("/check-pnr")
def check_pnr(request : PNRRequest):
    return{
        "success": True,
        "pnr" : request.pnr,
        "message": "PNR Validated Successfully"
    }