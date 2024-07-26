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


import hmac
import base64
import hashlib
import uuid
import requests
import xml.etree.ElementTree as ET
from django.http import JsonResponse
from django.views import View
from django.shortcuts import redirect


def generate_signature(message, secret):
    secret_bytes = secret.encode('utf-8')
    message_bytes = message.encode('utf-8')
    signature = hmac.new(secret_bytes, message_bytes, hashlib.sha256).digest()
    signature_base64 = base64.b64encode(signature).decode('utf-8')
    return signature_base64

def esewa_payment(request):
    secret_key = "8gBm/:&EnhH.1/q"  # Replace with your actual secret key
    transaction_uuid = str(uuid.uuid4())
    amount = 100
    tax_amount = 10
    total_amount = amount + tax_amount
    product_code = "EPAYTEST"
    success_url = "http://yourdomain.com/success/"
    failure_url = "http://yourdomain.com/failure/"

    # Create message for signature generation
    message = f"total_amount={total_amount},transaction_uuid={transaction_uuid},product_code={product_code}"
    signature = generate_signature(message, secret_key)

    data = {
        'amount': amount,
        'tax_amount': tax_amount,
        'total_amount': total_amount,
        'transaction_uuid': transaction_uuid,
        'product_code': product_code,
        'product_service_charge': 0,
        'product_delivery_charge': 0,
        'success_url': success_url,
        'failure_url': failure_url,
        'signed_field_names': 'total_amount,transaction_uuid,product_code',
        'signature': signature,
    }
    return JsonResponse(data)

class PaymentStatusView(View):
    def get(self, request, *args, **kwargs):
        course_id = kwargs.get('id')
        user = request.user
        course_payment = CoursePayment.objects.filter(user=user, course_id=course_id).first()
        has_paid = course_payment.has_paid if course_payment else False
        return JsonResponse({'has_paid': has_paid})

class EsewaVerifyView(View):
    def get(self, request, *args, **kwargs):
        oid = request.GET.get("oid")
        amt = request.GET.get("amt")
        refId = request.GET.get("refId")

        url = "https://uat.esewa.com.np/epay/transrec"
        d = {
            'amt': amt,
            'scd': 'epay_payment',
            'rid': refId,
            'pid': oid,
        }
        resp = requests.post(url, d)
        root = ET.fromstring(resp.content)
        status = root[0].text.strip()

        order_id = oid.split("_")[1]
        user_course = UserCourse.objects.get(id=order_id)

        if status == "Success":
            user_course.has_paid = True
            user_course.save()
            # Redirect to course detail with success message
            return redirect(f"/course/{order_id}/?payment=success")
        else:
            # Redirect to course detail with failure message
            return redirect(f"/course/{order_id}/?payment=failure")

from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import CoursePayment

@require_GET
def check_payment_status(request, course_id):
    session_id = request.headers.get('Authorization', '').replace('Session ', '')
    user = authenticate_user(session_id)  # Replace this with your actual authentication logic
    if user:
        try:
            payment = CoursePayment.objects.get(user=user, course_id=course_id)
            return JsonResponse({'has_paid': payment.status == 'success'})
        except CoursePayment.DoesNotExist:
            return JsonResponse({'has_paid': False})
    return JsonResponse({'has_paid': False}, status=401)

from django.http import JsonResponse
from django.views.decorators.http import require_GET

@require_GET
def get_course_details(request, course_id):
    session_id = request.headers.get('Authorization', '').replace('Session ', '')
    user = authenticate_user(session_id)
    
    try:
        course = Course.objects.get(id=course_id)
        curriculum = []
        for section in course.curriculum.all():
            lessons = []
            for lesson in section.lessons.all():
                is_paid = False
                if not lesson.free:
                    try:
                        payment = CoursePayment.objects.get(user=user, course=course)
                        is_paid = payment.status == 'success'
                    except CoursePayment.DoesNotExist:
                        pass
                lessons.append({
                    'id': lesson.id,
                    'title': lesson.title,
                    'video_link': lesson.video_link,
                    'notes_link': lesson.notes_link,
                    'free': lesson.free,
                    'locked': not (lesson.free or is_paid)
                })
            curriculum.append({
                'section_title': section.title,
                'lessons': lessons
            })
        return JsonResponse({
            'course': {
                'id': course.id,
                'title': course.title,
                'curriculum': curriculum,
                'overview': course.overview,
                'rating': course.rating,
                'teacher': {
                    'name': course.teacher.name,
                    'photo': course.teacher.photo.url,
                    'bio': course.teacher.bio
                },
                'reviews': list(course.reviews.values())
            }
        })
    except Course.DoesNotExist:
        return JsonResponse({'error': 'Course not found'}, status=404)

""" def proxy_to_flask(request):
    title = request.GET.get('title')
    if not title:
        return JsonResponse({'error': 'Missing "title" parameter'}, status=400)

    flask_url = 'http://localhost:5000/recommend'
    response = requests.get(flask_url, params={'title': title})
    
    if response.status_code == 404:
        return JsonResponse({'error': 'Course title not found.'}, status=404)
    
    return JsonResponse(response.json()) """



