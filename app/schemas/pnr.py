from pydantic import BaseModel , Field


class PNRRequest(BaseModel):
    pnr : str =Field(
        ...,
        min_length = 10,
        max_length = 10,
        description = "10-digit Railway PNR Number"
    )