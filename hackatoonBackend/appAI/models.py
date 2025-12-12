from django.db import models
# On importe le modèle SessionExercice depuis l'autre application
from appAthlet.models import SessionExercice

class DiagnosticIA(models.Model):
    # Relation 1..1 (Une Session a un unique Diagnostic et vice-versa)
    session_exercice = models.OneToOneField(
        SessionExercice, 
        on_delete=models.CASCADE, 
        related_name='diagnostic_ia'
    )
    
    feedback = models.TextField()
    score_precision = models.FloatField(help_text="Score de précision IA (0-1 ou %)")
    recommandations = models.TextField(blank=True)

    def __str__(self):
        return f"Diagnostic pour {self.session_exercice}"