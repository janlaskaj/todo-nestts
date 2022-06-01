# Školní aplikace ToDos

## Setup

### BE

Project setup
- `npm install`
- `npm run dbrestart` to run migrations
- send a request to create testing user (register form is not implemented)
  - `curl --request POST \
    --url http://localhost:4000/auth/signup \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data email=jan@laskaj.com \
    --data password=1234`
  - user: `jan@laskaj.com`
  - password: `1234`

Testing
- `npm run test:e2e`


### FE

Project setup
- `npm install`
- `npm run dev`
