# BloodHub

[![CircleCI](https://circleci.com/gh/ozimos/BloodHub.svg?style=shield)](https://circleci.com/gh/ozimos/BloodHub)
[![Maintainability](https://api.codeclimate.com/v1/badges/fd135cf884053fbc9245/maintainability)](https://codeclimate.com/github/ozimos/BloodHub/maintainability) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/fd135cf884053fbc9245/test_coverage)](https://codeclimate.com/github/ozimos/BloodHub/test_coverage)

Connecting donors to people in need

## Technology
NodeJS
PostgresQL


Notification System
SMS Notification
Free SMS API

Email Notification

Cloud Postgres Provider
## Requirements

A requester enters the webapp and requests a  unit of blood
Donors register on the webapp 
Donors are notified of matching requests
Donors go the app to accept request
App picks matching donor and informs donor
App provides donor info to requester and notifies donor is on route
Filter donors by criteria other than location. More analysis. these are brownie points


Data Entities

### Donor
    - Name
    - Blood Group
    - Address
    - Phone
    - Email
    - Lab Document 
    - Password

### Requester
    - Name
    - Phone
    - Email
    - Password

### Hospital
    - Name
    - Address
    - Address

### Request
    - Requester
    - Blood Group
    - Hospital
    - Status

### Address
    - Street
    - LGA
    - State

### Notification
    - Donor
    - Request
    - Status