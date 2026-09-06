@banking
Feature: XYZ Bank customer account management

  Background:
    Given the XYZ Bank application is accessible

  Scenario: Create an account, deposit and withdraw funds
    When I log in as the bank manager
    And I add customer "Alice Smith" with postcode "E1 6RF"
    And I open a Dollar account for customer "Alice Smith"
    And I verify customer "Alice Smith" is listed
    And I log in as customer "Alice Smith"
    When I deposit 5000
    Then the deposit confirmation should be displayed
    And the account balance should be "$5000"
    When I withdraw 2000
    Then the withdrawal confirmation should be displayed
    And the account balance should be "$3000"
    When I open the transaction history
    Then the transaction history should contain a deposit of 5000
    And the transaction history should contain a withdrawal of 2000

  Scenario: Withdrawal greater than the account balance is rejected
    When I log in as the bank manager
    And I add customer "Alice Smith" with postcode "E1 6RF"
    And I open a Dollar account for customer "Alice Smith"
    And I log in as customer "Alice Smith"
    When I withdraw 2000
    Then the withdrawal error should be displayed
    And the account balance should be "$0"