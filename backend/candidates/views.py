from rest_framework import viewsets
from .models import PersonalInfo, ContactInfo, ProfessionalExperience, AcademicBackground
from .serializers import PersonalInfoSerializer, ContactInfoSerializer, ProfessionalExperienceSerializer, AcademicBackgroundSerializer

class PersonalInfoViewSet(viewsets.ModelViewSet):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoSerializer

class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer

class ProfessionalExperienceViewSet(viewsets.ModelViewSet):
    queryset = ProfessionalExperience.objects.all()
    serializer_class = ProfessionalExperienceSerializer

class AcademicBackgroundViewSet(viewsets.ModelViewSet):
    queryset = AcademicBackground.objects.all()
    serializer_class = AcademicBackgroundSerializer