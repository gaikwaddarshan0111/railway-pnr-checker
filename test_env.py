from dotenv import load_dotenv

import os 


load_dotenv()

print(os.getenv("RAILRADAR_API_KEY"))