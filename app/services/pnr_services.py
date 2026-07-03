import json
from pathlib import Path


class PNRService:
    @staticmethod
    def get_pnr_details(pnr: str):

        data_file = Path(__file__).parent.parent/"data"/"pnr_data.json"

        with open(data_file, "r") as file:
            railway_data = json.load(file)

        for record in railway_data:
            if record["pnr"] == pnr:
                return record
            
        return None