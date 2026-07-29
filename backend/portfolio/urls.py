"""
URL configuration for portfolio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView 

urlpatterns = [
    # پنل ادمین
    path('secure-control-panel/', admin.site.urls),

    # اپلیکیشن تماس (Contact)
    path('api/', include('contact.urls')),

    # اپلیکیشن پورتفولیو (Portfolio)
    path('api/', include('build_project.urls')),
    
    # اپلیکیشن مهارت ها (skills)
    path('api/', include('skills.urls')),
    
    # آدرس Swagger UI (رابط وب)
    path('', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui-root'), 
    # 👈 مسیرهای مستندسازی
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    
]

# تنظیمات مدیا برای حالت لوکال
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns