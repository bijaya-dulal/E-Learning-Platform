from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter




urlpatterns = [
     
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include the API app URLs
]
