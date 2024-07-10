from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import ItemSerializer
from .models import Item
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from django.contrib.auth import authenticate, login
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
     
	    







# views.py

from rest_framework import viewsets

from rest_framework.decorators import action
from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    # @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        course = self.get_object()
        # Perform enrollment logic here (e.g., create Enrollment record)
        enrollment = Enrollment.objects.create(course=course)
        return Response({'message': 'Enrolled successfully'})

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

