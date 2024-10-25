from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ContactInfoViewSet, PersonalInfoViewSet, ProfessionalExperienceViewSet, AcademicBackgroundViewSet, CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('contact-info', ContactInfoViewSet)
router.register('personal-info', PersonalInfoViewSet)
router.register('professional-experience', ProfessionalExperienceViewSet)
router.register('academic-background', AcademicBackgroundViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('auth/', include('rest_framework.urls')),
    path('user/register/', CreateUserView.as_view(), name='register'),
]

urlpatterns += router.urls