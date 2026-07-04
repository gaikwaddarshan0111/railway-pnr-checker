from fastapi import APIRouter, HTTPException

from app.schemas.pnr import PNRRequest
from app.services.pnr_services import PNRService

router = APIRouter(
    prefix="",
    tags=["PNR"]
)


@router.post("/check-pnr")
def check_pnr(request: PNRRequest):

    result = PNRService.get_pnr_details(request.pnr)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="PNR not found"
        )

    return result