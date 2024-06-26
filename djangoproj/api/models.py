from django.db import models
import string 
import random


def gnenerate_unique_code():
    lenght= 6
    while True:
        code = ''.join(random.choice(string.ascii_uppercase,k=lenght))
        if Room.objects.filter(code=code).count()==0:
             break
    return code    

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default='', unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False,default=False)
    

    