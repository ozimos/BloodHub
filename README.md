# BloodHub
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


Data Entities

### Donor
    - Name
    - Address
    - Blood Group
    - State
    - LGA
    - Phone
    - Email
    - Lab Document 

### Requester
    - Name
    - Address
    - Recipient
    - Hospital
    - State
    - LGA
    - Phone
    - Email

### Recipient
    - Name
    - Address
    - Blood Group
    - State
    - LGA
    - Phone
    - Email

### Hospital
    - Name
    - Address
    - State
    - LGA