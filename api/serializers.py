from rest_framework import serializers
from .models import Item, User
from django.contrib.auth.hashers import make_password


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'



#for signin

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']  # Include 'password' field here
    
    #for login 
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


    def create(self, validated_data):
        # Ensure password is hashed before saving
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # This automatically hashes the password
        user.save()
        return user
