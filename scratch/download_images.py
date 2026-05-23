import urllib.request
import re
import os
import urllib.parse

# List of lessons and potential URLs
lessons = {
    "25-Toprak_Nem_LED_Kontrol": [
        "https://egitim.ahmetcandemir.com.tr/mblock-toprak-nem-seviye-led-kontrol-devresi/",
        "https://egitim.ahmetcandemir.com.tr/mblock-dersleri-32-mblock-toprak-nem-seviye-led-kontrol-devresi/"
    ],
    "26-Toprak_Nemi_LCD_Ekran": [
        "https://egitim.ahmetcandemir.com.tr/mblock-lcd-ekranli-toprak-nem-seviye-olcme-devresi/",
        "https://egitim.ahmetcandemir.com.tr/mblock-dersleri-33-mblock-lcd-ekranli-toprak-nem-seviye-olcme-devresi/"
    ],
    "27-7_Segment_Sayici": [
        "https://egitim.ahmetcandemir.com.tr/mblock-7-segment-display-ortak-katot-0-9-sayici-devresi/",
        "https://egitim.ahmetcandemir.com.tr/mblock-dersleri-34-mblock-7-segment-display-ortak-katot-0-9-sayici-devresi/"
    ],
    "28-7_Segment_Scoreboard": [
        "https://egitim.ahmetcandemir.com.tr/mblock-7-segment-display-scoreboard-devresi/",
        "https://egitim.ahmetcandemir.com.tr/mblock-dersleri-35-mblock-7-segment-display-scoreboard-devresi/"
    ],
    "29-Gaz_Alarmi_MQ5": [
        "https://egitim.ahmetcandemir.com.tr/arduino-uygulamalari-36-mblock-dogal-gaz-kacagi-alarm-devresi-mq-5-gaz-sensoru/",
        "https://egitim.ahmetcandemir.com.tr/mblock-mq-5-yanici-gaz-sensoru-ile-gaz-alarmi-devresi/"
    ],
    "30-Servo_Motor_Uygulamalari": [
        "https://egitim.ahmetcandemir.com.tr/mblock-dersleri-37-mblock-ile-servo-motor-uygulamalari/",
        "https://egitim.ahmetcandemir.com.tr/mblock-ile-servo-motor-uygulamalari/"
    ],
    "31-LDR_ile_Servo_Motor": [
        "https://egitim.ahmetcandemir.com.tr/mblock-ldr-ile-isiga-gore-hareket-eden-servo-motor-uygulamasi/",
        "https://egitim.ahmetcandemir.com.tr/mblock-dersleri-38-mblock-ldr-ile-isiga-gore-hareket-eden-servo-motor-uygulamasi/"
    ],
    "32-Mesafe_Sensorlu_Servo": [
        "https://egitim.ahmetcandemir.com.tr/mblock-ile-servo-motor-ve-hc-sr04-ultrasonik-sensor-devresi/",
        "https://egitim.ahmetcandemir.com.tr/mblock-dersleri-39-mblock-ile-servo-motor-ve-hc-sr04-ultrasonik-sensor-devresi/"
    ]
}

headers = {"User-Agent": "Mozilla/5.0"}

def download_image(url, filepath):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(filepath, "wb") as f:
                f.write(response.read())
        print(f"Downloaded: {url} -> {filepath}")
        return True
    except Exception as e:
        print(f"Failed to download image {url}: {e}")
        return False

for lesson_name, urls in lessons.items():
    print(f"\nProcessing {lesson_name}...")
    success = False
    html = ""
    used_url = ""
    for url in urls:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response:
                html = response.read().decode('utf-8')
            print(f"Successfully fetched: {url}")
            used_url = url
            success = True
            break
        except Exception as e:
            print(f"Url {url} failed: {e}")
            
    if not success:
        print(f"Could not fetch any URLs for {lesson_name}")
        continue
        
    # Find all images inside the post content (typically containing egitim.ahmetcandemir.com.tr/wp-content/uploads)
    img_urls = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    # Also find lazy loaded data-src images
    img_urls += re.findall(r'<img[^>]+data-src=["\']([^"\']+)["\']', html)
    # Remove duplicates
    img_urls = list(set(img_urls))
    
    # Filter image URLs to target uploads/diagrams
    wp_imgs = [img for img in img_urls if "wp-content/uploads" in img]
    
    if not wp_imgs:
        print(f"No wp-content images found on {used_url}")
        continue
        
    dest_dir = f"/Users/techdeen/Desktop/Personel/Arduino-mblock/{lesson_name}/images"
    os.makedirs(dest_dir, exist_ok=True)
    
    count = 1
    for img_url in wp_imgs:
        # Avoid gravatars/logos
        if "logo" in img_url.lower() or "avatar" in img_url.lower() or "admin" in img_url.lower():
            continue
            
        ext = os.path.splitext(urllib.parse.urlparse(img_url).path)[1]
        if not ext:
            ext = ".jpg"
            
        # Determine name category: schema, block diagram, etc.
        img_name = img_url.lower()
        if "şema" in img_name or "sema" in img_name or "devre" in img_name or "montaj" in img_name or "fritzing" in img_name or "pot" in img_name or "baglanti" in img_name:
            name = f"schematic_{count}"
        elif "blok" in img_name or "kod" in img_name or "semasi" in img_name or "program" in img_name or "mblock" in img_name:
            name = f"mblock_{count}"
        else:
            name = f"image_{count}"
            
        filepath = os.path.join(dest_dir, f"{name}{ext}")
        download_image(img_url, filepath)
        count += 1
