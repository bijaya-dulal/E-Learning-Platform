from rest_framework import serializers
from .models import Item, User
from django.contrib.auth.hashers import make_password


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'



#for signin


