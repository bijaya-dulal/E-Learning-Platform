from django.db import models
from django.contrib.auth.models import User


class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

# models.py

from django.db import models

from django.db import models

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
    instructor = models.CharField(max_length=100)
    lectures = models.IntegerField()
    hours = models.IntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    monthly_price = models.DecimalField(max_digits=8, decimal_places=2)
    video = models.FileField(upload_to='videos/', blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.title


class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    # Add any other fields like user reference, payment status, etc.

    def __str__(self):
        return f'{self.course.title} - {self.enrolled_at}'
