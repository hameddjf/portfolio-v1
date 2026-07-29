from rest_framework import serializers
from .models import SkillCategory, Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        # فقط نام مهارت را می‌خواهیم
        fields = ('name',) 

class SkillCategorySerializer(serializers.ModelSerializer):
    items = SkillSerializer(many=True, read_only=True, source='skills') 
    
    class Meta:
        model = SkillCategory
        # حتما چک کن items اینجا باشد
        fields = ('id', 'title', 'icon_name', 'color_code', 'items')