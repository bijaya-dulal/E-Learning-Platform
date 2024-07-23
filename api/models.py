from django.db import models
from django.contrib.auth.models import User


class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name








## updated model

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

    title = models.CharField(max_length=255)
    overview = models.TextField()
    curriculum = models.ManyToManyField(CurriculumSection, related_name='courses')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    reviews = models.ManyToManyField(Review, related_name='courses')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    duration = models.CharField(max_length=10)  # Adding duration here to match your previous form example
    price = models.IntegerField() 
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
