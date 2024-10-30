Feature: Registro de Usuário

  Scenario: Registro com um e-mail existente
    Given a API está rodando para poder registrar
    And um usuário existente com o e-mail "testuser@example.com"
    When eu registro um novo usuário com um e-mail existente
    Then o registro deve falhar
    And eu devo receber uma mensagem de erro