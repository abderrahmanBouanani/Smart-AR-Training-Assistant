from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DiagnosticIAViewSet

router = DefaultRouter()
router.register(r'diagnostics', DiagnosticIAViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
