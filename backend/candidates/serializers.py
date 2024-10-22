from rest_framework import serializers
from .models import PersonalInfo, ContactInfo, ProfessionalExperience, AcademicBackground

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

    def create(self, validated_data):
        contact_info = ContactInfo(**validated_data)
        contact_info.full_clean()
        contact_info.save()
        return contact_info

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.full_clean()
        instance.save()
        return instance

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'

    def create(self, validated_data):
        personal_info = PersonalInfo(**validated_data)
        personal_info.full_clean()
        personal_info.save()
        return personal_info

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.full_clean()
        instance.save()
        return instance

class ProfessionalExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalExperience
        fields = '__all__'

    def create(self, validated_data):
        experience = ProfessionalExperience(**validated_data)
        experience.full_clean()
        experience.save()
        return experience

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.full_clean()
        instance.save()
        return instance

class AcademicBackgroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicBackground
        fields = '__all__'

    def create(self, validated_data):
        academic_background = AcademicBackground(**validated_data)
        academic_background.full_clean()
        academic_background.save()
        return academic_background

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.full_clean()
        instance.save()
        return instance