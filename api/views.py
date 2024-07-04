from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ItemSerializer, UserSerializer
from .models import Item
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password  



class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        # Hash the password before saving
        validated_data = serializer.validated_data
        password = validated_data.get('password')
        hashed_password = make_password(password)
        validated_data['password'] = hashed_password
        
        # Save the user
        serializer.save()

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.create(user=response.user)
        return Response({'token': token.key})

class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=204)
