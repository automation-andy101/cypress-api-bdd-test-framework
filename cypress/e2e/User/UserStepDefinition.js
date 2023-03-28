/// <reference types="cypress" />

import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

let apiEndPoint;
let response;
let userid;

const baseUrl = Cypress.config('baseUrl')

before(() => {
    cy.request({
        method: 'POST',
        url: baseUrl + 'api/users',
        body: {
            "name": "NEW USER",
            "job": "NEW TESTER"
        }
    }).then((resp) => {
        userid = resp.body.id;
    })
})

after(() => {
    cy.request({
        method: 'DELETE',
        url: baseUrl + 'api/users/' + userid
    }).then((resp) => {

    })
})

Given('I have the GET users end point', () => {
    apiEndPoint = baseUrl + 'api/users?page=2';
})

Given('I have the GET single user end point with the id of a user that exists', () => {
    apiEndPoint = baseUrl + 'api/users/2';
})

Given('I have the GET single user end point with the id of a user that does not exist', () => {
    apiEndPoint = baseUrl + 'api/users/66';
})

Given('I have the create new user end point', () => {
    apiEndPoint = baseUrl + 'api/users';
})

Given('I have the update user end point with the user id of the user I want to update', () => {
    apiEndPoint = baseUrl + 'api/users/' + userid;
})

Given('I have the delete user end point with the user id of the user I want to delete', () => {
    apiEndPoint = baseUrl + 'api/users/' + userid;
})

When('I send a request to GET users', () => {
    cy.request({
        method: 'GET',
        url: apiEndPoint,
    }).then((resp) => {
        response = resp;
        cy.log(response)
    })
})

When('I send a request to get a single user', () => {
    cy.request({
        method: 'GET',
        url: apiEndPoint,
        failOnStatusCode: false
    }).then((resp) => {
        response = resp;
    })
})

When('I send a request containing details of the new user', () => {
    cy.request({
        method: 'POST',
        url: apiEndPoint,
        body: {
            "name": "test user",
            "job": "tester"
        }
    }).then((resp) => {
        response = resp;
    })
})

When('I send a request containing details of the user field I want to update', () => {
    cy.request({
        method: 'PUT',
        url: apiEndPoint,
        body: {
            "name": "UPDATED USER",
            "job": "UPDATED TESTER"
        }
    }).then((resp) => {
        response = resp;
    })
})

When('I send a request to delete the user', () => {
    cy.request({
        method: 'DELETE',
        url: apiEndPoint
    }).then((resp) => {
        response = resp;
    })
})

Then('response status code equals 200', () => {
    expect(response.status).to.eq(200);
})

Then('response status code equals 404', () => {
    expect(response.status).to.eq(404);
})

Then('response status code equals 201', () => {
    expect(response.status).to.eq(201);
})

Then('response status code equals 204', () => {
    expect(response.status).to.eq(204);
})

And('response body contains all users', () => {
    expect(response.body.data.length).to.be.greaterThan(1);
})

And('response body contains the requested User', () => {
    expect(response.body.data.id).to.eq(2);
    expect(response.body.data.email).to.eq('janet.weaver@reqres.in');
    expect(response.body.data.first_name).to.eq('Janet');
    expect(response.body.data.last_name).to.eq('Weaver');
    expect(response.body.data.avatar).to.eq('https://reqres.in/img/faces/2-image.jpg');
    expect(response.body.support.url).to.eq("https://reqres.in/#support-heading");
    expect(response.body.support.text).to.eq("To keep ReqRes free, contributions towards server costs are appreciated!");
})

And('response body contains an empty object', () => {
    expect(response.body.length).to.eq(undefined);
})

And('response body contains the new user', () => {
    expect(response.body.name).to.eq('test user');
    expect(response.body.job).to.eq('tester');
    expect(response.body.id).to.exist;
    expect(response.body.createdAt).to.exist;
})

And('response body contains the updated user', () => {
    expect(response.body.name).to.eq('UPDATED USER');
    expect(response.body.job).to.eq('UPDATED TESTER');
})

