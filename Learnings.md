# My Learnings while developing this app

## Strongloop

- `cd mongo && mongod --dbpath=data`
- New Terminal window `cd backend && node .`
- Graphical tool: `cd backend && slc arc`
    - Add properties
    - …

## Create a customer
- http://localhost:3000/explorer/#!/Customer/Customer_create
- Why not a user? The Customer Model is based on the User Model. But the User Model is not accessible. At least not in backend/common/models.
- To create a customer: {"username": "admin", "email":"admin@admin.com", "password":"pwd"}
    - More details are not necessary.

## Login
- http://localhost:3000/explorer/#!/Customer/Customer_login
- Credentials: {"username": "Admin", "password":"abcdef"}
- Then copy "id" from the response body (something like `ey5BoEyPKpiRQHSiv4yyEoXdRC8HyAtI2tJpF1qogaVRxYTGd6O4aBFvtKFOBZRH`) and in the input field in the green header.
