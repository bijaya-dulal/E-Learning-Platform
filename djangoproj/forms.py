# forms.py
from django import forms
from ..api import Course

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['title', 'instructor', 'lectures', 'hours', 'price', 'monthly_price', 'video']
