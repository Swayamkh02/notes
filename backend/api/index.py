# backend/api/index.py

from backend.app import app  # import your Flask app

# Vercel looks for this WSGI-compatible callable
def handler(environ, start_response):
    return app(environ, start_response)
