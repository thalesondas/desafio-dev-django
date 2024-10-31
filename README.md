# Instruções de instalação e execução do projeto

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instalação e execução

1. Abra o terminal na sua área de trabalho

2. Clone o repositório e entre no repositório clonado:

   ```bash
   git clone https://github.com/thalesondas/desafio-dev-django.git
   cd desafio-dev-django
   ```

3. Construa a imagem do Docker e inicie os contêineres em segundo plano:

    ```bash
    docker-compose up -d
    ```

4. Acesse o aplicativo:

    - Acesse o backend Django em [http://localhost:8000/api](http://localhost:8000/api)
    - Acesse o frontend React em [http://localhost:3000](http://localhost:3000)

5. Para parar e remover os contêineres em execução::

    ```bash
    docker-compose down
    ```

### Caso queira usar a conta de Django Admin para gerenciar os dados cadastrados:

* Acesse a página de login do Admin em [http://localhost:8000/admin](http://localhost:8000/admin)
* Utilize a conta com o email 'admin@admin.com' e senha 'admin123' para entrar