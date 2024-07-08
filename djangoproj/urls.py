from django.contrib import admin
from django.urls import path, include

urlpatterns = [
     path('', admin.site.urls),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Include the API app URLs
]
