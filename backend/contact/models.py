from django.db import models

# Create your models here.
# backend/contact/models.py

class ContactMessage(models.Model):
    """مدل ذخیره پیام‌های ارسالی از فرم تماس"""
    name = models.CharField(max_length=100, verbose_name="نام")
    email = models.EmailField(verbose_name="ایمیل")
    subject = models.CharField(max_length=150, verbose_name="موضوع")
    message = models.TextField(verbose_name="متن پیام")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ارسال")
    is_read = models.BooleanField(default=False, verbose_name="خوانده شده")

    class Meta:
        verbose_name = "پیام تماس"
        verbose_name_plural = "پیام‌های تماس"
        ordering = ['-created_at'] # جدیدترین پیام در بالا

    def __str__(self):
        return f"پیام از {self.name} - {self.subject[:30]}..."