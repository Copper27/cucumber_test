Feature: Cucumber test

    Background
       # Given I launch "chrome" browser

    Scenario: Populate mail print form
        When I go to "https://print.stamps.com/Webpostage/default2.aspx"
        Then I expect URL to contain "print.stamps.com"
        When I set Print On to "Stamps"
        When I set Serial Number to "C12345"
        When I set Mail From ZIP to "94102"
        When I set Mail To Country to "Canada"
        When I set Weight lbs to "1" and oz to "1"
        Then I expect that Weight lbs is "1"
        Then I set service to "Letter"
        #When I click on the element "#sdc-mainpanel-servicedroplist-trigger-picker"
        #When I click on the element "#sdc-servicedroplist-fcletter"
        #Then I set service to "Letter"