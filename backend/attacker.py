import requests
import time

# آدرس API فرم تماس
url = 'http://127.0.0.1:8000/api/contact/'

# داده‌های فیک
payload = {
    "name": "Attacker Bot",
    "email": "hacker@example.com",
    "subject": "Spam Attack",
    "message": "This is a DDoS attempt!"
}

print("⚔️ Starting Attack Simulation...")

for i in range(1, 11): # تلاش برای ارسال ۱۰ درخواست
    try:
        response = requests.post(url, data=payload , timeout=10)
        
        if response.status_code == 201:
            print(f"✅ Request {i}: Success (Server accepted)")
        elif response.status_code == 429:
            print(f"🛡️ Request {i}: BLOCKED! (Rate Limit working)")
            print(f"   Server Response: {response.json()}")
            break # حمله دفع شد
        else:
            print(f"❌ Request {i}: Error {response.status_code}")
            
    except Exception as e:
        print(f"Connection Error: {e}")

print("\n🏁 Simulation Finished.")