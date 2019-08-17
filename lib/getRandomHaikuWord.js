const axios = require('axios');
const countSyllables = require('syllable');

function getRandom(num) {
  return Math.floor(Math.random() * num);
}

module.exports = async function getRandomHaikuWord(syllables, apiKey, apiHost) {
  let haiku;
  let syllableCount =  0;
  let previousPartOfSpeech;

  while(syllableCount < syllables) {
    let partOfSpeech;
    if (!previousPartOfSpeech) {
      partOfSpeech = ['adjective', 'noun', 'verb', 'pronoun', 'adverb', 'preposition', 'determiner', 'conjunction'][getRandom(8)];
      previousPartOfSpeech = partOfSpeech;
    } else {
      switch (previousPartOfSpeech) {
        case 'adjective':
          partOfSpeech = 'noun';
          break;
        case 'adverb':
          partOfSpeech = 'verb';
        case 'noun':
          partOfSpeech = ['adverb', 'verb', 'conjunction'][getRandom(3)];
          break;
        case 'verb':
          partOfSpeech = ['verb', 'adjective', 'noun', 'preposition', 'pronoun', 'preposition'][getRandom(6)];
          break;
        case 'pronoun':
          partOfSpeech = 'verb';
          break;
        case 'preposition':
          partOfSpeech = ['determiner', 'noun'][getRandom(2)];
          break;
        case 'determiner':
          partOfSpeech = ['noun', 'adjective'][getRandom(2)];
          break;
        case 'conjunction':
          partOfSpeech = ['pronoun', 'determiner'][getRandom(2)];
        default:
          break;
      }
      previousPartOfSpeech = partOfSpeech;
    }
    const data = await axios.get(`https://${apiHost}/words/`, {
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
      params: {
        random: true,
        soundsMax: 5,
        partOfSpeech,
      },
    })
    .catch(e => {
      console.error("TCL: e", e)
    });

  const {data: {word}} = data;
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
  return haiku;
}
