from django.shortcuts import render , redirect
from .forms import CourseForm

def add_course(request):
    if request.method == 'POST':
        form = CourseForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('course_list')  # Redirect to a course list page or any other page
    else:
        form = CourseForm()
    return render(request, 'add_course.html', {'form': form})
