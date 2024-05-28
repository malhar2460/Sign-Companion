from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sign_to_text
        fields = '__all__'

class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text_to_sign
        fields = '__all__'