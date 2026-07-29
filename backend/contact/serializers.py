from rest_framework import serializers
from .models import ContactMessage
import re

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        extra_kwargs = {
            'subject': {'required': False, 'allow_blank': True},
        }
    
    def validate_name(self, value):
        """اعتبارسنجی نام"""
        if not value or len(value.strip()) < 2:
            raise serializers.ValidationError("نام باید حداقل ۲ کاراکتر باشد.")
        return value.strip()
    
    def validate_email(self, value):
        """اعتبارسنجی ایمیل"""
        if not value:
            raise serializers.ValidationError("ایمیل نمی‌تواند خالی باشد.")
        
        # بررسی فرمت ایمیل
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError("فرمت ایمیل نامعتبر است.")
        
        return value.lower().strip()
    
    def validate_message(self, value):
        """اعتبارسنجی پیام"""
        if not value or len(value.strip()) < 10:
            raise serializers.ValidationError("پیام باید حداقل ۱۰ کاراکتر باشد.")
        return value.strip()
    
    def validate(self, data):
        """اعتبارسنجی کلی"""
        # اگر subject خالی بود، مقدار پیش‌فرض بده
        if not data.get('subject'):
            data['subject'] = 'پیام از پورتفولیو'
        return data