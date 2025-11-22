# backend/contact/serializers.py

from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Serializer برای تبدیل مدل ContactMessage به JSON و بالعکس.
    """
    class Meta:
        model = ContactMessage
        # فیلدهایی که از فرانت‌اند دریافت و ذخیره می‌شوند
        fields = ['name', 'email', 'subject', 'message'] 
        # created_at و is_read اتوماتیک مدیریت می‌شوند