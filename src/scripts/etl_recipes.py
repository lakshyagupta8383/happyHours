import json
from elasticsearch import Elasticsearch, helpers

# Elasticsearch cloud cluster connection details
ES_HOST = "https://my-elasticsearch-project-b22493.es.us-central1.gcp.elastic.cloud:443"  
# This is the URL of your Elasticsearch cluster running on Elastic Cloud

API_KEY = "TzBmT0M1a0JFRkdqeVRsc0RQTXc6UlFVVHdsckY0dDJ2Rk5zSG1TeEh0UQ=="  
# Your authentication key for secure access to Elasticsearch

INDEX_NAME = "recipes"  
# The name of the index (like a database table) where documents (recipes) will be stored

DATA_FILE = "recipes_core.json"  
# Path to the cleaned JSON file containing recipe data


# Create an Elasticsearch client instance using host and API key
es = Elasticsearch(ES_HOST, api_key=API_KEY, verify_certs=True)


# Function to clean up each recipe record before indexing
def clean_record(rec):
    # Clean tags: remove spaces, lowercase, and ignore empty values
    rec["tags"] = [t.strip().lower() for t in rec.get("tags", []) if t]

    # Clean ingredients: for each ingredient dictionary
    rec["ingredients"] = [
        {k: (v.strip() if isinstance(v, str) else v)  # strip spaces if it's a string
         for k, v in ing.items() if v}               # keep only non-empty values
        for ing in rec.get("ingredients", [])        # loop through ingredient list
    ]

    # Clean steps: for each step dictionary
    rec["steps"] = [
        {k: (v.strip() if isinstance(v, str) else v) 
         for k, v in step.items() if v}              
        for step in rec.get("steps", [])             
    ]

    return rec  # Return the cleaned recipe record


# Function to load recipe data into Elasticsearch
def load_data():
    # Open the JSON file and read recipe data
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        recipes = json.load(f)  # recipes is now a Python list of dictionaries

    actions = []  # List to hold bulk indexing actions

    # Loop through each recipe record
    for rec in recipes:
        doc = clean_record(rec)  # Clean the record before indexing

        # Create an action dictionary for Elasticsearch bulk API
        actions.append({
            "_index": INDEX_NAME,   # Index where data will be stored
            "_id": doc["id"],       # Unique ID for each recipe document
            "_source": doc          # The actual recipe data (content)
        })

    # Bulk insert all recipes into Elasticsearch
    helpers.bulk(es, actions)

    # Print confirmation message
    print(f"Indexed {len(actions)} recipes into '{INDEX_NAME}'.")
