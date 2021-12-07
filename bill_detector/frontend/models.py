from django.db import models

# Create your models here.
class Photo(models.Model):
    Id = models.AutoField(primary_key=True)
    source = models.CharField(max_length=200, default='https://cdn.vatgia.vn/pictures/fullsize/2015/12/04/eil1449198144.jpg')
    isBill = models.BooleanField(default=False)