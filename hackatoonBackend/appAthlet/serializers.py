from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Athlete, Sport, Exercice, SessionExercice

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class AthleteSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Athlete
        fields = ['id', 'user', 'username', 'sexe', 'age', 'poids', 'taille', 'niveau_sportif']

class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__'

class ExerciceSerializer(serializers.ModelSerializer):
    sport_name = serializers.CharField(source='sport.nom', read_only=True)

    class Meta:
        model = Exercice
        fields = ['id', 'sport', 'sport_name', 'nom', 'description', 'difficulte']

class SessionExerciceSerializer(serializers.ModelSerializer):
    athlete_name = serializers.CharField(source='athlete.user.username', read_only=True)
    exercice_name = serializers.CharField(source='exercice.nom', read_only=True)

    class Meta:
        model = SessionExercice
        fields = ['id', 'athlete', 'athlete_name', 'exercice', 'exercice_name', 'date', 'duree', 'score', 'status']
