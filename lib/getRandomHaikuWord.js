const axios = require('axios');
const countSyllables = require('syllable');
const {getRandomNumber, getNextPartOfSpeech, getWord} = require('./helpers');

module.exports = async function getRandomHaikuWord(syllables, apiKey, apiHost) {
  let haiku;
  let syllableCount =  0;
  let previousPartOfSpeech;

  while(syllableCount < syllables) {
    let partOfSpeech;
    const partsOfSpeech = ['adjective', 'noun', 'verb', 'pronoun', 'adverb', 'preposition', 'determiner', 'conjunction'];
    if (!previousPartOfSpeech || !partsOfSpeech.includes(previousPartOfSpeech)) {
      partOfSpeech = partsOfSpeech[getRandomNumber(8)];
      previousPartOfSpeech = partOfSpeech;
    } else {
      partOfSpeech = getNextPartOfSpeech(previousPartOfSpeech);
      previousPartOfSpeech = partOfSpeech;
    }
    const word = await getWord(apiKey, apiHost, partOfSpeech);
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
