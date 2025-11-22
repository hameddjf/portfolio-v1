from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail # 👈 ایمپورت جدید
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            self.perform_create(serializer)
            
            # 👇 ارسال ایمیل اطلاع‌رسانی به شما
            subject = f"پیام جدید در پورتفولیو: {serializer.data['subject']}"
            message = f"""
            شما یک پیام جدید از {serializer.data['name']} ({serializer.data['email']}) دارید:
            
            متن پیام:
            {serializer.data['message']}
            """
            
            try:
                # در حالت لوکال، این ایمیل در ترمینال چاپ می‌شود
                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER, # فرستنده
                    ['myemail@example.com'],  # 👈 ایمیل خودت را اینجا بنویس (گیرنده)
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Error sending email: {e}")

            return Response(
                {"detail": "پیام دریافت شد!"}, 
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)