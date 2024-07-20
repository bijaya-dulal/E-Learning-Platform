from django.urls import path,include
from . import views
from rest_framework.authtoken.views import obtain_auth_token
from .views import CourseViewSet, EnrollmentViewSet

from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')


urlpatterns = [
       path('', include(router.urls)),
    path('items/',views.ItemListCreateView.as_view(), name='item-list-create'),
  	path('register/', views.UserRegister.as_view(), name='register'),
	path('login/', views.UserLogin.as_view(), name='login'),
	path('logout/', views.UserLogout.as_view(), name='logout'),
	path('user/', views.UserView.as_view(), name='user'),

]
