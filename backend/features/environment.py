import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recruitment_system.settings')

django.setup()

def before_scenario(context, scenario):
    User = get_user_model()
    User.objects.all().delete()