# Generated by Django 3.1.4 on 2021-12-04 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0002_auto_20211129_0436'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='source',
            field=models.CharField(default='https://cdn.vatgia.vn/pictures/fullsize/2015/12/04/eil1449198144.jpg', max_length=200),
        ),
    ]
