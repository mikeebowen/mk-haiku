'use strict';
require('dotenv').config();
const {getRandomHaiku, getSonnet} = require('./lib');
const apiHost = process.env.WORDS_API_HOST;
const apiKey = process.env.WORDS_API_KEY;

getRandomHaiku(apiKey, apiHost)
.catch(err => console.error(err));
// getSonnet(apiKey, apiHost)
// .catch(err => console.error(err));
