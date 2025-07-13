import os
from abc import ABC, abstractmethod
from datetime import timedelta
from minio import Minio


class Storage(ABC):
    @abstractmethod
    def get_presigned_url(self, file_name: str) -> str:
        pass


class MinioStorage(Storage):
    def __init__(self):
        self.client = Minio(
            endpoint=os.environ["MINIO_ENDPOINT"],
            access_key=os.environ["MINIO_ACCESS_KEY"],
            secret_key=os.environ["MINIO_SECRET_KEY"],
            secure=os.environ["MINIO_SECURE"].lower() == "true",
        )
        self.bucket_name = os.environ["MINIO_BUCKET"]

    def get_presigned_url(self, file_name: str) -> str:
        # Make sure the bucket exists.
        found = self.client.bucket_exists(self.bucket_name)
        if not found:
            self.client.make_bucket(self.bucket_name)

        # Generate a presigned URL for putting an object.
        return self.client.presigned_put_object(
            self.bucket_name,
            file_name,
            expires=timedelta(hours=1),
        )
