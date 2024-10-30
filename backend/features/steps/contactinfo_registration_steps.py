import os
import django
import json
from django.urls import reverse
from rest_framework import status

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recruitment_system.settings')
django.setup()

from rest_framework.test import APIClient
from behave import given, when, then

@given('a API está rodando')
def step_given_api_running(context):
    context.client = APIClient()

@when('eu crio um contato com número de telefone inválido com o valor "{phone}"')
def step_create_invalid_phone(context, phone):
    payload = {
        'email': 'emailtest123@example.com',
        'phone': phone,
        'address': 'Rua, 123 - Bairro, Cidade - Estado, Complemento'
    }
    response = context.client.post(reverse('contactinfo-list'), data=payload, format='json')
    context.response = response

@then('a criação do contato deve falhar')
def step_creation_failed(context):
    assert context.response.status_code == status.HTTP_400_BAD_REQUEST, (
        f"Esperado o código de status 400, mas obtido {context.response.status_code}."
    )

@then('eu devo receber uma mensagem de erro sobre o número de telefone')
def step_phone_error_message(context):
    response_data = json.loads(context.response.content)
    assert 'phone' in response_data, "Esperado erro no campo 'phone', mas não foi encontrado na resposta."
    assert response_data['phone'] == ["Número de telefone inválido. O formato deve ser (XX) XXXXX-XXXX"], (
        f"Mensagem de erro inesperada: {response_data['phone']}"
    )