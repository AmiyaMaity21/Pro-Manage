# Pro Manage

Pro Manage is a project management app, where a user can create, edit, update, delete and assign tasks to himself and to his team members.


## Features

- Login and Register

- Create tasks, with properties like title, priority, checklist and due date is optional

- Share their task with other users 

- Shared tasks can be publicly accessed with read-only access

- On the settings page, user can either update just name, or email or password

- analytics section for all the tasks, analytics is data for all the tasks created so far on the platform

- Move any card to different states ie. backlog, todo, in-progress and done manually

- Delete a task

- Edit a task

- Filter the tasks by today, this week and month

- User can add members to the board and assign them to different task card while creating it


## Prerequisite

&nbsp;&nbsp;1. React.js

&nbsp;&nbsp;2. Redux Toolkit

&nbsp;&nbsp;3. Node.js

&nbsp;&nbsp;4. Express.js

&nbsp;&nbsp;5. MongoDB


## Install Dependencies

For Backend - `cd backend` `npm i`

For Frontend - `cd frontend` `npm i`


## Environment Variables

Make Sure to Create a .env file in backend and frontend directory and add appropriate variables in order to use the app.

For Backend - PORT = MONGODB_URI = JWT_SECRET = JWT_EXPIRES_IN = ALLOW_ORIGIN =

For Frontend - REACT_APP_BACKEND_URL = fill each filed with your info respectively.


## Client-side usage(PORT: 3000)

$ cd frontend&nbsp;&nbsp;// go to frontend folder

$ npm i&nbsp;&nbsp;// npm install packages

$ npm start&nbsp;&nbsp;// run it locally


## Server-side usage(PORT: 7000)

$ cd backend&nbsp;&nbsp;// go to backend folder

$ npm start&nbsp;&nbsp;//  run it locally