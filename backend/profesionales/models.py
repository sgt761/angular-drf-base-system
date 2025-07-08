from django.db import models

# Create your models here.
class Profesional(models.Model):
    rut = models.CharField(max_length=11, unique=True)
    primer_nombre = models.CharField(max_length=30)
    segundo_nombre = models.CharField(max_length=30, null=True)
    primer_apellido = models.CharField(max_length=30)
    segundo_apellido = models.CharField(max_length=30, null=True)
    direccion = models.CharField(max_length=55, null=True)
    telefono = models.CharField(max_length=11, null=True)
    email = models.CharField(max_length=55, null=True)
    # profesion
    # especialidad
    eunacom_aprobado = models.BooleanField(default=False)


class Profesion(models.Model):
    nombre = models.CharField(max_length=100, unique=True)


class Especialidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    profesion = models.ForeignKey(Profesion, on_delete=models.CASCADE, null=True)

