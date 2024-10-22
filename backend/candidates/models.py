from django.db import models
from django.core.exceptions import ValidationError
import datetime
import re

class ContactInfo(models.Model):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()

    def clean(self):
        if not re.match(r'^\(\d{2}\) \d{5}-\d{4}$', self.phone):
            raise ValidationError("Número de telefone inválido. O formato deve ser (XX) XXXXX-XXXX")

    def __str__(self):
        return f'ID: {self.id} | Email: {self.email} | Phone: {self.phone}'

class PersonalInfo(models.Model):
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    contact_info = models.OneToOneField("ContactInfo", on_delete=models.CASCADE , related_name="personal_info")

    def clean(self):
        if self.date_of_birth > datetime.date.today():
            raise ValidationError("A data de nascimento não pode ser uma data futura.")

    def __str__(self):
        return f'ID: {self.id} | Name: {self.name} | Contact email: {self.contact_info.email}'

class ProfessionalExperience(models.Model):
    position = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    exp_start_date = models.DateField()
    exp_end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    contact_info = models.ForeignKey("ContactInfo", on_delete=models.CASCADE, related_name="professional_experiences")

    def clean(self):
        if self.exp_end_date and self.exp_end_date < self.exp_start_date:
            raise ValidationError("A data de término da experiência não pode ser anterior à data de início")

    def __str__(self):
        return f'Position: {self.position} | Company: {self.company} | Contact email: {self.contact_info.email}'

class AcademicBackground(models.Model):
    institution = models.CharField(max_length=255)
    course = models.CharField(max_length=255)
    acad_start_date = models.DateField()
    acad_end_date = models.DateField(blank=True, null=True)
    contact_info = models.ForeignKey("ContactInfo", on_delete=models.CASCADE, related_name="academic_backgrounds")

    def clean(self):
        if self.acad_end_date and self.acad_end_date < self.acad_start_date:
            raise ValidationError("A data de término do curso não pode ser anterior à data de início")

    def __str__(self):
        return f'Institution: {self.institution} | Course: {self.course} | Contact email: {self.contact_info.email}'