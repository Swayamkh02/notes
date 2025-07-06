# from sentence_transformers import SentenceTransformer
# sentences = ["This is an example sentence", "Each sentence is converted"]


# model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# def get_embedding_from_text(text):
#     embeddings = model.encode([text])
#     # print(embeddings)
#     return embeddings[0].tolist()

# print(type(get_embedding_from_text("Hello there aloo")))

import os
import requests
from dotenv import load_dotenv


load_dotenv()
if not os.environ.get("HF_API_KEY"):
    raise ValueError("HF_API_KEY is missing. Please set it in the .env file.")

API_URL = "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction"
headers = {
    "Authorization": f"Bearer {os.environ.get('HF_API_KEY')}",
}

def get_embedding_from_text(text):
    input = {
        "inputs": text,
    }
    response = requests.post(API_URL, headers=headers, json=input)
    return response.json()

