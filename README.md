# Employee RESTful API

REST API using node js with DBMS MySQL

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.18.2-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.16.13.1-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. Node Js
2. Node_modules
3. Postman
4. Web Server
5. Visual Studio Code

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name (DB_NAME), and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url (http://localhost:3000/)

## Set up .env file

Open .env file on code editor, and copy paste this code below :

```
DB_HOST     = localhost
DB_USER     = root
DB_PASSWORD =
DB_DATABASE = DB_NAME
```
