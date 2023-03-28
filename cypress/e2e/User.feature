Feature: ReqRes User API

    Scenario: As an reqres user I want to get details of all users so that I can see what users exist
        Given I have the GET users end point
        When I send a request to GET users
        Then response status code equals 200
        And response body contains all users

    Scenario: As an reqres user I want to get a single user so that I can see information about the users
        Given I have the GET single user end point with the id of a user that exists
        When I send a request to get a single user
        Then response status code equals 200
        And response body contains the requested User

    Scenario: As an reqres user when I make a request for a user that does not exist I want to ensure that the server responds with a 404 error
        Given I have the GET single user end point with the id of a user that does not exist
        When I send a request to get a single user
        Then response status code equals 404
        And response body contains an empty object

    Scenario: As an reqres user I want to be able to create a user account so that I can login to the reqres website
        Given I have the create new user end point
        When I send a request containing details of the new user
        Then response status code equals 201
        And response body contains the new user

    Scenario: As an reqres user I want to be able to update an existing user account so that I can make changes to the users details
        Given I have the update user end point with the user id of the user I want to update
        When I send a request containing details of the user field I want to update
        Then response status code equals 200
        And response body contains the updated user

    Scenario: As an reqres user I want to delete a user so that the user is removed from the system
        Given I have the delete user end point with the user id of the user I want to delete
        When I send a request to delete the user
        Then response status code equals 204

