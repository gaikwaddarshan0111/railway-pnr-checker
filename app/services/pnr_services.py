import json
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("RAILKIT_API_KEY")

class PNRService:
    @staticmethod
    def get_pnr_details(pnr: str):

        data_file = Path(__file__).parent.parent/"data"/"pnr_data.json"
        print(data_file)
        with open(data_file, "r") as file:
            railway_data = json.load(file)

        for record in railway_data:
            if record["pnr"] == pnr:
                return record
            
        return None