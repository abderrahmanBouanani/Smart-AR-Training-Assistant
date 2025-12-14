from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AthleteViewSet, SportViewSet, ExerciceViewSet, SessionExerciceViewSet, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'athletes', AthleteViewSet)
router.register(r'sports', SportViewSet)
router.register(r'exercices', ExerciceViewSet)
router.register(r'sessions', SessionExerciceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]