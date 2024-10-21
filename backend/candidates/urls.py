from rest_framework.routers import DefaultRouter
from .views import ContactInfoViewSet, PersonalInfoViewSet, ProfessionalExperienceViewSet, AcademicBackgroundViewSet

router = DefaultRouter()
router.register('contact-info', ContactInfoViewSet)
router.register('personal-info', PersonalInfoViewSet)
router.register('professional-experience', ProfessionalExperienceViewSet)
router.register('academic-background', AcademicBackgroundViewSet)

urlpatterns = router.urls