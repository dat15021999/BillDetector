# Generated by Django 3.1.4 on 2021-11-29 04:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='isBill',
            field=models.BooleanField(default=False),
        ),
    ]