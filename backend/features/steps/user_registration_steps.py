import os
import django
import json
from django.urls import reverse
from rest_framework import status
from candidates.models import User

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recruitment_system.settings')
django.setup()

from rest_framework.test import APIClient
from behave import given, when, then

@given('a API está rodando para poder registrar')
def step_given_api_running(context):
    context.client = APIClient()

@given('um usuário existente com o e-mail "{email}"')
def step_given_existing_user(context, email):
    User.objects.create_user(email=email, password='password123')

@when('eu registro um novo usuário com um e-mail existente')
def step_when_register_existing_email(context):
    payload = {
        'email': 'testuser@example.com',
        'password': 'password123'
    }
    response = context.client.post(reverse('register'), data=payload, format='json')
    context.response = response

@then('o registro deve falhar')
def step_then_registration_fail(context):
    assert context.response.status_code == status.HTTP_400_BAD_REQUEST, (
        f"Esperado o código de status 400, mas obtido {context.response.status_code}."
    )

@then('eu devo receber uma mensagem de erro')
def step_then_receive_error_message(context):
    response_data = json.loads(context.response.content)
    assert 'email' in response_data, "Esperado 'email' na resposta."