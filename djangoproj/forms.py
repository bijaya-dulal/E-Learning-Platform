# forms.py
from django import forms
from api.models import Course



class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['title', 'teacher', 'duration', 'price' , 'free']
