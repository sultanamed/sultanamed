import urllib.request
import re
import os
import urllib.parse

# Comprehensive dictionary mapping directory names to their exact URL on the portal
lessons = {
    "19-Potansiyometre_RGB_LED": "https://egitim.ahmetcandemir.com.tr/mblock-potansiyometre-ile-rgb-led-yakma-2",
    "20-LDR_Isik_Seviyesi": "https://egitim.ahmetcandemir.com.tr/mblock-ldr-ile-isik-seviye-kontrol-devresi",
    "21-LCD_I2C_Ekran": "https://egitim.ahmetcandemir.com.tr/mblock-i2c-lcd-ekran-uygulamalari",
    "22-LCD_I2C_Turkce": "https://egitim.ahmetcandemir.com.tr/mblock-lcd-ekran-i2c-turkce-karakterli-yazi",
    "23-Su_Seviye_Yagmur_Alarmi": "https://egitim.ahmetcandemir.com.tr/mblock-su-seviye-kontrol-devresi-yagmur-alarmi",
    "24-Su_Seviyesi_LCD_Ekran": "https://egitim.ahmetcandemir.com.tr/mblock-yagmur-alarmi-su-seviye-kontrolu-lcd-ekranli",
    "25-Toprak_Nem_LED_Kontrol": "https://egitim.ahmetcandemir.com.tr/mblock-toprak-nem-seviye-led-kontrol-devresi",
    "26-Toprak_Nemi_LCD_Ekran": "https://egitim.ahmetcandemir.com.tr/mblock-lcd-ekranli-toprak-nem-seviye-olcme-devresi",
    "27-7_Segment_Sayici": "https://egitim.ahmetcandemir.com.tr/mblock-7-segment-display-0-9-sayici",
    "28-7_Segment_Scoreboard": "https://egitim.ahmetcandemir.com.tr/mblock-7-segment-display-scoreboard-butonlu",
    "29-Gaz_Alarmi_MQ5": "https://egitim.ahmetcandemir.com.tr/mblock-dogal-gaz-kacagi-alarm-devresi-mq-5-gaz-sensoru",
    "30-Servo_Motor_Uygulamalari": "https://egitim.ahmetcandemir.com.tr/mblock-ile-servo-motor-uygulamalari",
    "31-LDR_ile_Servo_Motor": "https://egitim.ahmetcandemir.com.tr/mblock-ldr-ile-isiga-gore-hareket-eden-servo-motor-uygulamasi",
    "32-Mesafe_Sensorlu_Servo": "https://egitim.ahmetcandemir.com.tr/mblock-ile-servo-motor-ve-hc-sr04-ultrasonik-sensor-devresi"
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

for lesson_name, url in lessons.items():
    print(f"\nProcessing {lesson_name} from {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        continue
        
    # Find image URLs
    img_urls = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    img_urls += re.findall(r'<img[^>]+data-src=["\']([^"\']+)["\']', html)
    img_urls = list(set(img_urls))
    
    wp_imgs = [img for img in img_urls if "wp-content/uploads" in img]
    if not wp_imgs:
        print(f"No wp-content images found on {url}")
        continue
        
    dest_dir = f"/Users/techdeen/Desktop/Personel/Arduino-mblock/{lesson_name}/images"
    os.makedirs(dest_dir, exist_ok=True)
    
    count = 1
    for img_url in wp_imgs:
        if "logo" in img_url.lower() or "avatar" in img_url.lower() or "admin" in img_url.lower() or "banner" in img_url.lower():
            continue
            
        ext = os.path.splitext(urllib.parse.urlparse(img_url).path)[1]
        if not ext:
            ext = ".jpg"
            
        img_name = img_url.lower()
        if any(x in img_name for x in ["sema", "şema", "devre", "montaj", "fritzing", "pot", "baglanti", "bağlantı", "kurulum"]):
            name = f"schematic_{count}"
        elif any(x in img_name for x in ["blok", "kod", "semasi", "şeması", "program", "mblock"]):
            name = f"mblock_{count}"
        else:
            name = f"image_{count}"
            
        filepath = os.path.join(dest_dir, f"{name}{ext}")
        download_image(img_url, filepath)
        count += 1
