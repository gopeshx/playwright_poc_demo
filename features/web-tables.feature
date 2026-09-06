@demoqa
Feature: DemoQA Web Tables management

  Scenario: Create, search, edit, delete, and sort a table record
    Given the DemoQA Web Tables application is accessible
    When I add the record for "Emma Stone" with email "emma.stone@test.com", age 28, salary 75000, and department "QA"
    Then Emma Stone's record should be visible with salary 75000
    When I search for "Emma"
    Then only Emma Stone's record should be shown
    When I clear the Web Tables search
    Then all 4 Web Tables records should be visible
    When I edit Emma Stone's salary to 85000
    Then Emma Stone's salary should be 85000 and her other fields should remain unchanged
    When I search for "Kierra"
    Then Kierra's pre-existing record should be visible
    When I clear the Web Tables search
    And I delete Emma Stone's record
    Then Emma Stone's record should no longer exist
    When I set the Web Tables rows per page to 5 if available
    Then the Web Tables rows per page should be 5 when available
    And I sort the Web Tables by Age in ascending order
    Then the visible ages should be sorted in ascending order
    When I sort the Web Tables by Age in descending order
    Then the visible ages should be sorted in descending order