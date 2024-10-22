from django.db import models

class ContactInfo(models.Model):
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return f'ID: {self.id} | Email: {self.email} | Phone: {self.phone}'

class PersonalInfo(models.Model):
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    contact_info = models.OneToOneField("ContactInfo", on_delete=models.CASCADE , related_name="personal_info")

    def __str__(self):
        return f'ID: {self.id} | Name: {self.name} | Contact email: {self.contact_info.email}'

class ProfessionalExperience(models.Model):
    position = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    exp_start_date = models.DateField()
    exp_end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    contact_info = models.ForeignKey("ContactInfo", on_delete=models.CASCADE, related_name="professional_experiences")

    def __str__(self):
        return f'Position: {self.position} | Company: {self.company} | Contact email: {self.contact_info.email}'

class AcademicBackground(models.Model):
    institution = models.CharField(max_length=255)
    course = models.CharField(max_length=255)
    acad_start_date = models.DateField()
    acad_end_date = models.DateField(blank=True, null=True)
    contact_info = models.ForeignKey("ContactInfo", on_delete=models.CASCADE, related_name="academic_backgrounds")

    def __str__(self):
        return f'Institution: {self.institution} | Course: {self.course} | Contact email: {self.contact_info.email}'