from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
# OTP ko lagi
from django.urls import path
from .views import CheckEmail, GenerateOTP, VerifyOTP

<<<<<<< Updated upstream
urlpatterns = [
=======
from .views import CourseViewSet, EnrollmentViewSet

from rest_framework.routers import DefaultRouter
from .views import esewa_payment
#from .views import success_view, failure_view
from .views import PaymentStatusView, EsewaVerifyView
from .views import update_payment_status,get_payment_status
from .views import get_video_access_status




router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')


urlpatterns = [
    path('', include(router.urls)),
>>>>>>> Stashed changes
    path('items/',views.ItemListCreateView.as_view(), name='item-list-create'),
  	path('register/', views.UserRegister.as_view(), name='register'),
	path('login/', views.UserLogin.as_view(), name='login'),
	path('logout/', views.UserLogout.as_view(), name='logout'),
	path('user/', views.UserView.as_view(), name='user'),
	path('check-email/', CheckEmail.as_view(), name='check-email'),
	path('generate-otp/', GenerateOTP.as_view(), name='generate_otp'),
    path('verify-otp/', VerifyOTP.as_view(), name='verify_otp'),
<<<<<<< Updated upstream
]
=======
	path('esewa-payment/', esewa_payment, name='esewa_payment'),
	#path('success/', success_view, name='success'),
    #path('failure/', failure_view, name='failure'),
	path('payment-status/<int:id>/', PaymentStatusView.as_view(), name='payment_status'),
	path('esewa-verify/', EsewaVerifyView.as_view(), name='esewa_verify'),
	path('update-payment-status/<int:course_id>/', update_payment_status, name='update_payment_status'),
	path('video-access-status/<int:course_id>/', get_video_access_status, name='get_video_access_status'),
	
	
	

]
>>>>>>> Stashed changes
