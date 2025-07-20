from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = "your-secret-key-here"  # Default value for development

    class Config:
        env_file: str = ".env"


settings = Settings()
