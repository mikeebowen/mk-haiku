'use strict';
const axios = require('axios');

async function getWord(apiKey, apiHost, partOfSpeech, rhymingWord) {
  const data = await axios.get(`https://${apiHost}/words/${rhymingWord ? rhymingWord + '/rhymes' : ''}`, {
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
      params: {
        random: !rhymingWord,
        soundsMax: 5,
        partOfSpeech,
      },
    })
    .catch(e => {
      console.error("TCL: e", e)
    });

    if (!rhymingWord) {
      const {data: {word}} = data;
      return word;
    } else {
      const {data: {rhymes: {all: rhymingWords}}} = data;
      const word = rhymingWords[Math.floor(Math.random() * rhymingWords.length)];
      return word;
    }
}

function getRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

function getNextPartOfSpeech(prevPartOfSpeech = 'adjective') {
  switch (prevPartOfSpeech) {
    case 'adjective':
      return 'noun';
      break;
    case 'adverb':
      return 'verb';
    case 'noun':
      return ['adverb', 'verb', 'conjunction'][getRandomNumber(3)];
      break;
    case 'verb':
      return ['verb', 'adjective', 'noun', 'preposition', 'pronoun', 'preposition'][getRandomNumber(6)];
      break;
    case 'pronoun':
      return 'verb';
      break;
    case 'preposition':
      return ['determiner', 'noun'][getRandomNumber(2)];
      break;
    case 'determiner':
      return ['noun', 'adjective'][getRandomNumber(2)];
      break;
    case 'conjunction':
      return ['pronoun', 'determiner'][getRandomNumber(2)];
    default:
      break;
  }
}

module.exports = {getRandomNumber, getNextPartOfSpeech, getWord};
