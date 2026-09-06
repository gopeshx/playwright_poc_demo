@test-automation-practice
Feature: Test Automation Practice interactions

  Scenario: Complete the data entry form controls
    Given the Test Automation Practice page is accessible
    When I fill the practice form with valid data
    Then the form controls should contain the selected values

  Scenario: Upload one and multiple files
    Given the Test Automation Practice page is accessible
    When I upload the single practice file
    Then the single file input should contain "practice-upload-one.txt"
    When I upload the two practice files
    Then the multiple file input should contain "practice-upload-two.txt"

  Scenario: Handle simple confirmation and prompt alerts
    Given the Test Automation Practice page is accessible
    When I accept the simple practice alert
    Then the practice alert message should be "I am an alert box!"
    When I dismiss the confirmation practice alert
    Then the practice alert message should be "Press a button!"
    When I answer the prompt practice alert with "Playwright"
    Then the practice alert message should be "Please enter your name"

  Scenario: Drag an item into its target
    Given the Test Automation Practice page is accessible
    When I drag the practice item to its target
    Then the practice drop target should say "Dropped!"

  Scenario: Double click copies text between fields
    Given the Test Automation Practice page is accessible
    When I double click Copy Text after entering "Playwright"
    Then the second field should contain "Playwright"

  Scenario: Read static table and navigate pagination
    Given the Test Automation Practice page is accessible
    Then the static table should contain 6 data rows
    When I open pagination page 1
    Then the pagination table should contain data rows