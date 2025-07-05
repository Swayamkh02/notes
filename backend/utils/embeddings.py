from sentence_transformers import SentenceTransformer
sentences = ["This is an example sentence", "Each sentence is converted"]


model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def get_embedding_from_text(text):
    embeddings = model.encode([text])
    # print(embeddings)
    return embeddings[0].tolist()

# print(type(get_embedding_from_text("Hello there aloo")))