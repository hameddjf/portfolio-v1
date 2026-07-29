# backend/portfolio/admin.py (یا اپلیکیشن skills)

from django.contrib import admin
from .models import  SkillCategory, Skill

# قبلاً Project بود، حالا Skills را اضافه می‌کنیم

class SkillInline(admin.TabularInline):
    """
    این باعث می‌شود بتوانید مهارت‌ها را مستقیماً داخل صفحه دسته‌بندی اضافه کنید
    """
    model = Skill
    extra = 1

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'order')
    inlines = [SkillInline] # 👈 جادوی کار اینجاست: افزودن مهارت‌ها زیرمجموعه دسته

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)