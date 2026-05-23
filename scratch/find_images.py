import urllib.request
import re
import urllib.parse

url = "https://egitim.ahmetcandemir.com.tr/mblock-mq-5-yanici-gaz-sensoru-ile-gaz-alarmi-devresi/"
headers = {"User-Agent": "Mozilla/5.0"}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
    print("Page fetched successfully.")
    # Simple regex to find img tags and their src attributes
    img_tags = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    print("Found images:")
    for img in img_tags:
        print(img)
except Exception as e:
    print("Error:", e)
