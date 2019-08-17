'use strict';
require('dotenv').config();
const lib = require('./lib');
const apiHost = process.env.WORDS_API_HOST;
const apiKey = process.env.WORDS_API_KEY;
const {getRandomHaiku} = lib;

getRandomHaiku(apiKey, apiHost)
.catch(err => console.error(err));
