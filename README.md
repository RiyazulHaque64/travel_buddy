# l2-b2-fullstack-track-assignment-8-RiyazulHaque64

## Live: https://travel-buddy-matching.vercel.app

### How to run the application locally?

- #### step-1: Clone the project from github repository (Include .env file to check the project).
- #### step-2: Open a code editor then open the project folder.
- #### step-3: Type the following command in the terminal for running the server

```bash
npm run dev
```

#### Now, call the following api from the postman or a browser-

1. http://localhost:5001/api/register - Method: POST, For register an user
2. http://localhost:5001/api/login - Method: POST, For login an user
3. http://localhost:5001/api/trips - Method: POST, To create a trip
4. http://localhost:5001/api/trips - Method: GET, Get Paginated and Filtered Trips
5. http://localhost:5001/api/trip/:tripId/request - Method: POST, To send Travel Buddy Request
6. http://localhost:5001/api/travel-buddies/:tripId - Method: GET, Get Potential Travel Buddies For a Specific Trip
7. http://localhost:5001/api/travel-buddies/:buddyId/respond - Method: PUT, Respond to Travel Buddy Request
8. http://localhost:5001/api/profile - Method: GET, To get user profile
9. http://localhost:5001/api/profile - Method: PUT, To update user profile
