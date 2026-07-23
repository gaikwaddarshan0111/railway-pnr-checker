import os
import asyncio
import httpx
from dotenv import load_dotenv

load_dotenv ()

API_KEY = os.getenv("RAILRADAR_API_KEY")

async def main():
    pnr = "22158" 

    url = f"https://api.railradar.in/v1/trains/{pnr}/live"

    headers = {
        "x-api-key" : API_KEY,
        "accept" : "application/json"
    }

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(url, headers=headers)

        print("Status Code: ", response.status_code)
        print("Response:")
        print(response.json())
    
asyncio.run(main())