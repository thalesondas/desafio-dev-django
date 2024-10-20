from django.db import models

# Create your models here.

class PersonalInfo(models.Model):
    name = models.CharField(max_length=255);
    date_of_birth = models.DateField();

class ContactInfo(models.Model):
    email = models.EmailField();
    phone = models.CharField(max_length=20);
    address = models.TextField();

class ProfessionalExperience(models.Model):
    position = models.CharField(max_length=255);
    company = models.CharField(max_length=255);
    start_date = models.DateField();
    end_date = models.DateField(blank=True, null=True);
    description = models.TextField();

class AcademicBackground(models.Model):
    institution = models.CharField(max_length=255);
    course = models.CharField(max_length=255);
    start_date = models.DateField();
    end_date = models.DateField(blank=True, null=True);