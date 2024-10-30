Feature: Registro de Usuário

  Scenario: Registro com um e-mail existente
    Given a API está rodando para poder registrar
    When eu registro um novo usuário com um e-mail existente = "usertest@example.com"
    Then o registro deve falhar
    And eu devo receber uma mensagem de erro