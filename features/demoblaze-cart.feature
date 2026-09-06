Feature: Add a mobile to the Demoblaze cart

  Scenario: The first laptop is available in the cart
    Given I open the Demoblaze store
    When I select the first laptop and add it to the cart
    And I navigate to the cart
    Then the added laptop is available in the cart

  Scenario: The first mobile is available in the cart
    Given I open the Demoblaze store
    When I select the first mobile and add it to the cart
    And I navigate to the cart
    Then the added mobile is available in the cart

  Scenario: A randomly selected mobile is available in the cart
    Given I open the Demoblaze store
    When I select a random mobile and add it to the cart
    And I navigate to the cart
    Then the added mobile is available in the cart

  Scenario: Another randomly selected mobile is available in the cart
    Given I open the Demoblaze store
    When I select a random mobile and add it to the cart
    And I navigate to the cart
    Then the added mobile is available in the cart