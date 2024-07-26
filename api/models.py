from django.db import models
from django.contrib.auth.models import User
#OTP ko lagi
from django.utils import timezone


class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

4






# ## updated model
#for video courses

class Teacher(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField()
    email = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Review(models.Model):

    user = models.CharField(max_length=255)
    comment = models.TextField()
    rating = models.DecimalField(max_digits=2, decimal_places=1)

    def __str__(self):
        return f'{self.user} - {self.rating}'

class Lesson(models.Model):

    title = models.CharField(max_length=255)
    duration = models.CharField(max_length=10)
    video_link = models.FileField(upload_to='videos/', blank=True, null=True)
    notes_link = models.FileField(upload_to='files/', blank=True, null=True)
    free = models.BooleanField(default=False)

    is_accessible = models.BooleanField(default=False) 


    def __str__(self):
        return self.title




class CurriculumSection(models.Model):

    section_title = models.CharField(max_length=255)
    lessons = models.ManyToManyField(Lesson, related_name='sections')

    def __str__(self):
        return self.section_title

class Course(models.Model):
    CATEGORY_CHOICES = [
        ('Web Management', 'Web Management'),
        ('Business Administration', 'Business Administration'),
        ('Graphic Design', 'Graphic Design'),
        ('Marketing', 'Marketing'),
        ('Health & Fitness', 'Health & Fitness'),
        ('Information Software', 'Information Software'),
        ('Software Engineering', 'Software Engineering'),
        ('History & Archeologic', 'History & Archeologic'),
        ('Computer Science', 'Computer Science'),
        ('Art & Design', 'Art & Design'),
        ('UI/UX Design', 'UI/UX Design'),
    ]

    title = models.CharField(max_length=255, default='Untitled Course')
    overview = models.TextField(default='No overview provided.')
    curriculum = models.ManyToManyField('CurriculumSection', related_name='courses', blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Web Management')
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    reviews = models.ManyToManyField('Review', related_name='courses', blank=True)
    teacher = models.ForeignKey('Teacher', on_delete=models.CASCADE, default=1)  # Use a valid teacher ID or handle it differently
    duration = models.CharField(max_length=10, default='00:00')
    price = models.IntegerField(default=0)
    free = models.BooleanField(default=False)

    def __str__(self):
        return self.title





#this for the payment
class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    # Add any other fields like user reference, payment status, etc.

    def __str__(self):
        return f'{self.course.title} - {self.enrolled_at}'
    

#this is for the otp   

class OTPCode(models.Model):
    email = models.EmailField()
    code = models.CharField(max_length=4)
    expiry_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return f'{self.email} - {self.code}'

class UserCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    has_paid = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'course')

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    has_paid = models.BooleanField(default=False)

