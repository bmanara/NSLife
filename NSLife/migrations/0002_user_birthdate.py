# Generated by Django 4.1.7 on 2023-04-10 10:22

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('NSLife', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='birthdate',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
