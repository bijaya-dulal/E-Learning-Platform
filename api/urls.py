from django.urls import path,include
from . import views
from rest_framework.authtoken.views import obtain_auth_token
# OTP ko lagi
from django.urls import path
from .views import CheckEmail, GenerateOTP, VerifyOTP

from .views import CourseViewSet, EnrollmentViewSet

from rest_framework.routers import DefaultRouter
from .views import esewa_payment
from .views import PaymentStatusView, EsewaVerifyView
from .views import check_payment_status
from .views import get_course_details
""" from .views import proxy_to_flask """

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
	path('check-email/', CheckEmail.as_view(), name='check-email'),
	path('generate-otp/', GenerateOTP.as_view(), name='generate_otp'),
    path('verify-otp/', VerifyOTP.as_view(), name='verify_otp'),
	path('esewa-payment/', esewa_payment, name='esewa_payment'),
	#path('success/', success_view, name='success'),
    #path('failure/', failure_view, name='failure'),
	path('payment-status/<int:id>/', PaymentStatusView.as_view(), name='payment_status'),
	path('esewa-verify/', EsewaVerifyView.as_view(), name='esewa_verify'),
	path('api/check-payment-status/<int:course_id>/', views.check_payment_status, name='check_payment_status'),
	path('api/courses/<int:course_id>/', get_course_details, name='get_course_details'),
	# path('recommend/', proxy_to_flask, name='proxy_to_flask'), """
	
]
