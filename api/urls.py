from django.urls import path
from .views import ItemListCreateView, RegisterView, CustomAuthToken, LogoutView

urlpatterns = [
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
  path('items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomAuthToken.as_view(), name='token'),
    path('logout/', LogoutView.as_view(), name='logout'),
]