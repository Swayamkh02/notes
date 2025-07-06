import requests
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time





def scrape_with_requests(url: str) -> str:
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        resp = requests.get(url, headers=headers, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.content, "html.parser")
        body = soup.find("body")
        if not body or len(body.get_text(strip=True)) < 200:
            raise ValueError("Page too short or body missing")
        return str(soup)
    except Exception as e:
        print(f"[Requests] Failed or insufficient: {e}")
        return None
    

def scrape_with_selenium(url: str, delay: int = 3) -> str:
    try:
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--window-size=1920x1080")
        driver = webdriver.Chrome(options=options)
        driver.get(url)
        time.sleep(delay)
        html = driver.page_source
        driver.quit()
        return html
    except Exception as e:
        print(f"[Selenium] Failed: {e}")
        return None

def scrape_url_content(url: str) -> str:
    """
    Tries to scrape the page using requests first.
    Falls back to Selenium if content is too short or failed.
    """
    html = scrape_with_requests(url)
    if html:
        return html
    
    print("[Fallback] Switching to Selenium...")
    return scrape_with_selenium(url)


def extract_clean_content(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    
    for tag in soup(['script', 'style', 'meta', 'head', 'noscript', 'iframe']):
        tag.decompose()
    
    text = soup.get_text(separator='\n')  # Use '\n' to preserve paragraph structure
    cleaned_text = '\n'.join([line.strip() for line in text.splitlines() if line.strip()])
    
    return cleaned_text

def get_clean_scraped_text(url):
    content = scrape_url_content(url)
    cleaned_content = extract_clean_content(content)
    return cleaned_content


# if __name__ == "__main__":
#     test_url = "https://github.com/swayamkh02"
#     content = scrape_url_content(test_url)
#     cleaned_content = extract_clean_content(content)
#     print(cleaned_content)
