from django.contrib import admin
from .models import Athlete, Sport, Exercice, SessionExercice

admin.site.register(Athlete)
admin.site.register(Sport)
admin.site.register(Exercice)
admin.site.register(SessionExercice)