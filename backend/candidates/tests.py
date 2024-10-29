from datetime import datetime
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from .models import User, ContactInfo, PersonalInfo, ProfessionalExperience, AcademicBackground
from .serializers import ContactInfoSerializer

class UserTests(APITestCase):
    def setUp(self):
        self.user_data = {
            'email': 'example@example.com',
            'password': 'examplepassword',
        }
        self.create_user_url = reverse('register')

    def test_create_user(self):
        response = self.client.post(self.create_user_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, self.user_data['email'])


class ContactInfoTests(APITestCase):
    def setUp(self):
        self.contact_info_data = {
            'email': 'examplecontact@example.com',
            'phone': '(12) 12345-6789',
            'address': 'Street, 123 - Neighborhood, City - State, Complement'
        }
        # essa url abaixo é porque o DefaultRouter cria automaticamente para listagens, segue a lógica para os demais testes abaixo
        self.contact_info_url = reverse('contactinfo-list')

    def test_create_contact_info(self):
        response = self.client.post(self.contact_info_url, self.contact_info_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactInfo.objects.count(), 1)
        self.assertEqual(ContactInfo.objects.get().email, self.contact_info_data['email'])

    def test_get_contact_info(self):
        contact_info = ContactInfo.objects.create(**self.contact_info_data)
        response = self.client.get(self.contact_info_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['email'], contact_info.email)


class PersonalInfoTests(APITestCase):
    def setUp(self):
        self.contact_info = ContactInfo.objects.create(
            email='contactexample@example.com',
            phone='(12) 12345-6789',
            address='Street, 123 - Neighborhood, City - State, Complement'
        )
        self.personal_info_data = {
            'name': 'Test User',
            'date_of_birth': '1990-12-30',
            'contact_info': self.contact_info.id
        }
        self.personal_info_url = reverse('personalinfo-list')

    def test_create_personal_info(self):
        response = self.client.post(self.personal_info_url, self.personal_info_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PersonalInfo.objects.count(), 1)
        self.assertEqual(PersonalInfo.objects.get().name, self.personal_info_data['name'])

    def test_get_personal_info(self):
        contact_info = ContactInfo.objects.create(
            email='contactexample@example.com',
            phone='(12) 12345-6789',
            address='Street, 123 - Neighborhood, City - State, Complement'
        )
        personal_info = PersonalInfo.objects.create(
            name=self.personal_info_data['name'],
            date_of_birth=self.personal_info_data['date_of_birth'],
            contact_info=contact_info
        )
        response = self.client.get(self.personal_info_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], personal_info.name)


class ProfessionalExperienceTests(APITestCase):
    def setUp(self):
        self.contact_info = ContactInfo.objects.create(
            email='contact@example.com',
            phone='(12) 12345-6789',
            address='Street, 123 - Neighborhood, City - State, Complement'
        )
        self.experience_data = {
            'position': 'Software Developer',
            'company': 'Example Company',
            'exp_start_date': '2020-01-01',
            'exp_end_date': '2023-01-01',
            'description': 'Developing software applications',
            'contact_info': self.contact_info.id
        }
        self.experience_url = reverse('professionalexperience-list')

    def test_create_professional_experience(self):
        response = self.client.post(self.experience_url, self.experience_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProfessionalExperience.objects.count(), 1)
        self.assertEqual(ProfessionalExperience.objects.get().position, self.experience_data['position'])

    def test_get_professional_experience(self):
        contact_info = ContactInfo.objects.create(
            email='contact@example.com',
            phone='(12) 12345-6789',
            address='Street, 123 - Neighborhood, City - State, Complement'
        )
        experience_data = ProfessionalExperience.objects.create(
            position=self.experience_data['position'],
            company=self.experience_data['company'],
            exp_start_date=self.experience_data['exp_start_date'],
            exp_end_date=self.experience_data['exp_end_date'],
            description=self.experience_data['description'],
            contact_info=contact_info
        )
        experience2_data = ProfessionalExperience.objects.create(
            position="Backend Developer",
            company="DigitalSys",
            exp_start_date='2025-01-01',
            exp_end_date=None,
            description=None,
            contact_info=contact_info
        )
        response = self.client.get(self.experience_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['position'], experience_data.position)
        self.assertEqual(response.data[1]['company'], experience2_data.company)


class AcademicBackgroundTests(APITestCase):
    def setUp(self):
        self.contact_info = ContactInfo.objects.create(
            email='academicexample@example.com',
            phone='(12) 12345-6789',
            address='Street, 123 - Neighborhood, City - State, Complement'
        )
        self.academic_data = {
            'institution': 'Example University',
            'course': 'Computer Science',
            'acad_start_date': '2015-01-01',
            'acad_end_date': '2019-01-01',
            'contact_info': self.contact_info.id
        }
        self.academic_url = reverse('academicbackground-list')

    def test_create_academic_background(self):
        response = self.client.post(self.academic_url, self.academic_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AcademicBackground.objects.count(), 1)
        self.assertEqual(
            AcademicBackground.objects.get().acad_start_date,
            datetime.strptime(self.academic_data['acad_start_date'], '%Y-%m-%d').date()
        )

    def test_get_academic_background(self):
        contact_info = ContactInfo.objects.create(
            email='academicexample@example.com',
            phone='(12) 12345-6789',
            address='Street, 123 - Neighborhood, City - State, Complement'
        )
        academic_data = AcademicBackground.objects.create(
            institution=self.academic_data['institution'],
            course=self.academic_data['course'],
            acad_start_date=self.academic_data['acad_start_date'],
            acad_end_date=self.academic_data['acad_end_date'],
            contact_info=contact_info
        )
        response = self.client.get(self.academic_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['course'], academic_data.course)


class ContactInfoSerializerTests(APITestCase):
    def setUp(self):
        self.valid_data = {
            'email': 'exampleserializer@example.com',
            'phone': '(12) 12345-6789',
            'address': 'Street, 123 - Neighborhood, City - State, Complement'
        }
        self.invalid_data = {
            'email': 'invalid-email',
            'phone': '12345',
            'address': ''
        }

    def test_valid_serializer(self):
        serializer = ContactInfoSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['email'], self.valid_data['email'])

    def test_invalid_serializer(self):
        serializer = ContactInfoSerializer(data=self.invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)
        self.assertIn('phone', serializer.errors)
        self.assertIn('address', serializer.errors)

    def test_create_contact_info(self):
        serializer = ContactInfoSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        contact_info = serializer.save()
        self.assertEqual(contact_info.email, self.valid_data['email'])
        self.assertEqual(ContactInfo.objects.count(), 1)