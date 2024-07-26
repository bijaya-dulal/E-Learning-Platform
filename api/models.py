from django.db import models
from django.contrib.auth.models import User
#OTP ko lagi
from django.utils import timezone


class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

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

