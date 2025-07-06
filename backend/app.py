from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.scrape import get_clean_scraped_text
from utils.llm import get_llm_response
from utils.embeddings import get_embedding_from_text

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "LLM Notes API is running."})

@app.route("/api/notes/from-url", methods=["POST"])
def generate_note():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "Missing URL"}), 400

    try:
        print(f"[INFO] Processing URL: {url}")
        text = get_clean_scraped_text(url)
        jres = get_llm_response(text)
        # jres = jsonify(llm_result)
        jres['content'] = text
        jres['embedding'] = get_embedding_from_text(jres['summary'])
        return jsonify(jres), 200
    except Exception as e:
        print("[ERROR]", e)
        return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True, port=5500)

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=10000)

