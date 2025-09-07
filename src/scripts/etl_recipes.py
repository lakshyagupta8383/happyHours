import json
from elasticsearch import Elasticsearch, helpers
import os
from dotenv import load_dotenv

# ✅ Load .env values from project root
env_path = os.path.join(os.path.dirname(__file__), '../../../.env')
load_dotenv(dotenv_path=env_path)

ES_HOST = os.getenv("ES_HOST")
API_KEY = os.getenv("API_KEY")
INDEX_NAME = "recipes"
DATA_FILE = os.path.join(os.path.dirname(__file__), "recipes_core.json")  # Update if different location

# ✅ Connect to Elasticsearch
es = Elasticsearch(
    ES_HOST,
    api_key=API_KEY,
    verify_certs=True
)

# 🧹 Clean tags, ingredients, and steps
def clean_record(rec):
    # Clean and lowercase tags
    rec["tags"] = [t.strip().lower() for t in rec.get("tags", []) if t]

    # Clean ingredients list
    rec["ingredients"] = [
        {k: (v.strip() if isinstance(v, str) else v) for k, v in ing.items() if v}
        for ing in rec.get("ingredients", [])
    ]

    # Clean preparation steps
    rec["steps"] = [
        {k: (v.strip() if isinstance(v, str) else v) for k, v in step.items() if v}
        for step in rec.get("steps", [])
    ]

    return rec

# 📦 Load and bulk upload data
def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        recipes = json.load(f)

    actions = []

    for rec in recipes:
        doc = clean_record(rec)

        # ✅ Skip documents that don't have essential fields
        if not doc.get("id") or not doc.get("name"):
            continue

        actions.append({
            "_index": INDEX_NAME,
            "_id": doc["id"],
            "_source": doc
        })

    # 🔁 Bulk insert
    helpers.bulk(es, actions)
    print(f"✅ Indexed {len(actions)} recipes into '{INDEX_NAME}'")

if __name__ == "__main__":
    load_data()
