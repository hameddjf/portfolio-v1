from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    # تبدیل رشته تکنولوژی‌ها به آرایه برای فرانت‌اند
    tech_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'

    def get_tech_list(self, obj):
        # تبدیل "React, Django" به ["React", "Django"]
        if obj.technologies:
            return [t.strip() for t in obj.technologies.split(',')]
        return []