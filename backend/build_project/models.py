from django.db import models

class Project(models.Model):
    # عناوین
    title_fa = models.CharField(max_length=200, verbose_name="عنوان فارسی")
    title_en = models.CharField(max_length=200, verbose_name="عنوان انگلیسی")
    
    # توضیحات کوتاه (برای کارت)
    short_desc_fa = models.TextField(verbose_name="توضیح کوتاه فارسی")
    short_desc_en = models.TextField(verbose_name="توضیح کوتاه انگلیسی")
    
    # توضیحات کامل (برای مودال)
    long_desc_fa = models.TextField(verbose_name="توضیح کامل فارسی")
    long_desc_en = models.TextField(verbose_name="توضیح کامل انگلیسی")
    
    # سایر فیلدها
    image = models.ImageField(upload_to='projects/', verbose_name="تصویر پروژه")
    technologies = models.CharField(max_length=500, help_text="تکنولوژی‌ها را با ویرگول جدا کنید. مثال: React, Django, SQL", verbose_name="تکنولوژی‌ها")
    link = models.URLField(blank=True, null=True, verbose_name="لینک پروژه")
    
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.IntegerField(default=0, verbose_name="ترتیب نمایش")

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "پروژه"
        verbose_name_plural = "پروژه‌ها"

    def __str__(self):
        return self.title_en