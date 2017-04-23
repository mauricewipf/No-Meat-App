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
- Credentials: {"username": "d", "password":"d"}
- Then copy "id" from the response body (something like `ey5BoEyHKpiRQHSiv4yyEoXdRC8HyAtI2tJpF1qogaVRxYTGd6O4aBFvtKFOBZRH`) and in the input field in the green header.


## Troubleshooting

###*Error: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.*

- https://stackoverflow.com/questions/24456891/iframe-in-chrome-error-uncaught-securityerror-failed-to-read-the-sessionstora

###*Connecting Client and Server Video*

- https://www.coursera.org/learn/server-side-development/home/week/4


###*Mlab*

- https://www.coursera.org/learn/web-development-project/discussions/forums/hV3FpwNUEea58Q75huYNRw/threads/DswljBmZEeepgQ59jal4IA
- Maybe edit datasources.json > „MongoDB“: { host, user, pwd }

###*POST http://localhost:3000/api/customers/register 404 (Not Found)*

- Solved: in app/scripts/services.js > authFac.register > baseURL + 'customers/register' to 'customers'

###*vendor.d98798d9.js:5 POST http://localhost:3000/api/customers 422 (Unprocessable Entity)*

- Occurs when registering via GUI
- Registration via explorer works
- Maybe because of missing input field for email address in GUI
- Solved: it was the missing email address field

###*manifest.yml*

- https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html 

###*https://cloudant.com*

- alternative to mlab

###*client/dist*

- Maybe the solution: http://stackoverflow.com/a/31307655/3994449 
- https://github.com/yeoman/yeoman/issues/903
- Solution: https://loopback.io/doc/en/lb2/Add-a-static-web-page.html
    - Comment out server/boot/root.js
    - Edit server/middleware.json > „files“

###*insecure XMLHttpRequest endpoint 'http://0.0.0.0:3000/api/customers/login'*

- change to https but then error when executed local: OPTIONS https://0.0.0.0:3000/api/customers/login net::ERR_CONNECTION_CLOSED

###*Mixed Content: The page at 'https://nomeat.mybluemix.net/#!/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://0.0.0.0:3000/api/customers/login'. This request has been blocked; the content must be served over HTTPS.*

- https://loopback.io/doc/en/lb2/Preparing-for-deployment.html#using-ssl
