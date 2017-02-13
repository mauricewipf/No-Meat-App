# Capstone Project of Coursera's Full Stack Webdevelopment Course
[https://www.coursera.org/specializations/full-stack](https://www.coursera.org/specializations/full-stack)

## Stack Overview

### Frontend

- HTML + CSS + JavaScript
- Created with [Yeoman](yeoman.io)
- Angular 1.x
- [angular-ui-calendar](https://angular-ui.github.io/ui-calendar/)
  - Based on [Fullcalendar](https://fullcalendar.io/docs/)
- [json-server](https://github.com/typicode/json-server) for testing
  - `cd frontend/json-server && json-server db.json`

### Backend

- Created with [Strongloop](https://strongloop.com/)
- NodeJS
- MongoDB

## Run locally

1. `cd frontend && bower install && npm install`
2. `cd backend && npm install`
3. `cd mongo && mongod --dbpath=data`
4. `cd backend && node .`
5. `cd frontend && grunt serve`

## Roadmap

* [ ] Deploy on Heroku or IBM Bluemix
* [ ] Landing page
* [ ] After logout forward to landing page
* [ ] Show positive days on calendar after login w/o site reload
* [ ] Counter for positive days per month
* [ ] Mobile app with Ionic + Corodva
* [ ] 'Change Password'
* [ ] 'Delete Account'
* [ ] Add more calendars to track different habits
