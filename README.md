
## Description

A booking system, developed during my internship at Vention.

### Note: The front-end is in a seperate repository:
https://github.com/AntonDarbokliev/Cinema-Reservation-System-Front-End-Admin-Part-Internship-project

# Main Features 
## Booking seats system: 
- Utilizes websockets to dymaically indicate and lock a selected seat for other users
- Intuitive layout system to chooise a seat
- A full purchase flow, allowing for buying a ticket, drinks etc.
## Moive projection system: 
- Dynamic statuses for determining if a projection is scheduled, pending or running
- Features multuple validations to ensure a projection is bookable
- Intuitive movie projection creation flow
## Cinema Managment
- Allowing multiple cinema locations, each having their halls with their own layouts
## Custom seat types
- Custom seat types with custom prices and icons that change their look dynamically, just like the native ones 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

