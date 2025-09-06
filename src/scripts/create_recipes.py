from elasticsearch import Elasticsearch  # type: ignore

ES_HOST = "https://my-elasticsearch-project-b22493.es.us-central1.gcp.elastic.cloud:443"
API_KEY = "TzBmT0M1a0JFRkdqeVRsc0RQTXc6UlFVVHdsckY0dDJ2Rk5zSG1TeEh0UQ=="
INDEX_NAME = "recipes"

es = Elasticsearch(ES_HOST, api_key=API_KEY, verify_certs=True)

mapping = {
    "mappings": {
        "properties": {
            "id": {"type": "keyword"},
            "name": {"type": "text"},
            "description": {"type": "text"},
            "ingredients": {
                "type": "nested",
                "properties": {
                    "name": {"type": "text"},
                    "measure": {"type": "text"}
                }
            },
            "steps": {
                "type": "nested",
                "properties": {
                    "step": {"type": "integer"},
                    "instruction": {"type": "text"}
                }
            },
            "difficulty": {"type": "keyword"},
            "time": {
                "properties": {
                    "prep_minutes": {"type": "integer"},
                    "cook_minutes": {"type": "integer"},
                    "total_minutes": {"type": "integer"}
                }
            },
            "servings": {"type": "integer"},
            "tags": {"type": "keyword"}
        }
    }
}

# Delete index if it exists
if es.indices.exists(index=INDEX_NAME):
    es.indices.delete(index=INDEX_NAME)

es.indices.create(index=INDEX_NAME, body=mapping)
print(f"Index '{INDEX_NAME}' created successfully!")
