'use strict';

require('dotenv').config();
const syllable = require('syllable');
const axios = require('axios');
const apiHost = process.env.WORDS_API_HOST;
const apiKey = process.env.WORDS_API_KEY;

axios.get(`https://${apiHost}/words/hatchback/typeOf`, {
  headers: {
    'x-rapidapi-host': apiHost,
    'x-rapidapi-key': apiKey,
  },
})
.then(res => {
console.log("TCL: res", res);
  
})
.catch(err => {
console.log("TCL: err", err);
  
})
