# backend/src/scripts/ingest_vectors.py
# Purpose: Generate OpenAI embeddings for each drink and index them into Elasticsearch.

import os, json, time
from dotenv import load_dotenv
from elasticsearch import Elasticsearch, helpers

# 1) Load env (ES + OpenAI)
load_dotenv()
ES_HOST = os.getenv("ES_HOST", "").strip()
API_KEY = os.getenv("API_KEY", "").strip()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()

# 2) ES client
es = Elasticsearch(hosts=[ES_HOST], api_key=API_KEY, verify_certs=True)
INDEX_NAME = "drinks_vector"

# 3) OpenAI client
from openai import OpenAI
client = OpenAI(api_key=OPENAI_API_KEY)
EMBED_MODEL = "text-embedding-3-small"  # 1536 dims


# 4) Input dataset (adjust if your file is elsewhere)
DATA_PATH = "backend/data/drinks.json"  # list of {id, name, description, tags, timestamp}

def embed(text: str):
    # Defensive: blank text -> zero vector (keeps dims consistent)
    text = (text or "").strip()
    if not text:
        return [0.0] * 1536
    resp = client.embeddings.create(model=EMBED_MODEL, input=text)
    return resp.data[0].embedding

def build_action(doc: dict):
    # Combine fields for better semantics (name + description)
    basis = f"{doc.get('name','')} - {doc.get('description','')}"
    vec = embed(basis)
    return {
        "_index": INDEX_NAME,
        "_id": doc["id"],
        "_source": {
            "id": doc["id"],
            "name": doc.get("name", ""),
            "tags": doc.get("tags", []),
            "description": doc.get("description", ""),
            "embedding": vec,
            "timestamp": doc.get("timestamp")
        }
    }

def main():
    # Load your drinks
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        docs = json.load(f)

    # Bulk index in chunks
    batch = []
    for d in docs:
        batch.append(build_action(d))
        if len(batch) >= 200:
            helpers.bulk(es, batch)
            batch.clear()
            time.sleep(0.05)

    if batch:
        helpers.bulk(es, batch)

    print(f"[OK] Indexed {len(docs)} docs into {INDEX_NAME}")

if __name__ == "__main__":
    main()
