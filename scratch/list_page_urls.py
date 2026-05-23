import urllib.request
import re

headers = {"User-Agent": "Mozilla/5.0"}

found_links = {}

for page_num in range(1, 6):
    url = f"https://egitim.ahmetcandemir.com.tr/robotik-kodlama/mblock/mblock-arduino-uygulamalari/page/{page_num}/"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
        links = re.findall(r'href=["\'](https://egitim.ahmetcandemir.com.tr/[^"\']+)["\']', html)
        for link in links:
            if "tag" not in link and "category" not in link and "page" not in link and "author" not in link:
                # Keep clean post links
                clean_link = link.split('#')[0].rstrip('/')
                if "mblock" in clean_link:
                    found_links[clean_link] = page_num
    except Exception as e:
        print(f"Error fetching page {page_num}: {e}")

print("Clean list of mBlock lesson URLs:")
for link, page in sorted(found_links.items(), key=lambda x: x[1]):
    print(f"Page {page}: {link}")
