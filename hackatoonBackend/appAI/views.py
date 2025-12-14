from rest_framework import viewsets
from .models import DiagnosticIA
from .serializers import DiagnosticIASerializer

class DiagnosticIAViewSet(viewsets.ModelViewSet):
    queryset = DiagnosticIA.objects.all()
    serializer_class = DiagnosticIASerializer
