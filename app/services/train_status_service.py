import httpx

from app.core.config import settings

class TrainStatusService:

    @staticmethod
    async def get_train_details(train_number: str):
        url = f"{settings.RAILRADAR_BASE_URL}/trains/{train_number}"

        headers = {
            "Authorization" : f"Bearer {settings.RAILRADAR_API_KEY}"

        }

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(url, headers=headers)

        response.raise_for_status()
        return response.json()
    
    @staticmethod
    async def get_live_status(train_number: str):
        url = f"{settings.RAILRADAR_BASE_URL}/trains/{train_number}/live"

        headers = {
            "Authorization" : f"Bearer {settings.RAILRADAR_API_KEY}"
        }

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(url, headers=headers)

        response.raise_for_status()
        return response.json()
