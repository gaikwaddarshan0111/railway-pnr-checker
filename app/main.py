from fastapi import FastAPI , HTTPException
from app.schemas.pnr import PNRRequest
from app.services.pnr_services import PNRService
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

    result = PNRService.get_pnr_details(request.pnr)

    if result is None:
        raise HTTPException(
            status_code = 404,
            detail = "PNR Not Found"
        )
    return result