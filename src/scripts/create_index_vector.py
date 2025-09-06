# backend/src/scripts/create_vector_index.py
# Purpose: Create an Elasticsearch index configured for vector (semantic) search.

import os
from dotenv import load_dotenv                 # Load env from project root
from elasticsearch import Elasticsearch

# 1) Load ES creds from .env (already used in your project)
load_dotenv()
ES_HOST = os.getenv("ES_HOST", "").strip()     # e.g., https://...:443
API_KEY = os.getenv("API_KEY", "").strip()     # Elastic Cloud API Key

# 2) Connect to Elasticsearch using API key auth
es = Elasticsearch(hosts=[ES_HOST], api_key=API_KEY, verify_certs=True)

INDEX_NAME = "drinks_vector"                   # Keep separate from your BM25 indices

# 3) Mapping: text fields + dense_vector (HNSW index, cosine similarity)
mapping = {
    "settings": {
        "index": {
            "knn": True,                       # enable ANN
            "knn.algo_param.ef_search": 100    # recall/speed tradeoff at query time
        }
    },
    "mappings": {
        "properties": {
            "id":          {"type": "keyword"},     # stable id
            "name":        {"type": "text"},        # for BM25/hybrid later
            "tags":        {"type": "keyword"},     # filters (e.g., non-alcoholic)
            "description": {"type": "text"},        # free text
            "embedding": {
                "type": "dense_vector",
                "dims": 1536,                       # OpenAI text-embedding-3-small
                "index": True,
                "similarity": "cosine",
                "index_options": {                  # HNSW parameters
                    "type": "hnsw",
                    "m": 16,
                    "ef_construction": 100
                }
            },
            "timestamp":   {"type": "date"}
        }
    }
}

# 4) Recreate index safely (delete if exists)
if es.indices.exists(index=INDEX_NAME):
    es.indices.delete(index=INDEX_NAME)

es.indices.create(index=INDEX_NAME, body=mapping)
print(f"[OK] Created index: {INDEX_NAME}")
