Feature: Validação nas informações de contato

    Scenario: Número do telefone no formato inválido
        Given a API está rodando
        When eu crio um contato com número de telefone inválido com o valor "123-23"
        Then a criação do contato deve falhar
        And eu devo receber uma mensagem de erro sobre o número de telefone