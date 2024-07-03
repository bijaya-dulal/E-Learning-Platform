from django.urls import path
from .views import ItemListCreateView,UserCreateView

urlpatterns = [
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
        path('users/', UserCreateView.as_view(), name='user-create'),
]
