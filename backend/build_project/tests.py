# backend/portfolio/tests.py

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Project

class ProjectAPITest(TestCase):
    def setUp(self):
        # قبل از هر تست، یک کلاینت و یک دیتای نمونه می‌سازیم
        self.client = APIClient()
        self.project = Project.objects.create(
            title_en="Test Project",
            title_fa="پروژه تست",
            short_desc_en="Short desc",
            short_desc_fa="توضیح کوتاه",
            technologies="Python"
        )

    def test_get_projects_list(self):
        """
        بررسی می‌کند که آیا لیست پروژه‌ها درست دریافت می‌شود؟
        """
        response = self.client.get('/api/projects/')
        
        # 1. آیا کد 200 (موفقیت) برگشت؟
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # 2. آیا تعداد پروژه‌ها 1 عدد است؟
        self.assertEqual(len(response.data), 1)
        
        # 3. آیا عنوان پروژه درست است؟
        self.assertEqual(response.data[0]['title_en'], "Test Project")
        
        print("\n✅ Project API Test Passed!")