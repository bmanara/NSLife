from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    birthdate = models.DateField()


class Exercise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_exercises")
    type = models.CharField(max_length=10)
    location = models.CharField(max_length=64)
    datetime = models.DateTimeField()
    score = models.IntegerField(blank=True)


class Manning(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_mannings")
    location = models.CharField(max_length=64)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    intensity = models.CharField(max_length=10)
