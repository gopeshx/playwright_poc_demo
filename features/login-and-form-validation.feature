@web-validation
Feature: Negative login and form validation

  Scenario: Sauce Demo rejects invalid login attempts
    Given the Sauce Demo login page is accessible
    When I submit the Sauce Demo login with both fields blank
    Then the Sauce Demo error should be "Epic sadface: Username is required"
    When I submit the Sauce Demo login with username "standard_user" and no password
    Then the Sauce Demo error should be "Epic sadface: Password is required"
    When I submit the Sauce Demo login with username "invalid_user" and password "wrongpass"
    Then the Sauce Demo error should be "Epic sadface: Username and password do not match any user in this service"
    When I submit the Sauce Demo login with username "locked_out_user" and password "secret_sauce"
    Then the Sauce Demo error should be "Epic sadface: Sorry, this user has been locked out"
    And the Sauce Demo error container should have red error styling
    When I close the Sauce Demo error
    Then the Sauce Demo error container should be hidden

  Scenario: Heroku secure area login recovers after invalid credentials
    Given the Heroku login page is accessible
    When I submit the Heroku login with username "admin" and password "wrongpassword"
    Then the Heroku error flash should say "Your username is invalid!"
    And the Heroku flash should have the error class
    When I submit the Heroku login with username "tomsmith" and password "SuperSecretPassword!"
    Then the Heroku URL should contain "/secure"
    And the Heroku success flash should be displayed
    When I log out from Heroku
    Then the Heroku logout flash should be displayed

  Scenario: DemoQA practice form validates required and invalid mobile fields
    Given the DemoQA practice form is accessible
    When I submit the DemoQA practice form without filling any fields
    Then the DemoQA required fields should be highlighted
    When I submit the DemoQA practice form with invalid mobile "12345"
    Then the DemoQA mobile field should have invalid styling