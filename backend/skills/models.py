# backend/[your_app]/models.py

from django.db import models

class SkillCategory(models.Model):
    # این مدل برای دسته بندی‌ها (مثل Backend, Frontend, DevOps) است.
    title = models.CharField(max_length=100, verbose_name="عنوان دسته‌بندی")
    # برای آیکون‌های FontAwesome که در فرانت استفاده می‌کنید
    icon_name = models.CharField(max_length=50, verbose_name="نام آیکون (مثل faServer)") 
    color_code = models.CharField(max_length=7, default="#0077B6", verbose_name="رنگ اصلی")
    order = models.IntegerField(default=100, verbose_name="ترتیب نمایش")
    
    class Meta:
        verbose_name = "دسته‌بندی مهارت"
        verbose_name_plural = "دسته‌بندی مهارت‌ها"
        ordering = ['order']

    def __str__(self):
        return self.title

class Skill(models.Model):
    # مهارت‌های زیرمجموعه
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE, verbose_name="دسته‌بندی")
    name = models.CharField(max_length=100, verbose_name="نام مهارت (مثلاً Python)")
    
    class Meta:
        verbose_name = "مهارت"
        verbose_name_plural = "مهارت‌ها"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.category.title})"