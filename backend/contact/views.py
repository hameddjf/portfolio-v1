from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from .serializers import ContactSerializer
from .models import ContactMessage
import logging
import traceback
from typing import Any, Dict

logger = logging.getLogger(__name__)

class ContactFormAPIView(APIView):
    """
    API endpoint برای دریافت و پردازش فرم تماس
    """
    
    def post(self, request: Any, *args: Any, **kwargs: Any) -> Response:
        """پردازش درخواست POST برای ارسال پیام تماس"""
        
        # 📝 لاگ درخواست ورودی
        client_ip = request.META.get('REMOTE_ADDR', 'Unknown')
        logger.info(f"📨 درخواست تماس جدید از IP: {client_ip}")
        logger.debug(f"📦 داده‌های دریافتی: {request.data}")
        
        # ✅ اعتبارسنجی داده‌ها
        serializer = ContactSerializer(data=request.data)
        
        if not serializer.is_valid():
            logger.warning(f"❌ داده‌های نامعتبر: {serializer.errors}")
            return Response(
                {
                    'success': False,
                    'errors': serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # 📊 استخراج داده‌های معتبر
        validated_data: Dict[str, str] = serializer.validated_data
        name = validated_data.get('name', '')
        email = validated_data.get('email', '')
        subject = validated_data.get('subject', 'پیام از پورتفولیو')
        user_message = validated_data.get('message', '')
        
        # 💾 ذخیره در دیتابیس
        contact_message: ContactMessage | None = None
        try:
            contact_message = serializer.save()
            logger.info(f"✅ پیام در دیتابیس ذخیره شد. ID: {contact_message.id}")
        except Exception as db_error:
            logger.error(f"⚠️ خطا در ذخیره دیتابیس: {str(db_error)}")
            logger.error(traceback.format_exc())
        
        # 📧 آماده‌سازی محتوای ایمیل
        email_subject = f"📬 {subject}"
        email_body = f"""
پیام جدید از فرم تماس پورتفولیو
{'='*60}

👤 نام فرستنده: {name}
📧 ایمیل: {email}
📝 موضوع: {subject}

{'='*60}
📄 متن پیام:

{user_message}

{'='*60}
⏰ زمان دریافت: {contact_message.created_at if contact_message else 'نامشخص'}
🆔 شناسه پیام: {contact_message.id if contact_message else 'ذخیره نشد'}
{'='*60}
        """
        
        # 🚀 تلاش برای ارسال ایمیل
        try:
            # بررسی تنظیمات ایمیل قبل از ارسال
            if not all([
                settings.EMAIL_HOST_USER,
                settings.EMAIL_HOST_PASSWORD,
                settings.CONTACT_FORM_RECEIVER_EMAIL
            ]):
                raise ValueError("تنظیمات ایمیل کامل نیست")
            
            logger.info(f"📤 در حال ارسال ایمیل به {settings.CONTACT_FORM_RECEIVER_EMAIL}...")
            
            sent_count = send_mail(
                subject=email_subject,
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_FORM_RECEIVER_EMAIL],
                fail_silently=False,
            )
            
            if sent_count > 0:
                logger.info(f"✅ ایمیل با موفقیت ارسال شد")
                
                # به‌روزرسانی وضعیت پیام
                if contact_message:
                    try:
                        contact_message.is_read = False
                        contact_message.save(update_fields=['is_read'])
                    except Exception as update_error:
                        logger.warning(f"خطا در به‌روزرسانی وضعیت: {update_error}")
                
                return Response(
                    {
                        'success': True,
                        'message': 'پیام شما با موفقیت ارسال شد! به زودی پاسخ خواهیم داد.'
                    },
                    status=status.HTTP_200_OK
                )
            else:
                raise Exception("ایمیل ارسال نشد (sent_count = 0)")
        
        except BadHeaderError as header_error:
            logger.error(f"❌ BadHeaderError: {str(header_error)}")
            return Response(
                {
                    'success': False,
                    'error': 'اطلاعات ایمیل نامعتبر است.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        except ConnectionRefusedError:
            logger.error("❌ سرور SMTP در دسترس نیست")
            return Response(
                {
                    'success': False,
                    'error': 'خطا در اتصال به سرور ایمیل. لطفا بعداً تلاش کنید.',
                    'message': 'پیام شما ذخیره شد اما ایمیل ارسال نشد.'
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        except Exception as email_error:
            # لاگ کامل خطا
            logger.error("=" * 80)
            logger.error(f"❌ خطا در ارسال ایمیل:")
            logger.error(f"نوع خطا: {type(email_error).__name__}")
            logger.error(f"پیام خطا: {str(email_error)}")
            logger.error(f"Stack Trace:\n{traceback.format_exc()}")
            logger.error("=" * 80)
            
            # نمایش تنظیمات (بدون رمز عبور)
            logger.debug(f"EMAIL_BACKEND: {settings.EMAIL_BACKEND}")
            logger.debug(f"EMAIL_HOST: {settings.EMAIL_HOST}")
            logger.debug(f"EMAIL_PORT: {settings.EMAIL_PORT}")
            logger.debug(f"EMAIL_USE_TLS: {settings.EMAIL_USE_TLS}")
            logger.debug(f"EMAIL_USE_SSL: {settings.EMAIL_USE_SSL}")
            logger.debug(f"EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
            logger.debug(f"DEFAULT_FROM_EMAIL: {settings.DEFAULT_FROM_EMAIL}")
            
            return Response(
                {
                    'success': False,
                    'error': 'متأسفانه خطایی در ارسال ایمیل رخ داد.',
                    'message': 'پیام شما ذخیره شد ولی ایمیل ارسال نشد. لطفاً مستقیماً با ما تماس بگیرید.',
                    'debug': str(email_error) if settings.DEBUG else None
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )