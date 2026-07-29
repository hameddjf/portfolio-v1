# backend/portfolio/management/commands/init_data.py

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

from build_project.models import Project
from skills.models import SkillCategory, Skill

class Command(BaseCommand):
    help = 'Populates the database with initial sample data'

    def handle(self, *args, **kwargs):
        self.stdout.write('🌱 Seeding data...')

        # 1. ساخت سوپریوزر (اگر نباشد)
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('User "admin" created!'))

        # 2. ساخت مهارت‌ها
        backend, _ = SkillCategory.objects.get_or_create(
            title="Backend", 
            defaults={'icon_name': 'faServer', 'color_code': '#FFD43B'}
        )
        Skill.objects.get_or_create(category=backend, name="Python")
        Skill.objects.get_or_create(category=backend, name="Django")

        frontend, _ = SkillCategory.objects.get_or_create(
            title="Frontend", 
            defaults={'icon_name': 'faCode', 'color_code': '#61DAFB'}
        )
        Skill.objects.get_or_create(category=frontend, name="React.js")

        self.stdout.write(self.style.SUCCESS('✅ Skills added!'))

        # 3. ساخت پروژه نمونه
        if not Project.objects.exists():
            Project.objects.create(
                title_en="My Awesome Portfolio",
                title_fa="پورتفولیوی شخصی من",
                short_desc_en="A full-stack website built with Django & React",
                short_desc_fa="یک وبسایت فول‌استک با جنگو و ریکت",
                long_desc_en="Full description here...",
                long_desc_fa="توضیحات کامل...",
                technologies="Django, React, Postgres",
                link="https://github.com/yourusername/portfolio"
            )
            self.stdout.write(self.style.SUCCESS('✅ Sample project added!'))

        self.stdout.write(self.style.SUCCESS('🚀 Database ready!'))