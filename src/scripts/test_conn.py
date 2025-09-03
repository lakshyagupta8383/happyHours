from elasticsearch import Elasticsearch

ES_HOST = "https://my-elasticsearch-project-b22493.es.us-central1.gcp.elastic.cloud:443"
API_KEY = "TzBmT0M1a0JFRkdqeVRsc0RQTXc6UlFVVHdsckY0dDJ2Rk5zSG1TeEh0UQ=="

# Connect using API key
es = Elasticsearch(
    ES_HOST,
    api_key=API_KEY,
    verify_certs=True
)

print(es.info())

# python -m venv venv
# source venv/bin/activate
# pip install -r requirements.txt
# python test_connection.py
