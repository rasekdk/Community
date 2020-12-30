'use strict';

// Requires
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Imports
const { usersController } = require('./controllers');
const validateAuth = require('./middlewares/validateAuth');

const { SERVER_PORT } = process.env;

const app = express();

app.use(bodyParser.json());

// Rutes

// Register
app.post('/register', usersController.register);

// Login
app.post('/login', usersController.login);

app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));
