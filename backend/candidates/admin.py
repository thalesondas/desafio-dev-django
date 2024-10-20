from django.contrib import admin

from .models import PersonalInfo, ContactInfo, ProfessionalExperience, AcademicBackground

admin.site.register(ContactInfo)
admin.site.register(PersonalInfo)
admin.site.register(ProfessionalExperience)
admin.site.register(AcademicBackground)