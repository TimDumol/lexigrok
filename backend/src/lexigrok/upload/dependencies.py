from lexigrok.storage import MinioStorage, Storage


def get_storage() -> Storage:
    """Dependency to get storage instance."""
    return MinioStorage()
