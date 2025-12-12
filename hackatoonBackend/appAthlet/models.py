from django.db import models
from django.contrib.auth.models import User

# --- Énumérations (Traduites depuis le diagramme) ---
class SexeEnum(models.TextChoices):
    FEMME = 'FEMME', 'Femme'
    HOMME = 'HOMME', 'Homme'

class NiveauSportifEnum(models.TextChoices):
    DEBUTANT = 'DEBUTANT', 'Débutant'
    INTERMEDIAIRE = 'INTERMEDIAIRE', 'Intermédiaire'
    AVANCE = 'AVANCE', 'Avancé'

class DifficulteEnum(models.TextChoices):
    FACILE = 'FACILE', 'Facile'
    MOYENNE = 'MOYENNE', 'Moyenne'
    DIFFICILE = 'DIFFICILE', 'Difficile'

class StatusEnum(models.TextChoices):
    EN_COURS = 'EN_COURS', 'En cours'
    TERMINE = 'TERMINE', 'Terminé'
    ANNULE = 'ANNULE', 'Annulé'

# --- Modèles ---

class Athlete(models.Model):
    # Relation OneToOne pour étendre le User par défaut (Héritage dans le diagramme)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='athlete_profile')
    
    sexe = models.CharField(max_length=10, choices=SexeEnum.choices)
    age = models.IntegerField()
    poids = models.FloatField(help_text="Poids en kg")
    taille = models.FloatField(help_text="Taille en cm")
    niveau_sportif = models.CharField(max_length=20, choices=NiveauSportifEnum.choices)

    def __str__(self):
        return f"{self.user.username} - {self.niveau_sportif}"

class Sport(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.nom

class Exercice(models.Model):
    # Relation 1..* (Un Sport a plusieurs Exercices)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name='exercices')
    
    nom = models.CharField(max_length=100)
    description = models.TextField()
    difficulte = models.CharField(max_length=20, choices=DifficulteEnum.choices)

    def __str__(self):
        return f"{self.nom} ({self.difficulte})"

class SessionExercice(models.Model):
    # Relation 1..* (Un Athlète a plusieurs Sessions)
    athlete = models.ForeignKey(Athlete, on_delete=models.CASCADE, related_name='sessions')
    # Relation 1..* (Un Exercice a plusieurs Sessions)
    exercice = models.ForeignKey(Exercice, on_delete=models.CASCADE, related_name='sessions')
    
    date = models.DateTimeField(auto_now_add=True)
    duree = models.IntegerField(help_text="Durée en minutes")
    score = models.FloatField(null=True, blank=True)
    status = models.CharField(
        max_length=20, 
        choices=StatusEnum.choices, 
        default=StatusEnum.EN_COURS
    )

    def __str__(self):
        return f"Session {self.date} - {self.athlete.user.username}"