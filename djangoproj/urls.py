from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
     
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include the API app URLs
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
