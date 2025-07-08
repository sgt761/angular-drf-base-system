from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    rut = models.CharField(max_length=12, unique=True)
    primer_nombre = models.CharField(max_length=30)
    segundo_nombre = models.CharField(max_length=30, blank=True, null=True)
    apellido_paterno = models.CharField(max_length=30)
    apellido_materno = models.CharField(max_length=30, blank=True, null=True)
    first_name = None
    last_name = None

    USERNAME_FIELD = 'rut'
    REQUIRED_FIELDS = ['username', 'email', 'primer_nombre', 'apellido_paterno']

    def __str__(self):
        return f'{self.primer_nombre} {self.apellido_paterno} - ({self.rut})'
