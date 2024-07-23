from rest_framework import serializers
from .models import Item, User
from django.contrib.auth import get_user_model , authenticate
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import permissions, status
#from .validations import custom_validation, validate_email, validate_password

UserModel = get_user_model()

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'



#for signin
class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		#change here for first name and second name
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'], username=clean_data['email'],first_name=clean_data['username'])
		
		user_obj.save()
		return user_obj



class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
       
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active:
            return data
        raise serializers.ValidationError("Invalid username or password")



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        

#for courses

from .models import Course, Lesson, Review, Teacher, CurriculumSection, Enrollment

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class CurriculumSectionSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True)
    lesson_count = serializers.SerializerMethodField()

    class Meta:
        model = CurriculumSection
        fields = '__all__'

    def get_lesson_count(self, obj):
        return obj.lessons.count()
    

class CourseSerializer(serializers.ModelSerializer):
    curriculum = CurriculumSectionSerializer(many=True)
    reviews = ReviewSerializer(many=True)
    teacher = TeacherSerializer()

    class Meta:
        model = Course
        fields = '__all__'


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'
