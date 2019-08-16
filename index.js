'use strict';

require('dotenv').config();
const countSyllables = require('syllable');
const axios = require('axios');
const apiHost = process.env.WORDS_API_HOST;
const apiKey = process.env.WORDS_API_KEY;

// axios.get(`https://${apiHost}/words/car/typeOf`, {
//   headers: {
//     'x-rapidapi-host': apiHost,
//     'x-rapidapi-key': apiKey,
//   },
// })
// .then(res => {
//   console.log("TCL: res", res);
// })
// .catch(err => {
//   console.log("TCL: err", err);
// });

function getHaikuWord() {
  return axios.get(`https://${apiHost}/words/hatchback`, {
    headers: {
      'x-rapidapi-host': apiHost,
      'x-rapidapi-key': apiKey,
    },
  });

}


async function getHaiku() {
  const haiku = [];
  const haikuSyllables = [5, 7, 5];
  let syllableCount =  0;

  haikuSyllables.forEach(async(hs, i) => {
    while(syllableCount < hs) {
      const {data: {word}} = await axios.get(`https://${apiHost}/words/`, {
        headers: {
          'x-rapidapi-host': apiHost,
          'x-rapidapi-key': apiKey,
        },
        params: {
          random: true,
          soundsMax: 12,
        },
      })
      .catch(e => {
        console.error("TCL: e", e)
      });
      console.log("TCL: getHaiku -> obj", word);

      const syllablesInWord = countSyllables(word);

      if (syllableCount + syllablesInWord <= hs) {
        if (haiku[i]) {
          haiku[i] += ` ${word}`;
        } else {
          haiku[i] = word;
        }

        syllableCount += syllablesInWord;
      }
    }
    haiku.forEach(h => console.log(h));
  });

}

// getHaiku();

getHaiku()
.catch(e => {
console.log("TCL: e", e)

})
