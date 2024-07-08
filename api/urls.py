from django.urls import path
from .views import ItemListCreateView
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),

]