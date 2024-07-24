from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import ItemSerializer
from .models import Item, Course
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from django.contrib.auth import authenticate, login
#OTP ko lagi
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.utils import timezone
from rest_framework import status
from .models import OTPCode
from .serializers import OTPCodeSerializer

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from django.http import JsonResponse
import requests
from requests.auth import HTTPBasicAuth


class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


#for sign up
class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data =(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)



class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	
	def post(self, request):
		logout(request)
		print('logout')  
   
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        print('request received')
        
        serializer = UserSerializer(request.user)
        print(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
     
#####this is for login
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            print(f"Authenticated User: {user}")
            
            if user is not None:
                login(request, user)
                print(f"Session Key: {request.session.session_key}")
                return Response({
                    'username': user.first_name,
                    'email': user.email,
                    'session_id': request.session.session_key,
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		print("logout")
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)


# OTP ko lagi thapeko
#ENdpoint to generate and send OTP



class GenerateOTP(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        otp_code = get_random_string(length=4, allowed_chars='0123456789')
        expiry_time = timezone.now() + timezone.timedelta(minutes=3)  # OTP valid for 5 minutes

        OTPCode.objects.create(email=email, code=otp_code, expiry_time=expiry_time)

        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp_code}. It is valid for  30 sec.',
            'asimpoudel456@gmail.com',
            [email],
            fail_silently=False,
			
        )

        return Response({"message": "OTP sent"}, status=status.HTTP_200_OK)


#Endpoint to verify OTP
class VerifyOTP(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')

        if not email or not otp_code:
            return Response({"error": "Email and OTP code are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            otp_record = OTPCode.objects.get(email=email, code=otp_code)
            if otp_record.expiry_time < timezone.now():
                return Response({"error": "OTP has expired"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"message": "OTP verified"}, status=status.HTTP_200_OK)
        except OTPCode.DoesNotExist:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

class CheckEmail(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"exists": True}, status=status.HTTP_200_OK)
        return Response({"exists": False}, status=status.HTTP_200_OK)





	    







# views.py

from rest_framework import viewsets

from rest_framework.decorators import action
from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
 
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)
    #this is for the id based
    def retrieve(self, request, pk=None):
        course = Course.objects.get(pk=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    #@action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        course = self.get_object()
        # Perform enrollment logic here (e.g., create Enrollment record)
        enrollment = Enrollment.objects.create(course=course)
        return Response({'message': 'Enrolled successfully'})

