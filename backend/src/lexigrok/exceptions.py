# Global exceptions that can be used across modules
from fastapi import HTTPException, status


class AuthenticationError(HTTPException):
    def __init__(self, detail: str = "Could not validate credentials"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )


class UserAlreadyExistsError(HTTPException):
    def __init__(self, detail: str = "Username already registered"):
        super().__init__(status_code=400, detail=detail)


class InactiveUserError(HTTPException):
    def __init__(self, detail: str = "Inactive user"):
        super().__init__(status_code=400, detail=detail)


class StorageError(HTTPException):
    def __init__(self, detail: str = "Storage operation failed"):
        super().__init__(status_code=500, detail=detail)
