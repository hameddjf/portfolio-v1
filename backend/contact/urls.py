# backend/contact/urls.py
# backend/contact/urls.py

from django.urls import path
from .views import ContactFormAPIView

urlpatterns = [
    path('contact/', ContactFormAPIView.as_view(), name='contact-form-submit'),
]