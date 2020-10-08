# Eze Trade Request Backend

A RESTful web service for Eze trade request application developed using Node, Express and MongoDB.

[![Build Status](https://travis-ci.org/deytola/eze.svg?branch=master)](https://travis-ci.org/deytola/eze)

### [Live Demo](http://ezetrade.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


## Prerequisites
To get a development environment running on your local machine, these softwares should be installed first:
1. Node.js (12+)
2. NPM (6+)
3. MongoDB (4+)
4. Postman


## Installing
To get this project installed, follow these steps:

On terminal, run:

- ```npm install``` to install dependencies and 
- ```npm start``` to start server

The server should start on the port 3000.
To test, navigate to Postman and make a get request to localhost:3000/

## Running the tests
To run tests, run ```npm test``` This would test all routes to ensure that valid responses are returned.

## Deployment
This project is hosted on Heroku

## Built With
- Javascript
- Express (Node.js Framework)
- Mocha (Test Framework)
- Chai (Assertion Library)

####  How to run this code
1. Make sure MongoDB is running on your system
2. Clone this repository
3. Open terminal in the cloned folder,
   - To install dependencies, run ```  npm install  ``` on terminal
   - To run the application, run ```  npm start  ``` or ``` nodemon exec``` on terminal
4. Launch postman and send a GET request to [localhost:3000](http://localhost:3000/)


### API Endpoint Route 
<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>TASK</th></tr>

<tr><td>GET</td> <td>api/traderequests/load</td> <td> Load all trade requests into database </td></tr>

<tr><td>GET</td> <td>api/traderequests?requestType=buy</td> <td> Get all buy requests </td></tr>

<tr><td>GET</td> <td>api/traderequests?requestType=sell</td> <td> Get all sell requests</td></tr>

<tr><td>GET</td> <td>api/traderequests?requestType=buy&page=1&limit=10</td> <td> Get all buy requests by pagination </td></tr>

<tr><td>GET</td> <td>api/traderequests?requestType=sell&page=1&limit=10</td> <td> Get all sell requests by pagination </td></tr>

<tr><td>POST</td> <td>api/buyrequests/</td> <td> Create a buy request </td></tr>

<tr><td>POST</td> <td>api/sellrequests/</td> <td> Create a sell request </td></tr>

<tr><td>PUT</td> <td>api/buyrequests/:buyRequestId</td> <td> Update a single buy request by Id</td></tr> 

<tr><td>PUT</td> <td>api/sellrequests/:sellRequestId</td> <td> Update a single sell request by Id</td></tr> 

<tr><td>DELETE</td> <td>api/buyrequests/:buyRequestId</td> <td> Delete a single buy request by Id</td></tr> 

<tr><td>DELETE</td> <td>api/sellrequests/:sellRequestId</td> <td> Delete a single sell request by Id</td></tr> 
</table>

## Author
**Adetola Adebola** 

----
