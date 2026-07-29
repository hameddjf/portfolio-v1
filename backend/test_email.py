# test_email.py
import os
import django
from django.core.mail import send_mail

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

try:
    send_mail(
        'Test Subject',
        'Test Body',
        'hameddjf106@gmail.com', # فرستنده
        ['hameddjf106@gmail.com'], # گیرنده
        fail_silently=False,
    )
    print("✅ Email sent successfully!")
except Exception as e:
    print(f"❌ Error: {e}")