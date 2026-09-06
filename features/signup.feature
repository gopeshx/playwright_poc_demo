Feature: Demoblaze user signup

  Scenario: Register a new user with Excel credentials
    Given I open the Demoblaze store
    When I sign up with the Excel credentials
    Then the signup confirmation should be displayed

  Scenario: Register a new user with JSON credentials
    Given I open the Demoblaze store
    When I sign up with the JSON credentials
    Then the signup confirmation should be displayed

  Scenario Outline: Register a new Demoblaze user
    Given I open the Demoblaze store
    When I sign up with username prefix "<usernamePrefix>" and password "<password>"
    Then the signup confirmation should be displayed

    Examples:
      | usernamePrefix | password        |
      | pw_user        | DemoPass123!    |
      | automation     | SecurePass456!  |