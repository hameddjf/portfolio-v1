# backend/contact/admin.py

from django.contrib import admin
from .models import ContactMessage # فرض می‌کنیم اسم مدل ContactMessage است

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at') # فیلدهایی که دارید
    readonly_fields = ('name', 'email', 'message', 'created_at') # فقط خواندنی (چون پیام کاربر است)
    search_fields = ('name', 'email', 'message')