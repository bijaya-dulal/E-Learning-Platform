from rest_framework import generics, permissions
from django.shortcuts import redirect
from rest_framework.response import Response
from .serializers import ItemSerializer
from .models import Item, Course ,Lesson,OTPCode , Teacher
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, TeacherSerializer,OTPCodeSerializer
from rest_framework import permissions, status
from django.contrib.auth import authenticate, login
#OTP ko lagi
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.utils import timezone
from rest_framework import status
#esewa ko lagi 
#from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from django.http import JsonResponse
import requests
#from requests.auth import HTTPBasicAuth


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

#teacher details 
#update fro email matching quer
# views.py
from rest_framework.parsers import MultiPartParser, FormParser

class TeacherDetailView(APIView):
  
    parser_classes = [MultiPartParser, FormParser]  # Add parsers to handle file uploads

    def get(self, request):
        email = request.query_params.get('email')  # Get the email from query parameters
        if not email:
            return Response({'error': 'Email parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            teacher = Teacher.objects.get(email=email)
            serializer = TeacherSerializer(teacher)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        email = request.query_params.get('email')  # Get the email from query parameters
        if not email:
            return Response({'error': 'Email parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            teacher = Teacher.objects.get(email=email)
            serializer = TeacherSerializer(teacher, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Teacher.DoesNotExist:
            return Response({'error': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)


import hmac
import hashlib
import base64
import uuid
from django.http import JsonResponse

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

from django.http import JsonResponse, HttpResponseRedirect
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import requests
import xml.etree.ElementTree as ET
from .models import UserCourse

class PaymentStatusView(View):
    def get(self, request, *args, **kwargs):
        course_id = kwargs.get('id')
        user_course = UserCourse.objects.filter(course_id=course_id).first()
        has_paid = user_course.has_paid if user_course else False
        return JsonResponse({'has_paid': has_paid})
    
from .models import Course, UserCourse
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
            print('success')
           
            user_course.has_paid = True
            user_course.save()
            # Redirect to course detail with success message
            return redirect(f"/course/{order_id}/?payment=success")
        else:
            print('fail')
            # Redirect to course detail with failure message
            return redirect(f"/course/{order_id}/?payment=failure")

from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Payment, Course

@csrf_exempt
def update_payment_status(request, course_id):
    if request.method == 'POST':
        user = request.user
        course = get_object_or_404(Course, id=course_id)
        payment_status = request.POST.get('payment')

        payment, created = Payment.objects.get_or_create(user=user, course=course)
        if payment_status == 'success':
            payment.has_paid = True
        else:
            payment.has_paid = False
        payment.save()

        return JsonResponse({'has_paid': payment.has_paid})

from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Payment, Course


def get_payment_status(request, course_id):
    user = request.user
    course = get_object_or_404(Course, id=course_id)
    payment = Payment.objects.filter(user=user, course=course).first()
    has_paid = payment.has_paid if payment else False
    return JsonResponse({'has_paid': has_paid})

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Course, Lesson, Payment

def get_video_access_status(request, course_id):
    user = request.user
    course = get_object_or_404(Course, id=course_id)
    payment = Payment.objects.filter(user=user, course=course).first()
    has_paid = payment and payment.has_paid

    if has_paid:
        # Allow access to all videos
        Lesson.objects.filter(course=course).update(is_accessible=True)
    else:
        # Allow access to the first video and free videos
        lessons = Lesson.objects.filter(course=course)
        lessons.update(is_accessible=False)  # Set all lessons to not accessible
        lessons.filter(free=True).update(is_accessible=True)  # Allow access to free lessons
        if lessons.exists():
            lessons.first().update(is_accessible=True)  # Allow access to the first lesson

    lessons = Lesson.objects.filter(course=course)
    video_list = [
        {
            "id": lesson.id,
            "title": lesson.title,
            "videoLink": lesson.video_link.url if lesson.video_link else None,
            "is_accessible": lesson.is_accessible
        } for lesson in lessons
    ]

    return JsonResponse({"lessons": video_list, "has_paid": has_paid})




###for usercourse register_required
from django.contrib.auth.decorators import login_required

def enroll_in_course(request, course_id):
    course = Course.objects.get(id=course_id)
    user = request.user

    # Check if the user is already enrolled in the course
    if UserCourse.objects.filter(user=user, course=course).exists():
        return redirect(f"/course/{course_id}/?already_enrolled=true")

    # Create a new UserCourse entry
    UserCourse.objects.create(user=user, course=course)

    # Redirect to payment page or show enrollment success message
    return redirect(f"/course/{course_id}/?enrollment=success")

from rest_framework.decorators import api_view
from .serializers import UserCourseSerializer
import logging

logger = logging.getLogger(__name__)



def get_user_course_by_title(request):
    username = request.GET.get('username')
    title = request.GET.get('title')
    
    if username and title:
        # Perform query to get UserCourse
        user_course = UserCourse.objects.filter(user__username=username, course__title=title).first()
        has_paid = user_course.has_paid if user_course else False
        return JsonResponse({'has_paid': has_paid})
    else:
        return JsonResponse({'error': 'Invalid parameters'}, status=400)
    

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import UserCourse

@csrf_exempt
def UpdatePay(request):
    if request.method == 'POST':
        try:
            import json
            data = json.loads(request.body.decode('utf-8'))

            course_id = data.get('course_id')
            email = data.get('email')

            if not course_id or not email:
                return JsonResponse({'error': 'Course ID or email missing'}, status=400)

            # Retrieve the UserCourse object based on course_id and user email
            user_course = get_object_or_404(UserCourse, course_id=course_id, user__email=email)
            user_course.has_paid = True
            user_course.save()

            return JsonResponse({'message': 'Payment status updated successfully'}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



##------------------------for meeting schedule--------##
from .serializers import ScheduledSessionSerializer
from rest_framework.permissions import IsAuthenticated
from .models import ScheduledSession


class ScheduledSessionCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = ScheduledSessionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def get(self, request, *args, **kwargs):
        user = request.user
        sessions = ScheduledSession.objects.filter(user=user)
        serializer = ScheduledSessionSerializer(sessions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
##-----fetchh the students from the user model



class StudentListView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    def get(self, request, *args, **kwargs):
        students = User.objects.filter(is_staff=False)  # Get all non-staff users
        serializer = UserSerializer(students, many=True)
        return Response(serializer.data)
    
#for mail room ID    
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def send_room_id_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        room_id = data.get('roomID')
        if email and room_id:
            # Construct the email content
            subject = 'Video Call Room ID'
            message = f'You are invited to a video call. Room link: http://localhost:5173/videocall?roomID={room_id}'
            send_mail(subject, message, 'your-email@example.com', [email])
            return JsonResponse({'message': 'Email sent successfully'})
        else:
            return JsonResponse({'error': 'Missing email or roomID'}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)


#frtch enrolled course


class EnrolledCoursesView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    def get(self, request):
        # Assuming you have an Enrollment model that links users to courses
        enrollments = UserCourse.objects.filter(user=request.user)
        serializer = UserCourseSerializer(UserCourse, many=True)
        return Response({'courses': serializer.data})