'use strict';

require('dotenv').config();
const countSyllables = require('syllable');
const axios = require('axios');
const apiHost = process.env.WORDS_API_HOST;
const apiKey = process.env.WORDS_API_KEY;

async function getHaiku(syllables) {
  let haiku;
  let syllableCount =  0;
  let callCount = 0;
  while(syllableCount < syllables) {
    callCount++;
    const data = await axios.get(`https://${apiHost}/words/`, {
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
      params: {
        random: true,
        soundsMax: 12,
        limit: 100,
      },
    })
    .catch(e => {
      console.error("TCL: e", e)
    });

  const word = data.data.word;
  const syllablesInWord = countSyllables(word);

    if (syllableCount + syllablesInWord <= syllables) {
      if (haiku) {
        haiku += ` ${word}`;
      } else {
        haiku = word;
      }

      syllableCount += syllablesInWord;
    }
  }
  console.log(callCount);
  console.log(haiku);
}

for (let i = 0; i < 3; i++) {
  let syllables;

  switch (i) {
    case 0:
      syllables = 5;
      break;
    case 1:
      syllables = 7;
      break;
    case 2:
      syllables = 5;
      break;
    default:
      break;
  }
  getHaiku(syllables);
}