@demoblaze
Feature: Add devices from each Demoblaze section to the cart

  Scenario Outline: A randomly selected device is available in the cart
    Given I open the Demoblaze store
    When I select a random device from the "<section>" section and add it to the cart
    And I navigate to the cart
    Then the added device is available in the cart

    Examples:
      | section  |
      | Phones   |
      | Laptops  |
      | Monitors |