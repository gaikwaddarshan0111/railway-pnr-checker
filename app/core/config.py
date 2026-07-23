from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    RAILRADAR_API_KEY: str
    RAILRADAR_BASE_URL: str

    model_config = SettingsConfigDict(
        env_file= ".env",
        case_sensitive= True,
    )

settings = Settings()