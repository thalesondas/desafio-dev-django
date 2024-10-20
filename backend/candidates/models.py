from django.db import models

# Create your models here.

class PersonalInfo(models.Model):
    name = models.CharField(max_length=255);
    date_of_birth = models.DateField();
    contact_info = models.OneToOneField("ContactInfo", on_delete=models.CASCADE , related_name="personal_info");

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
    personal_info = models.ForeignKey("PersonalInfo", on_delete=models.CASCADE, related_name="professional_experiences");

class AcademicBackground(models.Model):
    institution = models.CharField(max_length=255);
    course = models.CharField(max_length=255);
    start_date = models.DateField();
    end_date = models.DateField(blank=True, null=True);
    personal_info = models.ForeignKey("PersonalInfo", on_delete=models.CASCADE, related_name="academic_backgrounds")