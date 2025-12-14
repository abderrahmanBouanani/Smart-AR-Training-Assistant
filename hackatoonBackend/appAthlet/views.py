from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Athlete, Sport, Exercice, SessionExercice
from .serializers import AthleteSerializer, SportSerializer, ExerciceSerializer, SessionExerciceSerializer, UserSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    # Filter to only show Users who have an associated Athlete profile
    queryset = User.objects.filter(athlete_profile__isnull=False)
    serializer_class = UserSerializer

class AthleteViewSet(viewsets.ModelViewSet):
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer

class SportViewSet(viewsets.ModelViewSet):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer

class ExerciceViewSet(viewsets.ModelViewSet):
    queryset = Exercice.objects.all()
    serializer_class = ExerciceSerializer

    def get_queryset(self):
        queryset = Exercice.objects.all()
        sport_id = self.request.query_params.get('sport')
        if sport_id is not None:
            queryset = queryset.filter(sport=sport_id)
        return queryset

class SessionExerciceViewSet(viewsets.ModelViewSet):
    queryset = SessionExercice.objects.all()
    serializer_class = SessionExerciceSerializer