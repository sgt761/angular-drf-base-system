from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'rut', 'primer_nombre', 'segundo_nombre', 'apellido_paterno', 'apellido_materno', 'email', 'is_active']

class RutLoginTokenSerializer(TokenObtainPairSerializer):
    username_field = 'rut'