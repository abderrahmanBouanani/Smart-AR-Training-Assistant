from rest_framework import serializers
from .models import DiagnosticIA

class DiagnosticIASerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticIA
        fields = '__all__'
