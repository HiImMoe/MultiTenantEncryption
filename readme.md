## Start Multi-Tenant Encryption System

install dependencies:
`yarn`

start docker container:
-> first check the docker-compose file. For m1 laptops use wizzn/keycloak:14 image for other use jboss/keycloak:12.0.4 image
`docker-compose up -d`

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
and call the import api route

## Start classic Multi-Tenant System

install dependencies:
`yarn`

start backend
`yarn compare start`

import data:
go to http://localhost:3300/api
and call the import api route

## Test Setup

- install JMeter from https://jmeter.apache.org/
- open JMeter and load config from project root
- before starting a test always clear settings and db with `docker-compose down` and `docker-compose up -d`
