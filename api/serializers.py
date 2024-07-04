from rest_framework import serializers
from .models import Item, User

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'



#for signin

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']  # Include 'password' field here

    def create(self, validated_data):
        # Ensure password is hashed before saving
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # This automatically hashes the password
        user.save()
        return user
