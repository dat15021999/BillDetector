from django.db import models
from django.db.models.fields import CharField

# Create your models here.
class Image(models.Model):
    source = models.CharField(max_length=200)

    def __str__(self):
        return self.source