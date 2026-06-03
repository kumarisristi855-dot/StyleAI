import boto3
from botocore.config import Config
from app.core.config import settings

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION,
    config=Config(signature_version="s3v4"),
)


def generate_presigned_upload_url(key: str, content_type: str) -> str:
    return s3_client.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": settings.S3_BUCKET_NAME,
            "Key": key,
            "ContentType": content_type,
        },
        ExpiresIn=3600,
    )


def generate_presigned_download_url(key: str) -> str:
    return s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": settings.S3_BUCKET_NAME, "Key": key},
        ExpiresIn=3600,
    )


def delete_file(key: str) -> None:
    s3_client.delete_object(Bucket=settings.S3_BUCKET_NAME, Key=key)
