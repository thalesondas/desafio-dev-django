from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import PersonalInfo, ContactInfo, ProfessionalExperience, AcademicBackground, User
from .serializers import PersonalInfoSerializer, ContactInfoSerializer, ProfessionalExperienceSerializer, AcademicBackgroundSerializer, UserSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class PersonalInfoViewSet(viewsets.ModelViewSet):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoSerializer
    permission_classes = [AllowAny]


class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    permission_classes = [AllowAny]


class ProfessionalExperienceViewSet(viewsets.ModelViewSet):
    queryset = ProfessionalExperience.objects.all()
    serializer_class = ProfessionalExperienceSerializer
    permission_classes = [AllowAny]


class AcademicBackgroundViewSet(viewsets.ModelViewSet):
    queryset = AcademicBackground.objects.all()
    serializer_class = AcademicBackgroundSerializer
    permission_classes = [AllowAny]