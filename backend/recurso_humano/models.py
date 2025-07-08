from django.db import models

from profesionales.models import Profesional


class RecursoHumano(models.Model):
    profesional = models.ForeignKey(Profesional, on_delete=models.CASCADE)
    # periodo
    # establecimiento
    # contrato
    horas_efectivas = models.IntegerField(null=True)
