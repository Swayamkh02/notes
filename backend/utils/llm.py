import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
if not os.environ.get("GROQ_API_KEY"):
    raise ValueError("GROQ_API_KEY is missing. Please set it in the .env file.")

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# response = llm.complete(prompt=RAG_PROMPT)

def get_llm_response(text):
    PROMPT = """
    You are an expert in analyzing and summarizing content. You are efficient in extracting values from the text. You summarize perfectly for note taking, covering all the important aspects of the context.
    Your work is to summarize the text given below along with the analysis in a valid JSON objects that match this structure.
    {
    'summary':,
    'title':,
    'tags':[],
    'keywords':[],
    }
    """

    completion = client.chat.completions.create(
      model = "meta-llama/llama-4-scout-17b-16e-instruct",
        # model="llama-3.1-8b-instant",
        messages=[
            {"role": "system",
              "content": PROMPT},
            {"role": "user", 
             "content": text}
        ],
        # model="meta-llama/llama-4-scout-17b-16e-instruct",
        temperature=0,
        stream=False,
        response_format={"type": "json_object"},
    )

    res_json_str = completion.choices[0].message.content
    try:
      res_json = json.loads(res_json_str)
    except json.JSONDecodeError as e:
      print("[ERROR] Failed to parse JSON:", e)
      raise ValueError("Invalid JSON returned by LLM")
    # return res_json
    return res_json



# from dotenv import load_dotenv

# load_dotenv()
# if not os.environ.get("GROQ_API_KEY"):
#     raise ValueError("GROQ_API_KEY is missing. Please set it in the .env file.")




