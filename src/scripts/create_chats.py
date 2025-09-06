from elasticsearch import Elasticsearch # type:ignore
import os
from dotenv import load_dotenv # type: ignore

# Load .env from root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

# Read env vars safely
ES_HOST = os.getenv("ES_HOST", "").strip()
API_KEY = os.getenv("API_KEY", "").strip()
INDEX_NAME="chats"

print(f"ES_HOST = '{ES_HOST}'")  # Debug
print(f"API_KEY = '{API_KEY[:5]}...'")  # Truncated

# Connect to Elasticsearch
es = Elasticsearch(
    hosts=[ES_HOST],
    api_key=API_KEY,
    verify_certs=True
)

# Mapping for chat data
mapping = {
    "mappings": {
        "properties": {
            "sender": {"type": "keyword"},
            "message": {"type": "text"},
            "timestamp": {"type": "date"}  # ISO format or epoch
        }
    }
}

# Delete index if it already exists
if es.indices.exists(index=INDEX_NAME):
    print(f"Deleting existing index: {INDEX_NAME}")
    es.indices.delete(index=INDEX_NAME)

# Create new index
es.indices.create(index=INDEX_NAME, body=mapping)
print(f"Index '{INDEX_NAME}' created successfully")
