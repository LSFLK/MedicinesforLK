# Elixir - Medicines for LK

This is the repo for Elixir - Medicines for LK application.

## Setup Development Environment Locally

Please make sure you have all the listed prerequisites tools installed locally.

1. Node - Latest
2. npm - Latest

### Steps
- Clone your forked repository
- Move in to cloned repository
  ```
  cd MedicinesforLK
  ```

#### Admin Portal

- Change Directory to Admin Portal
  ```
  cd admin-portal
  ```
- Add .env.local file to the level where package.json exist
- Add following properties to the .env.local file
  ```
  REACT_APP_CLIENT_ID = <Choreo Application Client ID>
  REACT_APP_CLIENT_SECRET = <Choreo Application Client Secret>
  REACT_APP_SIGN_IN_REDIRECT_URL = http://localhost:3000
  REACT_APP_SIGN_OUT_REDIRECT_URL = http://localhost:3000
  
  ```
  Note: REACT_APP_SIGN_IN_REDIRECT_URL and REACT_APP_SIGN_OUT_REDIRECT_URL are the URL that the application is running on. So in local it is http://localhost:3000. Always better keep the local development to this URL as we have whitelisted only this.
  
- Install all the dependencies
  ```
  npm install
  ```
- Build the application using
  ```
  npm run build
  ```
- Start the server with

  ```
  npm start
  ```

- Visit your app at http://localhost:3000

#### Donor Portal

- Change Directory to Donor Portal
  ```
  cd donor-portal
  ```
- Add .env.local file to the level where package.json exist
- Add following properties to the .env.local file
  ```
  REACT_APP_CLIENT_ID = <Choreo Application Client ID>
  REACT_APP_CLIENT_SECRET = <Choreo Application Client Secret>
  REACT_APP_SIGN_IN_REDIRECT_URL = http://localhost:3000
  REACT_APP_SIGN_OUT_REDIRECT_URL = http://localhost:3000
  
  ```
  Note: REACT_APP_SIGN_IN_REDIRECT_URL and REACT_APP_SIGN_OUT_REDIRECT_URL are the URL that the application is running on. So in local it is http://localhost:3000. Always better keep the local development to this URL as we have whitelisted only this.
- Install all the dependencies
  ```
  npm install
  ```
- Start the server with

  ```
  npm start
  ```

- Visit your app at http://localhost:3000
