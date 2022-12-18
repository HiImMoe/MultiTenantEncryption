## General start up

install dependencies:
`yarn`

start docker container:
-> first check the docker-compose file. For mac m1 laptops use wizzn/keycloak:14 image for other use jboss/keycloak:12.0.4 image
`docker-compose up -d`

## Start Multi-Tenant Encryption System

start encryption backend:
open new terminal
`yarn enc start`

start middleware:
open new terminal
`yarn middleware start`

start key management service
`yarn key start`

import data:
go to http://localhost:3000/api
and call the /import api route

## Start classic Multi-Tenant System

install dependencies:
`yarn`

start backend
`yarn compare start`

import data:
go to http://localhost:3300/api
and call the /import api route

## Test Setup

- install JMeter from https://jmeter.apache.org/
- open JMeter and load config from project root
- check all paths to the files and adjust if needed (the naming of the components is always CSV ...)

- SETTINGS:

  - To adjust the number of users open the "Thread Group" component and adjust the "Number of Threads (users)" variable (max is 100)
  - To adjust the number of employees created per tenant open the component "02 Loop Controller"
  - To adjust the number of boni, missing days and performance ratings created per employee open the component "02-03 Loop Controller"

- before starting a test always clear settings and db with `docker-compose down` and `docker-compose up -d`
