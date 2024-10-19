
## Description

A scalable and efficient backend system for managing cinema reservations, built with NestJS and TypeScript. Features include user authentication, movie management, and a dynamic booking system for movie screenings. Ideal for cinema operators looking for a flexible solution to streamline operations.

## Main Features 
# Booking seats system: 
- Utilizes websockets to dymaically indicate and lock a selected seat for other users
- Intuitive layout system to chooise a seat
- A full purchase flow, allowing for buying a ticket, drinks etc.
# Moive projection system: 
- Dynamic statuses for determining if a projection is scheduled, pending or running
- Features multuple validations to ensure a projection is bookable
- Intuitive movie projection creation flow

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

