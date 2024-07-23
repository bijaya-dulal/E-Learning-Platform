from django.contrib import admin

# Register your models here.

from .models import Course


from .models import Course, CurriculumSection, Lesson, Review, Teacher

admin.site.register(Course)
admin.site.register(CurriculumSection)
admin.site.register(Lesson)
admin.site.register(Review)
admin.site.register(Teacher)
